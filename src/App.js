import logo from './logo.svg';
import './App.css';
import CsvFileUploader from './components/csv-reader/Csv-reader';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import EmployeesList from './pages/EmployeesList/EmployeesList';
// import DragDrop from './Test';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div >
       {/* <CsvFileUploader/> */}
       <EmployeesList/>
       {/* <AddEmployee/> */}
       {/* <DragDrop>

</DragDrop> */}
    </div>
  );
}

export default App;
