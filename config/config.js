//old config

let devSetting = {
    DB_OPTIONS: {
        user: '',
        pass: '',
        host: 'localhost',  
        //localhost 
        // 192.168.1.52
        port: 27017,
        database: 'demoTest',
    },
    SECRET: process.env.SECRET
};

devSetting.DB = "mongodb://" + devSetting.DB_OPTIONS.host + ':' + devSetting.DB_OPTIONS.port + '/' + devSetting.DB_OPTIONS.database;
devSetting.HEADER_AUTH_TOKEN = 'x-auth-token',
    console.log(devSetting.DB);
module.exports = devSetting;
