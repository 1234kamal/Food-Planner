
export type Screen = 'onboarding' | 'recipes' | 'pantry' | 'mealPlan' | 'profile' | 'recipeDetail';

export interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  image: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  cost: string;
  tags: string[];
  ingredients: { item: string; checked: boolean }[];
  instructions: string[];
  nutritionalInfo: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export type HealthGoal = 'Lose Weight' | 'Gain Muscle' | 'Maintain Health';
export type NutrientFocus = 'High Protein' | 'Low Carb' | 'High Fiber';
export type DietaryRestriction = 'Vegetarian' | 'Vegan' | 'Pescatarian';

export interface DietaryPreferences {
  restrictions: DietaryRestriction[];
  allergies: string[];
  healthGoal: HealthGoal;
  calorieGoal: number;
  nutrientFocus: NutrientFocus[];
}

export interface Meal {
  Breakfast: Recipe | null;
  Lunch: Recipe | null;
  Dinner: Recipe | null;
}

export type MealPlan = Record<string, Meal>;
