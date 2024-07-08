import React, { useState } from 'react';


const PDFUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     try {
    //     const response = await fetch('http://localhost:3000/api/upload', {
    //         method: 'POST',
    //         body: formData,
    //     });
    //     const data = await response.json();
    //     setMessage(data.message);
    //     } catch (error) {
    //     setMessage('Error occurred');
    //     }
    // };
    
    return (
        <div>
        <label>Upload PDF</label>
        <form>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Upload</button>
        </form>
        <p>{message}</p>
        </div>
    );
};
export default PDFUpload;