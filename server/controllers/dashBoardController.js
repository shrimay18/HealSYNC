const hospital = require('../models/Hospitals');

exports.getHospital = async (req, res) => {
    try {
        const hospitals = await hospital.find();
        res.status(200).json(hospitals);
    } catch (err) {
        console.error("Error during login:", err);
    }
};

exports.addHospital = async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        contactNo: req.body.contactNo,
        street: req.body.street,
        area: req.body.area,
        landmark: req.body.landmark,
        state: req.body.state,
        city: req.body.city,
        pincode: req.body.pincode,
        hospitalRegNo: req.body.hospitalRegNo,
        speciality: req.body.speciality
    };

    try {
        const existingHospital = await hospital.findOne({ HospitalRegNo: data.hospitalRegNo });
        if(existingHospital){
            res.status(409).send('Hospital already exists');
            return ;
        }

        await hospital.insertMany([data]);
        res.status(201).send('Hospital added');

    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).send('Internal Server Error');
    }


}