const UserModel = require('../models/Users');


exports.createUser = async (req, res) => {

    console.log("Request Headers: " + JSON.stringify(req.headers, null, 2));
    console.log("Request Body: " + JSON.stringify(req.body, null, 2));
    console.log("Request Session: " + JSON.stringify(req.user, null, 2));
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
        Pdf: req.file ? req.file.path : null
    };

    console.log("Received data:", data);

    try {
        const checkingForUsername = await UserModel.findOne({ username: data.username });
        const checkingForEmail = await UserModel.findOne({ email: data.email });



        console.log("Existing user (username):", checkingForUsername);
        console.log("Existing user (email):", checkingForEmail);

        if (checkingForEmail ) {
            res.status(409).send('User already exists');
        } else {
            console.log("Inserting user:", data);
            await UserModel.insertMany([data]);
            res.json({success: true, redirectUrl: "http://localhost:3001/"})
        }
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Internal Server Error');
    }
}
