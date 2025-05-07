import React from "react";
import {
  LuUtensils,
  LuTrendingDown,
  LuTrendingUp,
  LuTrash2,
} from "react-icons/lu";

const TranscationInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hiddenDeleteBtn,
  onDelete,
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 border border-gray-100">
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Transaction Info */}
      <div className="flex-1">
        <h6 className="text-sm font-medium text-gray-800">{title}</h6>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

      {/* Amount */}
      <div
        className={`text-sm font-semibold ${
          type === "expense" ? "text-red-500" : "text-green-600"
        }`}
      >
        {type === "expense" ? "-" : "+"}₹{amount}
      </div>

      {/* Delete Icon (if not hidden) */}
      {!hiddenDeleteBtn && (
        <button
          className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition"
          onClick={onDelete}
        >
          <LuTrash2 className="text-gray-400 hover:text-red-500" />
        </button>
      )}
    </div>
  );
};

export default TranscationInfoCard;
