// src/App.tsx
import { Entry } from "./types/types";
import { useEntries } from "./hooks/useEntries";
import { useTheme } from "./hooks/useTheme";
import { Header } from "./components/layout/Header";
import { FoodEntryList } from "./components/entries/FoodEntryList";
import { TotalCalories } from "./components/ui/TotalCalories";

function App() {
    const { entries, addEntry, deleteEntry, getTotalCalories } = useEntries();
    const { darkMode, setDarkMode } = useTheme();

    const handleAddFood = async (food: { name: string; calories: number }, mealType: Entry['mealType']) => {
        const newEntry: Entry = {
            id: Date.now().toString(),
            foodName: food.name,
            calories: food.calories,
            date: new Date().toISOString(),
            mealType,
        };
        addEntry(newEntry);
    };

    return (
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto p-6">
                <Header 
                    darkMode={darkMode}
                    onThemeToggle={() => setDarkMode(!darkMode)}
                />

                <div className="space-y-6">
                    <TotalCalories calories={getTotalCalories()} />
                    <FoodEntryList
                        entries={entries}
                        onDelete={deleteEntry}
                        onAddFood={handleAddFood}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
