
import React, { useState } from 'react';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './addEmployee.css'
import axios from 'axios';
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
            console.log(values);
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
            <div className="">
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
        </div>
// const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
// });

// const [errors, setErrors] = useState({});

// const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};
    
//     if (!formData.firstName.trim()) {
//         newErrors.firstName = 'First Name is required';
//         isValid = false;
//     }
    
//     if (!formData.lastName.trim()) {
//         newErrors.lastName = 'Last Name is required';
//         isValid = false;
//     }
    
//     if (!formData.email.trim()) {
//         newErrors.email = 'Email is required';
//         isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         newErrors.email = 'Invalid email format';
//         isValid = false;
//     }
    
//     setErrors(newErrors);
//     return isValid;
// };

// const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
// };

// const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//         // Simulate adding employee (you can send data to the server here)
//         toast.success('Employee added successfully');
//         setFormData({ firstName: '', lastName: '', email: '' });
//     } else {
//         toast.error('Please fill in the required fields correctly');
//     }
//   };

//   return (
//     <Container  className="form-container bg-light p-4 rounded mt-4">
//         <Row>Add Employee</Row>
//       <Row className="justify-content-center text-center">
//         <Col>
//           <Form className='form' onSubmit={handleSubmit}>
//             <Form.Group controlId="firstName">
//               <Form.Label>First Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.firstName}
//                 />
//               <Form.Control.Feedback type="invalid">
//                 {errors.firstName}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group controlId="lastName">
//               <Form.Label>Last Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.lastName}
//                 />
//               <Form.Control.Feedback type="invalid">
//                 {errors.lastName}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Form.Group controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 isInvalid={!!errors.email}
//                 />
//               <Form.Control.Feedback type="invalid">
//                 {errors.email}
//               </Form.Control.Feedback>
//             </Form.Group>

//             <Button variant="primary" type="submit">
//               Add Employee
//             </Button>
//           </Form>
//         </Col>
//       </Row>

//       <ToastContainer />
//     </Container>
  );
};

 

export default AddEmployee;