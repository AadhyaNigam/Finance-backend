require('dotenv').config();
const mongoose = require('mongoose');
const { Transaction } = require('./models');

mongoose.connect(process.env.MONGODB_URL).then(async () => {
    await Transaction.create([
        { amount: 5000, type: 'income', category: 'Salary', description: 'Monthly Pay' },
        { amount: 1200, type: 'expense', category: 'Rent', description: 'April Rent' },
        { amount: 200, type: 'expense', category: 'Food', description: 'Groceries' }
    ]);
    console.log("🌱 Data seeded successfully!");
    process.exit();
});