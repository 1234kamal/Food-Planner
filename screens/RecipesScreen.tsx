
import React, { useState, useCallback } from 'react';
import { Recipe, GroceryItem, DietaryPreferences } from '../types';
import { SearchIcon, TimeIcon, MoneyIcon, RefreshIcon } from '../components/Icons';
import { generateRecipes } from '../services/geminiService';

interface RecipesScreenProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  pantry: GroceryItem[];
  preferences: DietaryPreferences;
}

const RecipeCard: React.FC<{ recipe: Recipe; onSelect: () => void }> = ({ recipe, onSelect }) => (
  <div onClick={onSelect} className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transform hover:scale-105 transition-transform duration-300">
    <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mb-2">
        {recipe.tags.map(tag => (
          <span key={tag} className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">{tag}</span>
        ))}
      </div>
      <h3 className="font-bold text-lg text-gray-800 mb-2">{recipe.title}</h3>
      <div className="flex items-center text-gray-500 text-sm">
        <div className="flex items-center mr-4">
          <TimeIcon />
          <span className="ml-1">{recipe.prepTime}</span>
        </div>
        <div className="flex items-center">
          <MoneyIcon />
          <span className="ml-1">{recipe.cost}</span>
        </div>
      </div>
    </div>
  </div>
);

const RecipesScreen: React.FC<RecipesScreenProps> = ({ recipes, onSelectRecipe, setRecipes, pantry, preferences }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleGenerateRecipes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newRecipes = await generateRecipes(pantry, preferences);
      setRecipes(newRecipes);
    } catch (err) {
      setError("Sorry, we couldn't generate new recipes. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [pantry, preferences, setRecipes]);

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Meals for You</h1>
        <button className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <img src="https://picsum.photos/seed/avatar/40/40" alt="profile" className="w-8 h-8 rounded-full" />
        </button>
      </header>
      
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input 
          type="text" 
          placeholder="Search your recipes..." 
          className="w-full bg-white border border-gray-200 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="flex space-x-2 mb-6">
        <select className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <option>Meal Type</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>
        <select className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <option>Prep Time</option>
          <option>Under 15 min</option>
          <option>Under 30 min</option>
        </select>
        <select className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400">
          <option>Diet</option>
          <option>Vegan</option>
          <option>Vegetarian</option>
          <option>Gluten-Free</option>
        </select>
      </div>

      {error && <div className="text-center text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</div>}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
             <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="w-full h-40 bg-gray-300"></div>
                <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
                    <div className="flex items-center text-gray-500 text-sm">
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                        <div className="h-4 bg-gray-300 rounded w-12 ml-4"></div>
                    </div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => onSelectRecipe(recipe)} />
          ))}
        </div>
      )}
      
      <button 
        onClick={handleGenerateRecipes}
        disabled={loading}
        className="fixed bottom-24 right-4 z-10 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed">
        {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
            <RefreshIcon />
        )}
      </button>
    </div>
  );
};

export default RecipesScreen;
