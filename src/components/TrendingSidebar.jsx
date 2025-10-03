import React from 'react';
import { TrendingUp } from 'lucide-react';

const TrendingSidebar = ({ stories }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg sticky top-24">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <TrendingUp className="h-5 w-5 text-red-600 mr-2" />
        TRENDING
      </h3>
      {stories.map((story, idx) => (
        <div key={idx} className="mb-5 pb-5 border-b last:border-b-0 hover:bg-white p-3 -mx-3 rounded transition-colors cursor-pointer">
          <div className="flex items-start space-x-3">
            <span className="text-3xl font-bold text-gray-200 leading-none">{idx + 1}</span>
            <div className="flex-1">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wide">{story.category}</span>
              <h4 className="font-semibold hover:text-blue-600 text-sm mt-1 leading-snug">
                {story.title}
              </h4>
              {story.time && <span className="text-xs text-gray-500 mt-1 block">{story.time}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingSidebar;