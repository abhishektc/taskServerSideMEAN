const cors = require("cors");
const express = require("express");
const bp = require("body-parser");
const { connect } = require("mongoose");

const { DB, PORT } = require("./config/config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/tasks", require("./routes/Tasks"));

const startApp = async () => {
  try {
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    console.log('Successfully connected with the Database '+DB);

    app.listen(PORT, () =>
      console.log('Server started on PORT '+ PORT)
    );
  } catch (err) {
    console.log('Connection failed '+err);
    startApp();
  }
};

startApp();
