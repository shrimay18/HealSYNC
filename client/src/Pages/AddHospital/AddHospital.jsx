import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddHospital.css';
import {useNavigate} from "react-router-dom";



const AddHospital = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [street, setStreet] = useState('');
    const [area, setArea] = useState('');
    const [landmark, setLandmark] = useState('');
    const [pincode, setPincode] = useState('');
    const [hospitalRegNo, setHospitalRegNo] = useState('');
    const [speciality, setSpeciality] = useState('');

    const get_user = async () => {
        const response = await axios.get('http://localhost:3000/dashboard/get-current-user', {
            headers: {
                ContentType: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response.data.data);
        setUser(response.data.data._id);
    };
    get_user();
    console.log(user);


    const submit = async () => {


        const response = await axios.post('http://localhost:3000/dashboard/hospital', {
            name: name,
            email: email,
            contactNo: contactNo,
            street: street,
            area: area,
            landmark: landmark,
            pincode: pincode,
            hospitalRegNo: hospitalRegNo,
            speciality: speciality,
            userId: user

        });
        navigate("/dashboard")
    }

    return (
        <div className="addHospitalForm">
            <div className="signupheader">
                <p>HealSYNC</p>
            </div>
            <div className="addHospitalHolder">
                <div className="addFormLeft">
                    <div className="addFormHeading">Add Hospital</div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Hospital Name</div>
                            <input type="text" className="inputForm single" placeholder='Enter the Hospital Name' onChange={(e) => setName(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Email Id</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Email Id' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="columnForm">
                            <div className="namesForm">Contact No</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Contact Number' onChange={(e) => setContactNo(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Street, Sector</div>
                            <input type="text" className="inputForm single" placeholder='Entwer the Street' onChange={(e) => setStreet(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Area, Village</div>
                            <input type="text" className="inputForm single" placeholder='Enter the Area/Village' onChange={(e) => setArea(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Landmark</div>
                            <input type="text" className="inputForm single" placeholder='Enter the Landmark' onChange={(e) => setLandmark(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Pincode</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Pincode' onChange={(e) => setPincode(e.target.value)}/>
                        </div>
                        <div className="columnForm">
                            <div className="namesForm">Hospital Reg. No</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Hospital Reg No' onChange={(e) => setHospitalRegNo(e.target.value)}/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Speciality</div>
                            <input type="text" className="inputForm single" placeholder='Enter your Speciality' onChange={(e) => setSpeciality(e.target.value)}/>
                        </div>
                    </div>
                    <div className="checkbox">
                        <input type="checkbox" id="confirm" name="confirm" value="confirm" />
                        <label for="confirm" className='checkboxText'>I confirm that above provided information is correct to my knowledge</label>
                    </div>
                    <div className="buttonHolder">
                        <button onClick = {submit} className = 'addHospitalButton'>Add Hospital</button>
                    </div>
                </div>
                <div className="rightBlocksAdd">
                    <div className="rightUpBlock hospital">
                    </div>
                    <div className="rightDownBlock hospital">
                        <div className="Notification">Notification</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHospital;


