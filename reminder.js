var mongoose = require('mongoose');
var nodemailer = require('nodemailer');
var async = require('async');
var cron = require("node-cron");
var moment = require('moment');
var user = require("./models/user");
var task = require("./models/task");
require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/demoTest');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
});
  

//runs code every day
cron.schedule("0 0 * * *",function(){
    // console.log("inside cron schedule");

//find all users
user.find({},function(err,foundUsers){

    // console.log("user"+foundUsers);
    //for each user
    async.forEach(foundUsers,function(user,callback){
        // console.log(user);

        //if reminder setting is false then
        if(user.Remainder==false){
            // console.log("reminder false");

            if(user){

                //find last created task
                task.find({developer:user}).sort({date:-1}).limit(1).exec(function(err,foundTask){

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