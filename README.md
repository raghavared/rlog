# Logger for JavaScript

[![NPM version](https://img.shields.io/npm/v/aws-sdk.svg)](https://www.npmjs.com/package/@raghava_rdy/rlog)

## Version 1.0.2 Now Available

The [version 1.0.2](https://github.com/raghavared/rlog) of the rLog JavaScript is generally available.

### Table of Contents:

- [Getting Started](#getting-Started)
- [How to Install](#install-section)
- [Contributing](#contributing)

### Getting Started

This logger helps you to maintain daily logs and update them to the preferred S3 bucket.

### How To Install

```sh
npm install @raghava_rdy/rlog
```

#### In Node.js

The preferred way to install the rLog for Node.js is to use the [npm](http://npmjs.org) package manager for Node.js. Simply type the following into a terminal window:

```sh
npm install @raghava_rdy/rlog
```

Then within your application, you can reference the rLog with the following:

```javascript
const { rLog, syncLogsWithS3 } = require("@raghava_rdy/rlog");
```

To update the logs to S3 on daliy basis need to initialise the `syncLogsWithS3()` so that it can upload the data to S3 Bucket.

```javascript
syncLogsWithS3({
  accessKey: "Access key of your s3",
  secretKey: "Secret key of your s3 ",
  bucketName: "Name of your bucket to push the logs",
  applicationName: "Name of the application you are running",
});
```

How to use the rLog to console the output `rLog()`

```javascript
const data_to_print = "hello welcome, here is the sample date to print";
rLog(data_to_print);
rLog(data_to_print);
rLog(data_to_print);
```

#### sample output

`2023-04-01T10:06:12.794Z :: hello welcome, here is the sample date to print`

`2023-04-01T10:06:12.794Z :: hello welcome, here is the sample date to print`

`2023-04-01T10:06:12.794Z :: hello welcome, here is the sample date to print`

### Contributing

We welcome community contributions and pull requests. See [watch](https://github.com/raghavared/rlog) for information on how to set up a development environment.

### License

ISC
