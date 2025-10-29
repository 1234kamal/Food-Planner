
import React, { useState, useCallback } from 'react';
import { DietaryPreferences, HealthGoal, NutrientFocus, DietaryRestriction } from '../types';
import { BackIcon, InfoIcon, PlusIcon } from '../components/Icons';

interface ProfileScreenProps {
  preferences: DietaryPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<DietaryPreferences>>;
}

const Toggle: React.FC<{ checked: boolean; onChange: (checked: boolean) => void }> = ({ checked, onChange }) => (
    <div 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-green-500' : 'bg-gray-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-6' : ''}`}></div>
    </div>
);

const ProfileScreen: React.FC<ProfileScreenProps> = ({ preferences, setPreferences }) => {
    const [localPrefs, setLocalPrefs] = useState(preferences);

    const handleRestrictionToggle = (restriction: DietaryRestriction) => {
        const newRestrictions = localPrefs.restrictions.includes(restriction)
            ? localPrefs.restrictions.filter(r => r !== restriction)
            : [...localPrefs.restrictions, restriction];
        setLocalPrefs({ ...localPrefs, restrictions: newRestrictions });
    };

    const handleAllergyRemove = (allergy: string) => {
        setLocalPrefs({ ...localPrefs, allergies: localPrefs.allergies.filter(a => a !== allergy) });
    };
    
    // In a real app, this would come from a form submit
    const handleAllergyAdd = (allergy: string) => {
        if(allergy && !localPrefs.allergies.includes(allergy)) {
             setLocalPrefs({ ...localPrefs, allergies: [...localPrefs.allergies, allergy] });
        }
    };

    const handleNutrientToggle = (focus: NutrientFocus) => {
        const newFocus = localPrefs.nutrientFocus.includes(focus)
            ? localPrefs.nutrientFocus.filter(f => f !== focus)
            : [...localPrefs.nutrientFocus, focus];
        setLocalPrefs({ ...localPrefs, nutrientFocus: newFocus });
    };

    const handleSave = () => {
        setPreferences(localPrefs);
        // Maybe show a success message
    };

    return (
        <div className="bg-gray-50 min-h-full">
            <header className="sticky top-0 bg-gray-50/80 backdrop-blur-sm z-10 flex justify-between items-center p-4 border-b">
                <BackIcon />
                <h1 className="text-xl font-bold text-gray-800">Dietary Preferences</h1>
                <button onClick={handleSave} className="font-bold text-green-600">Save</button>
            </header>
            
            <div className="p-4 space-y-6">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h2 className="font-bold text-lg mb-4 text-gray-800">Dietary Restrictions</h2>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                            <span className="text-gray-700">Vegetarian</span>
                            <Toggle checked={localPrefs.restrictions.includes('Vegetarian')} onChange={() => handleRestrictionToggle('Vegetarian')} />
                       </div>
                       <div className="flex justify-between items-center">
                            <span className="text-gray-700">Vegan</span>
                            <Toggle checked={localPrefs.restrictions.includes('Vegan')} onChange={() => handleRestrictionToggle('Vegan')} />
                       </div>
                       <div className="flex justify-between items-center">
                            <span className="text-gray-700">Pescatarian</span>
                            <Toggle checked={localPrefs.restrictions.includes('Pescatarian')} onChange={() => handleRestrictionToggle('Pescatarian')} />
                       </div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h2 className="font-bold text-lg mb-2 text-gray-800">Allergies & Intolerances</h2>
                    <p className="text-sm text-gray-500 mb-4">Select common allergies or add your own.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {localPrefs.allergies.map(allergy => (
                            <div key={allergy} className="bg-red-100 text-red-700 text-sm font-semibold px-3 py-1 rounded-full flex items-center">
                                {allergy}
                                <button onClick={() => handleAllergyRemove(allergy)} className="ml-2 text-red-700">&times;</button>
                            </div>
                        ))}
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Add custom allergy..." onKeyDown={(e) => { if(e.key === 'Enter') { handleAllergyAdd(e.currentTarget.value); e.currentTarget.value = ''; } }} className="w-full bg-gray-100 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-green-400" />
                        <PlusIcon />
                    </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h2 className="font-bold text-lg mb-4 text-gray-800">My Health Goals</h2>
                    <div className="space-y-3">
                        {(['Lose Weight', 'Gain Muscle', 'Maintain Health'] as HealthGoal[]).map(goal => (
                            <div key={goal} onClick={() => setLocalPrefs({...localPrefs, healthGoal: goal})} className={`flex justify-between items-center p-3 rounded-lg border-2 cursor-pointer ${localPrefs.healthGoal === goal ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}>
                                <span className={localPrefs.healthGoal === goal ? 'font-semibold text-green-700' : 'text-gray-700'}>{goal}</span>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${localPrefs.healthGoal === goal ? 'border-green-500' : 'border-gray-300'}`}>
                                    {localPrefs.healthGoal === goal && <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="font-bold text-lg text-gray-800">Nutritional Focus</h2>
                      <InfoIcon />
                    </div>
                    <p className="text-sm text-gray-500 mb-4">Daily Calorie Goal</p>
                    <div className="mb-4">
                       <div className="flex justify-between items-center mb-2">
                           <span className="text-gray-500">1,200</span>
                           <span className="font-bold text-green-600 text-lg">{localPrefs.calorieGoal.toLocaleString()} kcal</span>
                           <span className="text-gray-500">3,000</span>
                       </div>
                       <input type="range" min="1200" max="3000" step="50" value={localPrefs.calorieGoal} onChange={(e) => setLocalPrefs({...localPrefs, calorieGoal: parseInt(e.target.value)})} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500" />
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Prioritize Nutrients</p>
                    <div className="flex space-x-2">
                        {(['High Protein', 'Low Carb', 'High Fiber'] as NutrientFocus[]).map(focus => (
                           <button key={focus} onClick={() => handleNutrientToggle(focus)} className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${localPrefs.nutrientFocus.includes(focus) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                               {focus}
                           </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
