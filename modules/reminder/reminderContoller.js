var mongoose = require('mongoose');
const cron = require("node-cron");
const express = require("express");
const fs = require("fs");
const nodemailer = require('nodemailer');
const async = require('async');
const moment = require('moment');
const userModel = require('../user/userModel');
const taskModel = require("../task/taskModel");
require('dotenv').config();

app = express();
//mongoose.connect('mongodb://localhost:27017/demoTest');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
});

cron.schedule("* * * * *",function(){
    console.log("inside cron schedule");
//find all users
userModel.find({},function(err,foundUsers){
    // console.log("user"+foundUsers);
    //for each user
    async.forEach(foundUsers,function(user,callback){
        //if reminder setting is false then
        if(user.Remainder==false){
            // console.log("reminder false");
            if(user){
                //find last created task
                taskModel.find({developer:user}).sort({date:-1}).limit(1).exec(function(err,foundTask){
                    // console.log(foundTask);
                    async.forEach(foundTask,function(task,callback){
                        //add 3 days to date of last created task
                        var myDate = moment(task.startDate).add(process.env.REMINDER_DAY,'day').format();
                        // console.log(myDate);
                        //if less than today date
                        if(myDate<new Date().toISOString)
                        {
                            // console.log("send mail");
                            //send mail
                            var mailOptions = {
                                from: 'yashldce@gmail.com',
                                to: user.email,
                                subject: 'Reminder',
                                html: '<h2>Hello '+user.fname+' '+user.lnane+'</h2>'+
                                '<p>This is to remind you that you have not created any task since last three days.</p>'
                            };
                                                                                  
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                console.log(error);
                                } else {
                                console.log('Email sent: ' + info.response);
                                }
                            });
                        }
                        callback();
                    });
                });
            }
        }
        callback();
    });
});
});
// Cron job run in 3012 port
app.listen(3012);