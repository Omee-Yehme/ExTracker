import { useState } from "react";
import "./AEx.css";

export default function ABala({ onCancel, onAddIncome }) {
    const [income, setIncome] = useState("");

    const handleAddBalance = () => {
        const amount = parseFloat(income);
        if (!income || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid income amount.");
            return;
        }

        onAddIncome(amount);
        onCancel(); // close modal
        setIncome(""); // optional if modal closes
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 style={{ fontWeight: "bold", marginBottom: "20px", color: "black" }}>
                    Add Balance
                </h2>
                <div style={{ display: "flex", gap: "10px" }}>
                    <input
                        type="number"
                        placeholder="Income Amount"
                        name="income"
                        className="input"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                    <button className="bt11" type="submit" onClick={handleAddBalance}>
                        Add Balance
                    </button>
                    <button className="bt22" onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
