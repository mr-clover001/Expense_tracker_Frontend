import React, { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utlis/apiPath";
import axiosInstance from "../../utlis/axiosinstance";
import toast from "react-hot-toast";
import ExpenseList from "../../components/Expense/ExpenseList";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import DeleteExpense from "../../components/Expense/DeleteExpense";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Modal from "../../components/layouts/Modal";

const Expense = () => {
  const [expenseData, setExpenseData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null,
  });
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = React.useState(false);

  // GetAllExpense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
      );
      if (response.data) {
        console.log("Expense data:", response.data);
        setExpenseData(response.data);
      }
    } catch (error) {
      console.error("Error fetching expense data:", error);
    } finally {
      setLoading(false);
    }
  };
  // Add Expense Details
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("amount should be valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("date is required");
      return;
    }

    setOpenAddExpenseModal(false);
    try {
      const response = await axiosInstance.post(
        `${API_PATHS.EXPENSE.ADD_EXPENSE}`,
        { category, amount, date, icon }
      );
      if (response.data) {
        console.log("Expense added successfully:", response.data);
        fetchExpenseDetails();
        toast.success("Expense added successfully");
      }
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };
  // Delete Income Details
  const handleDeleteExpense = async (id) => {
    setOpenDeleteAlert({ show: false, data: null });
    console.log("Deleting expense ID:", id);
    try {
      const response = await axiosInstance.delete(
        API_PATHS.EXPENSE.DELETE_EXPENSE(id)
      );

      console.log("Expense deleted successfully:", response.data);
      fetchExpenseDetails();
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting Expense:", error);
      toast.error("Error deleting Expense");
    }
  };
  // handle Download Income Details
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Expense data downloaded successfully");
    } catch (error) {
      console.error("Error downloading expense data:", error);
      toast.error("Error downloading expense data");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => {
                setOpenAddExpenseModal(true);
              }}
            />
          </div>

          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteExpense
            content="Are you sure you want to delete this expense? This action cannot be undone."
            onDeleteExpense={() => handleDeleteExpense(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
