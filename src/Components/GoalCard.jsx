import React from "react";

function GoalCard({ goal }) {
  const {
    name,
    targetAmount,
    savedAmount,
    category,
    deadline,
    createdAt
  } = goal;

  const progress = Math.min((savedAmount / targetAmount) * 100, 100).toFixed(1);

  return (
    <div className="goal-card p-4 bg-white shadow-md rounded-xl mb-4">
      <h2 className="text-xl font-semibold mb-1">{name}</h2>
      <p className="text-gray-500 text-sm mb-2">Category: {category}</p>

      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{progress}% saved</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>
          Saved: <strong>${savedAmount}</strong> / ${targetAmount}
        </p>
        <p>Deadline: {deadline}</p>
        <p>Created: {createdAt}</p>
      </div>
    </div>
  );
}

export default GoalCard;
