const express = require('express'),
    userCtr = require('./userController.js'),
    userRouter = express.Router(),
    auth = require("../../helper/auth"),
    userMiddleware = require('./userMiddleware');
/**
 @api {post} /api/v1/user/register User Registration
 @apiName User Registration
 @apiGroup User
 @apiParam {String} firstname User Name.
 @apiParam {String} lastname User register mobile number.
 @apiParam {String} email Password for signIn.
 @apiParam {String} username CountryId for particular country.
 @apiParam {String} role LanguageId for particular language.
 @apiSuccess {String} message Api status.
  @apiSuccessExample Success-Response:
     HTTP/1.1 200 OK
     {
          "message":"Success",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI1YTgxNmE3NTY4MDBhZjBiMzczYWNjMDMiLCJpYXQiOjE1MTg0MzA4Mzh9.zI277_38hRrt0RQzidwpf2Gx-Al8PPCvAsWcIFc0Xw0"
      }
 
 @apiError 500 Server not responding
 @apiError 400 Bad User Input
 @apiErrorExample 400 Error: create User
      HTTP/1.1 400 Bad Input
      {
        "msg":  "msg": [
                 "Email==>Must be a valid email.",
                 "Please enter username."
                 "Please enter password."
                 "Please enter firstName.",
                 "Please enter lastName.",
                 "Please enter gender.",
                 "Please enter birthday.",
                 "Please enter zipcode.",
                 "Please enter nickname.",
                 "Please enter installation id."
                 "That user name is already in use. Please make another selection.",
                 "That email address is already in use. Please make another selection.."
              ]
      }
*/
let registerUserMiddleware = [
    //userMiddleware.validateInput("create"),
    userCtr.createUser
];
// userMiddleware.usernameAlreadyExist,
userRouter.post('/register', userMiddleware.userEmailAlreadyExist, registerUserMiddleware);

let loginMiddleware = [
    // userMiddleware.validateInput("create"),
    userCtr.login
];
userRouter.post('/login', loginMiddleware);

let updateUserMiddleware = [
    userMiddleware.validateInput("update"),
    userCtr.updateUser
];
userRouter.put('/updateUser', updateUserMiddleware);

let deleteUserMiddleware = [
    userCtr.deleteUser
]
userRouter.post('/deleteUser', deleteUserMiddleware);
 
let forgotPasswordMiddleware = [
    userMiddleware.validateInput("forgotPassword"),
    userCtr.forgotPassword
]
userRouter.post('/forgotPassword', forgotPasswordMiddleware);

let resetPasswordMiddleware = [
    userCtr.resetPassword
]
userRouter.put('/resetPassword', resetPasswordMiddleware);

let getUserMiddleware = [
    userCtr.getUser
]
userRouter.get('/getUser', getUserMiddleware);

let loginUserMiddleware = [
    userCtr.getLoginUser
]
userRouter.get('/loginUser', loginUserMiddleware);

let changePasswordMiddleware = [
    userCtr.changePassword
]
userRouter.put('/changePassword', changePasswordMiddleware)

module.exports = userRouter;