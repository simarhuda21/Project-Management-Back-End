const userHelper = {},
    userModel = require('./userModel'),
    mongoose = require('mongoose'),
    nodeMailer = require('nodemailer'),
    awsUtils = require('../../helper/awsUtils');
let generator = require('generate-password');
let forgotPasswordTemplate = require('../../mailContent/forgotPasswordMail');
let newUserMailTemplate = require('../../mailContent/newUserMail');
// hash the password
userHelper.generateHashPassword = function () {
    let password = generator.generate({
        length: 10,
        numbers: true
    });
    return password;
};


// mail Credentials
userHelper.mailCredentials = function () {
    let userEmail = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: '',
            pass: ''
        }
    });
    return userEmail
}

// Get User (get user role wise)
userHelper.getUser = (role) => {
    return new Promise((resolve, reject) => {
        let where = role ? {
            'role': role
        } : {};
        userModel.find(where, (err, founduser) => {
            if (err) {
                resolve(err)
            } else {
                resolve(founduser)
            }
        });
    });
}

userHelper.sendPasswordResetLinkMail = (email, staffName, resetLink, mailSubject) => {
    let resetPasswordTemplate = forgotPasswordTemplate;
    resetPasswordTemplate = resetPasswordTemplate.replace(/{RESET_LINK}/gi, resetLink);
    resetPasswordTemplate = resetPasswordTemplate.replace('{STAFF_NAME}', staffName);
    return awsUtils.sendMail(email, resetPasswordTemplate, mailSubject);
}

userHelper.newPasswordMail = (email, password, mailSubject) => {
    let newUserPasswordMailTemplate = newUserMailTemplate;
    newUserPasswordMailTemplate = newUserPasswordMailTemplate.replace('{PASSWORD}', password);
    return awsUtils.sendMail(email, newUserPasswordMailTemplate, mailSubject);
}

module.exports = userHelper;