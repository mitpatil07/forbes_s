import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import FeaturedArticle from './components/FeaturedArticle';
import ArticleCard from './components/ArticleCard';
import TrendingSidebar from './components/TrendingSidebar';
import ForbesList from './components/ForbesList';
import VideoSection from './components/VideoSection';
import Newsletter from './components/Newsletter';
import Footer from './pages/Footer';
import { API_BASE_URL } from './config/api.js';

import {
  demoCategories,
  demoFeaturedArticle,
  demoArticles,
  demoTrendingStories,
  demoForbesLists,
  demoVideos
} from './data/data';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [trendingStories, setTrendingStories] = useState([]);
  const [forbesLists, setForbesLists] = useState([]);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [
        categoriesRes,
        featuredRes,
        articlesRes,
        trendingRes,
        listsRes,
        videosRes
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/categories/`),
        fetch(`${API_BASE_URL}/articles/featured/`),
        fetch(`${API_BASE_URL}/articles/`),
        fetch(`${API_BASE_URL}/trending/`),
        fetch(`${API_BASE_URL}/lists/`),
        fetch(`${API_BASE_URL}/videos/`)
      ]);

      const categoriesData = await categoriesRes.json();
      const featuredData = await featuredRes.json();
      const articlesData = await articlesRes.json();
      const trendingData = await trendingRes.json();
      const listsData = await listsRes.json();
      const videosData = await videosRes.json();

      setCategories(categoriesData);
      setFeaturedArticle(featuredData);
      setArticles(articlesData);
      setTrendingStories(trendingData);
      setForbesLists(listsData);
      setVideos(videosData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setDemoData();
      setLoading(false);
    }
  };

  const setDemoData = () => {
    setCategories(demoCategories);
    setFeaturedArticle(demoFeaturedArticle);
    setArticles(demoArticles);
    setTrendingStories(demoTrendingStories);
    setForbesLists(demoForbesLists);
    setVideos(demoVideos);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-4">FORBES</div>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        categories={categories} 
      />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <FeaturedArticle article={featuredArticle} />
          </div>
          <div>
            <TrendingSidebar stories={trendingStories} />
          </div>
        </div>

        {/* Latest Stories */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-3">
            <h2 className="text-3xl font-bold">LATEST STORIES</h2>
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">View All →</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article, idx) => (
              <ArticleCard key={idx} article={article} />
            ))}
          </div>
        </section>

        {/* Videos Section */}
        {videos.length > 0 && <VideoSection videos={videos} />}


        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <FeaturedArticle article={featuredArticle} />
          </div>
          <div>
            <TrendingSidebar stories={trendingStories} />
          </div>
        </div>

        
        {/* Forbes Lists */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 border-b-2 border-black pb-3">
            <h2 className="text-3xl font-bold">FORBES LISTS</h2>
            <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">View All Lists →</a>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {forbesLists.map((list, idx) => (
              <ForbesList key={idx} list={list} />
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default App;