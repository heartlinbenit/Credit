import { useState } from "react";
import { createTransaction } from "../../services/api";

function UserPayment() {
  const [formData, setFormData] = useState({
    phone: "",
    amount: "",
    cardNumber: "",
    cvc: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      alert("Payment Successful!");
      setFormData({ phone: "", amount: "", cardNumber: "", cvc: "" });
    } catch (error) {
      alert("Payment Failed!");
    }
  };

  return (
    <div className="form-container">
      <h2>User Payment</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
        <input type="text" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} required />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default UserPayment;
