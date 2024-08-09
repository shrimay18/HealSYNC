const mongoose = require('mongoose');

const patientHistorySchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    pulseRate: {
        type: Number,
        required: true
    },
    respiratoryRate: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    bloodPressure: {
        type: String,
        required: true
    },
    chiefComplaint: {
        type: String,
        required: true
    },
    diagonisis: {
        type: String,
        required: true
    },
    advice: {
        type: String,
        required: true
    },
    followUp: {
        type: String,
        required: true
    },
    doctorNotes: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('patientHistory', patientHistorySchema);
