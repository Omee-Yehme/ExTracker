import "./Etrac.css";
import { useState, useEffect } from "react";
import AExpense from "./AExpense";
import ABala from "./ABala";
import ExpensePie from "./ExpensePie";
import { FaUtensils, FaPlane } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { MdDelete, MdEdit } from "react-icons/md";

const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
        case "food":
            return <FaUtensils size={16} color="#555" />;
        case "entertainment":
            return <MdMovie size={16} color="#555" />;
        case "travel":
            return <FaPlane size={16} color="#555" />;
        default:
            return null;
    }
};

const Transaction = ({ expenses, onDelete }) => {
    return (
        <div style={{ maxWidth: "738px", padding: "10px" }}>


            {expenses.length === 0 ? (
                <div style={{
                    backgroundColor: "white",
                    padding: "15px",
                    borderRadius: "10px",
                    color: "black",
                    fontSize: "20px",
                    textAlign: "center",
                    width: "800px",
                    fontWeight: "bold"
                }}>
                    No transactions!
                </div>
            ) : (
                expenses.map((exp, idx) => (
                    <div key={idx} className="transaction-card">
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "#E0E0E0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                {getCategoryIcon(exp.category)}
                            </div>
                            <div>
                                <div style={{ fontWeight: "bold", textTransform: "capitalize" }}>{exp.title}</div>
                                <div style={{ fontSize: "12px", color: "#777" }}>{exp.date}</div>
                            </div>
                        </div>

                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <div style={{ color: "#F6B10C", fontWeight: "bold", fontSize: "14px" }}>
                                ₹{exp.amount}
                            </div>
                            <button
                                onClick={() => onDelete(idx)}
                                style={{
                                    backgroundColor: "#F44336",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                <MdDelete size={18} color="#fff" />
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#F6B10C",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                <MdEdit size={18} color="#fff" />
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};


const Expense = ({ expenses }) => {
    const totals = { Food: 0, Entertainment: 0, Travel: 0 };
    let overallTotal = 0;

    expenses.forEach((exp) => {
        if (totals[exp.category] !== undefined) {
            totals[exp.category] += exp.amount;
            overallTotal += exp.amount;
        }
    });

    return (
        <div className="mob">
            <h2 style={{ color: "black", padding: "5px",marginBottom:"0",textAlign:"center" }}>Category Breakdown</h2>
            <div className="category-bars">
                {Object.keys(totals).map((category) => {
                    const width = overallTotal ? (totals[category] / overallTotal) * 100 : 0;

                    return (
                        <div key={category} className="bar-wrapper">
                            <div className="bar-label-wrapper">
                                <span className="bar-label">{category}</span>
                                <span className="bar-amount">₹{totals[category]}</span>
                            </div>
                            <div className="bar-background">
                                <div className="bar-fill" style={{ width: `${width}%` }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};


export default function Etrac() {
    const [wallet, setWallet] = useState(() => {
        const stored = localStorage.getItem("wallet");
        return stored ? parseFloat(stored) : 0;
    });

    const [expenses, setExpenses] = useState(() => {
        const stored = localStorage.getItem("expenses");
        return stored ? JSON.parse(stored) : [];
    });

    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [showBalanceForm, setShowBalanceForm] = useState(false);

    useEffect(() => {
        localStorage.setItem("wallet", wallet);
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }, [wallet, expenses]);

    const deleteExpense = (index) => {
        const removed = expenses[index];
        const updated = expenses.filter((_, i) => i !== index);
        setExpenses(updated);
        setWallet(wallet + removed.amount);
    };

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
        setWallet(wallet - expense.amount);
        setShowExpenseForm(false);
    };

    const addIncome = (amount) => {
        setWallet(wallet + amount);
        setShowBalanceForm(false);
    };

    return (
        <div>
            <h1>Expense Tracker</h1>
            <div className="app">
                <div className="app2">
                    <div className="div1">
                        <h2>Wallet Balance: ₹{wallet}</h2>
                        <button
                            type="button"
                            className="bt1"
                            onClick={() => setShowBalanceForm(true)}
                        >
                            + Add Income
                        </button>
                    </div>
                    <div className="div2">
                        <h2>
                            Expenses: ₹{expenses.reduce((total, exp) => total + exp.amount, 0)}
                        </h2>
                        <button
                            type="button"
                            className="bt2"
                            onClick={() => setShowExpenseForm(true)}
                        >
                            + Add Expense
                        </button>


                    </div>

                </div>
                <div className="div3">
                    <ExpensePie expenses={expenses} />
                </div>
            </div>
            <h2 style={{ fontStyle: "italic", fontSize: "26px" }}>
                Recent Transactions{" "}
                <span className="hide-on-mobile" style={{ paddingLeft: "50%" }}>Top Expenses</span>
            </h2>
            <div className="tran">
                <Transaction expenses={expenses} onDelete={deleteExpense} />
                <Expense expenses={expenses} />
            </div>

            {showExpenseForm && (
                <div className="modal-overlay">
                    <AExpense
                        onCancel={() => setShowExpenseForm(false)}
                        onAddExpense={addExpense}
                    />
                </div>
            )}

            {showBalanceForm && (
                <div className="modal-overlay">
                    <ABala
                        onCancel={() => setShowBalanceForm(false)}
                        onAddIncome={addIncome}
                    />
                </div>
            )}
        </div>
    );
}
