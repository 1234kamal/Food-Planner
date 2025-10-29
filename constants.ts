
import { Recipe, GroceryItem, DietaryPreferences, MealPlan } from './types';

export const MOCK_RECIPES: Recipe[] = [
  {
    id: '1',
    title: 'Quick Lentil Soup',
    description: "A hearty and nutritious soup that's perfect for a chilly day. It's budget-friendly and easy to make.",
    image: 'https://picsum.photos/seed/lentil/600/400',
    prepTime: '10 min',
    cookTime: '20 min',
    servings: 4,
    cost: '$',
    tags: ['Vegan', 'Budget-Friendly'],
    ingredients: [
      { item: '1 tbsp olive oil', checked: false },
      { item: '1 onion, chopped', checked: false },
      { item: '2 carrots, chopped', checked: false },
      { item: '2 celery stalks, chopped', checked: false },
      { item: '1 cup brown or green lentils, rinsed', checked: false },
      { item: '6 cups vegetable broth', checked: false },
      { item: '1 tsp dried thyme', checked: false },
    ],
    instructions: [
      'Heat olive oil in a large pot or Dutch oven over medium heat.',
      'Add onion, carrots, and celery and cook until softened, about 5-7 minutes.',
      'Stir in lentils, vegetable broth, and thyme.',
      'Bring to a boil, then reduce heat and simmer for 20-25 minutes, or until lentils are tender.',
      'Season with salt and pepper to taste before serving.',
    ],
    nutritionalInfo: {
      calories: '250 kcal',
      protein: '15g',
      carbs: '40g',
      fat: '5g',
    },
  },
  {
    id: '2',
    title: '15-Min Chicken & Veggie Stir-fry',
    description: 'A super-fast and flavorful stir-fry that is packed with protein and colorful vegetables.',
    image: 'https://picsum.photos/seed/stirfry/600/400',
    prepTime: '5 min',
    cookTime: '10 min',
    servings: 2,
    cost: '$$',
    tags: ['High-Protein', 'Quick Meal'],
    ingredients: [
        { item: '1 lb boneless, skinless chicken breast, cut into chunks', checked: false },
        { item: '1 tbsp soy sauce', checked: false },
        { item: '1 tbsp honey', checked: false },
        { item: '1 tsp sesame oil', checked: false },
        { item: '2 cups mixed vegetables (broccoli, bell peppers, carrots)', checked: false },
        { item: '1 tbsp olive oil', checked: false },
    ],
    instructions: [
        'In a small bowl, whisk together soy sauce, honey, and sesame oil.',
        'Heat olive oil in a large skillet or wok over medium-high heat.',
        'Add chicken and cook until browned and cooked through.',
        'Add mixed vegetables and stir-fry for 3-5 minutes until crisp-tender.',
        'Pour the sauce over the chicken and vegetables and toss to coat. Serve immediately.',
    ],
    nutritionalInfo: {
      calories: '450 kcal',
      protein: '40g',
      carbs: '25g',
      fat: '20g',
    },
  },
  {
    id: '3',
    title: 'Simple Avocado & Tomato Salad',
    description: 'A refreshing and simple salad that takes only minutes to prepare. Perfect for a light lunch or side dish.',
    image: 'https://picsum.photos/seed/avocado/600/400',
    prepTime: '10 min',
    cookTime: '0 min',
    servings: 2,
    cost: '$',
    tags: ['Gluten-Free', 'Low-Carb'],
    ingredients: [
        { item: '2 large ripe avocados, diced', checked: false },
        { item: '1 pint cherry tomatoes, halved', checked: false },
        { item: '1/4 red onion, thinly sliced', checked: false },
        { item: '1/4 cup fresh cilantro, chopped', checked: false },
        { item: 'Juice of 1 lime', checked: false },
        { item: '2 tbsp olive oil', checked: false },
    ],
    instructions: [
        'In a medium bowl, gently combine diced avocados, cherry tomatoes, red onion, and cilantro.',
        'In a small bowl, whisk together lime juice and olive oil.',
        'Pour the dressing over the salad and toss gently to combine.',
        'Season with salt and pepper to taste. Serve immediately.',
    ],
    nutritionalInfo: {
      calories: '300 kcal',
      protein: '4g',
      carbs: '15g',
      fat: '25g',
    },
  },
];

export const MOCK_PANTRY: GroceryItem[] = [
  { id: '1', name: 'Milk', quantity: '1 liter', image: 'https://picsum.photos/seed/milk/100/100' },
  { id: '2', name: 'Tomatoes', quantity: '5 pcs', image: 'https://picsum.photos/seed/tomatoes/100/100' },
  { id: '3', name: 'Bread', quantity: '1 loaf', image: 'https://picsum.photos/seed/bread/100/100' },
  { id: '4', name: 'Chicken Breast', quantity: '2 lbs', image: 'https://picsum.photos/seed/chicken/100/100'},
  { id: '5', name: 'Lentils', quantity: '1 can', image: 'https://picsum.photos/seed/lentils/100/100'},
  { id: '6', name: 'Avocado', quantity: '3 pcs', image: 'https://picsum.photos/seed/avocados/100/100'},
];

export const MOCK_PREFERENCES: DietaryPreferences = {
  restrictions: ['Vegan'],
  allergies: ['Gluten', 'Peanuts'],
  healthGoal: 'Lose Weight',
  calorieGoal: 2200,
  nutrientFocus: ['Low Carb'],
};

const getWeekDates = () => {
  const dates: Record<string, MealPlan[string]> = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayKey = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }).replace(' ', ' ');
     dates[`${date.toLocaleDateString('en-CA')}`] = {
      Breakfast: null,
      Lunch: null,
      Dinner: null,
    };
  }
  return dates;
};

export const MOCK_MEAL_PLAN: MealPlan = getWeekDates();
MOCK_MEAL_PLAN[Object.keys(MOCK_MEAL_PLAN)[0]].Breakfast = MOCK_RECIPES[2];
