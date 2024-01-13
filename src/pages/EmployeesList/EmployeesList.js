import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';
import './employees.css'
const EmployeesList = () => {
  // const [employees, setEmployees] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
 const [pageNumber, setPageNumber] = useState(0);
 const employeesPerPage = 5; 
 const {
  data: employees = { data: [], total: 0, currentPage: 1, totalPages: 1 },
  refetch,
  isLoading,
} = useQuery({
  queryKey: ['employees', pageNumber ],
  queryFn: async ({ queryKey }) => {
    const [key, page] = queryKey;
    console.log(page);
    const res = await fetch(
      `http://localhost:5000/api/employees?page=${page}&pageSize=${employeesPerPage}`,
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

  const logSelectedData = () => {
    // Get the selected rows based on their IDs
    const selectedData = employees?.data.filter((employee) => selectedRows.includes(employee.id));
    console.log('Selected Data:', selectedData);
  };
 
  return (
    <div className="container mt-4">
      <h2>Employees List</h2>
      <button className="btn btn-primary mb-3" onClick={logSelectedData}>
        Log Selected Data
      </button>
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
    </div>
  );
};

export default EmployeesList;
