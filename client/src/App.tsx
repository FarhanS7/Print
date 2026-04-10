import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Generate from "./pages/Generate";
import Editor from "./pages/Editor";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/orders" element={<Orders />} />
        {/* Future routes (explore) will be added here */}
      </Routes>
    </Router>
  );
}




export default App;
