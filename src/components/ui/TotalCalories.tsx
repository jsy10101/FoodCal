import { useTheme } from "../../hooks/useTheme";

interface TotalCaloriesProps {
    calories: number;
}

export const TotalCalories = ({ calories }: TotalCaloriesProps) => {
    const { darkMode } = useTheme();
    
    return (
        <div className="p-4 rounded-lg bg-white dark:bg-[#1e293b] shadow-sm dark:shadow-none">
            <h2 className="text-sm font-medium mb-1 text-gray-500 dark:text-gray-400">
                Total Calories
            </h2>
            <p className="text-3xl font-semibold text-amber-600 dark:text-[#e2b340]">
                {calories} kcal
            </p>
        </div>
    );
}; 