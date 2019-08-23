let utils = require('../helper/utils.js');
let userModel = require('../modules/user/userModel');
let jwt = require('./jwt');
let auth = {};

auth.requiresUserLogin = (req, res, next) => {
    let token = (req.headers && req.headers['x-auth-token']);
    let userId = jwt.getCurrentUserId(req);
    if (utils.empty(token) || utils.empty(userId)) {    
        res.status(401).json({"message": req.t("NOT_AUTHORIZED")});
    }
    else{
        userModel.findOne({"_id":userId}).exec(function(err, login){
            if(!login){
                res.status(401).json({"message": req.t("NOT_AUTHORIZED")});
                return;
            }else if(login.isBanned){
                res.status(403).json({"message": req.t("USER_BANNED")});
                return;
            }else{
                next();
            }
        })
    }
}

module.exports = auth