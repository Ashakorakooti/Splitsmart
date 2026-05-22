const Expense = require("../models/Expense");

const addExpense = async (req, res) => {
  try {
    const { title, amount, category, paidBy } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      paidBy,
    });

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getExpenses = async (req, res) => {
  try {

    const expenses = await Expense.find().sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const deleteExpense = async (req, res) => {
  try {

    const expense = await Expense.findByIdAndDelete(
      req.params.id
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
const updateExpense = async (req, res) => {
  try {

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.status(200).json({
      message: "Expense updated successfully",
      expense,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};
module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};