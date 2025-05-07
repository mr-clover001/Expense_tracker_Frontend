import React from "react";

const DeleteIncome = ({ content, onDeleteIncome }) => {
  return (
    <div className="card">
      {content}{" "}
      <div className="flex items-center justify-between mt-5">
        <div className="">
          <button
            type="button"
            className="add-btn add-btn-fill"
            onClick={onDeleteIncome}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteIncome;
