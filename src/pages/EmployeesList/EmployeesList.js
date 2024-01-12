import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  useEffect(() => {
    // Fetch data from the server
    axios.get('https://employee-ease-server.vercel.app/api/employees/')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching data from the API:', error);
      });
  }, []);
  console.log(employees)
  useEffect(() => {
    // Check if all rows are manually selected or deselected
    setSelectAllChecked(selectedRows.length === employees.length);
  }, [selectedRows, employees]);

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
      setSelectedRows(employees.map((employee) => employee.id));
    }
  };

  const logSelectedData = () => {
    // Get the selected rows based on their IDs
    const selectedData = employees.filter((employee) => selectedRows.includes(employee.id));
    console.log('Selected Data:', selectedData);
  };

  return (
    <div className="container mt-4">
      <h2>Employees List</h2>
      <button className="btn btn-primary mb-3" onClick={logSelectedData}>
        Log Selected Data
      </button>
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
          {employees.map((employee) => (
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
  );
};

export default EmployeesList;
