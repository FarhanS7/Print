import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Future routes (generate, explore, orders) will be added here */}
      </Routes>
    </Router>
  );
}

export default App;
