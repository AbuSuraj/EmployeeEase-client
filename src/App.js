 
import './App.css';
 
import AddEmployee from './pages/AddEmployee/AddEmployee';
import EmployeesList from './pages/EmployeesList/EmployeesList';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import DragDrop from './Test';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div >
       {/* <CsvFileUploader/> */}
       {/* <EmployeesList/>
       <AddEmployee/> */}
       {/* <DragDrop>

</DragDrop> */}
  <>
      <Router>
      <Routes>
     <Route path="" element={<EmployeesList />} />
     <Route path="/employe-list" element={<Navigate to="/" />} />
     <Route path="/add-employee" element={<AddEmployee/>} />
     {/* <Route path="*" element={<ErrorPage />} /> */}
     </Routes>
      </Router>
     
    </>
    </div>
  );
}

export default App;
