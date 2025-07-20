import React, { useState } from "react";

function DepositForm({ goalId, onAddDeposit }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newDeposit = {
      amount: parseFloat(amount),
      date,
      goalId, // 👈 so we know which goal this deposit belongs to
    };

    fetch("http://localhost:3002/deposits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeposit),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddDeposit(data); // Tell parent to add this deposit to state
        setAmount("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error posting deposit:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Add Deposit</button>
    </form>
  );
}

export default DepositForm;
