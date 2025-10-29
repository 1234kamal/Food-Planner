
import React, { useState } from 'react';
import { GroceryItem } from '../types';
import { SearchIcon, EditIcon, TrashIcon, PlusIcon } from '../components/Icons';

interface PantryScreenProps {
  pantry: GroceryItem[];
  setPantry: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
}

const PantryItem: React.FC<{ item: GroceryItem, onEdit: () => void, onDelete: () => void }> = ({ item, onEdit, onDelete }) => (
    <div className="flex items-center bg-white p-3 rounded-xl shadow-sm">
        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover mr-4" />
        <div className="flex-grow">
            <p className="font-bold text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.quantity}</p>
        </div>
        <div className="flex items-center space-x-3">
            <button onClick={onEdit} className="text-gray-500 hover:text-blue-500">
                <EditIcon />
            </button>
            <button onClick={onDelete} className="text-gray-500 hover:text-red-500">
                <TrashIcon />
            </button>
        </div>
    </div>
);

const PantryScreen: React.FC<PantryScreenProps> = ({ pantry, setPantry }) => {
  const [activeTab, setActiveTab] = useState<'current' | 'staples'>('current');

  const handleDelete = (id: string) => {
      setPantry(pantry.filter(item => item.id !== id));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-full">
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-200 text-green-700 flex items-center justify-center rounded-full font-bold text-lg">S</div>
            <h1 className="text-2xl font-bold text-gray-800">My Groceries</h1>
        </div>
        <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
        </button>
      </header>
      
      <div className="flex bg-gray-200 p-1 rounded-full mb-4">
          <button 
            onClick={() => setActiveTab('current')}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'current' ? 'bg-white text-green-600 shadow' : 'text-gray-600'}`}
          >
              Current Groceries
          </button>
          <button
            onClick={() => setActiveTab('staples')}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === 'staples' ? 'bg-white text-green-600 shadow' : 'text-gray-600'}`}
          >
              Weekly Staples
          </button>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
        <input 
          type="text" 
          placeholder="Search groceries..." 
          className="w-full bg-white border border-gray-200 rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="space-y-3">
          {pantry.map(item => (
              <PantryItem key={item.id} item={item} onEdit={() => {}} onDelete={() => handleDelete(item.id)} />
          ))}
      </div>

      <button className="fixed bottom-24 right-4 z-10 w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110">
          <PlusIcon />
      </button>

    </div>
  );
};

export default PantryScreen;
