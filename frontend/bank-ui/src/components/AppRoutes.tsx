import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import { useAuthentication } from "../hooks/authenticationHook";
function AppRoutes() {
  useAuthentication();
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/accounts/*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
