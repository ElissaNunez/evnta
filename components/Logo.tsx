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
      <img
        src="/logo-evnta-new.jpg"
        alt="EVNTA"
        className="object-contain rounded-lg"
        style={{ width: size, height: size }}
      />

      {showText && (
        <span
          className="evnta-logo-text"
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
    <img
      src="/logo-evnta-new.jpg"
      alt="EVNTA"
      className="object-contain rounded-md"
      style={{ width: size, height: size }}
    />
  );
}
