import React, { useEffect, useState } from "react";
import GoalForm from "./Components/GoalForm";
import DepositForm from "./Components/DepositForm";
import GoalCard from "./Components/GoalCard";
import OverviewPanel from "./Components/OverviewPanel";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Error fetching goals:", err));
  }, []);

  function handleAddGoal(newGoal) {
    fetch("http://localhost:3002/goals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGoal),
    })
      .then((res) => res.json())
      .then((data) => setGoals((prevGoals) => [...prevGoals, data]));
  }

  function handleDeposit(goalId, amount) {
    const goalToUpdate = goals.find((goal) => goal.id === goalId);
    const updatedAmount = goalToUpdate.savedAmount + amount;

    fetch(`http://localhost:3002/goals/${goalId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ savedAmount: updatedAmount }),
    })
      .then((res) => res.json())
      .then((updatedGoal) => {
        setGoals((prevGoals) =>
          prevGoals.map((goal) =>
            goal.id === goalId ? updatedGoal : goal
          )
        );
      });
  }

  return (
    <div className="App p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        💰 Smart Goal Planner
      </h1>

      <OverviewPanel goals={goals} />

      <div className="grid md:grid-cols-2 gap-6 my-8">
        <GoalForm onAddGoal={handleAddGoal} />
        <DepositForm goals={goals} onDeposit={handleDeposit} />
      </div>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Your Goals</h2>
      <div>
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

export default App;

