// src/App.tsx
import { useState } from "react";
import { Entry } from "./types/types";
import { searchFood } from "./services/foodService";
import { useEntries } from "./hooks/useEntries";
import { useTheme } from "./hooks/useTheme";
import { Header } from "./components/layout/Header";
import { AddFoodForm } from "./components/forms/AddFoodForm";
import { FoodEntryList } from "./components/entries/FoodEntryList";
import { TotalCalories } from "./components/ui/TotalCalories";

function App() {
    const [newFood, setNewFood] = useState("");
    const [mealType, setMealType] = useState<Entry['mealType']>('breakfast');
    const { entries, addEntry, deleteEntry, getTotalCalories } = useEntries();
    const { darkMode, setDarkMode } = useTheme();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFood.trim()) return;

        try {
            const data = await searchFood(newFood);
            const foodItem = data?.hints?.[0]?.food;
            
            if (foodItem) {
                const calories = Math.round(foodItem.nutrients.ENERC_KCAL || 0);
                const newEntry: Entry = {
                    id: Date.now().toString(),
                    foodName: foodItem.label,
                    calories,
                    date: new Date().toISOString(),
                    mealType,
                };
                addEntry(newEntry);
                setNewFood("");
            } else {
                alert("Food not found in database");
            }
        } catch (error) {
            console.error("Error fetching nutritional data:", error);
            alert("Error fetching food data");
        }
    };

    const getMealTypeColor = (type: Entry['mealType']) => {
        const colors = {
            breakfast: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-100',
            lunch: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-100',
            dinner: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-100',
            snack: 'bg-pink-100 dark:bg-pink-900/50 text-pink-800 dark:text-pink-100'
        };
        return colors[type];
    };

    const mealTypeOptions = [
        { value: 'breakfast', label: 'Breakfast', icon: '🌅' },
        { value: 'lunch', label: 'Lunch', icon: '🍱' },
        { value: 'dinner', label: 'Dinner', icon: '🍽️' },
        { value: 'snack', label: 'Snack', icon: '🍎' },
    ];

    return (
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
            <div className="h-full">
                <div className="p-6">
                    <Header 
                        darkMode={darkMode}
                        onThemeToggle={() => setDarkMode(!darkMode)}
                    />

                    <div className="flex flex-col xl:flex-row">
                        <div className="flex-1 space-y-6">
                            <AddFoodForm
                                newFood={newFood}
                                mealType={mealType}
                                onFoodChange={setNewFood}
                                onMealTypeChange={setMealType}
                                onSubmit={handleSubmit}
                            />

                            <FoodEntryList
                                entries={entries}
                                onDelete={deleteEntry}
                            />
                        </div>

                        <div className="xl:w-[350px] xl:ml-6 mt-6 xl:mt-0">
                            <div className="sticky top-6">
                                <TotalCalories calories={getTotalCalories()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
