var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// Schema SETUP : Mongodb
var commentSchema = new mongoose.Schema({
    // developer: {
    //     type: Schema.Types.ObjectId,
    //     ref: "users"
    // },
    commentDetail: [{
        comment:{
            type:String
        },
        commentor:{
            type:String
        },
        commenterId:{
            type:String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }],
    taskId: {
        type: Schema.Types.ObjectId,
        ref: "tasks"
    }
    // commentTime: {
    //     type: String,
    //     require: true
    // },
    // projectRef: {
    //     type: Schema.Types.ObjectId,
    //     ref: "projects"
    // }

}, {
        timestamps: true,
        versionKey: false
    });


commentSchema.statics.getCommentsByTaskId = function (taskId) {
    return this.find({ taskId: mongoose.Types.ObjectId(taskId) });
}

commentSchema.statics.updateCommentsById = function (id, filedsToUpdate) {  
    return this.findOneAndUpdate({ taskId: mongoose.Types.ObjectId(id) }, filedsToUpdate);
}

let Comment = mongoose.model('comments', commentSchema)

module.exports = Comment;