import React from "react";
import PropTypes from "prop-types";

function GoalCard({ goal }) {
  if (!goal) {
    console.error("GoalCard received null/undefined goal prop");
    return <div className="goal-card error">Error: Invalid goal data</div>;
  }

  const {
    id = '',
    name = 'Unnamed Goal',
    targetAmount = 0,
    savedAmount = 0,
    category = 'Uncategorized',
    deadline = '',
    createdAt = ''
  } = goal;

  // Safe number formatting
  const formattedSaved = Number(savedAmount || 0).toLocaleString();
  const formattedTarget = Number(targetAmount || 0).toLocaleString();

  const progress = targetAmount > 0
    ? Math.min((savedAmount / targetAmount) * 100, 100).toFixed(1)
    : 0;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      console.warn("Invalid date format:", dateString);
      return dateString;
    }
  };

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
          Saved: <strong>${formattedSaved}</strong> / ${formattedTarget}
        </p>
        <p>Deadline: {formatDate(deadline)}</p>
        <p>Created: {formatDate(createdAt)}</p>
      </div>
    </div>
  );
}

GoalCard.propTypes = {
  goal: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    targetAmount: PropTypes.number,
    savedAmount: PropTypes.number,
    category: PropTypes.string,
    deadline: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired
};

export default GoalCard;