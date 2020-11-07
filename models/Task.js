const { ObjectId } = require("mongodb");
const { Schema, model } = require("mongoose");

const TasksSchema = new Schema(
    {
        taskName: {
            type: String,
            required: true
        },
        taskDetails: {
            type: String,
            required: true
        },
        deadLine: {
            type: String,
            required: true
        },
        employeeId: {
            type: ObjectId,
            ref: 'users',
            required: true
        },
        managerId: {
            type: ObjectId,
            required: true
        },
        taskCompleted: {
            type: Number,
        },
        notes: [{
            type: ObjectId,
            ref: 'notes'
        }]
    },
);

module.exports = model("tasks", TasksSchema);
