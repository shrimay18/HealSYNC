const hospital = require('../models/Hospitals');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

exports.getCurrentUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode token
        const user = await User.findById(decoded.userId); // Extract user ID from token and fetch user

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send({
            success: true,
            message: 'You are authorized to go to the protected route!',
            data: user
        });
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(500).send('Failed to authenticate token');
    }
};

exports.getHospital = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(401).send('No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode token
        const user = await User.findById(decoded.userId); // Extract user ID from token and fetch user

        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log("Received User Id:", user);
        User.find({_id: user}).populate({path : 'Hospitals', model: "Hospitals"}).then((data) => {
            console.log("Fetched Data:", data);
            res.send(data);
        });
    } catch (err) {
        console.error("Error during fetching hospitals:", err);
        res.status(500).send('Failed to fetch hospitals');
    }
};
exports.addHospital = async (req, res) => {
    const data = {
        HospitalName: req.body.name,
        email: req.body.email,
        contactNo: req.body.contactNo,
        Street: req.body.street,
        Area: req.body.area,
        Landmark: req.body.landmark,
        pincode: req.body.pincode,
        HospitalRegNo: req.body.hospitalRegNo,
        Speciality: req.body.speciality,
        userId : req.body.userId
    };

    try {
        const existingHospital = await hospital.findOne({ HospitalRegNo: data.hospitalRegNo });
        if(existingHospital){
            res.status(409).send('Hospital already exists');
            return;
        }

        var hospitalAdded = await hospital.create({
            HospitalName: data.HospitalName,
            email: data.email,
            contactNo: data.contactNo,
            Street: data.Street,
            Area: data.Area,
            Landmark: data.Landmark,
            pincode: data.pincode,
            HospitalRegNo: data.HospitalRegNo,
            Speciality: data.Speciality
        });
        let hospitalId = new mongoose.Types.ObjectId(hospitalAdded._id);
        await User.updateOne(
            {
                _id: data.userId
            },
            {
                $push :{
                    Hospitals: hospitalId
                },
            },
            {
                upsert: false,
                new: true
            }
        )
        res.status(201).send('Hospital added');

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteHospital = async (req, res) => {
    const hospitalId = req.params.id; // Get hospital ID from request parameters
    const token = req.headers.authorization.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(401).send('No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        const hospitalToDelete = await hospital.findById(hospitalId);
        if (!hospitalToDelete) {
            return res.status(404).send('Hospital not found');
        }


        await hospital.deleteOne({ _id: hospitalId });


        await User.updateOne(
            { _id: user },
            { $pull: { Hospitals: hospitalId } }
        );

        res.status(200).send('Hospital deleted');
    } catch (err) {
        console.error("Error during deleting hospital:", err);
        res.status(500).send('Internal Server Error');
    }
}

exports.updateHospital = async (req, res) => {
    const hospitalId = req.params.id; // Get hospital ID from request parameters
    const updateData = req.body; // Get the update data from request body

    try {
        // Find the hospital and update it with new data
        const updatedHospital = await hospital.findByIdAndUpdate(hospitalId, updateData, { new: true });

        if (!updatedHospital) {
            return res.status(404).send('Hospital not found');
        }

        res.status(200).send(updatedHospital);
    } catch (err) {
        console.error("Error during updating hospital:", err);
        res.status(500).send('Internal Server Error');
    }
};