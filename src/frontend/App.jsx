import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import AdminLogin from "./components/LandingPage/AdminLogin";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UserPayment from "./components/UserPayment/UserPayment";
import "./styles/App.css";

function App() {
  return (
    <Router basename="/Credit">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/user" element={<UserPayment />} />
      </Routes>
    </Router>
  );
}

export default App;
