const Hospital = require("../models/Hospitals");
const PatientHistory = require("../models/patientHistory");
const Patient = require("../models/Patients");

exports.addPatientHistory = async (req, res) => {
  try {
    const hospitalId = req.headers.authorization;
    console.log(`Adding patient history for hospital ID: ${hospitalId}`);
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      console.log(`Hospital not found for ID: ${hospitalId}`);
      return res.status(404).json({ message: "Hospital not found" });
    }

    const { patientId } = req.body;
    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.log(`Patient not found for ID: ${patientId}`);
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientHistoryData = {
      patientId: patientId,
      date: req.body.date,
      temperature: req.body.temperature,
      weight: req.body.weight,
      pulseRate: req.body.pulseRate,
      respiratoryRate: req.body.respiratoryRate,
      height: req.body.height,
      bloodPressure: req.body.bloodPressure,
      chiefComplaint: req.body.chiefComplaint,
      diagnosis: req.body.diagnosis,
      advice: req.body.advice,
      followUp: req.body.followUp,
      doctorNotes: req.body.doctorNotes,
    };

    console.log('Patient history data to be saved:', JSON.stringify(patientHistoryData, null, 2));

    const newPatientHistory = await PatientHistory.create(patientHistoryData);
    console.log(`Patient history created for patient ${patientId}. History ID: ${newPatientHistory._id}`);

    res.status(201).json({
      message: "Patient history added successfully",
      patientHistoryId: newPatientHistory._id,
    });
  } catch (err) {
    console.error("Error during adding patient history:");
    console.error(err);
    if (err.name === 'ValidationError') {
      console.error('Validation Error Details:', err.errors);
      return res.status(400).json({ message: "Validation Error", errors: err.errors });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message, stack: err.stack });
  }
};
exports.getPatientHistory = async (req, res) => {
  try {
    const hospitalId = req.headers.authorization;
    console.log(`Fetching patients for hospital ID: ${hospitalId}`);

    const hospital = await Hospital.findById(hospitalId).populate("patients");
    if (!hospital) {
      console.log(`Hospital not found for ID: ${hospitalId}`);
      return res.status(404).json({ message: "Hospital not found" });
    }

    console.log(`Found hospital: ${hospital.HospitalName}`);
    console.log(`Number of patients: ${hospital.patients.length}`);

    if (hospital.patients.length === 0) {
      console.log("No patients found for this hospital");
    } else {
      console.log(
        "Patient IDs:",
        hospital.patients.map((p) => p._id)
      );
    }

    res.status(200).json({
      hospitalName: hospital.HospitalName,
      patientCount: hospital.patients.length,
      patients: hospital.patients,
    });
  } catch (err) {
    console.error("Error during getting patients:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.getSinglePatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;
    const hospitalId = req.headers.authorization;

    console.log(`Fetching history for patient ${patientId} from hospital ${hospitalId}`);

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      console.log(`Hospital not found for ID: ${hospitalId}`);
      return res.status(404).json({ message: "Hospital not found" });
    }

    if (!hospital.patients.includes(patientId)) {
      console.log(`Patient ${patientId} not found in hospital ${hospitalId}`);
      return res.status(404).json({ message: "Patient not found in this hospital" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.log(`Patient not found for ID: ${patientId}`);
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientHistory = await PatientHistory.find({ patientId }).sort({ date: -1 });

    res.status(200).json({
      patient: {
        _id: patient._id,
        name: patient.name,
        gender: patient.gender,
        DateOfBirth: patient.DateOfBirth,
        contactNo: patient.contactNo,
        emergencyContact: patient.emergencyContact,
        email: patient.email,
        address: patient.address,
        city: patient.city,
        state: patient.state,
        pincode: patient.pincode,
        familyHistory: patient.familyHistory,
        pastMedicalHistory: patient.pastMedicalHistory,
        allergies: patient.allergies
      },
      history: patientHistory
    });
  } catch (err) {
    console.error("Error fetching patient history:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const hospitalId = req.headers.authorization;

    console.log(`Deleting patient ${patientId} from hospital ${hospitalId}`);

    const hospital = await Hospital.findByIdAndUpdate(
      hospitalId,
      { $pull: { patients: patientId } },
      { new: true }
    );

    if (!hospital) {
      console.log(`Hospital not found for ID: ${hospitalId}`);
      return res.status(404).json({ message: "Hospital not found" });
    }

    await Patient.findByIdAndDelete(patientId);
    await PatientHistory.deleteMany({ patientId });

    console.log(`Patient ${patientId} successfully deleted`);

    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("Error during patient deletion:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

exports.getServerDate = async (req, res) => {
  try {
    const serverDate = new Date().toISOString().split('T')[0];
    res.status(200).json({ date: serverDate });
  } catch (err) {
    console.error("Error getting server date:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};