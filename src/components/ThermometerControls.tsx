import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Flame, Download, Palette, Settings } from 'lucide-react';

interface ThermometerControlsProps {
  goal: number;
  setGoal: (goal: number) => void;
  current: number;
  setCurrent: (current: number) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  title: string;
  setTitle: (title: string) => void;
  colorScheme: 'classic' | 'inferno' | 'ember';
  setColorScheme: (scheme: 'classic' | 'inferno' | 'ember') => void;
  showPercentage: boolean;
  setShowPercentage: (show: boolean) => void;
  showFlames: boolean;
  setShowFlames: (show: boolean) => void;
  onExport: () => void;
}

export const ThermometerControls = ({
  goal,
  setGoal,
  current,
  setCurrent,
  currency,
  setCurrency,
  title,
  setTitle,
  colorScheme,
  setColorScheme,
  showPercentage,
  setShowPercentage,
  showFlames,
  setShowFlames,
  onExport
}: ThermometerControlsProps) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'style'>('basic');

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
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CAD">CAD ($)</SelectItem>
                <SelectItem value="AUD">AUD ($)</SelectItem>
              </SelectContent>
            </Select>
          </div>
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