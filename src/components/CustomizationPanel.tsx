import { Crop, DollarSign, Maximize, Palette, Type } from "lucide-react";

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
import {
  designDefaults,
  fontOptions,
  sizeOptions,
  SizePresets,
  themeOptions,
  type Design,
} from "@/types/design";
import { currencies } from "@/utils/currency";

export interface CustomizationPanelProps {
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}

export const CustomizationPanel: React.FC<CustomizationPanelProps> = ({
  design,
  onDesignFieldChange,
}) => {
  const handleSizePresetChange = (sizeKey) => {
    const option = sizeOptions.find((o) => o.value === sizeKey);
    onDesignFieldChange("sizePreset", sizeKey);
    if (option?.width || option?.height) {
      onDesignFieldChange("width", option.width);
      onDesignFieldChange("height", option.height);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dimension Settings */}
      <Card className="bg-gray-900/50 border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Crop className="w-4 h-4 text-teal-400" />
            <h3 className="text-white font-semibold">Export Settings</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Preview Scale</Label>
                <span
                  className="text-sm text-teal-300 relative group"
                  style={{ minWidth: 40, display: "inline-block" }}
                >
                  {design.previewScale !== designDefaults.previewScale && (
                    <button
                      type="button"
                      className="px-2 py-1 mr-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                      onClick={() =>
                        onDesignFieldChange(
                          "previewScale",
                          designDefaults.previewScale
                        )
                      }
                    >
                      Reset
                    </button>
                  )}
                  <div className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
                    {((design.previewScale || 1) * 100).toFixed(0)}%
                  </div>
                  <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
                    <input
                      type="number"
                      min={5}
                      max={100}
                      step={1}
                      value={((design.previewScale || 1) * 100).toFixed(0)}
                      onChange={(e) =>
                        onDesignFieldChange(
                          "previewScale",
                          Math.max(
                            0.05,
                            Math.min(3, Number(e.target.value) / 100)
                          )
                        )
                      }
                      className="bg-black/50 border border-teal-500 text-teal-300 rounded text-xs"
                    />
                  </div>
                </span>
              </div>
              <Slider
                value={[design.previewScale || 1]}
                onValueChange={(value) =>
                  onDesignFieldChange("previewScale", value[0])
                }
                min={0.05}
                max={1}
                step={0.01}
                className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Size Preset</Label>
              <Select
                value={design.sizePreset || "social"}
                onValueChange={handleSizePresetChange}
              >
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  {sizeOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-white"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {design.sizePreset === SizePresets.CUSTOM && (
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-gray-300">Width (px)</Label>
                  <Input
                    type="number"
                    value={design.width}
                    onChange={(e) =>
                      onDesignFieldChange(
                        "width",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="bg-black/50 border-gray-600 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">Height (px)</Label>
                  <Input
                    type="number"
                    value={design.height}
                    onChange={(e) =>
                      onDesignFieldChange(
                        "height",
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="bg-black/50 border-gray-600 text-white"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
                    onDesignFieldChange("goal", parseFloat(e.target.value) || 0)
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
                    onDesignFieldChange(
                      "current",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="bg-black/50 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Currency</Label>
              <Select
                value={design.currency}
                onValueChange={(value) =>
                  onDesignFieldChange("currency", value)
                }
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
                      onDesignFieldChange("customSymbol", e.target.value)
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
                    value={design.currencySymbolPosition}
                    onValueChange={(value) =>
                      onDesignFieldChange("currencySymbolPosition", value)
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
                onChange={(e) => onDesignFieldChange("title", e.target.value)}
                placeholder="Enter campaign title"
                className="bg-black/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Subtitle</Label>
              <Input
                value={design.subtitle}
                onChange={(e) =>
                  onDesignFieldChange("subtitle", e.target.value)
                }
                placeholder="Enter subtitle or description"
                className="bg-black/50 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Custom Message</Label>
              <Textarea
                value={design.customMessage}
                onChange={(e) =>
                  onDesignFieldChange("customMessage", e.target.value)
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
            {(design.theme !== designDefaults.theme ||
              design.fontStyle !== designDefaults.fontStyle ||
              design.showPercentage !== designDefaults.showPercentage ||
              design.showFlame !== designDefaults.showFlame) && (
              <button
                type="button"
                className="ml-auto px-2 py-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                onClick={() => {
                  onDesignFieldChange("theme", designDefaults.theme);
                  onDesignFieldChange("fontStyle", designDefaults.fontStyle);
                  onDesignFieldChange(
                    "showPercentage",
                    designDefaults.showPercentage
                  );
                  onDesignFieldChange("showFlame", designDefaults.showFlame);
                }}
              >
                Reset
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Theme</Label>
              <Select
                value={design.theme}
                onValueChange={(value) => onDesignFieldChange("theme", value)}
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
                onValueChange={(value) =>
                  onDesignFieldChange("fontStyle", value)
                }
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
                  onDesignFieldChange("showPercentage", checked)
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
                checked={design.showFlame}
                onCheckedChange={(checked) =>
                  onDesignFieldChange("showFlame", checked)
                }
                className="border-gray-600 data-[state=checked]:bg-red-600"
              />
              <Label htmlFor="flames" className="text-gray-300">
                Show decorative flame
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
            {(design.scaleX !== designDefaults.scaleX ||
              design.scaleY !== designDefaults.scaleY ||
              design.rotation !== designDefaults.rotation ||
              design.translateY !== designDefaults.translateY) && (
              <button
                type="button"
                className="ml-auto px-2 py-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                onClick={() => {
                  onDesignFieldChange("scaleX", designDefaults.scaleX);
                  onDesignFieldChange("scaleY", designDefaults.scaleY);
                  onDesignFieldChange("rotation", designDefaults.rotation);
                  onDesignFieldChange("translateY", designDefaults.translateY);
                }}
              >
                Reset
              </button>
            )}
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Scale X</Label>
                <span
                  className="text-sm text-teal-300 relative group"
                  style={{ minWidth: 40, display: "inline-block" }}
                >
                  {design.scaleX !== designDefaults.scaleX && (
                    <button
                      type="button"
                      className="px-2 py-1 mr-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                      onClick={() =>
                        onDesignFieldChange("scaleX", designDefaults.scaleX)
                      }
                    >
                      Reset
                    </button>
                  )}
                  <div className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
                    {((design.scaleX || 1) * 100).toFixed(0)}%
                  </div>
                  <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
                    <input
                      type="number"
                      min={5}
                      max={300}
                      step={1}
                      value={((design.scaleX || 1) * 100).toFixed(0)}
                      onChange={(e) =>
                        onDesignFieldChange(
                          "scaleX",
                          Math.max(
                            0.05,
                            Math.min(3, Number(e.target.value) / 100)
                          )
                        )
                      }
                      className="bg-black/50 border border-teal-500 text-teal-300 rounded text-xs"
                      style={{ width: 48 }}
                    />
                  </div>
                </span>
              </div>
              <Slider
                value={[design.scaleX || 1]}
                onValueChange={(value) =>
                  onDesignFieldChange("scaleX", value[0])
                }
                min={0.05}
                max={3}
                step={0.01}
                className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Scale Y</Label>
                <span
                  className="text-sm text-teal-300 relative group"
                  style={{ minWidth: 40, display: "inline-block" }}
                >
                  {design.scaleY !== designDefaults.scaleY && (
                    <button
                      type="button"
                      className="px-2 py-1 mr-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                      onClick={() =>
                        onDesignFieldChange("scaleY", designDefaults.scaleY)
                      }
                    >
                      Reset
                    </button>
                  )}
                  <div className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
                    {((design.scaleY || 1) * 100).toFixed(0)}%
                  </div>
                  <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
                    <input
                      type="number"
                      min={5}
                      max={300}
                      step={1}
                      value={((design.scaleY || 1) * 100).toFixed(0)}
                      onChange={(e) =>
                        onDesignFieldChange(
                          "scaleY",
                          Math.max(
                            0.05,
                            Math.min(3, Number(e.target.value) / 100)
                          )
                        )
                      }
                      className="bg-black/50 border border-teal-500 text-teal-300 rounded text-xs"
                      style={{ width: 48 }}
                    />
                  </div>
                </span>
              </div>
              <Slider
                value={[design.scaleY || 1]}
                onValueChange={(value) =>
                  onDesignFieldChange("scaleY", value[0])
                }
                min={0.05}
                max={3}
                step={0.01}
                className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Rotation</Label>
                <span
                  className="text-sm text-teal-300 relative group"
                  style={{ minWidth: 40, display: "inline-block" }}
                >
                  {design.rotation !== designDefaults.rotation && (
                    <button
                      type="button"
                      className="px-2 py-1 mr-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                      onClick={() =>
                        onDesignFieldChange("rotation", designDefaults.rotation)
                      }
                    >
                      Reset
                    </button>
                  )}
                  <div className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
                    {(design.rotation || 0).toFixed(0)}°
                  </div>
                  <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
                    <input
                      type="number"
                      min={-180}
                      max={180}
                      step={1}
                      value={(design.rotation || 0).toFixed(0)}
                      onChange={(e) =>
                        onDesignFieldChange(
                          "rotation",
                          Math.max(-180, Math.min(180, Number(e.target.value)))
                        )
                      }
                      className="bg-black/50 border border-teal-500 text-teal-300 rounded text-xs"
                      style={{ width: 48 }}
                    />
                  </div>
                </span>
              </div>
              <Slider
                value={[design.rotation || 0]}
                onValueChange={(value) =>
                  onDesignFieldChange("rotation", value[0])
                }
                min={-180}
                max={180}
                step={1}
                className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-gray-300">Y Offset</Label>
                <span
                  className="text-sm text-teal-300 relative group"
                  style={{ minWidth: 40, display: "inline-block" }}
                >
                  {design.translateY !== designDefaults.translateY && (
                    <button
                      type="button"
                      className="px-2 py-1 mr-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
                      onClick={() =>
                        onDesignFieldChange(
                          "translateY",
                          designDefaults.translateY
                        )
                      }
                    >
                      Reset
                    </button>
                  )}
                  <div className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
                    {(design.translateY || 0).toFixed(0)}%
                  </div>
                  <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
                    <input
                      type="number"
                      min={-180}
                      max={180}
                      step={1}
                      value={(design.translateY || 0).toFixed(0)}
                      onChange={(e) =>
                        onDesignFieldChange(
                          "translateY",
                          Math.max(-180, Math.min(180, Number(e.target.value)))
                        )
                      }
                      className="bg-black/50 border border-teal-500 text-teal-300 rounded text-xs"
                      style={{ width: 48 }}
                    />
                  </div>
                </span>
              </div>
              <Slider
                value={[design.translateY || 0]}
                onValueChange={(value) =>
                  onDesignFieldChange("translateY", value[0])
                }
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
};

export default CustomizationPanel;
