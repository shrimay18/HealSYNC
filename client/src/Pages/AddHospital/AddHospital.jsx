import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddHospital.css';

const Signup = () => {
    
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
                            <input type="text" className="inputForm single" placeholder='Enter the Hospital Name'/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Email Id</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Email Id' />
                        </div>
                        <div className="columnForm">
                            <div className="namesForm">Contact No</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Contact Number'/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Street, Sector</div>
                            <input type="text" className="inputForm single" placeholder='Entwer the Street'/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Area, Village</div>
                            <input type="text" className="inputForm single" placeholder='Enter the Area/Village'/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Landmark</div>
                            <input type="text" className="inputForm single" placeholder='Enter the Landmark'/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Pincode</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Pincode'/>
                        </div>
                        <div className="columnForm">
                            <div className="namesForm">Hospital Reg. No</div>
                            <input type="text" className="inputForm double" placeholder='Enter the Hospital Reg No'/>
                        </div>
                    </div>
                    <div className="rowForm">
                        <div className="columnForm">
                            <div className="namesForm">Speciality</div>
                            <input type="text" className="inputForm single" placeholder='Enter your Speciality'/>
                        </div>
                    </div>
                    {/* //create a checkbox which states that "i confirm that above provided information is correct to my knowledge" */}
                    <div className="checkbox">
                        <input type="checkbox" id="confirm" name="confirm" value="confirm" />
                        <label for="confirm" className='checkboxText'>I confirm that above provided information is correct to my knowledge</label>
                    </div>
                    <div className="buttonHolder">
                        <button className='addHospitalButton'>Add Hospital</button>
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

export default Signup;


