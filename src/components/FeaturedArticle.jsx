import React, { useState } from 'react';
import { Play, User } from 'lucide-react';

const FeaturedArticle = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!article) return null;

  return (
    <div 
      className="cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={article.image}
          alt={article.title}
          className={`w-full h-96 object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
        {article.badge && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-xs font-bold tracking-wide">
            {article.badge}
          </div>
        )}
        {article.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
              <Play className="h-8 w-8 text-black" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-blue-600 font-bold uppercase tracking-wide">{article.category}</span>
          {article.time && <span className="text-gray-500">• {article.time}</span>}
        </div>
        <h1 className="font-bold text-4xl mt-3 leading-tight hover:text-blue-600 transition-colors">
          {article.title}
        </h1>
        {article.excerpt && (
          <p className="text-gray-600 mt-3 text-lg leading-relaxed">{article.excerpt}</p>
        )}
        <div className="flex items-center space-x-3 mt-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </div>
            <span className="text-sm font-medium">By {article.author}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;