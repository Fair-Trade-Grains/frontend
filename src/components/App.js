import { Link, Route, Routes } from 'react-router-dom';
import logo from '../assets/logo.svg';
import '../css/App.css';
import GrainResults from './GrainResults';
import FarmerResults from './FarmerResults';
import NewProfileForm from './NewProfileForm';
import FarmerProfile from './FarmerProfile';
import Landing from './Landing';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wheatcute</h1>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path="/grains" element={<GrainResults />} />
          <Route path='/create-farmer' element={<NewProfileForm />} />
          <Route fath='/farms' element={<FarmerResults />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
