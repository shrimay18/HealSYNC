const hospital = require('../models/hospital');
const patientHistory = require('../models/patientHistory');
const patient = require('../models/patient');

exports.addPatientHistory = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = {
            patientId: token,
            date: req.body.date,
            temperature: req.body.temperature,
            weight: req.body.weight,
            pulseRate: req.body.pulseRate,
            respiratoryRate: req.body.respiratoryRate,
            height: req.body.height,
            bloodPressure: req.body.bloodPressure,
            chiefComplaint: req.body.chiefComplaint,
            diagonisis: req.body.diagonisis,
            advice: req.body.advice,
            followUp: req.body.followUp,
            doctorNotes: req.body.doctorNotes,
        }

        await patientHistory.insertMany([data]);
    }
    catch (err) {
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