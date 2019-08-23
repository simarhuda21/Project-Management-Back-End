const jwt = require('../../helper/jwt.js'),
    utils = require('../../helper/utils'),
    taskModel = require('./taskModel'),
    projectModel = require('../project/projectModel'),
    commentModel = require('../comments/commentModel')
userModel = require('../user/userModel');
taskHelper = require('./taskHelper'),
    mongoose = require('mongoose'),
    config = require('../../config/config'),
    moment = require('moment'),
    userHelper = require('../user/userHelper'),
    logger = require('../../helper/logger'),
    taskCtr = {};

// Get Task
taskCtr.getTask = (req, res) => {
    const role = jwt.getUserRole(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    const id = jwt.getUserId(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    let where = {}
    if (role == 2) {
        where = {
            developer: mongoose.Types.ObjectId(id)
        }
    } else if (role == 1) {
        where = {
            manager: mongoose.Types.ObjectId(id)
        }
    }
    if (role == 1) {
        taskModel.aggregate([{
            $lookup: {
                from: 'projects',
                localField: 'projectRef',
                foreignField: '_id',
                as: 'projects'
            }
        }, {
            $unwind: {
                path: '$projects',
                preserveNullAndEmptyArrays: true
            }
        }, {
            $match: {
                "projects.manager": mongoose.Types.ObjectId(id)
            }
        }, {
            $project: {
                "_id": 1,
                "srNo": 1,
                "projectRef": 1,
                "title": 1,
                "hours": 1,
                "dueDateTime": 1,
                "description": 1,
                "status": 1,
                "startDate": 1,
                "developer": 1,
                "projectRef": "$projects",
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'developer',
                foreignField: '_id',
                as: 'developer'
            }
        }, {
            $unwind: {
                path: '$developer',
                preserveNullAndEmptyArrays: true
            }
        }], (err, taskFound) => {
            if (err) {
                logger.error("Error in task data insert", err);
                return res.status(400).json({
                    "message": req.t("TRY_AGAIN")
                });
            } else {
                res.status(200).send({
                    data: taskFound
                });
            }
        });
    } else if (role == 2) {
        taskModel.find(where).populate('projectRef', null).populate('developer', null).exec(function (err, foundTask) {
            if (err) {
                res.send(err);
            } else {
                res.status(200).send({
                    data: foundTask
                });
            }
        });
    }
    if (role == 4) {
        taskModel.find({})
            .populate('projectRef', null)
            .populate('developer', null)
            .exec(function (err, foundTask) {
                if (err) {
                    res.send(err);
                } else {
                    res.status(200).send({
                        data: foundTask
                    });
                }
            });
    }
}

taskCtr.getTaskById = (req, res, next) => {
    taskModel.find({
        _id: mongoose.Types.ObjectId(req.query.id)
    }).exec(function (err, data) {
        if (err) {
            logger.error("Error in projects by id", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        } else {
            // res.status(200).json({
            // res.json({
            //     data: data
            // });
            let projectid = data[0].projectRef;
            let developerid = data[0].developer;
            userModel.findOne({ _id: mongoose.Types.ObjectId(developerid) }, { email: 1, firstname: 1, lastname: 1 })
                .then((result) => {
                    const { firstname, lastname } = result;
                    let userEmail = result.email;
                    const userName = `${firstname} ${lastname}`;
                    projectModel.findOne({ _id: mongoose.Types.ObjectId(projectid) }, { title: 1 })
                        .then((title) => {
                            projectTitle = title.title;
                            // next();
                            //getcomment with taskid
                            commentModel.findOne({
                                taskId: mongoose.Types.ObjectId(req.query.id)
                            }).exec(function (err, commentsData) {
                                if (err) {
                                    logger.error("Error in projects by id", err);
                                    return res.status(400).json({ "message": req.t("TRY_AGAIN") });
                                } else {
                                    let cdata = "";
                                    // if(commentsData[0].commentDetail[0] != undefined)
                                    cdata = commentsData;
                                    // else
                                    // cdata=""
                                    return res.status(200).send({
                                        data: data,
                                        userEmail, userName, projectTitle,
                                        cdata
                                        // commentsData:commentsData[0].commentDetail[0],
                                    });
                                }
                            })
                            // .catch(err => {
                            //     logger.error('find Project title error in task:', err);
                            //     return res.status(200).send({
                            //         data: data,
                            //         userEmail, userName, projectTitle,

                            //         "message": req.t("TRY_AGAIN")
                            //     });
                            // });
                            ///////
                            // return res.status(200).send({
                            //     data:data,
                            //     userEmail,userName,projectTitle
                            // });
                        }).catch(err => {
                            logger.error('find Project title error in task:', err);
                            return res.status(400).json({
                                "message": req.t("TRY_AGAIN")
                            });
                        });
                }).catch(err => {
                    logger.error('find user email error in task:', err);
                    return res.status(400).json({
                        "message": req.t("TRY_AGAIN")
                    });
                })
        }
    });
}

// Create Task. 
taskCtr.createTask = (req, res) => {
    let request = {
        srNo: req.body.srNo,
        projectRef: req.body.projectRef,
        title: req.body.title,
        hours: req.body.hours,
        dueDateTime: req.body.dueDateTime,
        description: req.body.description,
        developer: req.body.developer,
        startDate: req.body.startDate,
        status: req.body.status
    };
    taskModel.create(request, (err, task) => {
        if (err) {
            logger.error("Error in task data insert", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            res.send({
                message: "Create Task SuccessFully and Send Mail To Developer!",
            });
            projectModel.update({ _id: mongoose.Types.ObjectId(req.body.projectRef) }, { $set: { lastTaskSrNo: req.body.srNo } })
            .then((result) => {
                logger.info("lastTaskSrNo = ", result);
            })
            .catch(err => {
                logger.error('err in update last task sr no:', err);
            });

            const subject = "Task Assign";
            let userEmail = "";
            let projectTitle = "";
            userModel.findOne({ _id: mongoose.Types.ObjectId(req.body.developer) }, { email: 1, firstname: 1, lastname: 1 })
                .then((result) => {
                    const { firstname, lastname } = result;
                    userEmail = result.email;
                    const userName = `${firstname} ${lastname}`;
                    projectModel.findOne({ _id: mongoose.Types.ObjectId(req.body.projectRef) }, { title: 1 })
                        .then((title) => {
                            projectTitle = title.title;
                            taskHelper.sendnewTaskMail(userEmail, userName, projectTitle, request.title, request.hours, request.startDate, request.status, request.description, subject)
                                .then(isMailSent => {
                                    logger.info("mail Success", isMailSent);
                                    return res.status(200).send({});
                                }).catch(err => {
                                    logger.error('[new task]Error in sending task mail:', err);
                                });
                        })
                        .catch(err => {
                            logger.error('find user email error in task:', err);
                            return res.status(400).json({
                                "message": req.t("TRY_AGAIN")
                            });
                        });
                }).catch(err => {
                    logger.error('find user email error in task:', err);
                    return res.status(400).json({
                        "message": req.t("TRY_AGAIN")
                    });
                })
        }
    });
}

// Update Task
taskCtr.updateTask = (req, res) => {
    taskModel.findByIdAndUpdate(req.body._id, req.body, (err, updatedTask) => {
        if (err) {
            logger.error("Error in task data update", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            res.send({
                message: "Updated Task SuccessFully and Send Mail To Developer!",
            });
            projectModel.update({ _id: mongoose.Types.ObjectId(req.body.projectRef) }, { $set: { lastTaskSrNo: req.body.srNo } })
            .then((result) => {
                logger.info("lastTaskSrNo = ", result);
            })
            .catch(err => {
                logger.error('err in update last task sr no:', err);
            });
            const subject = "Task which is assigned to you is updated";
            let userEmail = "";
            let projectTitle = "";
            userModel.findOne({ _id: mongoose.Types.ObjectId(req.body.developer) }, { email: 1, firstname: 1, lastname: 1 })
                .then((result) => {
                    const { firstname, lastname } = result;
                    userEmail = result.email;
                    const userName = `${firstname} ${lastname}`;
                    projectModel.findOne({ _id: mongoose.Types.ObjectId(req.body.projectRef) }, { title: 1 })
                        .then((title) => {
                            projectTitle = title.title;
                            taskHelper.sendnewTaskMail(userEmail, userName, projectTitle, req.body.title, req.body.hours, req.body.startDate, req.body.status, req.body.description, subject)
                                .then(isMailSent => {
                                    logger.info("mail Success", isMailSent);
                                    return res.status(200).send({});
                                }).catch(err => {
                                    logger.error('[new task]Error in sending task mail:', err);
                                });
                        })
                        .catch(err => {
                            logger.error('find Project title error in task:', err);
                            return res.status(400).json({
                                "message": req.t("TRY_AGAIN")
                            });
                        });
                }).catch(err => {
                    logger.error('find user email error in task:', err);
                    return res.status(400).json({
                        "message": req.t("TRY_AGAIN")
                    });
                })

      
        }
    });
}

// Delete Task
taskCtr.deleteTask = (req, res) => {
    taskModel.remove({
        _id: req.body.id
    }, (err, deleteTask) => {
        if (err) {
            logger.error("Error in task delete", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            res.status(200).send({
                message: "SUCCESS"
            });
        }
    });
}

taskCtr.getProjectInTask = (req, res) => {
    const role = jwt.getUserRole(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    const id = jwt.getUserId(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    let condition = {}
    if (role == 1) {
        condition = {
            manager: mongoose.Types.ObjectId(id)
        }
    } else if (role == 2) {
        condition = {
            team: mongoose.Types.ObjectId(id)
        }
    } else {
        condition = {}
    }
    projectModel.FindProjectByUserId(condition).then(foundProject => {
        res.status(200).send({
            data: foundProject
        });
    }).catch(err => {
        logger.error('Error in get project list', err);
        return res.status(400).json({ "error": err, message: req.t('ERROR') });
    })
}

taskCtr.getUser = (req, res) => {
    const role = 2 // developer
    userHelper.getUser(role).then(getUser => {
        return res.status(200).json({
            "message": req.t("SUCCESS"),
            data: getUser
        });
    }).catch(error => {
        logger.error("Error in get developer", err);
        return res.status(400).json({
            "message": req.t("TRY_AGAIN")
        });
    });
}

taskCtr.uploadCSV = (req, res) => {
    const role = req.body.role;
    const id = req.body.id;
    if (!req.file.filename) {
        console.log("No file received");
        return res.status(200).send({
            success: false
        });
    } else {
        if (role == '1' || role == '4') {
            taskHelper.readCSV(req.file.filename, id);
        } else if (role == '2') {
            taskHelper.readCSV(req.file.filename, id, req.body.developer);
        }
        return res.send({
            success: true
        })
    }
}

module.exports = taskCtr;