import React, { useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import IncomeOverview from "../../components/Income/IncomeOverview";
import { API_PATHS } from "../../utlis/apiPath";
import axiosInstance from "../../utlis/axiosinstance";
import Modal from "../../components/layouts/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteIncome from "../../components/Income/DeleteIncome";
// import { toast } from "react-toastify";
const Income = () => {
  const [incomeData, setIncomeData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState({
    show: false,
    data: null,
  });
  useUserAuth();

  const [openAddIncomeModal, setOpenAddIncomeModal] = React.useState(false);

  // GetAllIncome Details
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      if (response.data) {
        console.log("Income data:", response.data);
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };
  // Add Income Details
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    if (!source.trim()) {
      toast.error("source is required");
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

    setOpenAddIncomeModal(false);
    try {
      const response = await axiosInstance.post(
        `${API_PATHS.INCOME.ADD_INCOME}`,
        { source, amount, date, icon }
      );
      if (response.data) {
        console.log("Income added successfully:", response.data);
        fetchIncomeDetails();
        toast.success("Income added successfully");
      }
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };
  // Delete Income Details
  const handleDeleteIncome = async (id) => {
    setOpenDeleteAlert({ show: false, data: null });
    console.log("Deleting income ID:", id);
    try {
      const response = await axiosInstance.delete(
        API_PATHS.INCOME.DELETE_INCOME(id)
      );

      console.log("Income deleted successfully:", response.data);
      fetchIncomeDetails();
      toast.success("Income deleted successfully");
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };
  // handle Download Income Details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income.xlsx");
      document.body.appendChild(link);
      link.click();
      toast.success("Income data downloaded successfully");
    } catch (error) {
      console.error("Error downloading income data:", error);
      toast.error("Error downloading income data");
    }
  };

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => {
                setOpenAddIncomeModal(true);
              }}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteIncome
            content="Are you sure you want to delete this income? This action cannot be undone."
            onDeleteIncome={() => handleDeleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
