const UserModel = require('../models/Users');
// const User = require("../passport")

exports.createUser = async (req, res) => {
    console.log("Received file:", req); // Log file details
    const googleUser = req.session.passport;
    console.dir(googleUser, {depth: null})
    if (googleUser) {
         req.body.name = googleUser.name;
         req.body.email = googleUser.email;
    }

    const data = {
       name: googleUser.name,
        email: googleUser.email,
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
            res.status(201).send('User created'); // Created status code for successful insertion
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Internal Server Error'); // Internal server error for any other issues
    }
}
