const hospital = require('../models/Hospitals');
const patientHistory = require('../models/patientHistory');
const patient = require('../models/Patients');

// server/controllers/patientHistoryController.js
exports.addPatientHistory = async (req, res) => {
    try {
        console.log("Received Data "+req.body)
        const { patientId, date, temperature, weight, pulseRate, respiratoryRate, height, bloodPressure, chiefComplaint, diagnosis, advice, followUp, doctorNotes } = req.body;

        const data = {
            patientId: patientId,
            date: date,
            temperature: temperature,
            weight: weight,
            pulseRate: pulseRate,
            respiratoryRate: respiratoryRate,
            height: height,
            bloodPressure: bloodPressure,
            chiefComplaint: chiefComplaint,
            diagnosis: diagnosis,
            advice: advice,
            followUp: followUp,
            doctorNotes: doctorNotes
        };

        await patientHistory.insertMany([data]);
        res.status(200).send('Patient History Added Successfully');
    } catch (err) {
        console.error("Error during adding patient history:", err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getPatientHistory = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const patientId = token;
        const patientHistoryData = await patientHistory.find({ patientId: patientId });

        res.status(200).send(patientHistoryData);
    } catch (err) {
        console.error("Error during getting patient history:", err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getPatientName = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const patientData = await patient.find({ _id: token });

        res.status(200).send(patientData);
    } catch (err) {
        console.error("Error during getting patient name:", err);
        res.status(500).send('Internal Server Error');
    }
}