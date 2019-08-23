const taskHelper = {},
    taskModel = require('./taskModel'),
    mongoose = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    multer = require('multer'),
    nodeMailer = require('nodemailer'),
    awsUtils = require('../../helper/awsUtils');

let newTaskTemplate = require('../../mailContent/newTaskMail');

// CSV file Store in.
let DIR = './uploads';

taskHelper.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        let date = Date.now();
        cb(null, file.fieldname + '-' + date + '' + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: taskHelper.storage
});

// readCSV() - read CSV file and insert into database.
taskHelper.readCSV = (filename, id, developer) => {
    if (developer) {
        var columns = ["projectRef", "title", "hours", "dueDateTime", "description", "developer", "startDate"];
    } else {
        var columns = ["projectRef", "title", "hours", "dueDateTime", "description", "startDate"];
    }
    require("csv-to-array")({
        file: "./uploads/" + filename,
        columns: columns
    }, function (err, array) {
        let newData = array.splice(0, 1);
        array.forEach(element => {
            element.projectRef = mongoose.Types.ObjectId(id)
            if (developer) {
                element.developer = mongoose.Types.ObjectId(developer)
            }
        });
        // Insert task list from CSV file.
        taskModel.insertMany(array, function (err, docs) {
            if (err) {
                return console.error(err);
            } else {
                return console.log("Success");
            }
        });
    });
}
//
taskHelper.sendnewTaskMail = ( email, userName, projectTitle, tasktitle, taskHours, taskStartDate, taskStatus, description, mailSubject) => {
    let newTaskMailTemplate = newTaskTemplate;
    newTaskMailTemplate = newTaskMailTemplate.replace('{PROJECTNAME}', projectTitle);
    newTaskMailTemplate = newTaskMailTemplate.replace('{DEVELOPERNAME}', userName);
    newTaskMailTemplate = newTaskMailTemplate.replace('{TASKTITLE}', tasktitle);
    newTaskMailTemplate = newTaskMailTemplate.replace('{DESCRIPTION}', description);
    newTaskMailTemplate = newTaskMailTemplate.replace('{HOURS}', taskHours);
    newTaskMailTemplate = newTaskMailTemplate.replace('{STARTDATE}', taskStartDate);
    newTaskMailTemplate = newTaskMailTemplate.replace('{STATUS}',taskStatus ? taskStatus : "");    
    return awsUtils.sendMail(email, newTaskMailTemplate, mailSubject);
}
module.exports = taskHelper;