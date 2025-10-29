
import React from 'react';
import { SaveMoneyIcon, QuickPlanningIcon, DiscoverRecipesIcon } from '../components/Icons';

interface OnboardingScreenProps {
  onGetStarted: () => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl p-4 flex items-center space-x-4">
    <div className="bg-green-100 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  </div>
);

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0">
        <img src="https://picsum.photos/seed/pantry/600/400" alt="Fresh vegetables and bread on a wooden table" className="w-full h-64 object-cover" />
      </div>
      <div className="flex-grow flex flex-col justify-between p-6 text-center bg-gray-50">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your pantry is full of possibilities.</h1>
          <p className="text-gray-600 mb-8">
            SmartMeals helps you create delicious meals with the ingredients you already own. Perfect for busy households and savvy solo cooks.
          </p>
          <div className="space-y-4 text-left mb-8">
            <FeatureCard icon={<SaveMoneyIcon />} title="Save Money" description="Reduce food waste" />
            <FeatureCard icon={<QuickPlanningIcon />} title="Quick Planning" description="Easy meal ideas" />
            <FeatureCard icon={<DiscoverRecipesIcon />} title="Discover Recipes" description="Use what you have" />
          </div>
        </div>
        <div className="flex justify-center space-x-2 mb-8">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
            <div className="w-2.5 h-2.5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={onGetStarted}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-full text-lg hover:bg-green-600 transition-colors duration-300 shadow-lg shadow-green-500/30"
          >
            Get Started
          </button>
          <p className="mt-6 text-gray-500">
            Already have an account? <a href="#" className="font-bold text-green-500">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnboardingScreen;
