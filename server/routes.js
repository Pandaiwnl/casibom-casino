import express from "express";
import { storage } from "../src/shared/storage.js";

export async function registerRoutes(app) {
  const router = express.Router();

  // Auth routes
  router.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      const user = await storage.createUser({
        username,
        email,
        password, // In production, hash this password
        balance: 0
      });

      res.json({ 
        message: "User created successfully", 
        user: { id: user.id, username: user.username, email: user.email, balance: user.balance }
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) { // In production, use proper password hashing
        return res.status(401).json({ message: "Invalid credentials" });
      }

      res.json({ 
        message: "Login successful", 
        user: { id: user.id, username: user.username, email: user.email, balance: user.balance }
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Payment routes
  router.post("/api/payment/deposit", async (req, res) => {
    try {
      const { userId, amount } = req.body;
      
      if (!userId || !amount || amount <= 0) {
        return res.status(400).json({ message: "Valid user ID and amount are required" });
      }

      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user balance
      user.balance += amount;
      storage.users.set(userId, user);

      res.json({ 
        message: "Deposit successful", 
        newBalance: user.balance 
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Games routes
  router.get("/api/games", async (req, res) => {
    try {
      const games = await storage.getGames();
      res.json(games);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/api/games/:id", async (req, res) => {
    try {
      const game = await storage.getGame(req.params.id);
      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Winners routes
  router.get("/api/winners", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const winners = await storage.getRecentWinners(limit);
      res.json(winners);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.use(router);
  return app;
}

