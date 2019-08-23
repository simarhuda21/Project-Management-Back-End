var mongoose = require('mongoose');
var config = require('./config');
mongoose.Promise = require('bluebird');

mongoose.connect(config.DB).then(resopnse => {
   console.log(`Database server connected....`);
})
.catch(error => {
    console.log(error);
    console.log("Could not connect Database server....");
});