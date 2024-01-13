import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './csv.css'
const CsvFileUploader = () => {
  let extractedData;
  const [csvData, setCsvData] = useState(null);
  const [totalCsvData, setTotalData] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    handleFileUpload(event.target.files[0]);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    handleFileUpload(event.dataTransfer.files[0]);
  };

  const handleFileUpload = (file) => {
    if (file) {
      setFileName(file.name);
      setFileSelected(true);

      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const rows = content.split('\n');
        const data = rows.map(row => row.split(','));
      
        setTotalData(data.length)

         extractedData = data.reduce((acc, row) => {
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
          showError('No valid data found in the CSV file.');
        } else {
          // sendDataToApi(extractedData);
          setCsvData(extractedData);
           
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
      setLoading(true);
      const response = await axios.post('https://employee-ease-server.vercel.app/api/employees/', data);

      if (response.status === 200) {
        showSuccess(`${data.length} employees successfully added & ${totalCsvData - data.length} are failed to add.`);
        setCsvData(data);
      } else {
        showError('Failed to send data to the API.');
      }
    } catch (error) {
      console.error('Error sending data to the API:', error);
      showError('An error occurred while sending data to the API.');
    } finally {
      document.querySelector('input[type="file"]').value = '';

      // Reset the state
      setFileName('');
      setFileSelected(false);
      setLoading(false);  // Hide spinner after API call
    }
  };

  const showSuccess = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const showError = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
    });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUploadButtonClick = () => {
   
    sendDataToApi(csvData);
  };

  return (
    <div className="container mt-4">
      <div
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        className="border border-dashed p-4 text-center cursor-pointer"

        // style={{
        //   border: '2px dashed #aaa',
        //   borderRadius: '5px',
        //   padding: '20px',
        //   textAlign: 'center',
        //   cursor: 'pointer',
        //   width: '200px',
        //   marginLeft: 'auto',
        //   marginRight: 'auto',
        // }}
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


      <ToastContainer />
      
      {fileSelected && (
        <div>
{loading ? (
          <>
            {loading && <div   role="status">
  <span id="loading" class="sr-only">Loading...</span>
</div>} 
          </>
        ) :<button className='my-2 py-2 btn btn-primary' onClick={handleUploadButtonClick}>
          Upload</button>}
        </div>
      )}

      {/* {csvData && (
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
      )} */}
    </div>
  );
};

export default CsvFileUploader;

// import React, { useState } from 'react';
// import axios from 'axios';

// const CsvFileUploader = () => {
//   const [csvData, setCsvData] = useState(null);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [fileName, setFileName] = useState('');

//   const handleFileChange = (event) => {
//     handleFileUpload(event.target.files[0]);
//   };

//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     handleFileUpload(event.dataTransfer.files[0]);
//   };

//   const handleFileUpload = (file) => {
//     if (file) {
//       setFileName(file.name); // Update the file name
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const content = e.target.result;
//         const rows = content.split('\n');
//         const data = rows.map(row => row.split(','));

//         const extractedData = data.reduce((acc, row) => {
//           const [firstName, lastName, email] = row.map(item => item.trim());

//           if (firstName && lastName && email && isValidEmail(email)) {
//             acc.push({
//               firstName,
//               lastName,
//               email,
//             });
//           }

//           return acc;
//         }, []);

//         if (extractedData.length === 0) {
//           setError('No valid data found in the CSV file.');
//           setSuccessMessage(null);
//         } else {
//           // Send data to the API using Axios
//           sendDataToApi(extractedData);
//         }
//       };

//       reader.readAsText(file);
//     }
//   };

//   const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const sendDataToApi = async (data) => {
//     try {
//       const response = await axios.post('https://employee-ease-server.vercel.app/api/employees/', data);

//       if (response.status === 200) {
//         setSuccessMessage('Data successfully sent to the API.');
//         setError(null);
//         setCsvData(data);
//       } else {
//         setError('Failed to send data to the API.');
//         setSuccessMessage(null);
//       }
//     } catch (error) {
//       console.error('Error sending data to the API:', error);
//       setError('An error occurred while sending data to the API.');
//       setSuccessMessage(null);
//     }
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <div
//         onDrop={handleFileDrop}
//         onDragOver={handleDragOver}
//         style={{
//           border: '2px dashed #aaa',
//           borderRadius: '5px',
//           padding: '20px',
//           textAlign: 'center',
//           cursor: 'pointer',
//           width: ' 500px',
//           marginLeft: 'auto',
//           marginRight: 'auto',
//         }}
//       >
//         <p>Drag and drop a CSV file here, or click to select one.</p>
//         <input
//           type="file"
//           accept=".csv"
//           onChange={handleFileChange}
//           style={{ display: 'none' }}
//         />
//         <button
//           onClick={() => document.querySelector('input[type="file"]').click()}
//         >
//           Select File
//         </button>
//         <p>{fileName && `File: ${fileName}`}</p>
//       </div>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

//       {csvData && (
//         <div>
//           <h2>Extracted Data</h2>
//           {/* <ul>
//             {csvData.map((item, index) => (
//               <li key={index}>
//                 {`First Name: ${item.firstName}, Last Name: ${item.lastName}, Email: ${item.email}`}
//               </li>
//             ))}
//           </ul> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CsvFileUploader;
