const jwt = require('../../helper/jwt.js'),
    utils = require('../../helper/utils'),
    taskModel = require('../task/taskModel'),
    projectModel = require('../project/projectModel'),
    userHelper = require('../user/userHelper'), 
    mongoose = require('mongoose'),
    config = require('../../config/config'),
    moment = require('moment'),
    reportsHelpr = require('./reportsHelper');
reportsCtr = {};

reportsCtr.getReports = (req, res) => {
    taskModel.find({}).populate('projectRef').populate('developer').exec((err, foundData)=>{
        if(err){
            logger.error("Error in get reports", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        }else{
            res.status(200).send({
                data: foundData
            });
        }
    });
}

reportsCtr.getTaskFromData = (req, res) => {
    let where = {};

    if(req.body.id){
        where['projectRef'] = req.body.id;
    }
    if(req.body.status){
        where['status'] = req.body.status;
    }
    if(req.body.startDate!="" && req.body.startDate!=null){
        where['startDate'] = {$gte:req.body.startDate};
    }
    if(req.body.endDate!="" && req.body.endDate!=null){
        where['startDate'] = {$lte:req.body.endDate};
    }
    taskModel.find(where).populate('projectRef').populate('developer').exec((err, foundData)=>{
        if(err){
            logger.error("Error in get task reports", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        }else{
            res.status(200).send({
                data: foundData
            });
        }
    });
}

// Get search data
reportsCtr.getSearchData = (req, res) => {
    let q = req.body.text;
    taskModel.find({
        $or:[
            {'title':{"$regex":q}},
            {'description':{"$regex":q}}
        ]
    }).populate('projectRef').populate('developer').exec((err,tasks) => {
        if(err){
            logger.error("Error in report get", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });  
        }
        else{
            res.status(200).send({
                data: tasks
            });
        }
    })
}

reportsCtr.getDeveloperTask = (req, res) => {
    let where = {
        developer:  mongoose.Types.ObjectId(req.body.developer)
    }
    taskModel.find(where).populate('projectRef').populate('developer').exec((err, foundData)=>{
        if(err){
            logger.error("Error in get task reports", err);
            return res.status(400).json({ "message": req.t("TRY_AGAIN") });
        }else{
            res.status(200).send({
                data: foundData
            });
        }
    });
}

reportsCtr.getUser = (req, res) => {
    const role = 2 // developer
     userHelper.getUser(role).then(getUser => {
        return res.status(200).json({ "message": req.t("SUCCESS"), data: getUser });
    }).catch(error => {
        logger.error("Error in get developer", err);
        return res.status(400).json({ "message": req.t("TRY_AGAIN") });
    });
}

reportsCtr.getProjectList = (req, res) => {
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
        // .populate('lastTaskSrNo')
        .exec((err, foundProject) => {
            if(err){
                logger.error("Error in get project list", err);
                return res.status(400).json({ "message": req.t("TRY_AGAIN") });
            }else{
                res.status(200).json({
                    data: foundProject
                });
            }
        });
}

module.exports = reportsCtr