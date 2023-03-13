const fs = require('fs');
const rLog = (log_data) => {

    let date = new Date();
    let dataToPrint = log_data
    if (typeof log_data == "object") {
        try { dataToPrint = JSON.stringify(log_data) } catch { dataToPrint = log_data }
    }
    // fs.writeFileSync()
    let fileName = `./logs/${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`
    let format = `${date.toJSON()} :: ${dataToPrint}\n`;
    fs.appendFile(fileName, format, (err) => {
        if (err) {
            fs.writeFile(fileName, format, (err) => {
                if (err) return
            })
        }
    })
    console.log(date, "::", log_data);
    // console.log(`${date.toJSON()} :: ${log_data}\n`);

}



module.exports = rLog;