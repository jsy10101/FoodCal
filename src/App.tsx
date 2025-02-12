// src/App.tsx
import { useState, useEffect } from "react";
import styled from "styled-components";

interface Entry {
    id: string;
    foodName: string;
    calories: number;
    date: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const EntryList = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
`;

const EntryItem = styled.div<{ calories: number }>`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ calories }) =>
      calories < 200 ? "#e8f5e9" : calories < 400 ? "#fffde7" : "#ffebee"};
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const TotalCalories = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
`;

function App() {
    const [entries, setEntries] = useState<Entry[]>(() => {
        const savedEntries = localStorage.getItem("foodCalEntries");
        return savedEntries ? JSON.parse(savedEntries) : [];
    });
    const [newFood, setNewFood] = useState("");

    useEffect(() => {
        localStorage.setItem("foodCalEntries", JSON.stringify(entries));
    }, [entries]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFood.trim()) return;

        try {
            const response = await fetch(
                `https://api.edamam.com/api/food-database/v2/parser?app_id=${
                    import.meta.env.VITE_EDAMAM_APP_ID
                }&app_key=${
                    import.meta.env.VITE_EDAMAM_APP_KEY
                }&ingr=${encodeURIComponent(newFood)}`
            );
            const data = await response.json();

            const foodItem = data?.hints?.[0]?.food;
            if (foodItem) {
                const calories = Math.round(foodItem.nutrients.ENERC_KCAL || 0);
                const newEntry: Entry = {
                    id: Date.now().toString(),
                    foodName: foodItem.label,
                    calories,
                    date: new Date().toISOString(),
                };
                setEntries([...entries, newEntry]);
                setNewFood("");
            } else {
                alert("Food not found in database");
            }
        } catch (error) {
            console.error("Error fetching nutritional data:", error);
            alert("Error fetching food data");
        }
    };

    const totalCalories = entries.reduce(
        (sum, entry) => sum + entry.calories,
        0
    );

    return (
        <Container>
            <h1>FoodCal Tracker</h1>

            <Form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newFood}
                    onChange={(e) => setNewFood(e.target.value)}
                    placeholder="Enter food item..."
                />
                <button type="submit">Add Food</button>
            </Form>

            <EntryList>
                {entries.map((entry) => (
                    <EntryItem key={entry.id} calories={entry.calories}>
                        <span>{entry.foodName}</span>
                        <span>{entry.calories} kcal</span>
                    </EntryItem>
                ))}
            </EntryList>

            <TotalCalories>Total Calories: {totalCalories} kcal</TotalCalories>
        </Container>
    );
}

export default App;
