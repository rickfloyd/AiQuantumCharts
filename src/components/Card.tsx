import React from 'react';

interface CardProps {
  title: string;
  value?: string | number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, children, className }) => (
  <div className={`bg-gray-900/80 border border-neon-pink rounded-xl shadow-lg p-4 flex flex-col gap-2 ${className || ''}`}>
    <div className="flex items-center gap-2">
      {icon && <span className="text-neon-pink text-xl">{icon}</span>}
      <span className="text-neon-pink font-bold text-lg">{title}</span>
    </div>
    {value && <div className="text-2xl font-mono text-white">{value}</div>}
    {children}
  </div>
);

export default Card;
