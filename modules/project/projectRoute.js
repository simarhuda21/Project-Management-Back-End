const express = require('express'),
    projectCtr = require('./projectController'),
    projectRouter = express.Router(),
    auth = require("../../helper/auth"),
    projectMiddleware = require('./projectMiddleware');



/**
 @api {post} /api/v1/project/createProject Project Create Project
 @apiName Project Create Project
 @apiGroup Project
 @apiParam {String} title Project title.
 @apiParam {ObjectId} manager Project Manager.
 @apiParam {Array} team Project team member list.
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
let createProjectMiddleware = [
    projectMiddleware.validateInput("create"),
    projectCtr.createProject
];
projectRouter.post('/createProject', createProjectMiddleware);

/**
 @api {post} /api/v1/project/updateProject Project update Project
 @apiName Project update Project
 @apiGroup Project
 @apiParam {String} title Project title.
 @apiParam {ObjectId} manager Project Manager.
 @apiParam {Array} team Project team member list.
 @apiSuccess {String} message Api status.
  @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
          "message":"Success",
      }
 
 @apiError 500 Server not responding
 @apiError 400 Bad User Input
 @apiErrorExample 400 Error: update Task
*/
let updateProjectMiddleware = [
    projectMiddleware.validateInput("update"),
    projectCtr.updateProject
];
projectRouter.put('/updateProject', updateProjectMiddleware);

/**
 @api {post} /api/v1/project/updateProject Project update Project
 @apiName Project update Project
 @apiGroup Project
 @apiParam {ObjectId} _id Project id.
 @apiSuccess {String} message Api status.
  @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
          "message":"Success",
      }
 
 @apiError 500 Server not responding
 @apiError 400 Bad User Input
 @apiErrorExample 400 Error: update Task
*/
let deleteProjectMiddleware = [
    projectCtr.deleteProject
];
projectRouter.post('/deleteProject', deleteProjectMiddleware);

let getProjectMiddleware = [
    projectCtr.getProjectList
];
projectRouter.get('/getProject', getProjectMiddleware);

let getdeveloperMiddleware = [
    projectCtr.getManager
];
projectRouter.get('/getManager', getdeveloperMiddleware);

let getDeveloperMiddleware = [
    projectCtr.getDeveloper
]
projectRouter.get('/getDeveloper', getDeveloperMiddleware);

let getProjectFromIdMiddleware = [
    projectCtr.getProjectFromId
]
projectRouter.get('/getProjectFromId', getProjectFromIdMiddleware);

let getTaskFromProjectMiddleware = [
    projectCtr.getTaskFromProject
]
projectRouter.get('/getTaskFromProject', getTaskFromProjectMiddleware);

module.exports = projectRouter;