const { ObjectId } = require("mongodb");
const { Schema, model, Mongoose } = require("mongoose");

const NoteSchema = new Schema(
    {
        taskNote: {
            type: String,
            required: true
        },
        taskId: {
            type: ObjectId,
            ref: 'tasks'
        },
    },
);

module.exports = model("notes", NoteSchema);
