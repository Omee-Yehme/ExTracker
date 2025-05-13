import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./pie.css"

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const ExpensePie = ({ expenses }) => {
    const categoryTotals = {
        Food: 0,
        Entertainment: 0,
        Travel: 0,
    };

    expenses.forEach((exp) => {
        if (categoryTotals[exp.category] !== undefined) {
            categoryTotals[exp.category] += exp.amount;
        }
    });

    const data = {
        labels: ["Food", "Entertainment", "Travel"],
        datasets: [
            {
                data: [
                    categoryTotals["Food"],
                    categoryTotals["Entertainment"],
                    categoryTotals["Travel"],
                ],
                backgroundColor: ["magenta", "orange", "yellow"],
                borderColor: "white",
                borderWidth: 2,
                
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: "bottom",
                labels: { color: "white"  },
            },
            datalabels: {
                formatter: (value, ctx) => {
                    let total = ctx.chart._metasets[0].total;
                    if (total === 0) return "0%";
                    return Math.round((value / total) * 100) + "%";
                },
                color: "black",
            },
        },
    };

    return (
    <div className="pie">
        <Pie data={data} options={options} />
    </div>
);

};

export default ExpensePie;
