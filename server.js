import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Load env variables
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);

// Error Middleware
app.use(errorHandler);

// Health check route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Port (Render uses dynamic PORT)
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});