import { Maximize } from "lucide-react";
import type React from "react";

import type { Design } from "@/types/design";
import { DesignResetButton } from "./DesignResetButton";
import { DesignValueSlider } from "./DesignValueSlider";
import { PanelAccordionItem } from "./PanelAccordionItem";

export const TransformControls: React.FC<{
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}> = ({ design, onDesignFieldChange }) => {
  return (
    <PanelAccordionItem
      value="transform-controls"
      title={
        <div className="flex items-center gap-2 my-4">
          <Maximize className="w-4 h-4 text-teal-400" />
          <h3 className="text-white font-semibold">Transform</h3>
          <DesignResetButton
            fieldsToReset={["scaleX", "scaleY", "rotation", "translateY"]}
            design={design}
            onDesignFieldChange={onDesignFieldChange}
          />
        </div>
      }
    >
      <div className="space-y-6">
        <DesignValueSlider
          isPercentage
          label="Scale X"
          field="scaleX"
          design={design}
          onDesignFieldChange={onDesignFieldChange}
          min={0.05}
          max={3}
          step={0.01}
        />
        <DesignValueSlider
          isPercentage
          label="Scale Y"
          field="scaleY"
          design={design}
          onDesignFieldChange={onDesignFieldChange}
          min={0.05}
          max={3}
          step={0.01}
        />
        <DesignValueSlider
          label="Rotation"
          field="rotation"
          design={design}
          onDesignFieldChange={onDesignFieldChange}
          min={-180}
          max={180}
          step={1}
        />
        <DesignValueSlider
          label="Y Offset"
          field="translateY"
          design={design}
          onDesignFieldChange={onDesignFieldChange}
          min={-100}
          max={100}
          step={1}
          fixedDecimalPlaces={0}
        />
      </div>
    </PanelAccordionItem>
  );
};
