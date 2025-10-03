import React, { useState } from 'react';

const ArticleCard = ({ article, size = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg">
        <img 
          src={article.image}
          alt={article.title}
          className={`w-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${size === 'large' ? 'h-64' : 'h-48'}`}
        />
        {article.badge && (
          <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-xs font-bold tracking-wide">
            {article.badge}
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-blue-600 font-bold uppercase tracking-wide">{article.category}</span>
          {article.time && <span className="text-gray-500">• {article.time}</span>}
        </div>
        <h3 className={`font-bold mt-2 group-hover:text-blue-600 transition-colors leading-snug ${
          size === 'large' ? 'text-2xl' : 'text-lg'
        }`}>
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">{article.excerpt}</p>
        )}
        <div className="flex items-center mt-2 text-xs text-gray-600">
          <span>By {article.author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;