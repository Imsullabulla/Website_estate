
import React, { memo } from 'react';

// Pattern computed once at module level for performance
const patternSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><rect x='12' y='10' width='10' height='10' rx='1.5' fill='rgba(0,0,0,0.025)'/><circle cx='90' cy='18' r='5' fill='rgba(0,0,0,0.02)'/><line x1='50' y1='12' x2='50' y2='24' stroke='rgba(0,0,0,0.025)' stroke-width='1.5' stroke-linecap='round'/><line x1='44' y1='18' x2='56' y2='18' stroke='rgba(0,0,0,0.025)' stroke-width='1.5' stroke-linecap='round'/><polygon points='18,55 24,43 30,55' fill='rgba(0,0,0,0.02)'/><circle cx='70' cy='52' r='4' fill='rgba(0,0,0,0.018)'/><rect x='100' y='48' width='8' height='12' rx='1' fill='rgba(0,0,0,0.02)'/><line x1='42' y1='50' x2='42' y2='60' stroke='rgba(0,0,0,0.02)' stroke-width='1.2' stroke-linecap='round'/><line x1='37' y1='55' x2='47' y2='55' stroke='rgba(0,0,0,0.02)' stroke-width='1.2' stroke-linecap='round'/><polygon points='78,95 84,83 90,95' fill='rgba(0,0,0,0.018)'/><rect x='10' y='88' width='12' height='8' rx='1.5' fill='rgba(0,0,0,0.022)'/><circle cx='48' cy='92' r='5.5' fill='rgba(0,0,0,0.015)'/><line x1='108' y1='86' x2='108' y2='98' stroke='rgba(0,0,0,0.02)' stroke-width='1.5' stroke-linecap='round'/><line x1='102' y1='92' x2='114' y2='92' stroke='rgba(0,0,0,0.02)' stroke-width='1.5' stroke-linecap='round'/></svg>`.replace(/#/g, '%23');
const backgroundStyle = { backgroundImage: `url("data:image/svg+xml,${patternSvg}")`, backgroundRepeat: 'repeat' as const };

/**
 * Subtle geometric background overlay.
 * Memoized for performance - only re-renders when className changes.
 */
const GeometricPattern: React.FC<{ className?: string }> = memo(({ className = '' }) => {
    return (
        <div
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={backgroundStyle}
            aria-hidden="true"
        />
    );
});

export default GeometricPattern;
