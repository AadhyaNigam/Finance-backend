require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Transaction, User } = require('./models');
const authorize = require('./middleware/auth');

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serves your dashboard

// --- Database Connection ---
const dbURI = process.env.MONGODB_URL;
if (!dbURI) {
    console.error("❌ ERROR: MONGODB_URL is not defined in .env file");
    process.exit(1);
}

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas Cloud"))
    .catch(err => console.error("❌ Connection error:", err));

// --- API Routes ---

// 1. Dashboard Summary (Requirement #3)
app.get('/api/dashboard/summary', authorize(['Admin', 'Analyst', 'Viewer']), async (req, res) => {
    try {
        const records = await Transaction.find();
        const income = records.filter(r => r.type === 'income').reduce((s, r) => s + r.amount, 0);
        const expense = records.filter(r => r.type === 'expense').reduce((s, r) => s + r.amount, 0);
        
        res.json({
            totalIncome: income,
            totalExpense: expense,
            netBalance: income - expense,
            recentActivity: records.slice(-5)
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch dashboard data" });
    }
});

// 2. Create Record (Requirement #2 & #4)
app.post('/api/records', authorize(['Admin']), async (req, res) => {
    try {
        const record = new Transaction(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ error: "Validation failed: Check your data." });
    }
});

// --- Start Server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server live at http://localhost:${PORT}`);
});