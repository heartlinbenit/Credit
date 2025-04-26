import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1 className="title">Synergistic Hybrid Deep Learning for Real-Time Fraud Detection Using CNN-LSTM and Digital Fingerprinting</h1>
      <div className="button-group">
        <button onClick={() => navigate("/admin-login")} className="btn admin-btn">
          Admin
        </button>
        <button onClick={() => navigate("/user")} className="btn user-btn">
          User
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
