
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Routes/Home';
import Years from './Routes/Years';
import Weeks from './Routes/Weeks';
import Games from './Routes/Games';

import "./Styles/App.css"
import "./Styles/Games.css"
import "./Styles/MoreStats.css"
import "./Styles/NavigationBar.css"
import "./Styles/Home.css"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/games/:year/:week" element={<Games />} />
      </Routes>
    </Router>
  );
}

export default App;
