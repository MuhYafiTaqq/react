import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Input from './assets/pages/input';
import Setings from './assets/pages/setings' ;
import Result from "./assets/pages/result";
import Donations from "./assets/pages/donations";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/setings" element={<Setings />} />
        <Route path="/result" element={<Result />} />
        <Route path="/donations" element={<Donations />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
