import React, { useState } from 'react';
import './PDFUpload.css';
import axios from "axios";

const PDFUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        console.log("File selected: ", e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.log("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        console.log("Form data: ", formData);

        try {
            const response = await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response: ", response);
        } catch (error) {
            console.error("Error: ", error);
        }


    };

        return (
        <div>
        <label>Upload PDF</label>
        <form id="pdfform" onSubmit={handleSubmit}>
            <input type="file" id="pdf" onChange={handleFileChange} />
        </form>
        </div>
    );
};
export default PDFUpload;