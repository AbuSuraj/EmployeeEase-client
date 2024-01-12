import React, { useState } from 'react';
import axios from 'axios';

const CsvFileUploader = () => {
  const [csvData, setCsvData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (event) => {
    handleFileUpload(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    handleFileUpload(event.dataTransfer.files[0]);
  };

  const handleFileUpload = (file) => {
    if (file) {
      setFileName(file.name); // Update the file name
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split('\n');
        const data = rows.map(row => row.split(','));

        const extractedData = data.reduce((acc, row) => {
          const [firstName, lastName, email] = row.map(item => item.trim());

          if (firstName && lastName && email && isValidEmail(email)) {
            acc.push({
              firstName,
              lastName,
              email,
            });
          }

          return acc;
        }, []);

        if (extractedData.length === 0) {
          setError('No valid data found in the CSV file.');
          setSuccessMessage(null);
        } else {
          // Send data to the API using Axios
          sendDataToApi(extractedData);
        }
      };

      reader.readAsText(file);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendDataToApi = async (data) => {
    try {
      const response = await axios.post('https://employee-ease-server.vercel.app/api/employees/', data);

      if (response.status === 200) {
        setSuccessMessage('Data successfully sent to the API.');
        setError(null);
        setCsvData(data);
      } else {
        setError('Failed to send data to the API.');
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error('Error sending data to the API:', error);
      setError('An error occurred while sending data to the API.');
      setSuccessMessage(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed #aaa',
          borderRadius: '5px',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          width: ' 500px',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <p>Drag and drop a CSV file here, or click to select one.</p>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          Select File
        </button>
        <p>{fileName && `File: ${fileName}`}</p>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      {csvData && (
        <div>
          <h2>Extracted Data</h2>
          <ul>
            {csvData.map((item, index) => (
              <li key={index}>
                {`First Name: ${item.firstName}, Last Name: ${item.lastName}, Email: ${item.email}`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CsvFileUploader;
