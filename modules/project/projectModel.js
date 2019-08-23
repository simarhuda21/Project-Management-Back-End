const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let ProjectSchema = new Schema({
    title: {
        type: String
    },
    lastTaskSrNo: {
        type: Number,
        defalut: 0
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
}, {
        timestamps: true,
        versionKey: false
    });


ProjectSchema.statics.FindProjectByUserId = function (id) {
    return this.find(id);
}

let Projects = mongoose.model('projects', ProjectSchema);
module.exports = Projects;