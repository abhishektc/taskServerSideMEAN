const Task = require("../models/Task");
const User = require("../models/Users");
const Note = require("../models/Notes");

const createTask = async (data, res) => {
    try {
        const newTask = new Task({
            ...data,
        });

        await newTask.save();
        return res.status(201).json({
            message: "Task Created Successfully",
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
};

const getEmployee = async (req, res) => {
    try {
        const employee = await User.find({ role: 'ROLE_EMPLOYEE' }).select('name');
        return res.status(201).json({
            data: employee,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
}

const getTaskByEmployeeId = async (req, res) => {
    const employeeId = req.params.id;
    try {
        var mysort = { _id: -1 };
        const task = await Task.find({ employeeId }).select('-employeeId').sort(mysort);
        return res.status(201).json({
            data: task,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
}

const updateTaskWithNotes = async (req, res) => {
    const taskId = req.params.id;
    try {
        const findTask = await Task.findOne({ _id: taskId });
        const newNote = new Note({
            taskNote: req.body.taskNote,
            taskId: taskId
        });

        await newNote.save();

        findTask.notes.push(newNote);
        findTask.taskCompleted = req.body.taskCompleted;
        await findTask.save();

        return res.status(201).json({
            message: "Updated Task Note Successfully",
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
}

const getTaskByManagerId = async (req, res) => {
    const managerId = req.params.id
    try {
        var mysort = { _id: -1 };
        const task = await Task.find({ managerId }).populate('notes').populate({ path: 'employeeId', select: 'name -_id' }).select('-managerId').sort(mysort);
        return res.status(201).json({
            data: task,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
}

const getTaskByTaskId = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id }).select('taskName taskDetails deadLine employeeId');
        return res.status(201).json({
            data: task,
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
}

const editTask = async (req, res) => {
    try {
        const task = await Task.updateOne({ _id: req.params.id }, { $set: { taskName: req.body.taskName, taskDetails: req.body.taskDetails, deadLine: req.body.deadLine } }).select('taskName taskDetails deadLine employeeId');
        return res.status(201).json({
            message: 'Updated Successfully',
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed",
            success: false
        });
    }
}


module.exports = {
    createTask,
    getEmployee,
    getTaskByEmployeeId,
    updateTaskWithNotes,
    getTaskByManagerId,
    getTaskByTaskId,
    editTask
};
