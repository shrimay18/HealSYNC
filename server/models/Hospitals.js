const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HospitalSchema = new mongoose.Schema({
    HospitalName: {
        type: String,

    },
    email: {
        type: String,
    },
    contactNo: {
        type: Number,
    },
    Street: {
        type: String,
    },
    Area: {
        type: String,

    },
    Landmark: {
        type: String,

    },
    pincode: {
        type: Number,

    },
    HospitalRegNo: {
        type: Number,

    },
    Speciality: {
        type: String,

    }
});

const Hospital = mongoose.models.Hospitals || mongoose.model('Hospitals', HospitalSchema);

module.exports = Hospital;
