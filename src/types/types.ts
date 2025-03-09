export interface Entry {
    id: string;
    foodName: string;
    calories: number;
    date: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface FoodAPIResponse {
    hints?: Array<{
        food: {
            label: string;
            nutrients: {
                ENERC_KCAL: number;
            };
        };
    }>;
} 