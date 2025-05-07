import React, { useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utlis/helper";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = React.useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="text-lg"> Expense OverView</h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Track you spending over time and analyis your expense
            </p>
          </div>
          <button className="add-btn" onClick={onAddExpense}>
            <LuPlus className="text-lg" />
            Add Expense
          </button>
        </div>
        <div className="mt-10">
          <CustomBarChart data={chartData} />
        </div>
      </div>
    </>
  );
};

export default ExpenseOverview;
