const { Schema, model } = require("mongoose");

const UsersSchema = new Schema(
    {
        username: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "ROLE_EMPLOYEE",
            enum: ["ROLE_EMPLOYEE", "ROLE_MANAGER"]
        },
    },
    { timestamps: true }
);

module.exports = model("users", UsersSchema);
