import { Entry } from "../../types/types";
import { useMemo } from "react";
import { useTheme } from "../../hooks/useTheme";

interface FoodEntryListProps {
    entries: Entry[];
    onDelete: (id: string) => void;
}

export const FoodEntryList = ({ entries, onDelete }: FoodEntryListProps) => {
    const { darkMode } = useTheme();
    
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

    if (entries.length === 0) {
        return (
            <div className={`rounded-lg p-6 text-center ${darkMode ? 'bg-[#1e293b] text-gray-400' : 'bg-white text-gray-500'}`}>
                No food entries yet. Start by adding your meals!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {(Object.entries(groupedEntries) as [Entry['mealType'], Entry[]][]).map(([mealType, mealEntries]) => (
                mealEntries.length > 0 && (
                    <div key={mealType} className={`rounded-lg overflow-hidden ${darkMode ? 'bg-[#1e293b]' : 'bg-white shadow-sm'}`}>
                        <div className={`px-4 py-3 border-b ${darkMode ? 'border-gray-700/50' : 'border-gray-100'}`}>
                            <div className="flex items-center gap-2">
                                <span>{mealTypeIcons[mealType]}</span>
                                <span className={`font-medium capitalize ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {mealType}
                                </span>
                                <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                    ({mealEntries.reduce((sum, entry) => sum + entry.calories, 0)} kcal)
                                </span>
                            </div>
                        </div>
                        <div className={`divide-y ${darkMode ? 'divide-gray-700/50' : 'divide-gray-100'}`}>
                            {mealEntries.map(entry => (
                                <div
                                    key={entry.id}
                                    className={`px-4 py-3 flex justify-between items-center ${
                                        darkMode 
                                            ? 'hover:bg-gray-800/30 text-gray-200' 
                                            : 'hover:bg-gray-50 text-gray-700'
                                    }`}
                                >
                                    <span>{entry.foodName}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[#e2b340]">{entry.calories} kcal</span>
                                        <button
                                            onClick={() => onDelete(entry.id)}
                                            className="text-red-500 hover:text-red-400 text-sm px-3 py-1 
                                            rounded border border-red-500/30 hover:border-red-400/50 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
}; 