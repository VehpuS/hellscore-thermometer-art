import { type Design, fontOptions, themeOptions } from "@/types/design";
import { Palette } from "lucide-react";
import { DesignResetButton } from "./DesignResetButton";
import { PanelAccordionItem } from "./PanelAccordionItem";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const VisualStyleControls: React.FC<{
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}> = ({ design, onDesignFieldChange }) => {
  return (
    <PanelAccordionItem
      value="visual-style"
      title={
        <div className="flex items-center gap-2 my-4">
          <Palette className="w-4 h-4 text-purple-400" />
          <h3 className="text-white font-semibold">Visual Style</h3>
          <DesignResetButton
            fieldsToReset={[
              "theme",
              "fontStyle",
              "showPercentage",
              "showFlame",
            ]}
            design={design}
            onDesignFieldChange={onDesignFieldChange}
          />
        </div>
      }
    >
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
                    <div className="text-xs text-gray-400">{option.desc}</div>
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
            onValueChange={(value) => onDesignFieldChange("fontStyle", value)}
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
                    <div className="text-xs text-gray-400">{option.desc}</div>
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
    </PanelAccordionItem>
  );
};
