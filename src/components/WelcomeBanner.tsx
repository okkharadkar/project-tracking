import { useState, useEffect } from 'react';

export default function WelcomeBanner() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="relative bg-gradient-to-r from-primary-600 to-primary-800 rounded-lg p-8 overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-white text-3xl font-bold mb-2">{greeting}, Guest</h1>
        <p className="text-primary-100">
          Track your projects and monitor candidate progress seamlessly
        </p>
      </div>
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
        {/* Add decorative pattern or illustration here */}
        <div className="w-full h-full bg-white transform rotate-12 translate-x-1/2"></div>
      </div>
    </div>
  );
} 