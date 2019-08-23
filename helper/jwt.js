let jwt = require('jsonwebtoken');
let config = require('../config/config');
let jwtUtil = {};

/*
 * For Create Secret Token For User
 * @param Int uid Uid
 * @return String
 */
// jwtUtil.createSecretToken = (data) => {
//     let token = jwt.encode(data, config.SECRET);
//     return token;
// }

jwtUtil.createSecretToken = (data) => {
    let token = jwt.sign(data, config.SECRET);
    return token;
}


/*
 * For Get User ID Form SecretToken
 * @param Int uid Uid
 * @return String
 */
jwtUtil.decodeToken = (token) => {
    var data = {};
    if (token) {
        try {
            var decoded = jwt.verify(token, config.SECRET);
            data = decoded;
        } catch (err) {
            data
        }
    }
    return data;
}
jwtUtil.getUserId = (token) => {
    let userID = "";
    if (token) {
        try {
            let decoded = jwt.verify(token, config.SECRET);
            userID = decoded.id;
        } catch (err) {
            userID
        }
    }
    return userID;
}
jwtUtil.getUserRole = (token) => {
    let role = "";
    if (token) {
        try {
            let decoded = jwt.verify(token, config.SECRET);
            role = decoded.role;
        } catch (err) {
            role
        }
    }
    return role;
}

jwtUtil.getCurrentUserId = (req) => {
    let token = (req.headers && req.headers['x-auth-token']);
    let userID = "";
    if (token) {
        try {
            let decoded = jwt.verify(token, config.SECRET);
            userID = decoded.uid;
        } catch (err) {
            userID
        }
    }
    return userID;
}

jwtUtil.createToken = (data,options) => {
    let token = jwt.sign(data, config.SECRET,options);
    return token;
}

jwtUtil.verifyToken = (token) => {
    return new Promise((resolve,reject) => {
        if(token){
            try{
                jwt.verify(token,config.SECRET,(err,decoded) => {
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(decoded.uid);
                    }
                });
            }catch(error){
                reject(error);
            }
        }
        else{
            reject({"message":"No Token Provided"});
        }
    })
}

//method to get device id from access token(jwt token)
jwtUtil.getCurrentUserDeviceId = (req) => {
    let token = (req.headers && req.headers['x-auth-token']);
    let deviceId = "";
    if (token) {
        try {
            let decoded = jwt.verify(token, config.SECRET);
            deviceId = decoded.deviceId;
        } catch (err) {
            deviceId
        }
    }
    return deviceId;
}
module.exports = jwtUtil;