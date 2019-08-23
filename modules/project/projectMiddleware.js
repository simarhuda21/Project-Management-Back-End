const projectMiddleware = {},
    _v = require('../../helper/validate'),
    utils = require('../../helper/utils'),
    validator = require('./projectValidator'),
    projectModel = require('./projectModel'),
    errorHandler = require('../../helper/error');

    projectMiddleware.validateInput = (type, validateType) => {
    return function (req, res, next) {
        var projectValidator = {};
        var validators = validator.getprojectValidator(req, type);
        projectValidator = validators;
        var error = _v.validate(req.body, projectValidator);
        if (!utils.empty(error)) {
            return errorHandler.validationError(res, error);
        }
        next();
    };
}

module.exports = projectMiddleware;