import { FoodAPIResponse } from '../types/types';

const MOCK_FOODS = {
    'apple': { label: 'Apple', nutrients: { ENERC_KCAL: 52 } },
    'banana': { label: 'Banana', nutrients: { ENERC_KCAL: 89 } },
    'orange': { label: 'Orange', nutrients: { ENERC_KCAL: 47 } },
    'chicken': { label: 'Chicken breast', nutrients: { ENERC_KCAL: 165 } },
    'rice': { label: 'White Rice', nutrients: { ENERC_KCAL: 130 } },
    'bread': { label: 'Whole Wheat Bread', nutrients: { ENERC_KCAL: 69 } },
    'egg': { label: 'Egg', nutrients: { ENERC_KCAL: 72 } },
    'milk': { label: 'Whole Milk', nutrients: { ENERC_KCAL: 61 } },
};

export const searchFood = async (query: string): Promise<FoodAPIResponse> => {
    try {
        // First try the API
        const response = await fetch(
            `https://api.edamam.com/api/food-database/v2/parser?app_id=${
                import.meta.env.VITE_EDAMAM_APP_ID
            }&app_key=${
                import.meta.env.VITE_EDAMAM_APP_KEY
            }&ingr=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        
        if (data?.hints?.length > 0) {
            return data;
        }
        
        // If API fails or returns no results, use mock data
        const mockFood = findMockFood(query);
        if (mockFood) {
            return {
                hints: [{
                    food: mockFood
                }]
            };
        }
        
        throw new Error('Food not found');
    } catch (error) {
        // If API call fails, use mock data
        const mockFood = findMockFood(query);
        if (mockFood) {
            return {
                hints: [{
                    food: mockFood
                }]
            };
        }
        throw error;
    }
};

const findMockFood = (query: string) => {
    const searchTerm = query.toLowerCase();
    const matchingKey = Object.keys(MOCK_FOODS).find(key => 
        searchTerm.includes(key) || key.includes(searchTerm)
    );
    return matchingKey ? MOCK_FOODS[matchingKey as keyof typeof MOCK_FOODS] : null;
}; 