
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Routes/Home';
import Years from './Routes/Years';
import Weeks from './Routes/Weeks';
import Games from './Routes/Games';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/years' element={<Years />} />
        <Route path="/weeks/:year" element={<Weeks />} />
        <Route path="/games/:year/:week" element={<Games />} />
      </Routes>
    </Router>
  );
}

export default App;
