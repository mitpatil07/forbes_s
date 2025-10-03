import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;