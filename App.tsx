
import React, { useState, useCallback } from 'react';
import { Screen, Recipe, GroceryItem, DietaryPreferences, MealPlan } from './types';
import { MOCK_RECIPES, MOCK_PANTRY, MOCK_PREFERENCES, MOCK_MEAL_PLAN } from './constants';
import OnboardingScreen from './screens/OnboardingScreen';
import RecipesScreen from './screens/RecipesScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';
import PantryScreen from './screens/PantryScreen';
import ProfileScreen from './screens/ProfileScreen';
import MealPlanScreen from './screens/MealPlanScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [recipes, setRecipes] = useState<Recipe[]>(MOCK_RECIPES);
  const [pantry, setPantry] = useState<GroceryItem[]>(MOCK_PANTRY);
  const [preferences, setPreferences] = useState<DietaryPreferences>(MOCK_PREFERENCES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [mealPlan, setMealPlan] = useState<MealPlan>(MOCK_MEAL_PLAN);

  const viewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setScreen('recipeDetail');
  };

  const navigate = (newScreen: Screen) => {
    setScreen(newScreen);
  };
  
  const addRecipeToPlan = useCallback((day: string, mealType: 'Breakfast' | 'Lunch' | 'Dinner', recipe: Recipe) => {
    setMealPlan(prevPlan => ({
      ...prevPlan,
      [day]: {
        ...prevPlan[day],
        [mealType]: recipe,
      }
    }));
  }, []);


  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen onGetStarted={() => navigate('recipes')} />;
      case 'recipes':
        return <RecipesScreen recipes={recipes} onSelectRecipe={viewRecipe} setRecipes={setRecipes} pantry={pantry} preferences={preferences} />;
      case 'recipeDetail':
        return selectedRecipe ? <RecipeDetailScreen recipe={selectedRecipe} onBack={() => navigate('recipes')} /> : null;
      case 'pantry':
        return <PantryScreen pantry={pantry} setPantry={setPantry} />;
      case 'profile':
        return <ProfileScreen preferences={preferences} setPreferences={setPreferences} />;
      case 'mealPlan':
        return <MealPlanScreen mealPlan={mealPlan} recipes={recipes} addRecipeToPlan={addRecipeToPlan} />;
      default:
        return <OnboardingScreen onGetStarted={() => navigate('recipes')} />;
    }
  };

  const showNav = !['onboarding', 'recipeDetail'].includes(screen);

  return (
    <div className="max-w-md mx-auto min-h-screen font-sans bg-white shadow-lg flex flex-col">
      <main className="flex-grow pb-20">
        {renderScreen()}
      </main>
      {showNav && <BottomNav activeScreen={screen} onNavigate={navigate} />}
    </div>
  );
};

export default App;
