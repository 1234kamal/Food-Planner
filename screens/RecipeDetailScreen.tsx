
import React, { useState } from 'react';
import { Recipe } from '../types';
import { BackIcon, HeartIcon, ShareIcon, ChevronDownIcon } from '../components/Icons';

interface RecipeDetailScreenProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = ({ recipe, onBack }) => {
  const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>('ingredients');
  const [ingredients, setIngredients] = useState(recipe.ingredients);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients[index].checked = !newIngredients[index].checked;
    setIngredients(newIngredients);
  };
  
  return (
    <div className="bg-white min-h-full">
      <div className="relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 left-4 flex items-center">
            <button onClick={onBack} className="bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white transition">
                <BackIcon />
            </button>
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
            <button onClick={() => setIsFavorite(!isFavorite)} className="bg-white/80 p-2 rounded-full text-red-500 hover:bg-white transition">
                <HeartIcon filled={isFavorite} />
            </button>
            <button className="bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white transition">
                <ShareIcon />
            </button>
        </div>
      </div>
      
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{recipe.title}</h1>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        
        <div className="flex justify-around text-center bg-gray-100 p-4 rounded-xl mb-6">
            <div>
                <p className="font-bold text-gray-800">Prep Time</p>
                <p className="text-green-600 font-semibold">{recipe.prepTime}</p>
            </div>
            <div>
                <p className="font-bold text-gray-800">Cook Time</p>
                <p className="text-green-600 font-semibold">{recipe.cookTime}</p>
            </div>
            <div>
                <p className="font-bold text-gray-800">Servings</p>
                <p className="text-green-600 font-semibold">{recipe.servings}</p>
            </div>
        </div>
        
        <div className="flex border-b border-gray-200 mb-4">
            <button 
                onClick={() => setActiveTab('ingredients')}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${activeTab === 'ingredients' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            >
                Ingredients
            </button>
            <button 
                onClick={() => setActiveTab('instructions')}
                className={`w-1/2 py-3 font-semibold text-center transition-colors ${activeTab === 'instructions' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
            >
                Instructions
            </button>
        </div>

        {activeTab === 'ingredients' && (
            <div className="space-y-3">
                {ingredients.map((ing, index) => (
                    <div key={index} onClick={() => handleToggleIngredient(index)} className="flex items-center bg-gray-50 p-3 rounded-lg cursor-pointer">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center mr-4 ${ing.checked ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}>
                            {ing.checked && <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <span className={`flex-1 ${ing.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>{ing.item}</span>
                    </div>
                ))}
            </div>
        )}
        
        {activeTab === 'instructions' && (
            <ol className="space-y-4 list-decimal list-inside text-gray-700">
                {recipe.instructions.map((step, index) => (
                    <li key={index} className="pl-2 leading-relaxed">
                        <span className="font-semibold text-gray-800">Step {index + 1}:</span> {step}
                    </li>
                ))}
            </ol>
        )}
        
        <div className="mt-6 border-t border-gray-200 pt-4">
            <details className="group">
                <summary className="flex justify-between items-center font-semibold text-gray-800 cursor-pointer">
                    Nutritional Information
                    <ChevronDownIcon />
                </summary>
                <div className="mt-4 text-gray-600 grid grid-cols-2 gap-2">
                    <p><strong>Calories:</strong> {recipe.nutritionalInfo.calories}</p>
                    <p><strong>Protein:</strong> {recipe.nutritionalInfo.protein}</p>
                    <p><strong>Carbs:</strong> {recipe.nutritionalInfo.carbs}</p>
                    <p><strong>Fat:</strong> {recipe.nutritionalInfo.fat}</p>
                </div>
            </details>
        </div>
      </div>
      
      <div className="sticky bottom-0 bg-white p-4 border-t border-gray-200">
          <button className="w-full bg-green-500 text-white font-bold py-4 rounded-full text-lg hover:bg-green-600 transition-colors">
            Start Cooking
          </button>
      </div>
    </div>
  );
};

export default RecipeDetailScreen;
