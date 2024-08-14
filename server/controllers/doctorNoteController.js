const doctorNote = require('../models/doctorNotes');

exports.getDoctorNotes = async (req, res) => {
    try {
        const doctorNotes = await doctorNote.find({ doctorId: req.query.doctorId });

        res.status(200).json({
            status: 'success',
            data: {
                doctorNotes
            }
        });

    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}

exports.addDoctorNote = async (req, res) => {
    try {
        const newNote = await doctorNote.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                newNote
            }
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });
    }
}