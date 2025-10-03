import React, { useState, useEffect} from 'react';
import { Search, Menu, X, ChevronDown, Bell, User, Play, TrendingUp, Award, Building2, Briefcase, Globe, Users, DollarSign, Zap } from 'lucide-react';
import Login from '../pages/login';
// API Configuration
const API_BASE_URL = 'http://localhost:8000/api'; // Change to your Django backend URL

// Button Component
const Button = ({ children, variant = 'default', size = 'default', className = '', onClick, ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50';
  const variants = {
    default: 'bg-black text-white hover:bg-gray-800',
    outline: 'border border-gray-300 bg-transparent hover:bg-gray-100',
    ghost: 'hover:bg-gray-100',
    blue: 'bg-blue-600 text-white hover:bg-blue-700'
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 py-1 text-sm',
    icon: 'h-10 w-10'
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Input Component
const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen, categories }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      {/* Top Banner */}
      <div className="bg-black text-white text-xs py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>🔥 Breaking: Market Update</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-gray-300">Forbes Magazine</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">Forbes Events</a>
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            
            <div className="text-3xl font-bold tracking-tight">FORBES</div>
            
            <div className="hidden lg:flex items-center space-x-1">
              {categories.map((category) => (
                <div 
                  key={category.name}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(category.name)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="flex items-center space-x-1 px-3 py-2 hover:text-blue-600 transition-colors text-sm font-medium">
                    <span>{category.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  
                  {activeMenu === category.name && category.subcategories && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-white border shadow-xl rounded-md py-2 z-50">
                      {category.subcategories.map((subItem) => (
                        <a
                          key={subItem}
                          href="#"
                          className="block px-4 py-2 hover:bg-blue-50 text-sm hover:text-blue-600 transition-colors"
                        >
                          {subItem}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="hidden md:block text-sm">Subscribe</Button>
            <Button size="sm">Sign In</Button>
          </div>
        </div>

        {searchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search Forbes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white max-h-96 overflow-y-auto">
          {categories.map((category) => (
            <div key={category.name} className="border-b">
              <button className="w-full px-4 py-3 text-left font-semibold flex items-center justify-between hover:bg-gray-50">
                {category.name}
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

// Featured Article Component
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

// Article Card Component
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

// Trending Sidebar Component
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

// Forbes List Component
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

// Newsletter Component
const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        // API call to Django backend
        const response = await fetch(`${API_BASE_URL}/newsletter/subscribe/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email })
        });
        
        if (response.ok) {
          setSubscribed(true);
          setTimeout(() => {
            setSubscribed(false);
            setEmail('');
          }, 3000);
        }
      } catch (error) {
        console.error('Subscription error:', error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 rounded-lg shadow-xl">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">The Daily Forbes</h2>
        <p className="mb-8 text-lg text-blue-100">
          Get the latest breaking news, market insights, and exclusive analysis delivered to your inbox every morning.
        </p>
        {subscribed ? (
          <div className="bg-green-500 text-white px-8 py-4 rounded-lg inline-flex items-center space-x-2 text-lg font-semibold">
            <span>✓</span>
            <span>Successfully subscribed!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-black h-12 text-base"
              required
            />
            <Button type="submit" className="bg-black text-white hover:bg-gray-900 h-12 px-8 font-semibold">
              Subscribe Now
            </Button>
          </form>
        )}
        <p className="mt-4 text-xs text-blue-200">
          By subscribing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

// Video Section Component
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

// Main App Component
const ForbesReplica = () => {
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
      // Fetch all data from Django API
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
      // Fallback to demo data
      setDemoData();
      setLoading(false);
    }
  };

  const setDemoData = () => {
    setCategories([
      {
        name: 'Innovation',
        subcategories: ['AI & Big Data', 'Cloud 100', 'Consumer Tech', 'Enterprise Tech', 'Science', 'Venture Capital']
      },
      {
        name: 'Money',
        subcategories: ['Banking', 'Crypto & Blockchain', 'ETFs & Mutual Funds', 'Fintech', 'Investing', 'Personal Finance']
      },
      {
        name: 'Leadership',
        subcategories: ['Careers', 'CEO Network', 'CMO Network', 'Diversity', 'Executive Travel', 'Women']
      },
      {
        name: 'Lifestyle',
        subcategories: ['Arts', 'Autos', 'Dining', 'Entertainment', 'Real Estate', 'Shopping', 'Sports', 'Travel']
      },
      {
        name: 'Lists',
        subcategories: ['Forbes 400', '30 Under 30', 'Billionaires', 'Best Employers', 'Global 2000']
      }
    ]);

    setFeaturedArticle({
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop',
      badge: 'COVER STORY',
      category: 'Leadership',
      title: 'The New Era Of Leadership: How CEOs Are Redefining Success In 2025',
      excerpt: 'From remote work to AI integration, today\'s business leaders are navigating unprecedented challenges while creating opportunities for sustainable growth and innovation.',
      author: 'Alexandra Roberts',
      time: '2 hours ago'
    });

    setArticles([
      {
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
        category: 'Innovation',
        title: 'How Artificial Intelligence Is Revolutionizing Healthcare, Finance, And Manufacturing',
        author: 'Michael Chen',
        time: '3 hours ago'
      },
      {
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
        category: 'Markets',
        title: 'Stock Market Reaches New Heights As Tech Giants Report Record-Breaking Quarterly Earnings',
        author: 'Sarah Johnson',
        time: '4 hours ago'
      },
      {
        image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop',
        category: 'Entrepreneurs',
        title: 'This 28-Year-Old Founder Built A Billion-Dollar Startup In Just Three Years',
        author: 'David Lee',
        time: '5 hours ago',
        badge: 'EXCLUSIVE'
      },
      {
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
        category: 'Sustainability',
        title: 'Why The World\'s Billionaires Are Making Massive Bets On Clean Energy Technology',
        author: 'Emma Wilson',
        time: '6 hours ago'
      },
      {
        image: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=600&h=400&fit=crop',
        category: 'Real Estate',
        title: 'Luxury Property Market Defies Economic Uncertainty With Record Sales',
        author: 'Robert Martinez',
        time: '7 hours ago'
      },
      {
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
        category: 'Crypto',
        title: 'Bitcoin Surges Past New Milestone As Institutional Adoption Accelerates',
        author: 'Jessica Taylor',
        time: '8 hours ago'
      }
    ]);

    setTrendingStories([
      { category: 'Breaking', title: 'Federal Reserve Announces Major Interest Rate Decision', time: '15 min ago' },
      { category: 'Technology', title: 'Apple\'s Latest iPhone Breaks All Previous Sales Records', time: '1 hour ago' },
      { category: 'Billionaires', title: 'Elon Musk\'s Net Worth Increases By $20 Billion In Single Day', time: '2 hours ago' },
      { category: 'Markets', title: 'Cryptocurrency Markets Rally As Bitcoin Reaches Historic High', time: '3 hours ago' },
      { category: 'Real Estate', title: 'Manhattan Penthouse Sells For Unprecedented $200 Million', time: '4 hours ago' }
    ]);

    setForbesLists([
      {
        title: 'Forbes 400',
        description: 'The definitive ranking of wealth in America',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop'
      },
      {
        title: '30 Under 30',
        description: 'Young innovators transforming industries worldwide',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop'
      },
      {
        title: 'World\'s Billionaires',
        description: 'The complete ranking of the richest people on Earth',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop'
      }
    ]);

    setVideos([
      {
        thumbnail: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&h=400&fit=crop',
        title: 'CEO Interview: The Future of Global Business',
        duration: '12:45'
      },
      {
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        title: 'Market Analysis: What Investors Need to Know',
        duration: '8:30'
      },
      {
        thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop',
        title: 'Innovation Spotlight: Breaking Tech Trends',
        duration: '15:20'
      }
    ]);
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
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} categories={categories} />
      
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

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-6 gap-8 mb-12">
            <div className="md:col-span-2">
              <h4 className="font-bold text-2xl mb-4">FORBES</h4>
              <p className="text-gray-400 text-sm mb-4">
                The world's leading business media brand.
              </p>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="hover:text-white">Facebook</a>
                <a href="#" className="hover:text-white">Twitter</a>
                <a href="#" className="hover:text-white">LinkedIn</a>
                <a href="#" className="hover:text-white">Instagram</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Advertise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sections</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Business</a></li>
                <li><a href="#" className="hover:text-white">Technology</a></li>
                <li><a href="#" className="hover:text-white">Money</a></li>
                <li><a href="#" className="hover:text-white">Leadership</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Lists</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Forbes 400</a></li>
                <li><a href="#" className="hover:text-white">30 Under 30</a></li>
                <li><a href="#" className="hover:text-white">Billionaires</a></li>
                <li><a href="#" className="hover:text-white">Best Employers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
                <li><a href="#" className="hover:text-white">Mobile App</a></li>
                <li><a href="#" className="hover:text-white">RSS Feed</a></li>
                <li><a href="#" className="hover:text-white">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Forbes Media LLC. All Rights Reserved.
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
              <a href="#" className="hover:text-white">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForbesReplica;