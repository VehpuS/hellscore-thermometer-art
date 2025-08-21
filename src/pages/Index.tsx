import { useState } from 'react';
import { ThermometerControls } from '@/components/ThermometerControls';
import { ThermometerPreview } from '@/components/ThermometerPreview';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [goal, setGoal] = useState(10000);
  const [current, setCurrent] = useState(6500);
  const [currency, setCurrency] = useState('USD');
  const [customSymbol, setCustomSymbol] = useState('🔥');
  const [symbolPosition, setSymbolPosition] = useState<'before' | 'after'>('before');
  const [title, setTitle] = useState('Hellscore Summer Tour');
  const [colorScheme, setColorScheme] = useState<'classic' | 'inferno' | 'ember'>('inferno');
  const [showPercentage, setShowPercentage] = useState(true);
  const [showFlames, setShowFlames] = useState(true);

  const handleExport = () => {
    // For now, just show a success message
    // In a real implementation, this would capture the thermometer as an image
    toast({
      title: "🔥 Export Complete!",
      description: "Your hellish thermometer is ready for the infernal fundraising campaign!",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <div className="order-2 lg:order-1">
            <ThermometerControls
              goal={goal}
              setGoal={setGoal}
              current={current}
              setCurrent={setCurrent}
              currency={currency}
              setCurrency={setCurrency}
              customSymbol={customSymbol}
              setCustomSymbol={setCustomSymbol}
              symbolPosition={symbolPosition}
              setSymbolPosition={setSymbolPosition}
              title={title}
              setTitle={setTitle}
              colorScheme={colorScheme}
              setColorScheme={setColorScheme}
              showPercentage={showPercentage}
              setShowPercentage={setShowPercentage}
              showFlames={showFlames}
              setShowFlames={setShowFlames}
              onExport={handleExport}
            />
          </div>

          {/* Preview Panel */}
          <div className="order-1 lg:order-2 flex justify-center">
            <ThermometerPreview
              goal={goal}
              current={current}
              currency={currency}
              customSymbol={customSymbol}
              symbolPosition={symbolPosition}
              title={title}
              colorScheme={colorScheme}
              showPercentage={showPercentage}
              showFlames={showFlames}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;