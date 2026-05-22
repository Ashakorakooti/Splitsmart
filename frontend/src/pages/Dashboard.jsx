import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {

      const res = await axios.get(
        "https://splitsmart-backend-jurk.onrender.com/api/expenses"
      );

      setExpenses(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Total Expense Amount

  const totalExpenses = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // Expenses Paid By Logged-in User

  const userPaid = expenses
  .filter(
    (item) =>
      item.paidBy.toLowerCase() ===
      user?.name.toLowerCase()
  )
  .reduce((acc, item) => acc + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">

      <div className="bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to SplitSmart
        </h1>

        <p className="text-xl mb-2">
          Name: {user?.name}
        </p>

        <p className="text-xl mb-6">
          Email: {user?.email}
        </p>

        {/* Dashboard Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-blue-500 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold">
              Total Expenses
            </h2>

            <p className="text-3xl mt-4">
              ₹{totalExpenses}
            </p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold">
              Paid By You
            </h2>

            <p className="text-3xl mt-4">
              ₹{userPaid}
            </p>
          </div>

          <div className="bg-purple-500 text-white p-6 rounded-xl">
            <h2 className="text-2xl font-bold">
              Total Transactions
            </h2>

            <p className="text-3xl mt-4">
              {expenses.length}
            </p>
          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-wrap gap-4">

          <button
            onClick={() => navigate("/add-expense")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Add Expense
          </button>

          <button
            onClick={() => navigate("/expenses")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            View Expenses
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");

              navigate("/login");
            }}
            className="bg-red-500 text-white px-6 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;