var jwt = require('../../helper/jwt.js'),
    config = require('../../config/config'),
    utils = require('../../helper/utils'),
    mongoose = require('mongoose'),
    moment = require('moment'),
    userHelpr = require('./userHelper'),
    bcrypt = require('bcryptjs'),
    jwts = require('jwt-simple'),
    userCtr = {};

var userModel = require('./userModel');

//login
userCtr.login = (req, res) => {
    //let password = req.body.password;
    
    try {
        userModel.findOne({
            email: req.body.email
        }).then(user => {
            
            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            console.log(req.body.password);
            console.log(user.password);
            console.log(passwordIsValid);
            if (!passwordIsValid) return res.status(401).send({
                auth: false,
                token: null
            });
            var token = jwt.createSecretToken({
                id: user._id,
                role: user.role
            }, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
            res.status(200).json({
                auth: true,
                token: token,
                firstname: user.firstname,
                lastname: user.lastname,
                role: user.role
            });
        }).catch((err) => {
            res.status(400).json(err);
        });
    } catch (err) {
        res.status(400).json({
            err
        });
    }
}

// Change password
userCtr.changePassword = (req, res) => {
    const id = jwt.getUserId(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    userModel.findOne({
        _id: mongoose.Types.ObjectId(id)
    }, (err, foundUser) => {
        if (err) {
            logger.error("Error in get user data", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            let passwordIsValid = bcrypt.compareSync(req.body.currentPassword, foundUser.password);
            if (!passwordIsValid) {
                res.status(400).send({
                    message: "Current password is not match"
                })
            } else {
                let hashedPassword = bcrypt.hashSync(req.body.newPassword, 8);
                foundUser.password = hashedPassword;
                foundUser.save(function (err) {
                    if (err) return handleErr(err);
                    return res.status(200).json({
                        "message": "Password Updated Sucessfully"
                    });
                });
            }
        }
    })
}

// Get User
userCtr.getUser = (req, res) => {
    userModel.find({}, (err, users) => {
        if (err) {
            logger.error("Error in get user data", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            res.status(200).send({
                data: users
            });
        }
    });
}

// Get login user data
userCtr.getLoginUser = (req, res) => {
    const id = jwt.getUserId(req.headers && req.headers[config.HEADER_AUTH_TOKEN]);
    userModel.findOne({
        _id: mongoose.Types.ObjectId(id)
    }, (err, foundUser) => {
        if (err) {
            logger.error("Error in get user data", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            res.status(200).send({
                data: foundUser
            });
        }
    })
}

// Create User
userCtr.createUser = (req, res) => {
    let input = req.body;
    let newUserData = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        // password: input.password,
        // password:hashedPassword,
        // username: input.username,
        role: +input.role,
    }
    // let password = userHelpr.generateHashPassword();
   
    var hashedPassword = bcrypt.hashSync(input.password);
    newUserData.password = hashedPassword;
    let insertNewUser = new userModel(newUserData);
    insertNewUser.save((err, user) => {
        if (err) {
            // logger.error("Error in user data insert", err);
            console.log(err);
            
            return res.status(400).json(err);
        } else {
            let token = jwt.createToken({
                id: user._id
            }, config.secret, {
                    expiresIn: 86400
                });
                console.log("maihudon");
            res.status(200).send({
                message: "Success ", //req.t("SUCCESS"),
                auth: true,
                token: token
            });
            const subject = "Welcome to Project Management";
            let email = req.body.email;
            let password =req.body.password;
            userHelpr.newPasswordMail(email, password, subject).then(isMailSent => {
                return res.status(200).json({
                    "message": req.t("SUCCESS")
                });
            }).catch(err => {
                logger.error('[new user password api]Error in sending password mail:', err);
                return res.status(400).json({
                    "message": req.t("TRY_AGAIN")
                });
            });
        }
    });
}

// Update User
userCtr.updateUser = (req, res) => {
    let hashedNewPassword = bcrypt.hashSync(req.body.newpassword, 8);
    req.body.password = hashedNewPassword;
    userModel.findByIdAndUpdate(req.body._id, req.body, (err, updateUser) => {
        if (err) {
            logger.error("Error in update user data.", err);
            return res.status(400).json({
                "message": "Please try again." //req.t("TRY_AGAIN")
            });
        } else {
            res.status(200).send({
                message: "User updated successfully" //req.t("SUCCESS")
            });
        }
    });
}

// Forgot Password
userCtr.forgotPassword = (req, res) => {
    let email = {
        email: req.body.email
    }
    userModel.findOne(email, (err, foundUser) => {
        if (err) {
            logger.error(`[Error in Changing Password(super)]`, error);
            return res.status(400).json({
                "message": "TRY_AGAIN"
            });
        } else {
            if (foundUser) {
                var payload = {
                    id: foundUser._id, // User ID from database
                    email: foundUser.email
                };
                let secret = foundUser.password + '-' + foundUser.createdAt.getTime();
                let token = jwts.encode(payload, secret);
                const name = foundUser.firstname + ' ' + foundUser.lastname;
                url = 'http://task.vm14.sa92.sa-labs.info/forgetpassword/' + payload.id + '/' + token;
                const subject = "Forgot Password"
                userHelpr.sendPasswordResetLinkMail(foundUser.email, name, url, subject).then(isMailSent => {
                    return res.status(200).json({
                        "message": req.t("SUCCESS")
                    });
                }).catch(err => {
                    logger.error('[Forgot password api]Error in sending reset password mail:', err);
                    return res.status(400).json({
                        "message": req.t("TRY_AGAIN")
                    });
                });
            } else {
                res.status(400).send({
                    message: "User Not Found"
                });
            }
        }
    })
}

// Reset password
userCtr.resetPassword = (req, res) => {
    try {
        userModel.findOne({
            _id: req.body.id
        }, function (err, user) {
            if (user) {
                var secret = user.password + '-' + user.createdAt.getTime();
                var password = req.body.password.password;
                var hashedPassword = bcrypt.hashSync(req.body.password.password, 8);
                try {
                    var payload = jwts.decode(req.body.token, secret);
                    //console.log(payload);
                    //console.log(hashedPassword);
                    user.password = hashedPassword;
                    //console.log(user);
                    user.save(function (err) {
                        if (err) return handleErr(err);
                        console.log('password updated');
                        return res.status(200).json({
                            "message": "Password Updated Sucessfully"
                        });
                    });
                } catch (error) {
                    logger.error(`[Password Already Changed`, error);
                    return res.status(400).json({
                        "message": "Password Already Changed"
                    });
                }
            }
        });
    } catch (error) {
        logger.error(`[Error in Changing Password(super)]`, error);
        return res.status(400).json({
            "message": "TRY_AGAIN"
        });
    }
}

// Delete User
userCtr.deleteUser = (req, res) => {
    userModel.remove({
        _id: req.body.id
    }, (err, deleteUser) => {
        if (err) {
            logger.error("Error in user data deleted", err);
            return res.status(400).json({
                "message": req.t("TRY_AGAIN")
            });
        } else {
            res.status(200).send({
                message: req.t("SUCCESS")
            });
        }
    })
}
module.exports = userCtr;