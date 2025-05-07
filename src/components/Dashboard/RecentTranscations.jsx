import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TranscationInfoCard from "../Cards/TranscationInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center">
        <h5 className="text-lg">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6 border-b border-gray-200 pb-4">
        {(transactions || []).slice(0, 5).map((item) => {
          const formattedDate = new Date(item.date).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "long",
              year: "numeric",
            }
          );

          return (
            <TranscationInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              date={formattedDate}
              amount={item.amount}
              type={item.type}
              hiddenDeleteBtn
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentTransactions;
