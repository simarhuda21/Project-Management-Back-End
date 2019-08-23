const jwt = require('../../helper/jwt.js'),
    utils = require('../../helper/utils'),
    projectModel = require('./projectModel'),
    taskModel = require('../task/taskModel'),
    userModel = require('../user/userModel'),
    mongoose = require('mongoose'),
    config = require('../../config/config'),
    moment = require('moment'),
    userHelper = require('../user/userHelper'),
    projectCtr = {};
taskCtr = {};

// Get Projects
projectCtr.getProjectList = (req, res) => {
    const role = jwt.getUserRole(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    const id = jwt.getUserId(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    let condition = {}
    if (role == 1) {
        condition = {
            manager: mongoose.Types.ObjectId(id)
        }
    } else {
        condition = {}
    }
    projectModel.find(condition)
        .populate('manager')
        .populate('team')

        .exec((err, foundProject) => {
            if (err) {
                logger.error("Error in get project list", err);
                return res.status(400).json({ "message": req.t("TRY_AGAIN") });
            } else {
                res.status(200).json({
                    data: foundProject
                });
            }
        });
}

// Create Project
projectCtr.createProject = (req, res) => {
    request = {
        manager: req.body.manager,
        team: req.body.team,
        title: req.body.title,
        lastTaskSrNo: 0
    }
    projectModel.create(request, (err, project) => {
        if (err) {
            logger.error("Error in project data insert", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        } else {
            res.status(200).json({
                message: "SUCCESS"
            });
        }
    });
}

// Update Project
projectCtr.updateProject = (req, res) => {
    projectModel.findByIdAndUpdate(req.body.id, req.body, (err, project) => {
        if (err) {
            logger.error("Error in project data update", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        } else {
            res.status(200).send({
                message: "UPDATED!"
            });
        }
    });
}

// delete Project
projectCtr.deleteProject = (req, res) => {
    projectModel.remove({ _id: req.body.id }, (err, project) => {
        if (err) {
            logger.error("Error in project deleted", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        } else {
            // Delete Task
            logger.info("project deleted successfully");
            taskModel.deleteTaskByProjectId(req.body.id).then(result => {
                logger.info("Delete All Tasks Of This Project By ProjectId Successfully");
                logger.info(result)
                return res.status(200).json({ message: req.t('SUCCESS') });
            }).catch(err => {
                logger.error('Error in Delete Tasks Data Of  Project by ProjectId:', err);
                return res.status(400).json({ "error": err, message: req.t('ERROR') });
            });
          
        }

    })
}

// Get Manager
projectCtr.getManager = (req, res) => {
            const role = 1;
            userHelper.getUser(role).then(getUser => {
                return res.status(200).json({ "message": req.t("SUCCESS"), data: getUser });
            }).catch(error => {
                logger.error("Error in get manager", err);
                return res.status(400).json({ "message": req.t("TRY_AGAIN") });
            })
        }

// Get Developer
projectCtr.getDeveloper = (req, res) => {
            const role = 2 // developer
            userHelper.getUser(role).then(getUser => {
                return res.status(200).json({ "message": req.t("SUCCESS"), data: getUser });
            }).catch(error => {
                logger.error("Error in get developer", err);
                return res.status(400).json({ "message": req.t("TRY_AGAIN") });
            });
        }

projectCtr.getProjectFromId = (req, res) => {
            projectModel.find({
                _id: mongoose.Types.ObjectId(req.query.id)
            }).populate('manager').populate('team').exec(function (err, data) {
                if (err) {
                    logger.error("Error in projects by id", err);
                    return res.status(400).json({ "message": req.t("TRY_AGAIN") });
                } else {
                    res.status(200).json({
                        data: data
                    });
                }
            });
        }

projectCtr.getTaskFromProject = (req, res) => {
            taskModel.find({
                projectRef: mongoose.Types.ObjectId(req.query.id)
            }).populate('projectRef').populate('developer').exec(function (err, data) {
                if (err) {
                    logger.error("Error in task by id", err);
                    return res.status(400).json({ "message": req.t("TRY_AGAIN") });
                } else {
                    res.status(200).json({
                        data: data
                    });
                }
            });
        }

module.exports = projectCtr;
