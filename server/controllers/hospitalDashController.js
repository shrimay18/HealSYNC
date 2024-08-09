const hospital = require('../models/Hospitals');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const patient = require('../models/Patients');
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
}

exports.getHospital = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from header

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        // Find hospital by ID and populate the 'patients' field
        const hospitalF = await hospital.findById(token).populate('patients'); // Ensure 'patients' is correct

        if (!hospitalF) {
            return res.status(404).send('Hospital not found');
        }

        res.send(hospitalF);
    } catch (err) {
        console.error("Error during fetching hospital data:", err);
        res.status(500).send('Failed to fetch hospital data');
    }
}



exports.addPatient = async (req, res) => {
    const data = {
        name: req.body.name,
        gender: req.body.gender,
        dob: req.body.DateOfBirth,
        contactNo: req.body.contactNo,
        emergencyContact: req.body.emergencyContact,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        familyHistory: req.body.familyHistory,
        pastMedicalHistory: req.body.pastMedicalHistory,
        allergies: req.body.allergies,
        hospitalId: req.body.hospitalId
    };
    console.log("Received Patient Data: ", data);
    try {
        const existingPatient = await patient.findOne({ name: data.name, contactNo: data.contactNo });
        if(existingPatient){
            return res.status(400).send('Patient already exists');
        }

        const newPatient = await patient.create({
            name: data.name,
            gender: data.gender,
            DateOfBirth: data.dob,
            contactNo: data.contactNo,
            emergencyContact: data.emergencyContact,
            email: data.email,
            address: data.address,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            familyHistory: data.familyHistory,
            pastMedicalHistory: data.pastMedicalHistory,
            allergies: data.allergies,
        });

        // Update the hospital with the new patient
        await hospital.updateOne(
            { _id: data.hospitalId },
            { $push: { patients: newPatient._id } }
        );

        console.log("Added Patient:", newPatient);
        res.status(201).send('Patient added');
    } catch (err) {
        console.error("Error adding patient:", err);
        res.status(500).send('Failed to add patient');
    }
}

exports.deletePatient = async (req, res) => {
    const patientId = req.params.id;
    try {
        const PatientToDelete = await patient.findById(patientId);
        if (!PatientToDelete) {
            return res.status(404).send('Patient not found');
        }
        await patient.deleteOne({ _id: patientId });
        res.send('Patient deleted successfully');
    }
    catch (err) {
        console.error("Error deleting patient:", err);
        res.status(500).send('Failed to delete patient');
    }
};
