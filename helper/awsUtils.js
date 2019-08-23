const config = require('../config/config')
const utilsfunction = require('./utils');
const fs = require('fs');
const AWS = require('aws-sdk');
const nodeMailer = require('nodemailer');

//const credentials = config.credentials;
// AWS.config.update({
//     accessKeyId: credentials.accessKey,
//     secretAccessKey: credentials.sharedSecret,
//     region: credentials.region
// })
const awsUtils = {};
// const SES_CONFIG = _.extend(AWS, {
//     apiVersion: '2018-01-01'
// });
// const ses = new AWS.SES(SES_CONFIG);

awsUtils.sendMail = (mailTo, htmlTemplate, subject) => {
    let userEmail = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });
    return new Promise((resolve, reject) => {
        userEmail.sendMail({
            from: "",
            to: mailTo,
            subject: subject,
            html: htmlTemplate.toString()
        }, (error, data) => {
            let isEmailSent;
            if (error) {
                isEmailSent = false;
                return reject(error);
            }
            isEmailSent = true;
            return resolve(isEmailSent);
        });
    })
}

module.exports = awsUtils;