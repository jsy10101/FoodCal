import { useState } from 'react';
import { Entry } from '../../types/types';

interface FoodSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (food: { name: string; calories: number }) => void;
    mealType: Entry['mealType'];
}

export const FoodSearchModal = ({ isOpen, onClose, onSelect, mealType }: FoodSearchModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Array<{ name: string; calories: number }>>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Mock search function - replace with actual API call
    const handleSearch = async (query: string) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            // Mock data - replace with actual API response
            const mockResults = [
                { name: 'Apple', calories: 95 },
                { name: 'Banana', calories: 105 },
                { name: 'Orange', calories: 62 },
                { name: 'Greek Yogurt', calories: 130 },
                { name: 'Oatmeal', calories: 150 },
            ].filter(item => 
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(mockResults);
            setIsLoading(false);
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[--surface-light] dark:bg-[--surface-dark] w-full max-w-lg rounded-xl shadow-xl">
                {/* Header */}
                <div className="px-6 py-4 border-b border-[--border-light] dark:border-[--border-dark]">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl" role="img" aria-label={mealType}>
                                {mealType === 'breakfast' ? '🌅' :
                                 mealType === 'lunch' ? '🍱' :
                                 mealType === 'dinner' ? '🍽️' : '🍎'}
                            </span>
                            <h2 className="text-xl font-semibold text-primary capitalize">
                                Add to {mealType}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-secondary hover:text-primary transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[--bg-light] dark:hover:bg-[--bg-dark]"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Search Input */}
                <div className="p-6 border-b border-[--border-light] dark:border-[--border-dark]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search for food..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                handleSearch(e.target.value);
                            }}
                            className="input-field w-full pl-11 py-3 text-lg"
                            autoFocus
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-lg">
                            🔍
                        </span>
                    </div>
                </div>

                {/* Results */}
                <div className="max-h-[400px] overflow-y-auto px-4 py-2">
                    {isLoading ? (
                        <div className="py-8 text-center text-secondary">
                            <div className="inline-block animate-spin mr-2">⏳</div>
                            Searching...
                        </div>
                    ) : searchResults.length > 0 ? (
                        <div className="space-y-1">
                            {searchResults.map((food, index) => (
                                <button
                                    key={index}
                                    onClick={() => onSelect(food)}
                                    className="w-full px-4 py-3 flex justify-between items-center text-primary bg-[--surface-light] dark:bg-[--surface-dark] hover:bg-[--bg-light] dark:hover:bg-[--bg-dark] transition-colors rounded-lg border border-[--border-light] dark:border-[--border-dark] hover:border-[--color-primary] dark:hover:border-[--color-primary]"
                                >
                                    <span className="text-base font-medium">{food.name}</span>
                                    <span className="text-[--color-primary] text-sm font-medium">
                                        {food.calories} kcal
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : searchQuery ? (
                        <div className="py-8 text-center text-secondary">
                            <div className="text-2xl mb-2">🔍</div>
                            <p>No results found for "{searchQuery}"</p>
                            <p className="text-sm mt-1 text-secondary">Try searching for something else</p>
                        </div>
                    ) : (
                        <div className="py-8 text-center text-secondary">
                            <div className="text-2xl mb-2">👆</div>
                            <p>Start typing to search for food</p>
                            <p className="text-sm mt-1 text-secondary">Example: apple, banana, yogurt</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[--border-light] dark:border-[--border-dark]">
                    <button
                        onClick={onClose}
                        className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-secondary bg-[--bg-light] dark:bg-[--bg-dark] hover:text-primary hover:bg-[--bg-light] dark:hover:bg-[--bg-dark] rounded-lg transition-colors w-full"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}; 