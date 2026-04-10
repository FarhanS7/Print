import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Editor from "./pages/Editor";
import Orders from "./pages/Orders";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        {/* Future routes (explore) will be added here */}
      </Routes>
    </Router>
  );
}





export default App;
