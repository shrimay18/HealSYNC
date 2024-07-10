const UserModel = require('../models/Users');

exports.getUser = async (req, res) => {
    console.log("Received request:", req);
    try {
        console.log("Received request:", req.body);
        const data = {
            username: req.body.username,
            password: req.body.password
        };
        console.log("Received data:", data); // Log incoming data

        const user = await UserModel.findOne({ username: data.username, password: data.password });
        console.log("User found:", user);

        if (user) {
            res.send('Logged in');
        } else {
            res.status(401).send('No user found');
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send('Error');
    }
}