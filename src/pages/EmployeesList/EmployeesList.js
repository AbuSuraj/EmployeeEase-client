import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import './employees.css'
const EmployeesList = () => {
  // const [employees, setEmployees] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
 const [pageNumber, setPageNumber] = useState(0);
 const [showModal, setShowModal] = useState(false);


 const employeesPerPage = 5; 
 const {
  data: employees = { data: [], total: 0, currentPage: 1, totalPages: 1 },
  isLoading,
} = useQuery({
  queryKey: ['employees', pageNumber ],
  queryFn: async ({ queryKey }) => {
    const [key, page] = queryKey;
    console.log(page);
    const res = await fetch(
      `https://employee-ease-server.vercel.app/api/employees?page=${page}&pageSize=${employeesPerPage}`,
    );
    const data = await res.json();
    // console.log(buyers);
    return data;
  },
});
  // console.log(employees)
const pageCount = employees.totalPage;
const handlePageClick = ({ selected }) => {
  setPageNumber(selected + 1); 
  setSelectedRows([])
};
  useEffect(() => {
    // Check if all rows are manually selected or deselected
    setSelectAllChecked(selectedRows.length === employees?.data?.length);
  }, [selectedRows, employees?.data]);

  const handleCheckboxChange = (employeeId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(employeeId)) {
        // If already selected, remove it
        return prevSelectedRows.filter((id) => id !== employeeId);
      } else {
        // If not selected, add it
        return [...prevSelectedRows, employeeId];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectAllChecked) {
      // If "Select All" is checked, deselect all rows
      setSelectedRows([]);
    } else {
      // If "Select All" is unchecked, select all rows
      setSelectedRows(employees?.data.map((employee) => employee.id));
    }
  };

  const sendEmail = () => {
    // Get the selected rows based on their IDs
    const selectedData = employees?.data.filter((employee) => selectedRows.includes(employee.id));
    console.log('Selected Data:', selectedData);
    handleShowModal();
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
 
  const handleShowModal = () => {
    setShowModal(true);
  };
  const onSubmit = (values) => {
    // Handle your email sending logic here using values.subject and values.body
    console.log('Sending email with Subject:', values.subject, 'and Body:', values.body);
    handleCloseModal();
  };

  const formik = useFormik({
    initialValues: { subject: '', body: '' },
    onSubmit,
  });
 
  return (
    <div className="container mt-4">
      <h2>Employees List</h2>
      {selectedRows.length > 0 && (  
        <button className="btn btn-primary mb-3" onClick={sendEmail}>
          Send Email
        </button>
      )}
      <div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllChecked}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {employees?.data?.map((employee) => (
            <tr key={employee.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(employee.id)}
                  onChange={() => handleCheckboxChange(employee.id)}
                />
              </td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <ReactPaginate
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          previousClassName={pageNumber === 1 ? 'previous disabled' : 'previous'}
          nextClassName={pageNumber === pageCount ? 'next disabled' : 'next'}
          previousLabel={pageNumber === 1 ? 'Previous' : 'Previous'}
          nextLabel={pageNumber === pageCount ? 'Next' : 'Next'}
        />
        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Send Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter subject"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subject}
                isInvalid={formik.touched.subject && !formik.values.subject.trim()}
              />
              <Form.Control.Feedback type="invalid">Subject is required</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter body"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.body}
                isInvalid={formik.touched.body && !formik.values.body.trim()}
              />
              <Form.Control.Feedback type="invalid">Body is required</Form.Control.Feedback>
            </Form.Group>

            <Button className='mt-3' variant="primary" type="submit">
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmployeesList;
