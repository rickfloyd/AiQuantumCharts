import React from 'react';
import { Activity } from 'lucide-react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="relative">
      <Activity className="w-8 h-8 text-pink-500 animate-pulse" />
    </div>
  );
};

export default AnimatedLogo;
