const taskMiddleware = {},
    _v = require('../../helper/validate'),
    utils = require('../../helper/utils'),
    taskValidator1 = require('./taskValidator'),
    taskModel = require('./taskModel'),
    userModel = require('../user/userModel'),
    projectModel = require('../project/projectModel');
    errorHandler = require('../../helper/error');

taskMiddleware.validateInput = (type, validateType) => {
    return function (req, res, next) {
        var taskValidator = {};
        var validators = taskValidator1.getTaskValidator(req, type);
        taskValidator = validators;
        var error = _v.validate(req.body, taskValidator);
        if (!utils.empty(error)) {
            return errorHandler.validationError(res, error);
        }
        next();
    };
}

taskMiddleware.userDetails = () => {
    return userModel.find({ _id: mongoose.Types.ObjectId(req.body.developer)}, {email: 1, firstname: 1, lastname: 1}).then(result => {
                    req.userDetail = result;
            }).catch(err => {
                logger.error('find user email error in task:', err);
                return res.status(400).json({
                    "message": req.t("TRY_AGAIN")
                });
            });
}

module.exports = taskMiddleware;