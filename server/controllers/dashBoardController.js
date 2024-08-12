const hospital = require('../models/Hospitals');
const User = require('../models/Users');
const Patients = require('../models/Patients');
const PatientHistory = require('../models/patientHistory');
const jwt = require('jsonwebtoken');
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
};

exports.getHospital = async (req, res) => {
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
        HospitalName: req.body.HospitalName,
        email: req.body.email,
        contactNo: req.body.contactNo,
        Street: req.body.Street,
        Area: req.body.Area,
        Landmark: req.body.Landmark,
        pincode: req.body.pincode,
        HospitalRegNo: req.body.HospitalRegNo,
        Speciality: req.body.Speciality,
        userId: req.body.userId
    };

    try {
        const existingHospital = await hospital.findOne({ HospitalRegNo: data.HospitalRegNo });
        if (existingHospital) {
            return res.status(409).json({ message: 'Hospital already exists' });
        }

        var hospitalAdded = await hospital.create(data);
        let hospitalId = new mongoose.Types.ObjectId(hospitalAdded._id);
        await User.updateOne(
            { _id: data.userId },
            { $push: { Hospitals: hospitalId } },
            { upsert: false, new: true }
        );

        res.status(201).json({
            message: 'Hospital added successfully',
            hospital: hospitalAdded
        });

    } catch (err) {
        console.error("Error during hospital addition:", err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
}

exports.deleteHospital = async (req, res) => {
    const hospitalId = req.params.id;
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

        const hospitalToDelete = await hospital.findById(hospitalId);
        if (!hospitalToDelete) {
            return res.status(404).send('Hospital not found');
        }

        if (hospitalToDelete.patients && hospitalToDelete.patients.length > 0) {
            // Delete patient history records
            await PatientHistory.deleteMany({ patientId: { $in: hospitalToDelete.patients } });
            
            // Delete patients
            await Patients.deleteMany({ _id: { $in: hospitalToDelete.patients } });
        }

        await hospital.deleteOne({ _id: hospitalId });

        await User.updateOne(
            { _id: user._id },
            { $pull: { Hospitals: hospitalId } }
        );

        res.status(200).send('Hospital, associated patients, and patient histories deleted');
    } catch (err) {
        console.error("Error during deleting hospital:", err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateHospital = async (req, res) => {
    const hospitalId = req.params.id;
    const updateData = {
        HospitalName: req.body.HospitalName,
        email: req.body.email,
        contactNo: req.body.contactNo,
        Street: req.body.Street,
        Area: req.body.Area,
        Landmark: req.body.Landmark,
        pincode: req.body.pincode,
        HospitalRegNo: req.body.HospitalRegNo,
        Speciality: req.body.Speciality
    };

    try {
        const updatedHospital = await hospital.findByIdAndUpdate(hospitalId, updateData, { new: true });

        if (!updatedHospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        res.status(200).json({
            message: 'Hospital updated successfully',
            hospital: updatedHospital
        });
    } catch (err) {
        console.error("Error during updating hospital:", err);
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

exports.getHospitalById = async (req, res) => {
    const hospitalId = req.params.id;
    try {
        const hospitalData = await hospital.findById(hospitalId);
        if (!hospitalData) {
            return res.status(404).send('Hospital not found');
        }
        res.status(200).json(hospitalData);
    } catch (err) {
        console.error("Error fetching hospital:", err);
        res.status(500).send('Internal Server Error');
    }
};