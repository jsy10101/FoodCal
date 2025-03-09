import { Entry } from "../../types/types";

interface AddFoodFormProps {
    newFood: string;
    mealType: Entry['mealType'];
    onFoodChange: (value: string) => void;
    onMealTypeChange: (value: Entry['mealType']) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const AddFoodForm = ({
    newFood,
    mealType,
    onFoodChange,
    onMealTypeChange,
    onSubmit
}: AddFoodFormProps) => {
    return (
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
                type="text"
                value={newFood}
                onChange={(e) => onFoodChange(e.target.value)}
                placeholder="Enter food item..."
                className="flex-1 px-4 py-2 rounded-lg outline-none transition-colors bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 border border-gray-200 dark:border-transparent"
            />
            
            <select
                value={mealType}
                onChange={(e) => onMealTypeChange(e.target.value as Entry['mealType'])}
                className="min-w-[180px] px-4 py-2 rounded-lg outline-none appearance-none transition-colors bg-white dark:bg-[#1e293b] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-transparent"
            >
                <option value="breakfast">🌅 Breakfast</option>
                <option value="lunch">🍱 Lunch</option>
                <option value="dinner">🍽️ Dinner</option>
                <option value="snack">🍎 Snack</option>
            </select>

            <button
                type="submit"
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
                + Add
            </button>
        </form>
    );
}; 