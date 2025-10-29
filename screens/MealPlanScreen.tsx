
import React, { useState, useMemo } from 'react';
import { MealPlan, Recipe } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, SearchIcon } from '../components/Icons';

interface MealPlanScreenProps {
    mealPlan: MealPlan;
    recipes: Recipe[];
    addRecipeToPlan: (day: string, mealType: 'Breakfast' | 'Lunch' | 'Dinner', recipe: Recipe) => void;
}

const MealCard: React.FC<{ recipe: Recipe | null }> = ({ recipe }) => {
    if (!recipe) return null;
    return (
        <div className="flex items-center bg-white p-3 rounded-xl shadow-sm">
            <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover mr-4" />
            <div>
                <p className="font-bold text-gray-800">{recipe.title}</p>
                <p className="text-sm text-gray-500">{recipe.prepTime}</p>
            </div>
        </div>
    );
};

const AddRecipePlaceholder: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <div onClick={onClick} className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer hover:bg-green-50 hover:border-green-400">
        <div className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center mb-2">
            <PlusIcon />
        </div>
        <p>Drag a recipe here or tap to add</p>
    </div>
);

const RecipePicker: React.FC<{ recipes: Recipe[], onSelect: (recipe: Recipe) => void, onHide: () => void }> = ({ recipes, onSelect, onHide }) => (
    <div className="fixed inset-0 bg-black/40 z-40" onClick={onHide}>
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-3/4 bg-white rounded-t-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b text-center">
                 <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-3"></div>
                 <h3 className="font-bold text-lg">Your Recipes</h3>
            </div>
            <div className="p-4">
                 <div className="relative">
                    <SearchIcon />
                    <input type="text" placeholder="Find a recipe..." className="w-full bg-gray-100 border-transparent rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
            </div>
            <div className="flex-grow overflow-y-auto p-4 grid grid-cols-2 gap-4">
                {recipes.map(recipe => (
                    <div key={recipe.id} onClick={() => onSelect(recipe)} className="cursor-pointer group">
                        <img src={recipe.image} alt={recipe.title} className="w-full h-24 object-cover rounded-lg mb-2 group-hover:opacity-80"/>
                        <p className="font-semibold text-sm text-center">{recipe.title}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const MealPlanScreen: React.FC<MealPlanScreenProps> = ({ mealPlan, recipes, addRecipeToPlan }) => {
    const weekDates = useMemo(() => Object.keys(mealPlan), [mealPlan]);
    const [currentDate, setCurrentDate] = useState(weekDates[0]);
    
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [pickerTarget, setPickerTarget] = useState<{ day: string, mealType: 'Breakfast' | 'Lunch' | 'Dinner' } | null>(null);

    const handleShowPicker = (day: string, mealType: 'Breakfast' | 'Lunch' | 'Dinner') => {
        setPickerTarget({ day, mealType });
        setPickerVisible(true);
    };

    const handleRecipeSelect = (recipe: Recipe) => {
        if (pickerTarget) {
            addRecipeToPlan(pickerTarget.day, pickerTarget.mealType, recipe);
        }
        setPickerVisible(false);
        setPickerTarget(null);
    };

    const changeDate = (direction: 'prev' | 'next') => {
        const currentIndex = weekDates.indexOf(currentDate);
        if (direction === 'prev' && currentIndex > 0) {
            setCurrentDate(weekDates[currentIndex - 1]);
        }
        if (direction === 'next' && currentIndex < weekDates.length - 1) {
            setCurrentDate(weekDates[currentIndex + 1]);
        }
    };
    
    const currentDayMeals = mealPlan[currentDate];

    return (
        <div className="p-4 bg-gray-50 min-h-full">
            <header className="flex justify-between items-center mb-4">
                <button onClick={() => changeDate('prev')}><ChevronLeftIcon /></button>
                <div className="text-center">
                    <h1 className="text-xl font-bold text-gray-800">My Week</h1>
                    <p className="text-gray-500 text-sm">{new Date(currentDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
                </div>
                <button onClick={() => changeDate('next')}><ChevronRightIcon /></button>
            </header>

            <div className="flex justify-between space-x-1 mb-6">
                {weekDates.map(dateStr => {
                     const date = new Date(dateStr);
                     const day = date.toLocaleDateString('en-US', { day: 'numeric' });
                     const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
                     return (
                         <button key={dateStr} onClick={() => setCurrentDate(dateStr)} className={`flex-1 p-2 rounded-lg text-center transition-colors ${currentDate === dateStr ? 'bg-green-500 text-white font-bold' : 'bg-white text-gray-700'}`}>
                             <p className="text-xs">{weekday}</p>
                             <p className="text-lg font-bold">{day}</p>
                         </button>
                     );
                })}
            </div>
            
            <div className="space-y-6">
                <div>
                    <h2 className="font-bold text-lg mb-3 text-gray-800">Breakfast</h2>
                    {currentDayMeals?.Breakfast ? <MealCard recipe={currentDayMeals.Breakfast} /> : <AddRecipePlaceholder onClick={() => handleShowPicker(currentDate, 'Breakfast')} />}
                </div>
                 <div>
                    <h2 className="font-bold text-lg mb-3 text-gray-800">Lunch</h2>
                    {currentDayMeals?.Lunch ? <MealCard recipe={currentDayMeals.Lunch} /> : <AddRecipePlaceholder onClick={() => handleShowPicker(currentDate, 'Lunch')} />}
                </div>
                 <div>
                    <h2 className="font-bold text-lg mb-3 text-gray-800">Dinner</h2>
                    {currentDayMeals?.Dinner ? <MealCard recipe={currentDayMeals.Dinner} /> : <AddRecipePlaceholder onClick={() => handleShowPicker(currentDate, 'Dinner')} />}
                </div>
            </div>

            {isPickerVisible && <RecipePicker recipes={recipes} onSelect={handleRecipeSelect} onHide={() => setPickerVisible(false)} />}
        </div>
    );
};

export default MealPlanScreen;
