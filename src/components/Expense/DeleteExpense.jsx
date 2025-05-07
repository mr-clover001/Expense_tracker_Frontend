import React from "react";

const DeleteExpense = ({ content, onDeleteExpense }) => {
  return (
    <div className="card">
      {content}{" "}
      <div className="flex items-center justify-between mt-5">
        <div className="">
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={onDeleteExpense}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteExpense;
