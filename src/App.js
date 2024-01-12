import logo from './logo.svg';
import './App.css';
import CsvFileUploader from './components/Csv-reader';
import AddEmployee from './pages/AddEmployee/AddEmployee';
// import DragDrop from './Test';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div >
       {/* <CsvFileUploader/> */}
       <AddEmployee/>
       {/* <DragDrop>

</DragDrop> */}
    </div>
  );
}

export default App;
