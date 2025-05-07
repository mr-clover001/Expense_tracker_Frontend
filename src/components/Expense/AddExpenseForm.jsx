import React from "react";
import Inputs from "../Inputs/Inputs";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = React.useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
    setExpense({
      category: "",
      amount: "",
      date: "",
      icon: "",
    });
  };
  return (
    <div className="card">
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) =>
          handleChange({ target: { name: "icon", value: selectedIcon } })
        }
      />
      <Inputs
        type="text"
        name="category"
        label="Expense Category"
        placeholder="Grocery, Shopping, Investment etc."
        value={expense?.category}
        onChange={handleChange}
      />
      <Inputs
        type="number"
        name="amount"
        label="Amount"
        placeholder="Enter amount"
        value={expense?.amount}
        onChange={handleChange}
      />
      <Inputs
        type="date"
        name="date"
        label="Date"
        placeholder="Select date"
        value={expense?.date}
        onChange={handleChange}
      />
      <div className="">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
