import React from "react";
import Inputs from "../Inputs/Inputs";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = React.useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddIncome(income);
    setIncome({
      source: "",
      amount: "",
      date: "",
      icon: "",
    });
  };
  return (
    <div className="card">
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) =>
          handleChange({ target: { name: "icon", value: selectedIcon } })
        }
      />
      <Inputs
        type="text"
        name="source"
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        value={income?.source}
        onChange={handleChange}
      />
      <Inputs
        type="number"
        name="amount"
        label="Amount"
        placeholder="Enter amount"
        value={income?.amount}
        onChange={handleChange}
      />
      <Inputs
        type="date"
        name="date"
        label="Date"
        placeholder="Select date"
        value={income?.date}
        onChange={handleChange}
      />
      <div className="">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
