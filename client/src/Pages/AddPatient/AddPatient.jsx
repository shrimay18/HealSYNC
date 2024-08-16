import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import axios from 'axios';
import './AddPatient.css';
import LeftSideBar from '../../Components/LeftSideBar/LeftSideBar';
import Dropdown from '../../Components/Dropdown/Dropdown';
import PhoneNumber from '../../Components/PhoneNumberInput/PhoneNumber';
import { AppContext } from '../../Context/AppContext';

// Inline PopUp component
const PopUp = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const AddPatient = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const { isLoading: contextLoading } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: '',
        gender: '',
        dob: '',
        contactNo: '',
        emergencyContact: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        familyHistory: '',
        pastMedicalHistory: '',
        allergies: '',
    });
    const [loading, setLoading] = useState(false);
    const [showPopUp, setShowPopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState('');

    const genders = ["Male", "Female", "Other"];
    const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
        "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttarakhand", "Uttar Pradesh", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli",
        "Daman and Diu", "Delhi", "Lakshadweep", "Puducherry"
    ];

    const fetchPatientData = useCallback(async () => {
        if (contextLoading) return;
        
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/patientHistory/${patientId}`, {
                headers: {
                    ContentType: 'application/json',
                    Authorization: localStorage.getItem('currentHospitalId')
                }
            });
            console.log("Fetched patient data:", response.data);
    
            const patientData = response.data.patient;
            if (!patientData) {
                throw new Error("Patient data is undefined");
            }
    
            setFormData({
                name: patientData.name || '',
                gender: patientData.gender || '',
                dob: patientData.DateOfBirth ? new Date(patientData.DateOfBirth).toISOString().split('T')[0] : '',
                contactNo: patientData.contactNo ? patientData.contactNo.toString() : '',
                emergencyContact: patientData.emergencyContact ? patientData.emergencyContact.toString() : '',
                email: patientData.email || '',
                address: patientData.address || '',
                city: patientData.city || '',
                state: patientData.state || '',
                pincode: patientData.pincode ? patientData.pincode.toString() : '',
                familyHistory: patientData.familyHistory || '',
                pastMedicalHistory: patientData.pastMedicalHistory || '',
                allergies: patientData.allergies || '',
            });
        } catch (error) {
            console.error("Error fetching patient data:", error);
            setPopUpMessage("Failed to fetch patient data: " + error.message);
            setShowPopUp(true);
        } finally {
            setLoading(false);
        }
    }, [patientId, contextLoading]);

    useEffect(() => {
        if (patientId && !contextLoading) {
            fetchPatientData();
        }
    }, [patientId, fetchPatientData, contextLoading]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'pincode') {
            // Only allow numbers and strictly limit to 6 digits
            const pincodeValue = value.replace(/\D/g, '').slice(0, 6);
            setFormData(prevState => ({
                ...prevState,
                [name]: pincodeValue
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const errors = [];
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.name) errors.push("Please fill Name");
        if (!formData.gender) errors.push("Please select Gender");
        if (!formData.dob) errors.push("Please fill Date of Birth");
        if (!formData.contactNo) errors.push("Please fill Phone Number");
        if (!formData.email) errors.push("Please fill Email ID");
        else if (!emailRegex.test(formData.email)) errors.push("Please enter a valid email address");
        if (!formData.address) errors.push("Please fill Address");
        if (!formData.state) errors.push("Please select State");
        if (!formData.city) errors.push("Please fill City");
        if (!formData.pincode) errors.push("Please fill Pincode");
        else if (formData.pincode.length !== 6) errors.push("Pincode must be exactly 6 digits");

        if (errors.length > 0) {
            setPopUpMessage(errors.join('\n'));
            setShowPopUp(true);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            const url = patientId
                ? `http://localhost:3000/hospital/update-patient/${patientId}`
                : 'http://localhost:3000/hospital/add-patient';
            
            const method = patientId ? 'put' : 'post';

            const response = await axios({
                method,
                url,
                data: {
                    ...formData,
                    hospitalId: localStorage.getItem('currentHospitalId')
                },
                headers: {
                    ContentType: 'application/json',
                }
            });

            console.log(patientId ? "Updated Patient Data " : "Sent Patient Data ", response);
            const responsePatientId = patientId || response.data.patientId;
            localStorage.setItem('currentPatientName', formData.name);
            localStorage.setItem('currentPatientId', responsePatientId);
            
            navigate(`/patientPastHistory/${responsePatientId}`);
        } catch (error) {
            console.error("Error adding/updating patient:", error);
            setPopUpMessage("Failed to add/update patient");
            setShowPopUp(true);
        } finally {
            setLoading(false);
        }
    }



    return (
        <div className="addPatient">
            <Navbar showDropdown={true} />
            <div className='addPatientBlock'>
                <LeftSideBar />
                <div className='addPatientForm'>
                    <p className='addPatientHeaderForm'>{patientId ? 'Edit Patient' : 'Add Patient'}</p>
                    <p className='patientPersonalInfo'>Personal Information</p>
                    <div className='rowAdd'>
                        <div className='columnAdd patientName'>
                            <p className='patientNameLabel'>Name</p>
                            <input type='text' name='name' className='single patientNameInput' placeholder='Enter your name' value={formData.name} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientGender'>
                            <p className='component patientGenderLabel'>Gender</p>
                            <Dropdown options={genders}
                                    selected={formData.gender}
                                    setSelected={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                                    defaultSelected="Select Gender" />
                        </div>
                        <div className='columnAdd patientDOB'>
                            <p className='patientDOBLabel'>Date of Birth</p>
                            <input type='date' name='dob' className='triple patientDOBInput' value={formData.dob} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientPhone'>
                            <p className='component patientPhoneLabel'>Phone Number</p>
                            <PhoneNumber className='double' state={formData.contactNo}
                                         setState={(value) => setFormData(prev => ({ ...prev, contactNo: value }))}/>
                        </div>
                        <div className='columnAdd EmergencyContact'>
                            <p className='component EmergencyContactLabel'>Emergency Contact</p>
                            <PhoneNumber state={formData.emergencyContact}
                                         setState={(value) => setFormData(prev => ({ ...prev, emergencyContact: value }))}/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd EmailIdPatient'>
                            <p className='EmailIdPatientLabel'>Email ID</p>
                            <input type='email' name='email' className='single EmailIdPatientInput' placeholder='Enter your email id' value={formData.email} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientAddress'>
                            <p className='patientAddressLabel'>Address</p>
                            <input type='text' name='address' className='single patientAddressInput' placeholder='Enter your address' value={formData.address} onChange={handleInputChange} required/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd patientState'>
                            <p className='component patientStateLabel'>State</p>
                            <Dropdown options={states}
                                    selected={formData.state}
                                    setSelected={(value) => setFormData(prev => ({ ...prev, state: value }))}
                                    defaultSelected="Select State" />
                        </div>
                        <div className='columnAdd patientCity'>
                            <p className='patientCityLabel'>City</p>
                            <input type='text' name='city' className='triple patientCityInput' placeholder='Enter your city' value={formData.city} onChange={handleInputChange} required/>
                        </div>
                        <div className='columnAdd patientPincode'>
                            <p className='patientPincodeLabel'>Pincode</p>
                            <input 
                                type='text' 
                                name='pincode' 
                                className='triple patientPincodeInput' 
                                placeholder='Enter your pincode' 
                                value={formData.pincode} 
                                onChange={handleInputChange}
                                maxLength={6}
                                pattern="\d{6}"
                                title="Pincode must be exactly 6 digits"
                                required
                            />
                        </div>
                    </div>  
                    <p className='patientMedicalHistory'>Medical Information (Optional)</p> 
                    <div className='rowAdd'>
                        <div className='columnAdd FamilyHistory'>
                            <p className='FamilyHistoryLabel'>Family History</p>
                            <input type='text' name='familyHistory' className='single FamilyHistoryInput' placeholder='Enter family history' value={formData.familyHistory} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd PastHistory'>
                            <p className='PastHistoryLabel'>Past History</p>
                            <input type='text' name='pastMedicalHistory' className='single PastHistoryInput' placeholder='Enter past history' value={formData.pastMedicalHistory} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='rowAdd'>
                        <div className='columnAdd Allergies'>
                            <p className='AllergiesLabel'>Allergies(if any)</p>
                            <input type='text' name='allergies' className='single AllergiesInput' placeholder='Enter allergies' value={formData.allergies} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className='buttonHolderAddPatient'>
                        <button className='addPatientButton' onClick={handleSubmit}>
                            {patientId ? 'Update Patient' : 'Add Patient'}
                        </button>
                    </div>
                </div>
            </div>
            {showPopUp && (
                <PopUp 
                    message={popUpMessage} 
                    onClose={() => setShowPopUp(false)} 
                />
            )}
        </div>
    );
}

export default AddPatient;