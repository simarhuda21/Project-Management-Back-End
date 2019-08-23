// const express = require('express'),
//     commenCtr = require('./commentController'),
//     commentRouter = express.Router(),
//     auth = require("../../helper/auth"),
//     path = require('path'),
//     fs = require('fs'),
//     multer = require('multer'),
// // taskMiddleware = require('./taskMiddleware');

// // CSV file Store in.
// var DIR = './uploads';
// let storage = multer.diskStorage({

//     destination: (req, file, cb) => {
//         cb(null, DIR);
//     },
//     filename: (req, file, cb) => {
//         let date = Date.now();
//         cb(null, file.fieldname + '-' + date + '' + path.extname(file.originalname));
//     }
// });

// let upload = multer({
//     storage: storage
// });


// let addCommentMiddleware = [
//     //taskMiddleware.userDetails,
//     commenCtr.addComment
// ];
// commentRouter.post('/addComment', addCommentMiddleware);

// module.exports = commentRouter;