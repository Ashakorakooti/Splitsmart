import { useEffect, useState } from "react";
import axios from "axios";

function Settlement() {

  const [expenses, setExpenses] = useState([]);

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

  // Total Amount

  const totalAmount = expenses.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  // Unique People

  const people = [
    ...new Set(expenses.map((item) => item.paidBy))
  ];

  // Equal Share

  const equalShare =
    people.length > 0
      ? totalAmount / people.length
      : 0;

  // Calculate Paid Amount Per Person

  const balances = people.map((person) => {

    const paid = expenses
      .filter((item) => item.paidBy === person)
      .reduce((acc, item) => acc + item.amount, 0);

    const balance = paid - equalShare;

    return {
      person,
      paid,
      balance,
    };
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Expense Settlement
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-lg">

        <h2 className="text-2xl font-bold mb-4">
          Total Expense: ₹{totalAmount}
        </h2>

        <h2 className="text-2xl font-bold mb-8">
          Equal Share Per Person: ₹{equalShare.toFixed(2)}
        </h2>

        <div className="grid gap-6">

          {balances.map((item, index) => (

            <div
              key={index}
              className="border p-5 rounded-lg"
            >

              <h2 className="text-2xl font-bold mb-2">
                {item.person}
              </h2>

              <p className="text-lg">
                Paid: ₹{item.paid}
              </p>

              <p
                className={`text-lg font-bold ${
                  item.balance >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.balance >= 0
                  ? `Gets Back ₹${item.balance.toFixed(2)}`
                  : `Owes ₹${Math.abs(
                      item.balance
                    ).toFixed(2)}`}
              </p>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}

export default Settlement;