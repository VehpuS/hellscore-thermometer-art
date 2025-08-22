import type { Design } from "@/types/design";
import { Type } from "lucide-react";

import { PanelAccordionItem } from "./PanelAccordionItem";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export const TextContentControls: React.FC<{
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}> = ({ design, onDesignFieldChange }) => {
  return (
    <PanelAccordionItem
      value="text-content"
      title={
        <div className="flex items-center gap-2 my-4">
          <Type className="w-4 h-4 text-blue-400" />
          <h3 className="text-white font-semibold">Text Content</h3>
        </div>
      }
    >
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
            onChange={(e) => onDesignFieldChange("subtitle", e.target.value)}
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
    </PanelAccordionItem>
  );
};
