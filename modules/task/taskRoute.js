const express = require('express'),
    taskCtr = require('./taskcontroller'),
    commenCtr = require('../comments/commentController')
    taskRouter = express.Router(),
    auth = require("../../helper/auth"),
    path = require('path'),
    fs = require('fs'),
    multer = require('multer'),
    taskMiddleware = require('./taskMiddleware');
    
// CSV file Store in.
var DIR = './uploads';
let storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        let date = Date.now();
        cb(null, file.fieldname + '-' + date + '' + path.extname(file.originalname));
    }
});

let upload = multer({
    storage: storage
});

/**
 @api {post} /api/v1/task/createTask Task Create Task
 @apiName Task Create Task
 @apiGroup Task
 @apiParam {String} srNo Task serial number.
 @apiParam {ObjectId} projectRef Project under task assign.
 @apiParam {String} title Task title.
 @apiParam {String} hours Task hours.
 @apiParam {Date} dueDateTime Task due date.
 @apiParam {String} description Task description.
 @apiParam {Date} startDate Task Start date.
 @apiParam {ObjectId} developer Task assign to selected developer.
 @apiSuccess {String} message Api status.
  @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
          "message":"Success",
      }
 
 @apiError 500 Server not responding
 @apiError 400 Bad User Input
 @apiErrorExample 400 Error: create Task
*/
let createTaskMiddleware = [
    //taskMiddleware.userDetails,
    taskCtr.createTask
];
taskRouter.post('/createTask', createTaskMiddleware);

/**
 @api {post} /api/v1/task/updateTask Task Update Task
 @apiName Task Create Task
 @apiGroup Task
 @apiParam {String} srNo Task serial number.
 @apiParam {ObjectId} projectRef Project under task assign.
 @apiParam {String} title Task title.
 @apiParam {String} hours Task hours.
 @apiParam {Date} dueDateTime Task due date.
 @apiParam {String} description Task description.
 @apiParam {Date} startDate Task Start date.
 @apiParam {ObjectId} developer Task assign to selected developer.
 @apiParam {String} status Task status.
 @apiSuccess {String} message Api status.
  @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
          "message":"Success",
      }
 
 @apiError 500 Server not responding
 @apiError 400 Bad User Input
 @apiErrorExample 400 Error: create Task
*/

let updateTaskMiddleware = [
    // taskMiddleware.validateInput("update"),
    taskCtr.updateTask
];
taskRouter.put('/updateTask', updateTaskMiddleware);

/**
 @api {post} /api/v1/task/deleteTask Task Delete Task
 @apiName Task Delete Task
 @apiGroup Task
 @apiParam {ObjectId} _id Task id.
 @apiSuccess {String} message Api status.
  @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
          "message":"Success",
      }
 
 @apiError 500 Server not responding
 @apiError 400 Bad User Input
 @apiErrorExample 400 Error: create Task
*/
let deleteTaskMiddleware = [
    //taskMiddleware.validateInput("update"),
    taskCtr.deleteTask
];
taskRouter.post('/deleteTask', deleteTaskMiddleware);

let getTaskMiddleware = [
    //taskMiddleware.validateInput("update"),
    taskCtr.getTask
];
taskRouter.get('/getTask', getTaskMiddleware);

// let getCommentMiddleware = [
//     //taskMiddleware.userDetails,
//     commenCtr.getComment
// ];

let getTaskByIdMiddleware = [
    taskCtr.getTaskById
];
taskRouter.get('/gettaskfromid',getTaskByIdMiddleware)

let getProjectMiddleware = [
    taskCtr.getProjectInTask
]
taskRouter.get('/getProject', getProjectMiddleware)

let getUserMiddleware = [
    taskCtr.getUser
]
taskRouter.get('/getDeveloper', getUserMiddleware)

let uploadCSVMiddleware = [
    taskCtr.uploadCSV
]
taskRouter.post('/uploadCSV', upload.single('photo'), uploadCSVMiddleware)

let addCommentMiddleware = [
    //taskMiddleware.userDetails,
    commenCtr.addComment
];
taskRouter.post('/addComment', addCommentMiddleware);
let deleteCommentMiddleware = [
    //taskMiddleware.userDetails,
    commenCtr.deleteComment
];
taskRouter.post('/deleteComment', deleteCommentMiddleware);
module.exports = taskRouter;