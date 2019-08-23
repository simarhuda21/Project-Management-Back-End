const jwt = require('../../helper/jwt.js'),
    utils = require('../../helper/utils'),
    commentModel = require('./commentModel'),
    // userModel = require('../user/userModel');
    mongoose = require('mongoose'),
    config = require('../../config/config'),
    moment = require('moment'),
    userHelper = require('../user/userHelper'),
    logger = require('../../helper/logger'),
    commenCtr = {};

// Add Comment.
commenCtr.addComment = (req, res) => {
    let cdetail = {
        comment: req.body.commentDetail.comment,
        commentor: req.body.commentDetail.commentor,
        commenterId: req.body.commentDetail.commenterId
    };

    let request = {
        taskId: req.body.taskId,
        // developer: req.body.developer,
        commentDetail: cdetail,
        // projectRef: req.body.projectRef,
        // CommentDate: req.body.title,
    };
    commentModel.findOne({ taskId: mongoose.Types.ObjectId(request.taskId) })
        .then(responses => {
            if (responses) {

                commentModel.updateCommentsById(request.taskId, { $push: { commentDetail: request.commentDetail } })
                    .then(result => {
                        logger.info("new comment add successfully");
                        
                        return res.status(200).send({
                            message: "Add Comment Successfully!",
                        });
                    })
            }
            else {
                commentModel.create(request, (err, comment) => {
                    if (err) {

                        logger.error("Error in comment inserted", err);
                        return res.status(400).json({
                            "message": req.t("TRY_AGAIN")
                        });
                    } else {

                        logger.error('first comment add successfully:', err);
                        return res.status(200).send({
                            message: "Add Comment Successfully!",
                        });
                    }
                });
            }
        }
        )
}

commenCtr.deleteComment = (req, res) => {
    let commentor;
    commentModel.aggregate([
        {
            $match: { taskId: mongoose.Types.ObjectId(req.body.taskid) }
        },
        {
            $unwind: "$commentDetail"
        }
        ,
        {
            $match: { "commentDetail._id": mongoose.Types.ObjectId(req.body.id) }
        }
    ])
        .then(result => {
            const role = jwt.getUserRole(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
            commentor = result[0].commentDetail.commentor;
            if (req.body.loginuser == commentor || role == 4) {
                commentModel.update({ taskId: mongoose.Types.ObjectId(req.body.taskid) },
                    { $pull: { "commentDetail": { "_id": mongoose.Types.ObjectId(req.body.id) } } })
                    .then(result => {
                        logger.info("Delete comment  successfully");

                        return res.status(200).send({
                            message: "Delete Comment Successfully!",
                        });
                    }).catch(err => {
                        logger.error("Error in Comment deletion", err);
                        return res.status(400).json({
                            "message": req.t("TRY_AGAIN")
                        });
                    })
            } else {
                logger.info("You can not delete other person comments");

                return res.status(400).json({
                message: "You can not delete other person comments"
                    // "message": req.t("TRY_AGAIN")
                });
            }
        }).catch(err => {
            logger.error("Error ", err);

        })



}
module.exports = commenCtr;