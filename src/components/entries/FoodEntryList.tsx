import { Entry } from "../../types/types";
import { useMemo, useState } from "react";
import { FoodSearchModal } from "../ui/FoodSearchModal";

interface FoodEntryListProps {
    entries: Entry[];
    onDelete: (id: string) => void;
    onAddFood: (food: { name: string; calories: number }, mealType: Entry['mealType']) => void;
}

export const FoodEntryList = ({ entries, onDelete, onAddFood }: FoodEntryListProps) => {
    const [selectedMealType, setSelectedMealType] = useState<Entry['mealType'] | null>(null);

    const groupedEntries = useMemo(() => {
        const groups: Record<Entry['mealType'], Entry[]> = {
            breakfast: [],
            lunch: [],
            dinner: [],
            snack: []
        };
        
        entries.forEach(entry => {
            groups[entry.mealType].push(entry);
        });
        
        return groups;
    }, [entries]);

    const mealTypeIcons = {
        breakfast: '🌅',
        lunch: '🍱',
        dinner: '🍽️',
        snack: '🍎'
    };

    const handleAddFood = (food: { name: string; calories: number }) => {
        if (selectedMealType) {
            onAddFood(food, selectedMealType);
            setSelectedMealType(null);
        }
    };

    if (entries.length === 0) {
        return (
            <div className="card p-4 text-center text-secondary">
                No food entries yet. Start by adding your meals!
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {(Object.entries(groupedEntries) as [Entry['mealType'], Entry[]][]).map(([mealType, mealEntries]) => (
                    <div key={mealType} className="card overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-[--border-light] dark:border-[--border-dark]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span>{mealTypeIcons[mealType]}</span>
                                    <span className="font-medium capitalize text-primary">
                                        {mealType}
                                    </span>
                                    <span className="text-sm text-secondary">
                                        ({mealEntries.reduce((sum, entry) => sum + entry.calories, 0)} kcal)
                                    </span>
                                </div>
                                <button
                                    onClick={() => setSelectedMealType(mealType)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-[--color-primary] bg-[--bg-light] dark:bg-[--bg-dark] rounded-md hover:opacity-80 transition-opacity"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>
                        <div className="divide-y divide-[--border-light] dark:divide-[--border-dark]">
                            {mealEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    className="px-4 py-2.5 flex justify-between items-center text-primary hover:bg-[--bg-light] dark:hover:bg-[--bg-dark]"
                                >
                                    <span>{entry.foodName}</span>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[--color-primary]">
                                            {entry.calories} kcal
                                        </span>
                                        <button
                                            onClick={() => onDelete(entry.id)}
                                            className="inline-flex items-center px-2 py-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {mealEntries.length === 0 && (
                                <div className="px-4 py-3 text-center text-secondary text-sm">
                                    No entries for {mealType}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <FoodSearchModal
                isOpen={selectedMealType !== null}
                onClose={() => setSelectedMealType(null)}
                onSelect={handleAddFood}
                mealType={selectedMealType || 'breakfast'}
            />
        </>
    );
}; 