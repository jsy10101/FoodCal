import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

interface HeaderProps {
    darkMode: boolean;
    onThemeToggle: () => void;
}

export const Header = ({ darkMode, onThemeToggle }: HeaderProps) => {
    return (
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className={`text-2xl font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    FoodCal Tracker
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {format(new Date(), 'EEEE, MMMM d, yyyy')}
                </p>
            </div>
            <button
                onClick={onThemeToggle}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                    darkMode 
                        ? 'bg-[#1e293b] hover:bg-[#2d3b4f]' 
                        : 'bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label="Toggle theme"
            >
                {darkMode ? (
                    <SunIcon className="h-5 w-5 text-[#e2b340]" />
                ) : (
                    <MoonIcon className="h-5 w-5 text-gray-600" />
                )}
            </button>
        </div>
    );
}; 