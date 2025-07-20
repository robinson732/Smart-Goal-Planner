import React, { useState } from "react";
import "./GoalForm.css";

function GoalForm({ onAddGoal }) {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // 👈 not prevantDefault 😅

    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      category,
      deadline,
      createdAt: new Date().toISOString(),
    };

    // Send to server
    fetch("http://localhost:3002/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => {
        onAddGoal(data); // 👈 tell parent to add new goal
        setName("");
        setTargetAmount("");
        setCategory("");
        setDeadline("");
      })
      .catch((error) => {
        console.error("Error posting new goal:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <input
        type="text"
        placeholder="Goal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Target Amount"
        value={targetAmount}
        onChange={(e) => setTargetAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        placeholder="Deadline"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add Goal</button>
    </form>
  );
}

export default GoalForm;


