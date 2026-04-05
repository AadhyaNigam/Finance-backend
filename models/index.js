const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Analyst', 'Viewer'], default: 'Viewer' },
    isActive: { type: Boolean, default: true }
});

const TransactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: String
});

const User = mongoose.model('User', UserSchema);
const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = { User, Transaction };
