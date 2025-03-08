import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Input from './assets/pages/input';
import Setings from './assets/pages/setings';

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/setings" element={<Setings />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
