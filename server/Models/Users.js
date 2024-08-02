const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new mongoose.Schema({
    sessionId: {
        type: String,
    },
    name: {
        type: String,

    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    gender: {
        type: String,

    },
    dateOfBirth: {
        type: Date,

    },
    age: {
        type: Number,

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
    email: {
        type: String,

    },
    phone: {
        type: Number,

    },
    Degree: {
        type: String,
    },
    RegistrationNumber: {
        type: Number,

    },
    Pdf: {
        type: String,

    },
    Hospitals:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Hospitals'
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

module.exports = User;
