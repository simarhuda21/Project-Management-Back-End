const express = require('express'),
    reportsCtr = require('./reportsController'),
    reportsRouter = express.Router(),
    auth = require("../../helper/auth");

let getReportsMiddleware = [
    reportsCtr.getReports
]
reportsRouter.get('/getReport', getReportsMiddleware);

let getTaskFromDataMiddleware = [
    reportsCtr.getTaskFromData
]
reportsRouter.post('/getTaskFromData', getTaskFromDataMiddleware);

let getTaskDevloperMiddleware = [
    reportsCtr.getDeveloperTask
]
reportsRouter.post('/getTaskDeveloper', getTaskDevloperMiddleware)

let getSearchDataMiddleware = [
    reportsCtr.getSearchData
]
reportsRouter.get('/getSearchData', getSearchDataMiddleware)

let getUserMiddleware = [
    reportsCtr.getUser
]
reportsRouter.get('/getUser', getUserMiddleware)

let getProjectMiddleware = [
    reportsCtr.getProjectList
]
reportsRouter.get('/getProject', getProjectMiddleware)
module.exports = reportsRouter;