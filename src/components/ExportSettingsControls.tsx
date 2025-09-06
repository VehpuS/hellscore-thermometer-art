import { sizeOptions, SizePresets, type Design } from "@/types/design";
import { Crop } from "lucide-react";
import { DesignResetButton } from "./DesignResetButton";
import { PanelAccordionItem } from "./PanelAccordionItem";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const ExportSettingsControls: React.FC<{
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}> = ({ design, onDesignFieldChange }) => {
  const handleSizePresetChange = (sizeKey) => {
    const option = sizeOptions.find((o) => o.value === sizeKey);
    onDesignFieldChange("sizePreset", sizeKey);
    if (option?.width || option?.height) {
      onDesignFieldChange("width", option.width);
      onDesignFieldChange("height", option.height);
    }
  };

  return (
    <PanelAccordionItem
      value="export-settings"
      title={
        <div className="flex items-center gap-2 my-4">
          <Crop className="w-4 h-4 text-teal-400" />
          <h3 className="text-white font-semibold">Export Settings</h3>
          <DesignResetButton
            fieldsToReset={["previewScale"]}
            design={design}
            onDesignFieldChange={onDesignFieldChange}
          />
        </div>
      }
    >
      <div className="space-y-4">
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
                  onDesignFieldChange("width", parseInt(e.target.value) || 0)
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
                  onDesignFieldChange("height", parseInt(e.target.value) || 0)
                }
                className="bg-black/50 border-gray-600 text-white"
              />
            </div>
          </div>
        )}
      </div>
    </PanelAccordionItem>
  );
};
