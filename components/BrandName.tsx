interface BrandNameProps {
  className?: string;
  textClass?: string;
}

/**
 * EVNTɅ — The 'A' is rendered as two SVG converging lines (no crossbar)
 * plus a pink dot centered INSIDE the A's lower triangle (not above).
 */
export function BrandName({ className = '', textClass = '' }: BrandNameProps) {
  return (
    <span className={`evnta-logo-text inline-flex items-center ${className}`}>
      {/* Normal letters */}
      <span className={textClass}>EVNT</span>
      
      {/* Lambda A: two converging lines, no crossbar */}
      <svg 
        viewBox="0 0 24 28" 
        className="inline-block mx-[-0.05em]"
        style={{ width: '0.65em', height: '0.85em', verticalAlign: 'baseline', marginBottom: '-0.05em' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left diagonal stroke */}
        <line x1="2" y1="24" x2="12" y2="2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        {/* Right diagonal stroke */}
        <line x1="12" y1="2" x2="22" y2="24" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        {/* Pink dot centered INSIDE the lower triangle of the A */}
        <circle cx="12" cy="16.5" r="2.0" fill="#ec4899" />
      </svg>
    </span>
  );
}
