const Hospital = require("../models/Hospitals");
const PatientHistory = require("../models/patientHistory");
const Patient = require("../models/Patients");

exports.addPatientHistory = async (req, res) => {
  try {
    const hospitalId = req.headers.authorization;
    console.log(`Adding patient for hospital ID: ${hospitalId}`);

    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      console.log(`Hospital not found for ID: ${hospitalId}`);
      return res.status(404).json({ message: "Hospital not found" });
    }

    const newPatient = new Patient({
      name: req.body.name,
      //   gender: req.body.gender,
      //   dob: req.body.DateOfBirth,
      //   contactNo: req.body.contactNo,
      //   emergencyContact: req.body.emergencyContact,
      //   email: req.body.email,
      //   address: req.body.address,
      //   city: req.body.city,
      //   state: req.body.state,
      //   pincode: req.body.pincode,
      //   familyHistory: req.body.familyHistory,
      //   pastMedicalHistory: req.body.pastMedicalHistory,
      //   allergies: req.body.allergies,
      //   hospitalId: req.body.hospitalId,
    });

    await newPatient.save();
    console.log(`New patient created with ID: ${newPatient._id}`);

    hospital.patients.push(newPatient._id);
    await hospital.save();
    console.log(`Patient added to hospital ${hospital.HospitalName}`);

    const patientHistoryData = {
      patientId: newPatient._id,
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

    await PatientHistory.create(patientHistoryData);
    console.log(`Patient history created for patient ${newPatient._id}`);

    res.status(201).json({
      message: "Patient and history added successfully",
      patientId: newPatient._id,
    });
  } catch (err) {
    console.error("Error during adding patient and history:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
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
