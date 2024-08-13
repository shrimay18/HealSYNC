const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorNotesSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    note :{
        type: String,
    }
});

const DoctorNotes = mongoose.models.DoctorNotes || mongoose.model('DoctorNotes', doctorNotesSchema);

module.exports = DoctorNotes;