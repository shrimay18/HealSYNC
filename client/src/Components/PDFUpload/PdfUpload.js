import React, { useState } from 'react';
import './PDFUpload.css';
import axios from "axios";

const PDFUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);


        try {
            const response = await axios.post('http://localhost:3000/signup', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (error) {
            console.error("Error: ", error);
        }


    };

        return (
        <div>
        <label>Upload PDF</label>
        <form id="pdfform" onSubmit={handleSubmit}>
            <input type="file" id="pdf" onChange={handleFileChange} required={true}/>
        </form>
        </div>
    );
};
export default PDFUpload;