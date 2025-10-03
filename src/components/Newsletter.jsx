import React, { useState } from 'react';
import Button from './button';
import Input from './Input';

const API_BASE_URL = 'http://localhost:8000/api';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
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

export default Newsletter;