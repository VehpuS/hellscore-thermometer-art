import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { currencies } from "@/utils/currency";
import { DollarSign, Maximize, Palette, Type } from "lucide-react";

const themeOptions = [
  {
    value: "hellfire",
    label: "Hellfire",
    desc: "Classic red and orange flames",
  },
  { value: "molten", label: "Molten", desc: "Yellow and orange lava flow" },
  { value: "shadow", label: "Shadow", desc: "Dark purples and grays" },
  { value: "crimson", label: "Crimson", desc: "Deep red blood theme" },
  { value: "inferno", label: "Inferno", desc: "Intense orange and black" },
];

const fontOptions = [
  { value: "gothic", label: "Gothic", desc: "Classic serif style" },
  { value: "modern", label: "Modern", desc: "Clean sans-serif" },
  { value: "metal", label: "Metal", desc: "Bold monospace" },
  { value: "elegant", label: "Elegant", desc: "Light and refined" },
];

const sizeOptions = [
  { value: "social", label: "Social Media (1:1)", width: 1080, height: 1080 },
  { value: "story", label: "Story (9:16)", width: 1080, height: 1920 },
  { value: "post", label: "Landscape (16:9)", width: 1920, height: 1080 },
  { value: "twitter", label: "Twitter (2:1)", width: 1024, height: 512 },
  { value: "custom", label: "Custom Size", isCustom: true },
];

export default function CustomizationPanel({
  design,
  onDesignChange,
  onPresetChange,
}) {
  const handleSizePresetChange = (sizeKey) => {
    const option = sizeOptions.find((o) => o.value === sizeKey);
    if (option && !option.isCustom) {
      onPresetChange({ width: option.width, height: option.height });
    }
    // For custom, we don't change the values, just allow editing
    onDesignChange("sizePreset", sizeKey);
  };

  return (
    <div className="space-y-6">
      {/* Dimension Settings */}
      {/* <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Crop className="w-4 h-4 text-teal-400" />
            <h3 className="text-white font-semibold">Export Dimensions</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Size Preset</Label>
              <Select value={design.sizePreset || 'social'} onValueChange={handleSizePresetChange}>
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {sizeOptions.map(option => (
                    <SelectItem key={option.value} value={option.value} className="text-white">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {(design.sizePreset === 'custom') && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-gray-300">Width (px)</Label>
                  <Input
                    type="number"
                    value={design.width}
                    onChange={(e) => onDesignChange('width', parseInt(e.target.value) || 0)}
                    className="bg-black/50 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Height (px)</Label>
                  <Input
                    type="number"
                    value={design.height}
                    onChange={(e) => onDesignChange('height', parseInt(e.target.value) || 0)}
                    className="bg-black/50 border-gray-600 text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card> */}

      <Separator className="bg-gray-700" />

      {/* Financial Settings */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-4 h-4 text-green-400" />
            <h3 className="text-white font-semibold">Financial Details</h3>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-gray-300">Goal Amount</Label>
                <Input
                  type="number"
                  value={design.goal}
                  onChange={(e) =>
                    onDesignChange("goal", parseFloat(e.target.value) || 0)
                  }
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Current Amount</Label>
                <Input
                  type="number"
                  value={design.current}
                  onChange={(e) =>
                    onDesignChange("current", parseFloat(e.target.value) || 0)
                  }
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Currency</Label>
              <Select
                value={design.currency}
                onValueChange={(value) => onDesignChange("currency", value)}
              >
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.code === "CUSTOM"
                        ? curr.name
                        : `${curr.code} (${curr.symbol}) - ${curr.name}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {design.currency === "CUSTOM" && (
              <Card className="bg-gray-800/60 border-orange-700/50 p-3 space-y-3">
                <div className="space-y-2">
                  <Label className="text-orange-300 text-xs">
                    Custom Symbol
                  </Label>
                  <Input
                    value={design.customSymbol}
                    onChange={(e) =>
                      onDesignChange("customSymbol", e.target.value)
                    }
                    placeholder="e.g. BTC, ⚡"
                    className="bg-black/50 border-gray-600 text-white h-8"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-orange-300 text-xs">
                    Symbol Position
                  </Label>
                  <Select
                    value={design.currency_position}
                    onValueChange={(value) =>
                      onDesignChange("currency_position", value)
                    }
                  >
                    <SelectTrigger className="bg-black/50 border-gray-600 text-white h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="left" className="text-white">
                        Left of amount
                      </SelectItem>
                      <SelectItem value="right" className="text-white">
                        Right of amount
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-gray-700" />

      {/* Text Content */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Type className="w-4 h-4 text-blue-400" />
            <h3 className="text-white font-semibold">Text Content</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Main Title</Label>
              <Input
                value={design.title}
                onChange={(e) => onDesignChange("title", e.target.value)}
                placeholder="Enter campaign title"
                className="bg-black/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Subtitle</Label>
              <Input
                value={design.subtitle}
                onChange={(e) => onDesignChange("subtitle", e.target.value)}
                placeholder="Enter subtitle or description"
                className="bg-black/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Custom Message</Label>
              <Textarea
                value={design.customMessage}
                onChange={(e) =>
                  onDesignChange("customMessage", e.target.value)
                }
                placeholder="Call to action or motivational message"
                className="bg-black/50 border-gray-600 text-white"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-gray-700" />

      {/* Visual Style */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-purple-400" />
            <h3 className="text-white font-semibold">Visual Style</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Theme</Label>
              <Select
                value={design.theme}
                onValueChange={(value) => onDesignChange("theme", value)}
              >
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {themeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white"
                    >
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-xs text-gray-400">
                          {option.desc}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Font Style</Label>
              <Select
                value={design.fontStyle}
                onValueChange={(value) => onDesignChange("fontStyle", value)}
              >
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {fontOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white"
                    >
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-xs text-gray-400">
                          {option.desc}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="percentage"
                checked={design.showPercentage}
                onCheckedChange={(checked) =>
                  onDesignChange("showPercentage", checked)
                }
                className="border-gray-600 data-[state=checked]:bg-red-600"
              />
              <Label htmlFor="percentage" className="text-gray-300">
                Show percentage complete
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="flames"
                checked={design.showFlames}
                onCheckedChange={(checked) =>
                  onDesignChange("showFlames", checked)
                }
                className="border-gray-600 data-[state=checked]:bg-red-600"
              />
              <Label htmlFor="flames" className="text-gray-300">
                Show decorative flames
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-gray-700" />

      {/* Transform Controls */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Maximize className="w-4 h-4 text-teal-400" />
            <h3 className="text-white font-semibold">Transform</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Scale</Label>
                <span className="text-sm text-teal-300">
                  {((design.scale || 1) * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                value={[design.scale || 1]}
                onValueChange={(value) => onDesignChange("scale", value[0])}
                min={0.5}
                max={1.5}
                step={0.01}
                className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Rotation</Label>
                <span className="text-sm text-teal-300">
                  {(design.rotation || 0).toFixed(0)}°
                </span>
              </div>
              <Slider
                value={[design.rotation || 0]}
                onValueChange={(value) => onDesignChange("rotation", value[0])}
                min={-180}
                max={180}
                step={1}
                className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
