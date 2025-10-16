interface QuantumLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export default function QuantumLogo({ size = 'md', animated = true, className = '' }: QuantumLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const animationClass = animated ? 'animate-cyber-pulse' : '';

  return (
    <div className={`${sizeClasses[size]} ${animationClass} ${className} relative rounded-full overflow-hidden border-2 border-fluorescent-pink shadow-neon-pink`}>
      {/* Digital Globe Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover rounded-full digital-globe-filter"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/digital-logo.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <div className="w-full h-full bg-gradient-to-br from-fluorescent-pink to-electric-blue rounded-full flex items-center justify-center">
          <span className="text-deep-black font-bold text-xs">AQ</span>
        </div>
      </video>
      
      {/* Overlay Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-fluorescent-pink/20 to-electric-blue/20 animate-pulse-glow"></div>
      
      {/* Chrome Ring Overlay */}
      <div className="absolute inset-0 rounded-full border-2 border-gray-300/50 shadow-lg pointer-events-none"></div>
    </div>
  );
}