const router = require("express").Router();

const {
    createTask,
    getEmployee,
    getTaskByEmployeeId,
    updateTaskWithNotes,
    getTaskByManagerId,
    getTaskByTaskId,
    editTask
} = require("../utilFunctions/Tasks");

router.post("/createTask", async (req, res) => {
    await createTask(req.body, res);
});

router.get("/getEmployee", async (req, res) => {
    await getEmployee(req, res);
});

router.get("/getTaskByEmployeeId/:id", async (req, res) => {
    await getTaskByEmployeeId(req, res);
});

router.put("/updateTaskWithNotes/:id", async (req, res) => {
    await updateTaskWithNotes(req, res);
});

router.get("/getTaskByManagerId/:id", async (req, res) => {
    await getTaskByManagerId(req, res);
});

router.get("/getTaskByTaskId/:id", async (req, res) => {
    await getTaskByTaskId(req, res);
});

router.put("/updateTaskByTaskId/:id", async (req, res) => {
  await editTask(req, res);
});

module.exports = router;
