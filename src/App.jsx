import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'

import Input from './assets/pages/input';
import Setings from './assets/pages/setings';
import Result from "./assets/pages/result";

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route path="/setings" element={<Setings />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
