/* eslint-disable no-unused-vars */
import { useState } from "react";
// import axios from "axios";
import { instance } from "../utils/axios";

const Checkout = () => {
  const [orderId, setOrderId] = useState(`order-${Date.now()}`);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    try {
      // Mengirim request untuk membuat transaksi ke backend
      const response = await instance.post("/create-transaction", {
        orderId,
        amount,
        customerName: name,
        email,
        phone,
      });

      // Mendapatkan token dari respons backend
      const token = response.data.token;

      // Menampilkan Midtrans payment gateway menggunakan token
      window.snap.pay(token, {
        onSuccess: (result) => {
          alert("Payment successful!");
          console.log("Payment success:", result);
        },
        onPending: (result) => {
          alert("Payment pending!");
          console.log("Payment pending:", result);
        },
        onError: (result) => {
          alert("Payment failed!");
          console.log("Payment failed:", result);
        },
        onClose: () => {
          alert("Payment popup closed!");
        },
      });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the payment.");
    }
  };

  return (
    <div className="mt-52">
      <h1>Checkout</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
