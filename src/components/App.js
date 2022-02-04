import logo from '../assets/logo.svg';
import '../css/App.css';
import GrainResults from './GrainResults';
import FarmerProfile from './FarmerProfile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Wheatcute</h1>
      </header>
      <main>
        <div>
          Check out some sweet grains
        </div>
        <div>
          Or perhaps you have some grains to peddle
        </div>
        <GrainResults />
        <FarmerProfile />
      </main>
    </div>
  );
}

export default App;
