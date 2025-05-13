import { useState } from "react";
import "./AEx.css";


export default function AExpense({ onCancel, onAddExpense, currentBalance }) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = () => {
        if (!title || !price || !category || !date) {
            alert("All fields are required!");
            return;
        }

        const amount = parseFloat(price);
        if (amount > currentBalance) {
            alert("Expense exceeds available wallet balance!");
            return;
        }

        const expense = {
            title,
            amount,
            category,
            date,
        };

        onAddExpense(expense);
        onCancel(); 
        setTitle("");
        setPrice("");
        setCategory("");
        setDate("");
    };

    return (
        <div className="modal">
            <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "black" }}>
                Add Expenses
            </h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    className="input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    name="price"
                    className="input"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <select
                    className="input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="category" 
                >
                    <option value="">Select category</option>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Travel">Travel</option>
                </select>
                <input
                    type="date"
                    name="date"
                    className="input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </div>
            <div style={{ display: "flex", gap: "10px", justifyContent: "start" }}>
                <button className="bt11" type="submit" onClick={handleSubmit}>
                    Add Expense
                </button>
                <button className="bt22" onClick={onCancel}>
                    Cancel
                </button>
            </div>
        </div>
    );
}
