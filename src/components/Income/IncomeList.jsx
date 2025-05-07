import React from "react";
import { LuDownload } from "react-icons/lu";
import TranscationInfoCard from "../Cards/TranscationInfoCard";
import moment from "moment";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>
      <div className="grid drid-cols-1 md:grid-cols-2">
        {transactions.map((transaction) => (
          <TranscationInfoCard
            key={transaction._id}
            title={transaction.source}
            icon={transaction.icon}
            amount={transaction.amount}
            date={moment(transaction.date).format("DD MMM YYYY")}
            onDelete={() => onDelete(transaction._id)}
            type="income"
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
