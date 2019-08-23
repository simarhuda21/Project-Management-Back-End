const userMiddleware = {},
    _v = require('../../helper/validate'),
    utils = require('../../helper/utils'),
    userValidator = require('./userValidator'),
    userModel = require('./userModel'),
    errorHandler = require('../../helper/error');

userMiddleware.validateInput = (type, validateType) => {
    return function (req, res, next) {
        var userValidators = {};
        var validators = userValidator.getUserValidator(req, type);
        userValidators = validators;
        var error = _v.validate(req.body, userValidators);
        if (!utils.empty(error)) {
            return errorHandler.validationError(res, error);
        }
        next();
    };
}

//check whether user is registered or not 
userMiddleware.userEmailAlreadyExist = (req, res, next) => {
    userModel.count({
            email: req.body.email
        })
        .then((count) => {
            if (count > 0) {
                return errorHandler.validationError(res, {
                    data: 1
                })
            }
            next();
        });
}

//check whether user is registered or not 
// userMiddleware.usernameAlreadyExist = (req, res, next) => {
//     userModel.count({
//             username: req.body.username
//         })
//         .then((count) => {
//             if (count > 0) {
//                 return errorHandler.validationError(res, {
//                    data: 2
//                 })
//             }
//             next();
//         });
// }

module.exports = userMiddleware;