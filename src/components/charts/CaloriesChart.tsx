import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Entry } from '../../types/types';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CaloriesChartProps {
    entries: Entry[];
}

export const CaloriesChart = ({ entries }: CaloriesChartProps) => {
    const isDark = document.documentElement.classList.contains('dark');
    
    const mealTypeCalories = entries.reduce((acc, entry) => {
        acc[entry.mealType] = (acc[entry.mealType] || 0) + entry.calories;
        return acc;
    }, {} as Record<Entry['mealType'], number>);

    const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'] as const;
    const labels = mealTypes.map(type => 
        `${type.charAt(0).toUpperCase() + type.slice(1)} (${mealTypeCalories[type] || 0} kcal)`
    );

    const getComputedStyle = (variableName: string): string => {
        return window.getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
    };

    const data = {
        labels,
        datasets: [
            {
                data: mealTypes.map(type => mealTypeCalories[type] || 0),
                backgroundColor: mealTypes.map(type => 
                    getComputedStyle(`--chart-${type}`)
                ),
                borderColor: isDark ? getComputedStyle('--surface-dark') : getComputedStyle('--surface-light'),
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    color: isDark ? getComputedStyle('--text-secondary-dark') : getComputedStyle('--text-secondary-light'),
                    padding: 16,
                    font: {
                        size: 13,
                        family: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        weight: 'normal' as const,
                    },
                    generateLabels: (chart: any) => {
                        const datasets = chart.data.datasets;
                        return chart.data.labels.map((label: string, i: number) => ({
                            text: label,
                            fillStyle: datasets[0].backgroundColor[i],
                            strokeStyle: datasets[0].borderColor,
                            lineWidth: datasets[0].borderWidth,
                            hidden: false,
                            index: i,
                        }));
                    }
                },
            },
            tooltip: {
                titleFont: {
                    size: 14,
                    family: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    weight: 'bold' as const,
                },
                bodyFont: {
                    size: 13,
                    family: '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                    weight: 'normal' as const,
                },
                padding: 12,
                backgroundColor: isDark ? getComputedStyle('--surface-dark') : getComputedStyle('--surface-light'),
                titleColor: isDark ? getComputedStyle('--text-primary-dark') : getComputedStyle('--text-primary-light'),
                bodyColor: isDark ? getComputedStyle('--text-secondary-dark') : getComputedStyle('--text-secondary-light'),
                callbacks: {
                    label: (context: any) => {
                        const value = context.raw;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                        const percentage = total ? Math.round((value / total) * 100) : 0;
                        return `${value} kcal (${percentage}%)`;
                    },
                },
            },
        },
    };

    const totalCalories = Object.values(mealTypeCalories).reduce((a, b) => a + b, 0);

    return (
        <div className="card p-4">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-base font-semibold text-primary">
                    Calories by Meal Type
                </h2>
                <span className="text-sm font-medium text-secondary">
                    Total: {totalCalories} kcal
                </span>
            </div>
            <div className="h-[200px] flex items-center justify-center">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}; 