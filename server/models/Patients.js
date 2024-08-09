const mongoose = require("mongoose");

const PatientsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    DateOfBirth:{
        type: Date,
        required: true,
    },
    contactNo:{
        type: Number,
        required: true,
    },
    emergencyContact:{
        type: Number,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    state:{
        type: String,
        required: true,
    },
    pincode:{
        type: Number,
        required: true,
    },
    familyHistory:{
        type: String,
    },
    pastMedicalHistory:{
        type: String,
    },
    allergies:{
        type: String,
    }
});

const Patients = mongoose.models.Patients || mongoose.model('Patients', PatientsSchema);
module.exports = Patients;