import Expense from "../models/Expense.js";

// GET all
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.json(expenses);
};

// CREATE
export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount) {
      return res.status(400).json({ message: "Title & Amount required" });
    }

    const expense = await Expense.create({ title, amount, category, date });
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

// GET by ID
export const getExpenseById = async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) return res.status(404).json({ message: "Not found" });
  res.json(expense);
};

// UPDATE
export const updateExpense = async (req, res) => {
  const expense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(expense);
};

// DELETE
export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};