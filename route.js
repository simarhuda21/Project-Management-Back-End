const express = require('express');
const bodyParser = require('body-parser');

// Routes Path
const userRoute = require('./modules/user/userRoute');
const taskRoute = require('./modules/task/taskRoute');
const projectRoute = require('./modules/project/projectRoute');
const reportsRoute = require('./modules/reports/reportsRoute');

let app = express.Router();

// Routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/task', taskRoute);
app.use('/api/v1/project', projectRoute);
app.use('/api/v1/reports', reportsRoute);

module.exports = app;