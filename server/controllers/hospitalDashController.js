const hospital = require('../models/Hospitals');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const patient = require('../models/Patients');
const mongoose = require("mongoose");

exports.getCurrentUser = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

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
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const hospitalF = await hospital.findById(token).populate('patients');

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
        DateOfBirth: req.body.dob,
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
    console.log("Received Patient Data: ", JSON.stringify(data, null, 2));
    try {
        const existingPatient = await patient.findOne({ name: data.name, contactNo: data.contactNo });
        if(existingPatient){
            return res.status(400).send('Patient already exists');
        }

        const newPatient = await patient.create(data);

        console.log("New patient created in database:", JSON.stringify(newPatient, null, 2));
        console.log("New patient keys:", Object.keys(newPatient._doc));

        await hospital.updateOne(
            { _id: data.hospitalId },
            { $push: { patients: newPatient._id } }
        );

        res.status(200).json({ message: "Patient Added successfully", patientId: newPatient._id });
    } catch (err) {
        console.error("Error adding patient:", err);
        res.status(500).send('Failed to add patient');
    }
}

exports.updatePatient = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log("Updating Patient Data: ", data);
    try {
        const updatedPatient = await patient.findByIdAndUpdate(id, {
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
        }, { new: true });
        
        if (!updatedPatient) {
            return res.status(404).send('Patient not found');
        }
        console.log("Updated Patient:", updatedPatient);
        res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
    } catch (err) {
        console.error("Error updating patient:", err);
        res.status(500).send('Failed to update patient');
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