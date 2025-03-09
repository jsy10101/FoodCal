import { useState } from 'react';
import { format } from 'date-fns';
import { Entry } from '../types/types';
import { useEntries } from '../hooks/useEntries';
import { useTheme } from '../hooks/useTheme';
import { Header } from '../components/layout/Header';
import { FoodEntryList } from '../components/entries/FoodEntryList';
import { TotalCalories } from '../components/ui/TotalCalories';
import { CalendarView } from './CalendarView';

type View = 'list' | 'calendar';

export const MainLayout = () => {
    const [currentView, setCurrentView] = useState<View>('list');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const { entries, addEntry, deleteEntry, getTotalCalories } = useEntries();
    const { darkMode, setDarkMode } = useTheme();

    const handleAddFood = async (food: { name: string; calories: number }, mealType: Entry['mealType']) => {
        const newEntry: Entry = {
            id: Date.now().toString(),
            foodName: food.name,
            calories: food.calories,
            date: selectedDate.toISOString(),
            mealType,
        };
        addEntry(newEntry);
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        setCurrentView('list'); // Switch to list view when selecting to log food
    };

    const handleViewLog = (date: Date) => {
        setSelectedDate(date);
        setCurrentView('list');
    };

    const filteredEntries = entries.filter(entry => 
        new Date(entry.date).toDateString() === selectedDate.toDateString()
    );

    return (
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-[#0f172a]' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto p-6">
                <Header 
                    darkMode={darkMode}
                    onThemeToggle={() => setDarkMode(!darkMode)}
                />

                {/* View Toggle */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentView('list')}
                            className={`
                                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                                ${currentView === 'list' 
                                    ? 'bg-[--color-primary] text-white' 
                                    : 'text-secondary bg-[--bg-light] dark:bg-[--bg-dark] hover:text-primary'}
                            `}
                        >
                            Food Log
                        </button>
                        <button
                            onClick={() => setCurrentView('calendar')}
                            className={`
                                px-3 py-1.5 text-sm font-medium rounded-md transition-colors
                                ${currentView === 'calendar' 
                                    ? 'bg-[--color-primary] text-white' 
                                    : 'text-secondary bg-[--bg-light] dark:bg-[--bg-dark] hover:text-primary'}
                            `}
                        >
                            Calendar
                        </button>
                    </div>
                    {currentView === 'list' && (
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-secondary">
                                {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    {currentView === 'list' ? (
                        <>
                            <TotalCalories calories={getTotalCalories(filteredEntries)} />
                            <FoodEntryList
                                entries={filteredEntries}
                                onDelete={deleteEntry}
                                onAddFood={handleAddFood}
                            />
                        </>
                    ) : (
                        <CalendarView
                            entries={entries}
                            selectedDate={selectedDate}
                            onDateSelect={handleDateSelect}
                            onViewLog={handleViewLog}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}; 