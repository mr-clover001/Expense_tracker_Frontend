import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  const names = name.split(" ");
  if (names.length > 1) {
    return names[0][0].toUpperCase() + names[1][0].toUpperCase();
  }
  return names[0][0].toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined) {
    return "";
  }
  const parts = num.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

export const prepareExpenseBarChartData = (data) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};
export const prepareIncomeBarChartData = (data) => {
  const sortedData = [...data].sort((a, b) => {
    new Date(a.date) - new Date(b.date);
  });
  const chartData = data.map((item) => ({
    month: moment(item?.category).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};
