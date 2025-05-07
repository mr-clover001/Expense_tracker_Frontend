import React from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875CF5", "#FF6900", "#ED1C24"];
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    {
      name: "Total Balance",
      amount: totalBalance,
    },
    {
      name: "Total Income",
      amount: totalIncome,
    },
    {
      name: "Total Expense",
      amount: totalExpense,
    },
  ];
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        colors={COLORS}
        label={"Total Balance"}
        totalAmount={`$${totalBalance}`}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
