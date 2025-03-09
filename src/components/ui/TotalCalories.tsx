interface TotalCaloriesProps {
    calories: number;
}

export const TotalCalories = ({ calories }: TotalCaloriesProps) => {
    return (
        <div className="bg-[#1e293b] rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-2">Total Calories</div>
            <div className="text-4xl font-semibold text-[#e2b340]">
                {calories} kcal
            </div>
        </div>
    );
}; 