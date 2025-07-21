import { useState } from "react";

function DepositForm({ goals, onAddDeposit }) {
  const [selectedGoalId, setSelectedGoalId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!selectedGoalId) {
      setError("Please select a goal");
      setIsSubmitting(false);
      return;
    }

    if (!amount || isNaN(amount)) {
      setError("Please enter a valid amount");
      setIsSubmitting(false);
      return;
    }

    if (!date) {
      setError("Please select a date");
      setIsSubmitting(false);
      return;
    }

    const numericAmount = parseFloat(amount);
    if (numericAmount <= 0) {
      setError("Amount must be greater than 0");
      setIsSubmitting(false);
      return;
    }

    const newDeposit = {
      amount: numericAmount,
      date: new Date(date).toISOString(),
      goalId: selectedGoalId,
    };

    fetch("http://localhost:3002/deposits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeposit),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        onAddDeposit(selectedGoalId, numericAmount); // ← Call with correct goalId
        setAmount("");
        setDate("");
        setSelectedGoalId("");
      })
      .catch((error) => {
        console.error("Error posting deposit:", error);
        setError(error.message || "Failed to add deposit");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="deposit-form">
      <h3 className="text-xl font-semibold mb-3">Add New Deposit</h3>

      <div className="form-group mb-3">
        <label htmlFor="goal">Select Goal</label>
        <select
          id="goal"
          value={selectedGoalId}
          onChange={(e) => setSelectedGoalId(e.target.value)}
          disabled={isSubmitting}
        >
          <option value="">-- Choose a goal --</option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {goal.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="amount">Amount ($)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0.01"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          max={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)}
          disabled={isSubmitting}
        />
      </div>

      {error && <div className="error-message text-red-500">{error}</div>}

      <button type="submit" disabled={isSubmitting || !amount || !date || !selectedGoalId}>
        {isSubmitting ? "Processing..." : "Add Deposit"}
      </button>
    </form>
  );
}

export default DepositForm;
