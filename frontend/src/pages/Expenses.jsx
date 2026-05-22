import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Expenses() {

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    paidBy: "",
  });

  const fetchExpenses = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/expenses"
      );

      setExpenses(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {

      const res = await axios.delete(
        `http://localhost:5000/api/expenses/${id}`
      );

      toast.success(res.data.message);

      fetchExpenses();

    } catch (error) {

      toast.error(error.response.data.message);

    }
  };

  const startEdit = (expense) => {

    setEditingId(expense._id);

    setEditData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      paidBy: expense.paidBy,
    });
  };

  const handleUpdate = async (id) => {

    try {

      const res = await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        editData
      );

      toast.success(res.data.message);

      setEditingId(null);

      fetchExpenses();

    } catch (error) {

      toast.error(error.response.data.message);

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Expense History
      </h1>

      <div className="grid gap-6">

        {expenses.map((expense) => (

          <div
            key={expense._id}
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg"
          >

            {editingId === expense._id ? (

              <>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      title: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-2"
                />

                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      amount: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-2"
                />

                <input
                  type="text"
                  value={editData.category}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      category: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-2"
                />

                <input
                  type="text"
                  value={editData.paidBy}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      paidBy: e.target.value,
                    })
                  }
                  className="border p-2 w-full mb-4"
                />

                <button
                  onClick={() => handleUpdate(expense._id)}
                  className="bg-green-500 text-white px-5 py-2 rounded-lg mr-3"
                >
                  Save
                </button>

              </>

            ) : (

              <>
                <h2 className="text-2xl font-bold mb-2">
                  {expense.title}
                </h2>

                <p className="text-lg">
                  Amount: ₹{expense.amount}
                </p>

                <p className="text-lg">
                  Category: {expense.category}
                </p>

                <p className="text-lg mb-4">
                  Paid By: {expense.paidBy}
                </p>

                <button
                  onClick={() => startEdit(expense)}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg mr-3"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(expense._id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>
              </>

            )}

          </div>

        ))}

      </div>
    </div>
  );
}

export default Expenses;