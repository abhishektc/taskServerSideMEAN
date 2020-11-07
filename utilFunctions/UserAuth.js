const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const { SECRET } = require("../config/config");

const userRegister = async (data, role, res) => {
    try {
        let usernameNotTaken = await validateUsername(data.username);
        if (!usernameNotTaken) {
            return res.status(400).json({
                message: `Username already exist.`,
                success: false
            });
        }

        const password = await bcrypt.hash(data.password, 12);

        const newUser = new User({
            ...data,
            password,
            role
        });

        await newUser.save();
        return res.status(201).json({
            message: "Registered Successfully",
            success: true
        });
    } catch (err) {
        return res.status(500).json({
            message: "Register Failed",
            success: false
        });
    }
};


const userLogin = async (data, role, res) => {
    let { username, password } = data;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({
            message: "Username is not found.",
            success: false
        });
    }

    if (user.role !== role) {
        return res.status(403).json({
            message: "Make sure you are in right portal",
            success: false
        });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {

        let token = jwt.sign(
            {
                user_id: user._id,
                username: user.username,
                role: user.role,
            },
            SECRET,
            { expiresIn: "15 days" }
        );

        let result = {
            id: user._id,
            username: user.username,
            role: user.role,
            token: token,
            expiresIn: 360
        };

        return res.status(200).json({
            result: result,
            message: "Logged in successfully",
            success: true
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password",
            success: false
        });
    }
};

const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

module.exports = {
    userRegister,
    userLogin,
};
