import { Route, Routes } from 'react-router-dom';
import '../css/App.css';
import GrainResults from './GrainResults';
import FarmerResults from './FarmerResults';
import NewProfileForm from './NewProfileForm';
import FarmerProfile from './FarmerProfile';
// import NewGrainForm from './NewGrainForm';
import Landing from './Landing';
import UpdateFarmerProfile from './UpdateFarmerProfile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wheat<span>cute</span></h1>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Landing />}/>
          <Route path="/grains" element={<GrainResults />} />
          <Route path='/create-farmer' element={<NewProfileForm />} />
          <Route path='/farms' element={<FarmerResults />} />
          <Route path='/farms/:farmID' element={<FarmerProfile />} />
          <Route path='/new-grain/:farmID' element={<UpdateFarmerProfile />} />
          <Route path="/*" element={<p>404: Sorry, it looks like what you want does not exist.</p>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
