const fs = require('fs');
const cron = require('node-cron');
const { S3 } = require('aws-sdk')

const rLog = (...args) => {
    let log_data = "";
    for (const key of args) log_data += (typeof key === "object") ? JSON.stringify(key) : key;
    let date = new Date();
    let dataToPrint = log_data
    /**
     * check if the 'logs' folder exists, and if it doesn't, create a logs folder.
     */
    if (!fs.existsSync('logs')) {
        fs.mkdirSync("logs");
    }

    /**
     * Check whether the data is in object format. If it is, convert it to a string before writing it to the file.
     */
    if (typeof log_data == "object") {
        try { dataToPrint = JSON.stringify(log_data) } catch { dataToPrint = log_data }
    }
    /**
     * Create a file with the current date as the name to write or process the logs.
     */
    const fileName = `./logs/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-application.log`
    const format = `${date.toJSON()} :: ${dataToPrint}\n`;
    fs.appendFile(fileName, format, (err) => {
        if (err) {
            fs.writeFile(fileName, format, (err) => {
                if (err) return
            })
        }
    })
    /**
     * print the data onto the console if it's available.
     */
    console.log(date, "::", log_data);

}

const syncLogsWithS3 = (data = {
    accessKey,
    secretKey,
    bucketName,
    applicationName
}) => {
    const s3_access_data = data;
    const { accessKey, secretKey, bucketName, applicationName } = data
    if (applicationName === "" || applicationName === undefined || applicationName === null) {
        throw new Error('invalid applicationName || applicationName Cannot be empty');
    }
    if (accessKey === "" || accessKey === undefined || accessKey === null) {
        throw new Error('invalid accessKey || accessKey Cannot be empty');
    }
    if (secretKey === "" || secretKey === undefined || secretKey === null) {
        throw new Error('invalid secretKey || secretKey Cannot be empty');
    }
    if (bucketName === "" || bucketName === undefined || bucketName === null) {
        throw new Error('invalid bucketName || bucketName Cannot be empty');
    }
    const today = new Date();

    const file_name = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}-application.log`
    const path_of_file = `./logs/${file_name}`

    /**
     * load the s3 configuration
     */
    const s3 = new S3({ accessKeyId: accessKey, secretAccessKey: secretKey });

    /**
     * cron to update the daily log files to given s3 Bucket.
     */
    //59 23 * * * daily night at 11:59 pm of every day 
    cron.schedule('59 23 * * *', async () => {
        if (fs.existsSync(path_of_file)) {
            const fileContent = fs.readFileSync(path_of_file);
            const params = {
                Bucket: bucketName,
                Key: `${applicationName}/${file_name}`,
                Body: fileContent
            }
            await s3.upload(params).promise()
        }
    });

}


module.exports = { rLog, syncLogsWithS3 };