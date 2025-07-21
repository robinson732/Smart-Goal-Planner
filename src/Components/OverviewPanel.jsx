import { useState, useEffect } from "react";
import "./OverviewPanel.css";

function OverviewPanel() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3002/goals")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch goals");
        return res.json();
      })
      .then((data) => {
        const processedGoals = Array.isArray(data.goals)
          ? data.goals.map(goal => ({
              ...goal,
              savedAmount: typeof goal.savedAmount === "number" ? goal.savedAmount : 0
            }))
          : [];
        setGoals(processedGoals);
      })
      .catch((error) => {
        console.error("Error fetching goals:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading goals...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="overview-panel">
      <h2>Goals Overview</h2>
      {goals.length === 0 ? (
        <p>No goals found</p>
      ) : (
        <ul className="goals-list">
          {goals.map((goal) => (
            <li key={goal.id} className="goal-item">
              <span>{goal.name}</span>
              <span>${(goal.savedAmount ?? 0).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OverviewPanel;

