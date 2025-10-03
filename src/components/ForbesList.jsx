import React from 'react';
import { Award, Building2, DollarSign, Globe, Users, Zap } from 'lucide-react';
import Button from './Button';

const ForbesList = ({ list }) => {
  const icons = {
    'Forbes 400': DollarSign,
    '30 Under 30': Users,
    'World\'s Billionaires': Globe,
    'Best Companies': Building2,
    'Innovation': Zap
  };
  
  const Icon = icons[list.title] || Award;

  return (
    <div className="relative overflow-hidden rounded-lg h-80 group cursor-pointer shadow-lg">
      <img 
        src={list.image}
        alt={list.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent">
        <div className="absolute bottom-0 p-6 text-white w-full">
          <Icon className="h-10 w-10 mb-3" />
          <h3 className="text-2xl font-bold mb-2">{list.title}</h3>
          <p className="text-gray-200 mb-4 text-sm">{list.description}</p>
          <Button variant="outline" className="bg-white text-black hover:bg-gray-100 border-0 font-semibold">
            View Full List →
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForbesList;