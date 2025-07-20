import { useEffect, useState } from "react";
import React from "react";  
import "./OverviewPanel.css";
function OverviewPanel() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((error) => {
        console.error("Error fetching goals:", error);
      });
  }, []);

  return (
    <div classname ="overview-panel">
      <h2>Goals Overview</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id}><span>{goal.name} </span>
          <span>${goal.savedAmount}</span></li>
        ))}
      </ul>
    </div>
  );
}

export default OverviewPanel;
