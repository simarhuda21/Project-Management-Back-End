let http = require('http');
require("dotenv").config();
const port = 3000;
global.basePath = __dirname + '/';
let app = require('./config/app');
http.createServer(app).listen(port, function () {
    console.log('Project Management api server listening on port ' + port);
});