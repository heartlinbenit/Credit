// import { useState } from "react";
// import { createTransaction } from "../../services/api";

// function UserPayment() {
//   const [formData, setFormData] = useState({
//     phone: "",
//     amount: "",
//     cardNumber: "",
//     cvc: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await createTransaction(formData);
//       alert("Payment Successful!");
//       setFormData({ phone: "", amount: "", cardNumber: "", cvc: "" });
//     } catch (error) {
//       alert("Payment Failed!");
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>User Payment</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
//         <input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
//         <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
//         <input type="text" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} required />
//         <button type="submit">Pay</button>
//       </form>
//     </div>
//   );
// }

// export default UserPayment;
import { useState, useEffect } from "react";
import { createTransaction } from "../../services/api";

function UserPayment() {
  const [formData, setFormData] = useState({
    phone: "",
    amount: "",
    cardNumber: "",
    cvc: "",
  });
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: "",
    language: "",
    screenWidth: "",
    screenHeight: "",
    ip: "",
  });

  // Collect Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported.");
    }
  }, []);

  // Collect Device Info and IP
  useEffect(() => {
    async function fetchDeviceInfo() {
      const ipResponse = await fetch('https://ipapi.co/json/');
      const ipData = await ipResponse.json();

      setDeviceInfo({
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        ip: ipData.ip,
      });
    }

    fetchDeviceInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "amount") {
      if (/^\d*\.?\d*$/.test(newValue)) {
        setFormData((prev) => ({ ...prev, [name]: newValue }));
      }
    } else if (name === "cardNumber") {
      newValue = newValue.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    } else {
      newValue = newValue.replace(/\D/g, "");
      if (name === "phone") newValue = newValue.slice(0, 10);
      if (name === "cvc") newValue = newValue.slice(0, 4);
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { phone, amount, cardNumber, cvc } = formData;
    const rawCardNumber = cardNumber.replace(/\s/g, "");

    if (
      phone.length !== 10 ||
      rawCardNumber.length !== 16 ||
      (cvc.length !== 3 && cvc.length !== 4) ||
      amount === "" ||
      Number(amount) <= 0
    ) {
      alert("Please fill all fields correctly before submitting.");
      return;
    }

    const transactionData = {
      phone,
      amount,
      cardNumber: rawCardNumber,
      cvc,
      date: new Date().toISOString(),
      location,
      deviceInfo,
    };

    try {
      await createTransaction(transactionData);
      alert("Payment Successful!");
      setFormData({ phone: "", amount: "", cardNumber: "", cvc: "" });
    } catch (error) {
      alert("Payment Failed!");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h2>User Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number (10 digits)"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number (16 digits)"
          value={formData.cardNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cvc"
          placeholder="CVC (3 or 4 digits)"
          value={formData.cvc}
          onChange={handleChange}
          required
        />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
}

export default UserPayment;

