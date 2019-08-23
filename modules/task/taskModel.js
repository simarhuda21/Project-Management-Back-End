var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Schema SETUP : Mongodb
var taskSchema = new mongoose.Schema({
    srNo: {
        type: String,
        require: true
    },
    projectRef: {
        type: Schema.Types.ObjectId,
        ref: "projects"
    },
    title: {
        type: String,
        require: true
    },
    hours: {
        type: String,
        require: true
    },
    dueDateTime: {
        type: Date,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    startDate: {
        type: Date,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    developer: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true,
    versionKey: false
});

taskSchema.statics.deleteTaskByProjectId = function (id) {
    return this.remove({ projectRef: mongoose.Types.ObjectId(id) });
}

taskSchema.statics.getTaskByTaskId = function (taskId) {
    return this.find({ _id : mongoose.Types.ObjectId(taskId) });
}

let Task = mongoose.model('tasks', taskSchema)

module.exports = Task;