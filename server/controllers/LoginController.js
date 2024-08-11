const UserModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
    try {
        const data = {
            username: req.body.username,
            password: req.body.password
        };
        const loginUser = await UserModel.findOne({ username: data.username });
        if (!loginUser) {
            res.status(401).send('No user found');
            return;
        }

        const valid = await bcrypt.compare(data.password, loginUser.password);
        if (valid) {
            const token = jwt.sign({ userId: loginUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ success: true, token: token, redirectUrl: process.env.CLIENT_URL2 });
        } else {
            res.status(401).send('No user found');
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send('Error');
    }
};

exports.getCurrentUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (user) {
            res.send({ success: true, data: user, message: "Authorized User" });
        } else {
            res.send({ success: false, message: 'Not Authorized' });
        }
    } catch (err) {
        console.error("Error getting current user:", err);
        res.status(500).send('Error');
    }
};
