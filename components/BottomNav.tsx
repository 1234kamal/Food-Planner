
import React from 'react';
import { Screen } from '../types';
import { RecipeIcon, PantryIcon, MealPlanIcon, ProfileIcon } from './Icons';

interface BottomNavProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => {
  const activeColor = 'text-green-500';
  const inactiveColor = 'text-gray-500';
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-1/4 pt-2 pb-1 transition-colors duration-200 ${isActive ? activeColor : inactiveColor}`}
    >
      {icon}
      <span className={`text-xs mt-1 font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, onNavigate }) => {
  const navItems = [
    { screen: 'recipes', label: 'Recipes', icon: <RecipeIcon /> },
    { screen: 'pantry', label: 'Pantry', icon: <PantryIcon /> },
    { screen: 'mealPlan', label: 'Plan', icon: <MealPlanIcon /> },
    { screen: 'profile', label: 'Profile', icon: <ProfileIcon /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-up">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavItem
            key={item.screen}
            icon={item.icon}
            label={item.label}
            isActive={activeScreen === item.screen}
            onClick={() => onNavigate(item.screen as Screen)}
          />
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
