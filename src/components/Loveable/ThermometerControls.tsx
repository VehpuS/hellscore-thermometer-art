import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Flame, Download, Palette, Settings } from 'lucide-react';
import { currencies } from '@/utils/currency';

interface ThermometerControlsProps {
  goal: number;
  setGoal: (goal: number) => void;
  current: number;
  setCurrent: (current: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  customSymbol: string;
  setCustomSymbol: (symbol: string) => void;
  symbolPosition: 'before' | 'after';
  setSymbolPosition: (position: 'before' | 'after') => void;
  title: string;
  setTitle: (title: string) => void;
  colorScheme: 'classic' | 'inferno' | 'ember';
  setColorScheme: (scheme: 'classic' | 'inferno' | 'ember') => void;
  showPercentage: boolean;
  setShowPercentage: (show: boolean) => void;
  showFlames: boolean;
  setShowFlames: (show: boolean) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
  onExport: () => void;
}

export const ThermometerControls = ({
  goal,
  setGoal,
  current,
  setCurrent,
  currency,
  setCurrency,
  customSymbol,
  setCustomSymbol,
  symbolPosition,
  setSymbolPosition,
  title,
  setTitle,
  colorScheme,
  setColorScheme,
  showPercentage,
  setShowPercentage,
  showFlames,
  setShowFlames,
  fontFamily,
  setFontFamily,
  onExport
}: ThermometerControlsProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'style'>('basic');

  // Comprehensive list of browser-supported currencies
  

  const fontOptions = [
    { value: 'inter', name: 'Inter (Modern)', family: 'font-inter' },
    { value: 'roboto', name: 'Roboto (Clean)', family: 'font-roboto' },
    { value: 'opensans', name: 'Open Sans (Friendly)', family: 'font-opensans' },
    { value: 'montserrat', name: 'Montserrat (Geometric)', family: 'font-montserrat' },
    { value: 'poppins', name: 'Poppins (Rounded)', family: 'font-poppins' },
    { value: 'source', name: 'Source Sans Pro (Professional)', family: 'font-source' },
    { value: 'metal', name: 'Metal Mania (Gothic)', family: 'font-metal' },
    { value: 'hellscore', name: 'Creepster (Horror)', family: 'font-hellscore' },
    { value: 'infernal', name: 'Nosifer (Infernal)', family: 'font-infernal' }
  ];

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-6">
        <Flame className="text-hell-fire" size={24} />
        <h1 className="font-hellscore text-2xl text-hell-fire">
          Hellscore Thermometer Generator
        </h1>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={activeTab === 'basic' ? 'default' : 'outline'}
          onClick={() => setActiveTab('basic')}
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Basic Settings
        </Button>
        <Button
          variant={activeTab === 'style' ? 'default' : 'outline'}
          onClick={() => setActiveTab('style')}
          className="flex items-center gap-2"
        >
          <Palette size={16} />
          Style & Effects
        </Button>
      </div>

      {/* Basic Settings */}
      {activeTab === 'basic' && (
        <div className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-base font-metal">
              Thermometer Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter fundraiser title..."
              className="mt-2"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goal" className="text-base font-metal">
                Fundraising Goal
              </Label>
              <Input
                id="goal"
                type="number"
                value={goal || ''}
                onChange={(e) => setGoal(Number(e.target.value) || 0)}
                placeholder="10000"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="current" className="text-base font-metal">
                Current Amount
              </Label>
              <Input
                id="current"
                type="number"
                value={current || ''}
                onChange={(e) => setCurrent(Number(e.target.value) || 0)}
                placeholder="5000"
                className="mt-2"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="currency" className="text-base font-metal">
              Currency
            </Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.code === 'CUSTOM' ? curr.name : `${curr.code} (${curr.symbol}) - ${curr.name}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Currency Fields */}
          {currency === 'CUSTOM' && (
            <div className="space-y-4 p-4 bg-muted rounded-lg border border-border">
              <div>
                <Label htmlFor="customSymbol" className="text-base font-metal">
                  Custom Currency Symbol
                </Label>
                <Input
                  id="customSymbol"
                  value={customSymbol}
                  onChange={(e) => setCustomSymbol(e.target.value)}
                  placeholder="$ € ¥ ₿ 🔥 etc."
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label className="text-base font-metal">
                  Symbol Position
                </Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant={symbolPosition === 'before' ? 'default' : 'outline'}
                    onClick={() => setSymbolPosition('before')}
                    size="sm"
                  >
                    Before ({customSymbol || '$'}1,000)
                  </Button>
                  <Button
                    type="button"
                    variant={symbolPosition === 'after' ? 'default' : 'outline'}
                    onClick={() => setSymbolPosition('after')}
                    size="sm"
                  >
                    After (1,000{customSymbol || '$'})
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Style & Effects */}
      {activeTab === 'style' && (
        <div className="space-y-6">
          <div>
            <Label className="text-base font-metal mb-3 block">
              Color Scheme
            </Label>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={colorScheme === 'inferno' ? 'default' : 'outline'}
                onClick={() => setColorScheme('inferno')}
                className="justify-start h-12"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-hellfire rounded" />
                  <span>Inferno (Red & Orange)</span>
                </div>
              </Button>
              <Button
                variant={colorScheme === 'ember' ? 'default' : 'outline'}
                onClick={() => setColorScheme('ember')}
                className="justify-start h-12"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-ember rounded" />
                  <span>Ember (Dark Orange)</span>
                </div>
              </Button>
              <Button
                variant={colorScheme === 'classic' ? 'default' : 'outline'}
                onClick={() => setColorScheme('classic')}
                className="justify-start h-12"
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-primary rounded" />
                  <span>Classic (Standard)</span>
                </div>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="percentage" className="text-base font-metal">
                Show Percentage
              </Label>
              <Switch
                id="percentage"
                checked={showPercentage}
                onCheckedChange={setShowPercentage}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="flames" className="text-base font-metal">
                Flame Animations
              </Label>
              <Switch
                id="flames"
                checked={showFlames}
                onCheckedChange={setShowFlames}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="fontFamily" className="text-base font-metal">
              Font Style
            </Label>
            <Select value={fontFamily} onValueChange={setFontFamily}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select font style" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    <span className={font.family}>{font.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Export Button */}
      <div className="mt-8 pt-6 border-t border-border">
        <Button
          onClick={onExport}
          size="lg"
          className="w-full h-12 font-metal text-lg shadow-hellfire"
        >
          <Download className="mr-2" size={20} />
          Export Thermometer
        </Button>
      </div>
    </Card>
  );
};