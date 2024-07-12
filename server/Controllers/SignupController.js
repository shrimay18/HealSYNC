const UserModel = require('../models/Users');
// const User = require("../passport")
const bcrypt = require('bcrypt');
const saltRounds = 10;


exports.createUser = async (req, res) => {
    const myPlaintextPassword = req.body.password;
    const myPlaintextPassword1 = req.body.confirmPassword;
     // Log file details
    req.body.password = await bcrypt.hash(myPlaintextPassword, saltRounds);


    req.body.confirmPassword = await bcrypt.hash(myPlaintextPassword1, saltRounds);





    const data = {
        name: req.body.name,
        email: req.body.email,
        sessionId: req.session.id,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        age: req.body.age,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        phone: req.body.phone,
        Degree: req.body.Degree,
        RegistrationNumber: req.body.RegistrationNumber,
        Pdf: req.file ? req.file.path : null // Save the file path to the database if the file exists
    };

    console.log("Received data:", data); // Log incoming data

    try {
        const checkingForUsername = await UserModel.findOne({ username: data.username });
        const checkingForEmail = await UserModel.findOne({ email: data.email });



        console.log("Existing user (username):", checkingForUsername);
        console.log("Existing user (email):", checkingForEmail);

        if (checkingForEmail ) {
            res.status(409).send('User already exists'); // Conflict status code for existing user
        } else {
            console.log("Inserting user:", data);
            await UserModel.insertMany([data]);
            res.json({success: true, redirectUrl: "http://localhost:3001/"})
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Internal Server Error'); // Internal server error for any other issues
    }
}
