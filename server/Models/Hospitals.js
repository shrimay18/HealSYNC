const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
    sessionId: {
        type: String,
    },
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
    state: {
        type: String,

    },
    city: {
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
