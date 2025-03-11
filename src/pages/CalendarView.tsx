import { useState } from "react";
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday,
    startOfWeek,
    endOfWeek,
    startOfYear,
    endOfYear,
    getDay,
} from "date-fns";
import { Entry } from "../types/types";

interface CalendarViewProps {
    entries: Entry[];
    onDateSelect: (date: Date) => void;
    selectedDate: Date;
    onViewLog: (date: Date) => void;
}

export const CalendarView = ({
    entries,
    onViewLog,
}: CalendarViewProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);

    const getDaysInMonth = (date: Date) => {
        const start = startOfWeek(startOfMonth(date));
        const end = endOfWeek(endOfMonth(date));
        return eachDayOfInterval({ start, end });
    };

    const days = getDaysInMonth(currentMonth);

    const getEntriesForDate = (date: Date) => {
        return entries.filter((entry) => isSameDay(new Date(entry.date), date));
    };

    const getTotalCaloriesForDate = (date: Date) => {
        const dayEntries = getEntriesForDate(date);
        return dayEntries.reduce((sum, entry) => sum + entry.calories, 0);
    };

    const handleDayClick = (date: Date) => {
        if (!isSameMonth(date, currentMonth)) return;
        setSelectedDay(selectedDay && isSameDay(date, selectedDay) ? null : date);
    };

    const previousMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
        setSelectedDay(null);
    };

    const nextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
        setSelectedDay(null);
    };

    // Get contribution data for the year
    const getContributionData = () => {
        const now = new Date();
        const start = startOfYear(now);
        const end = endOfYear(now);
        const days = eachDayOfInterval({ start, end });

        const weeks: Date[][] = [];
        let currentWeek: Date[] = [];

        const firstDayOfWeek = getDay(start);
        for (let i = 0; i < firstDayOfWeek; i++) {
            currentWeek.push(null as any);
        }

        days.forEach((day) => {
            currentWeek.push(day);

            if (getDay(day) === 6) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        });

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null as any);
            }
            weeks.push(currentWeek);
        }

        return weeks;
    };

    const getContributionLevel = (date: Date | null): number => {
        if (!date) return 0;
        const calories = getTotalCaloriesForDate(date);
        if (calories === 0) return 0;
        if (calories < 1500) return 1;
        if (calories < 2000) return 2;
        if (calories < 2500) return 3;
        return 4;
    };

    const weeks = getContributionData();
    const totalEntries = entries.length;

    return (
        <div className="space-y-6">
            <div className="card p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-semibold text-primary">
                            {format(currentMonth, "MMMM yyyy")}
                        </h2>
                        <button
                            onClick={() => {
                                setCurrentMonth(new Date());
                                setSelectedDay(null);
                            }}
                            className="px-3 py-1.5 text-sm font-medium rounded-md bg-[--bg-light] dark:bg-[--bg-dark] text-secondary hover:text-primary transition-colors"
                        >
                            Today
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={previousMonth}
                            className="inline-flex items-center justify-center w-9 h-9 text-secondary bg-[--bg-light] dark:bg-[--bg-dark] rounded-md hover:text-primary transition-colors"
                        >
                            ←
                        </button>
                        <button
                            onClick={nextMonth}
                            className="inline-flex items-center justify-center w-9 h-9 text-secondary bg-[--bg-light] dark:bg-[--bg-dark] rounded-md hover:text-primary transition-colors"
                        >
                            →
                        </button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Weekday headers */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                        (day) => (
                            <div
                                key={day}
                                className="text-center text-sm font-medium text-secondary py-2"
                            >
                                {day}
                            </div>
                        )
                    )}

                    {/* Calendar days */}
                    {days.map((day) => {
                        const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;
                        const isCurrentMonth = isSameMonth(day, currentMonth);
                        const dayEntries = getEntriesForDate(day);
                        const hasEntries = dayEntries.length > 0;
                        const totalCalories = getTotalCaloriesForDate(day);
                        const isCurrentDay = isToday(day);

                        return (
                            <div 
                                key={day.toISOString()} 
                                className="relative group"
                                onClick={() => isCurrentMonth && handleDayClick(day)}
                            >
                                <div
                                    className={`
                                        relative w-full min-h-[80px] p-2 text-left rounded-lg border transition-all overflow-hidden cursor-pointer
                                        ${!isCurrentMonth ? "opacity-30 cursor-default" : "hover:border-[--color-primary] hover:shadow-sm"}
                                        ${isSelected 
                                            ? "border-[--color-primary] bg-[--bg-light] dark:bg-[--bg-dark] shadow-sm" 
                                            : "border-[--border-light] dark:border-[--border-dark] bg-[--surface-light] dark:bg-[--surface-dark]"
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className={`
                                            text-sm font-medium rounded-full w-7 h-7 flex items-center justify-center transition-colors
                                            ${isCurrentDay ? "bg-[--color-primary] text-white" : isSelected ? "bg-[--color-primary] text-white" : "text-primary"}
                                        `}>
                                            {format(day, "d")}
                                        </span>
                                        {hasEntries && (
                                            <span className="text-xs font-medium text-[--color-primary]">
                                                {totalCalories} kcal
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Bar - Only show for current month */}
                                    {isCurrentMonth && (
                                        <div className={`
                                            absolute inset-x-0 bottom-0 py-1.5 px-1.5 
                                            flex flex-wrap gap-1 justify-end items-center
                                            transition-all duration-200 
                                            ${isSelected ? 'bg-transparent' : 'bg-gradient-to-t from-[--surface-light] via-[--surface-light] to-transparent dark:from-[--surface-dark] dark:via-[--surface-dark]'}
                                            ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
                                        `}>
                                            {hasEntries && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onViewLog(day);
                                                    }}
                                                    className="text-[10px] px-2 py-1 rounded bg-[--surface-light] dark:bg-[--surface-dark] text-secondary hover:text-primary transition-colors"
                                                >
                                                    View
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Year Timeline */}
            <div className="card p-0">
                <div className="p-3">
                    <h3 className="text-sm font-medium text-secondary">
                        {totalEntries} food entries in the last year
                    </h3>
                </div>

                {/* Contribution Graph */}
                <div className="flex justify-center">
                    <div className="flex flex-col justify-between text-[10px] text-secondary w-4">
                        <span></span>
                        <span>M</span>
                        <span></span>
                        <span>W</span>
                        <span></span>
                        <span>F</span>
                        <span></span>
                    </div>
                    <div className="flex overflow-x-auto">
                        <div className="flex gap-[2px] min-w-fit">
                            {weeks.map((week, weekIndex) => (
                                <div
                                    key={weekIndex}
                                    className="flex flex-col gap-[2px]"
                                >
                                    {week.map((day, dayIndex) => {
                                        const level = getContributionLevel(day);
                                        const baseClasses =
                                            "w-[11px] h-[11px] rounded-[3px] px-1 py-1";
                                        const colorClasses = !day
                                            ? "bg-transparent"
                                            : level === 0
                                            ? "bg-[#ebedf0] dark:bg-[#161b22] border border-[#0000000d] dark:border-[#ffffff0d]"
                                            : level === 1
                                            ? "bg-[#40c463] opacity-20 border-0"
                                            : level === 2
                                            ? "bg-[#40c463] opacity-40 border-0"
                                            : level === 3
                                            ? "bg-[#40c463] opacity-70 border-0"
                                            : "bg-[#40c463] border-0";

                                        return (
                                            <button
                                                key={day ? day.toISOString() : dayIndex}
                                                onClick={() => day && handleDayClick(day)}
                                                disabled={!day}
                                                className={`${baseClasses} ${colorClasses} ${
                                                    day && "hover:ring-1 hover:ring-[#40c463]/30"
                                                }`}
                                                title={
                                                    day
                                                        ? `${format(day, "MMM d, yyyy")}: ${getTotalCaloriesForDate(day)} calories`
                                                        : ""
                                                }
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-2 p-3">
                    <span className="text-[10px] text-secondary">Less</span>
                    <div className="flex gap-[2px]">
                        <div className="w-[11px] h-[11px] rounded-[2px] bg-[#ebedf0] dark:bg-[#161b22] border border-[#0000000d] dark:border-[#ffffff0d]" />
                        <div className="w-[11px] h-[11px] rounded-[2px] bg-[#40c463] opacity-20" />
                        <div className="w-[11px] h-[11px] rounded-[2px] bg-[#40c463] opacity-40" />
                        <div className="w-[11px] h-[11px] rounded-[2px] bg-[#40c463] opacity-70" />
                        <div className="w-[11px] h-[11px] rounded-[2px] bg-[#40c463]" />
                    </div>
                    <span className="text-[10px] text-secondary">More</span>
                </div>
            </div>
        </div>
    );
};
