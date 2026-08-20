interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  variant?: 'gradient' | 'white' | 'dark';
}

export function Logo({ className = '', size = 40, showText = true, variant = 'gradient' }: LogoProps) {
  const textColor = variant === 'white' ? '#FFFFFF' : '#111827';

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="url(#logoGrad)"/>
        <text x="50" y="62" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif">E</text>
        <circle cx="85" cy="15" r="8" fill="#EC4899"/>
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span
          className="font-bold tracking-tight"
          style={{
            color: textColor,
            fontSize: size * 0.7,
          }}
        >
          EVNTA
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ size = 32 }: { size?: number; variant?: 'gradient' | 'white' | 'dark' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="url(#iconGrad)"/>
      <text x="50" y="62" textAnchor="middle" fill="white" fontSize="48" fontWeight="bold" fontFamily="system-ui, -apple-system, sans-serif">E</text>
      <circle cx="85" cy="15" r="8" fill="#EC4899"/>
      <defs>
        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#DB2777" />
        </linearGradient>
      </defs>
    </svg>
  );
}
