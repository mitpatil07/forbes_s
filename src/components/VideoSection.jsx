import React from 'react';
import { Play } from 'lucide-react';

const VideoSection = ({ videos }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Forbes Videos</h2>
        <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">View All →</a>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {videos.map((video, idx) => (
          <div key={idx} className="cursor-pointer group">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                <div className="bg-white/90 rounded-full p-3 group-hover:bg-white transition-colors">
                  <Play className="h-6 w-6 text-black" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 text-xs rounded">
                {video.duration}
              </div>
            </div>
            <h3 className="font-semibold mt-3 group-hover:text-blue-600 transition-colors">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VideoSection;