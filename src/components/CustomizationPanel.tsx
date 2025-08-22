import { type Design } from "@/types/design";
import { Accordion } from "@radix-ui/react-accordion";
import { CurrencyControls } from "./CurrencyControls";
import { ExportSettingsControls } from "./ExportSettingsControls";
import { TextContentControls } from "./TextContentControls";
import { TransformControls } from "./TransformControls";
import { VisualStyleControls } from "./VisualStyleControls";

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
  return (
    <Accordion
      type="multiple"
      className="space-y-6"
      defaultValue={["text-content"]}
    >
      <TextContentControls
        design={design}
        onDesignFieldChange={onDesignFieldChange}
      />

      <ExportSettingsControls
        design={design}
        onDesignFieldChange={onDesignFieldChange}
      />

      <CurrencyControls
        design={design}
        onDesignFieldChange={onDesignFieldChange}
      />

      <VisualStyleControls
        design={design}
        onDesignFieldChange={onDesignFieldChange}
      />

      <TransformControls
        design={design}
        onDesignFieldChange={onDesignFieldChange}
      />
    </Accordion>
  );
};

export default CustomizationPanel;
