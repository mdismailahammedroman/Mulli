import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { prisma } from "./app/lib/prisma";
import { router } from "./routes";

// Initialize dotenv to use environment variables
dotenv.config();

// Create an Express application
const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy!" });
});

export default app;
