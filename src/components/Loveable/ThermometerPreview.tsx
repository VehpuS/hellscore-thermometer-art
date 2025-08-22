import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

interface ThermometerPreviewProps {
  goal: number;
  current: number;
  currency: string;
  customSymbol: string;
  symbolPosition: 'before' | 'after';
  title: string;
  colorScheme: 'classic' | 'inferno' | 'ember';
  showPercentage: boolean;
  showFlames: boolean;
  fontFamily: string;
}

export const ThermometerPreview = ({
  goal,
  current,
  currency,
  customSymbol,
  symbolPosition,
  title,
  colorScheme,
  showPercentage,
  showFlames,
  fontFamily
}: ThermometerPreviewProps) => {
  const [animatedCurrent, setAnimatedCurrent] = useState(0);
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedCurrent(current);
    }, 300);
    return () => clearTimeout(timer);
  }, [current]);

  const formatCurrency = (amount: number) => {
    if (currency === 'CUSTOM') {
      const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
      
      const symbol = customSymbol || '$';
      return symbolPosition === 'before' 
        ? `${symbol}${formattedNumber}`
        : `${formattedNumber}${symbol}`;
    }
    
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
    } catch (error) {
      // Fallback for unsupported currencies
      const formattedNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);
      return `${currency} ${formattedNumber}`;
    }
  };

  const getThermometerColors = () => {
    switch (colorScheme) {
      case 'inferno':
        return {
          bg: 'bg-hell-shadow',
          fill: 'bg-gradient-hellfire',
          border: 'border-hell-fire',
          text: 'text-hell-fire'
        };
      case 'ember':
        return {
          bg: 'bg-hell-shadow',
          fill: 'bg-gradient-ember',
          border: 'border-hell-ember',
          text: 'text-hell-ember'
        };
      default:
        return {
          bg: 'bg-muted',
          fill: 'bg-primary',
          border: 'border-primary',
          text: 'text-primary'
        };
    }
  };

  const colors = getThermometerColors();

  const getFontClass = () => {
    const fontMap: Record<string, string> = {
      'inter': 'font-inter',
      'roboto': 'font-roboto',
      'opensans': 'font-opensans',
      'montserrat': 'font-montserrat',
      'poppins': 'font-poppins',
      'source': 'font-source',
      'metal': 'font-metal',
      'hellscore': 'font-hellscore',
      'infernal': 'font-infernal'
    };
    return fontMap[fontFamily] || 'font-inter';
  };

  const fontClass = getFontClass();

  return (
    <div className="relative bg-card rounded-xl p-8 border border-border shadow-ember">
      {/* Title */}
      <div className="text-center mb-6">
        <h2 className={`${fontClass} text-3xl mb-2 text-hell-fire font-bold ${showFlames ? 'flame-flicker' : ''}`}>
          {title || 'Hellscore Fundraiser'}
        </h2>
        {showFlames && (
          <div className="flex justify-center gap-2 mb-4">
            <Flame className="text-hell-fire animate-bounce" size={20} />
            <Flame className="text-hell-ember animate-bounce [animation-delay:0.2s]" size={24} />
            <Flame className="text-hell-fire animate-bounce [animation-delay:0.4s]" size={20} />
          </div>
        )}
      </div>

      {/* Goal Display */}
      <div className="text-center mb-6">
        <div className={`${fontClass} text-xl text-muted-foreground mb-2`}>
          Goal: {formatCurrency(goal)}
        </div>
        {showPercentage && (
          <div className={`${fontClass} font-bold text-2xl ${colors.text}`}>
            {percentage.toFixed(1)}% Complete
          </div>
        )}
      </div>

      {/* Thermometer */}
      <div className="relative mx-auto mb-6" style={{ width: '120px', height: '400px' }}>
        {/* Thermometer bulb */}
        <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${colors.bg} border-2 ${colors.border}`}>
          <div className={`absolute inset-2 rounded-full ${colors.fill} ${showFlames ? 'animate-infernal-pulse' : ''}`} />
        </div>
        
        {/* Thermometer tube */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-80 ${colors.bg} border-2 ${colors.border} rounded-t-full overflow-hidden`}>
          {/* Fill */}
          <div 
            className={`absolute bottom-0 w-full ${colors.fill} transition-all duration-1000 ease-out ${showFlames ? 'animate-flame-flicker' : ''}`}
            style={{ height: `${percentage}%` }}
          />
        </div>

        {/* Temperature markers */}
        <div className="absolute inset-0">
          {[25, 50, 75, 100].map((marker) => (
            <div
              key={marker}
              className="absolute right-0 flex items-center"
              style={{ bottom: `${20 + (marker * 3.2)}px` }}
            >
              <div className={`w-4 h-0.5 ${colors.border} bg-border mr-2`} />
              <span className={`text-sm ${fontClass} text-muted-foreground whitespace-nowrap`}>
                {formatCurrency((goal * marker) / 100)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Amount Display */}
      <div className="text-center">
        <div className={`${fontClass} text-lg text-muted-foreground mb-1`}>
          Raised so far:
        </div>
        <div className={`${fontClass} font-bold text-3xl ${colors.text} ${showFlames ? 'flame-flicker' : ''}`}>
          {formatCurrency(animatedCurrent)}
        </div>
      </div>

      {/* Hellscore Branding */}
      <div className="text-center mt-6 pt-4 border-t border-border">
        <div className="font-hellscore text-lg text-hell-gold">
          🔥 Hellscore Choir 🔥
        </div>
      </div>
    </div>
  );
};