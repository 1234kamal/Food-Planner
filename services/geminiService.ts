
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe, GroceryItem, DietaryPreferences } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using mock data.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      description: { type: Type.STRING },
      prepTime: { type: Type.STRING },
      cookTime: { type: Type.STRING },
      servings: { type: Type.INTEGER },
      cost: { type: Type.STRING, description: "Cost estimation as '$', '$$', or '$$$'"},
      tags: { type: Type.ARRAY, items: { type: Type.STRING } },
      ingredients: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            item: { type: Type.STRING },
            checked: { type: Type.BOOLEAN, description: "Always false" }
          },
          required: ['item', 'checked'],
        }
      },
      instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
      nutritionalInfo: {
        type: Type.OBJECT,
        properties: {
          calories: { type: Type.STRING },
          protein: { type: Type.STRING },
          carbs: { type: Type.STRING },
          fat: { type: Type.STRING }
        },
        required: ['calories', 'protein', 'carbs', 'fat'],
      }
    },
    required: ['title', 'description', 'prepTime', 'cookTime', 'servings', 'cost', 'tags', 'ingredients', 'instructions', 'nutritionalInfo'],
  },
};


export const generateRecipes = async (pantry: GroceryItem[], preferences: DietaryPreferences): Promise<Recipe[]> => {
  if (!ai) {
    throw new Error("Gemini AI client not initialized. Check API_KEY.");
  }
  
  const pantryList = pantry.map(item => `${item.name} (${item.quantity})`).join(', ');
  
  const prompt = `
    You are a creative chef creating recipes for the SmartMeals app.
    Based on the user's pantry and dietary preferences, generate 5 unique meal recipes.
    
    User's Pantry: ${pantryList}.
    
    User's Preferences:
    - Dietary Restrictions: ${preferences.restrictions.join(', ') || 'None'}
    - Allergies: ${preferences.allergies.join(', ') || 'None'}
    - Health Goal: ${preferences.healthGoal}
    - Daily Calorie Goal: ~${preferences.calorieGoal} kcal
    - Nutritional Focus: ${preferences.nutrientFocus.join(', ') || 'Balanced'}

    Prioritize recipes that heavily use the available pantry items. 
    Be creative and suggest delicious, easy-to-follow meals.
    Ensure the recipes align with all the user's dietary restrictions and preferences.
    Provide a diverse range of meal types (e.g., breakfast, lunch, dinner, snack).
    For each recipe, generate a unique, appealing title and a short, enticing description.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const jsonText = response.text.trim();
    const generatedRecipes = JSON.parse(jsonText);
    
    return generatedRecipes.map((recipe: any, index: number) => ({
      ...recipe,
      id: `gemini-${Date.now()}-${index}`,
      image: `https://picsum.photos/seed/${recipe.title.split(' ').join('')}/${600}/${400}`
    }));

  } catch (error) {
    console.error("Error generating recipes:", error);
    throw new Error("Failed to generate recipes from Gemini API.");
  }
};
