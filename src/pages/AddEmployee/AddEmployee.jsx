
import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addEmployee.css'
import axios from 'axios';
import CsvFileUploader from '../../components/csv-reader/Csv-reader';
const AddEmployee = () => {
    const [isLoading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
          firstName: '',
          lastName: '',
          email: '',
        },
        validate: (values) => {
          const errors = {};
    
          if (!values.firstName.trim()) {
            errors.firstName = 'First Name is required';
          }
    
          if (!values.lastName.trim()) {
            errors.lastName = 'Last Name is required';
          }
    
          if (!values.email.trim()) {
            errors.email = 'Email is required';
          } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email format';
          }
    
          return errors;
        },
        onSubmit: async (values, { resetForm }) => {
         
            try {
                setLoading(true);
              // Send data to the server
              await axios.post('https://employee-ease-server.vercel.app/api/employees/', values);
          
              // Reset the form on successful submission
              toast.success('Employee added successfully');
              resetForm();
            } catch (error) {
              // Handle any errors that occur during the API request
              console.error('Error adding employee:', error);
              toast.error('Error adding employee. Please try again.');
            } finally {
                setLoading(false); // Set loading back to false after the request (success or error)
              }
          },
      });
    
      return (
        <div className="container mt-4 bg-light w-25 py-3 px-4 shadow ">
            <div className='text-lg-center text-md-start mb-2'><h5>Add Employee</h5></div>
          <div className="row justify-content-md-center">
            <div className="position-relative">
            {isLoading && (
            
            <div className="spinner-overlay">
              <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          )}
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                  )}
                </div>
    
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                  )}
                </div>
    
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="invalid-feedback">{formik.errors.email}</div>
                  )}
                </div>
    
                <button type="submit" className="btn btn-primary">
                {isLoading ? 'Adding Employee...' : 'Add Employee'}
                </button>
              </form>
            </div>
          </div>
          <ToastContainer />
          <div>
            <p className='py-3'>Or Upload csv file to add multiple employess </p>
           <CsvFileUploader/>
          </div>
        </div>
  );
};

 

export default AddEmployee;