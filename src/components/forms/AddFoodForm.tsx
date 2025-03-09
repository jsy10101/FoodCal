import { PlusIcon } from "@heroicons/react/24/outline";
import { Entry } from "../../types/types";
import { MealTypeSelector } from "./MealTypeSelector";

interface AddFoodFormProps {
    newFood: string;
    mealType: Entry['mealType'];
    onFoodChange: (value: string) => void;
    onMealTypeChange: (type: Entry['mealType']) => void;
    onSubmit: (e: React.FormEvent) => Promise<void>;
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
                className="flex-1 bg-[#1e293b] text-gray-100 rounded-lg px-4 py-2 
                border border-gray-700 focus:outline-none focus:border-[#e2b340]
                placeholder-gray-500"
            />
            <div className="flex gap-3">
                <MealTypeSelector
                    selectedMealType={mealType}
                    onMealTypeChange={onMealTypeChange}
                />
                <button 
                    type="submit" 
                    className="bg-[#22c55e] text-white px-4 py-2 rounded-lg hover:bg-[#16a34a] 
                    transition-colors flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    <span className="hidden sm:inline">Add</span>
                </button>
            </div>
        </form>
    );
}; 