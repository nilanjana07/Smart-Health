import React, { useState } from 'react';
import './UploadImage.css';

const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('/api/health-report/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (response.ok) {
        setUploadStatus('File uploaded successfully');
      } else {
        setUploadStatus('Failed to upload file');
      }
    } catch (error) {
      setUploadStatus('An error occurred during file upload');
    }
  };

  return (
    <div className="upload-image-container">
      <h2>Upload Health Report</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadImage;



