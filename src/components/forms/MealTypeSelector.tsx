import { Entry } from "../../types/types";
import { useMemo } from "react";

interface MealTypeSelectorProps {
    selectedMealType: Entry['mealType'];
    onMealTypeChange: (type: Entry['mealType']) => void;
}

export const MealTypeSelector = ({ selectedMealType, onMealTypeChange }: MealTypeSelectorProps) => {
    const mealTypeOptions = useMemo(() => [
        { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
        { value: 'lunch', label: 'Lunch', icon: '🍱' },
        { value: 'dinner', label: 'Dinner', icon: '🍽️' },
        { value: 'snack', label: 'Snack', icon: '🍎' },
    ], []);

    return (
        <div className="relative min-w-[180px]">
            <select
                value={selectedMealType}
                onChange={(e) => onMealTypeChange(e.target.value as Entry['mealType'])}
                className="w-full appearance-none bg-[#1e293b] text-gray-100 rounded-lg px-4 py-2
                border border-gray-700 focus:outline-none focus:border-[#e2b340]"
            >
                {mealTypeOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-[#1e293b]">
                        {option.icon} {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                ▼
            </div>
        </div>
    );
}; 