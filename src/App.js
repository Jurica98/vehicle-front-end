import "./App.css";
import Make from "./pages/Make";
import Model from "./pages/Model";
import Header from "./layout/header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <br></br>
      <Routes>
      <Route path="/" element={<Make/>}/>
      <Route path="/pages/Model" element={<Model/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
