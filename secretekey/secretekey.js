const crypto = require('crypto');

const secretekey = crypto.randomBytes(32).toString("hex");
console.log("your secrete key is", secretekey);