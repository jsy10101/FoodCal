import { useState, useEffect } from 'react';
import { Entry } from '../types/types';

export const useEntries = () => {
    const [entries, setEntries] = useState<Entry[]>(() => {
        const savedEntries = localStorage.getItem("foodCalEntries");
        return savedEntries ? JSON.parse(savedEntries) : [];
    });

    useEffect(() => {
        localStorage.setItem("foodCalEntries", JSON.stringify(entries));
    }, [entries]);

    const addEntry = (entry: Entry) => {
        setEntries([...entries, entry]);
    };

    const deleteEntry = (id: string) => {
        setEntries(entries.filter(entry => entry.id !== id));
    };

    const getTotalCalories = () => {
        return entries.reduce((sum, entry) => sum + entry.calories, 0);
    };

    return {
        entries,
        addEntry,
        deleteEntry,
        getTotalCalories
    };
}; 