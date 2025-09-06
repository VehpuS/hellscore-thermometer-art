import { designDefaults, type Design } from "@/types/design";
import { DesignResetButton } from "./DesignResetButton";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";

export const DesignValueSlider: React.FC<{
  label: string;
  field: keyof Pick<
    Design,
    "scaleX" | "scaleY" | "rotation" | "translateY" | "previewScale"
  >;
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
  isPercentage?: boolean;
  min: number;
  max: number;
  step: number;
  fixedDecimalPlaces?: number;
}> = ({
  isPercentage,
  field,
  label,
  design,
  min,
  max,
  step,
  fixedDecimalPlaces = 2,
  onDesignFieldChange,
}) => {
  const currentValue = design[field] ?? designDefaults[field];
  return (
    <div className="space-y-2 w-full">
      <div className="flex justify-between items-center">
        <Label className="text-gray-300">{label}</Label>
        <span
          className="text-sm text-teal-300 relative group"
          style={{ minWidth: 40, display: "inline-block" }}
        >
          <DesignResetButton
            fieldsToReset={[field]}
            design={design}
            onDesignFieldChange={onDesignFieldChange}
          />
          <div className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
            {isPercentage
              ? `${(currentValue * 100).toFixed(0)}%`
              : `${currentValue.toFixed(fixedDecimalPlaces)}`}
          </div>
          <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
            <input
              type="number"
              min={isPercentage ? min * 100 : min}
              max={isPercentage ? max * 100 : max}
              step={isPercentage ? step * 100 : step}
              value={
                isPercentage
                  ? (currentValue * 100).toFixed(0)
                  : currentValue.toFixed(fixedDecimalPlaces)
              }
              onChange={(e) => {
                const newValue = isPercentage
                  ? Number(e.target.value) / 100
                  : Number(e.target.value);
                onDesignFieldChange(
                  field,
                  Math.max(min, Math.min(max, newValue))
                );
              }}
              className="bg-black/50 border border-teal-500 text-teal-300 rounded text-xs px-2"
              style={{ width: "100%" }}
            />
          </div>
        </span>
      </div>
      <Slider
        value={[currentValue]}
        onValueChange={(value) => onDesignFieldChange(field, value[0])}
        min={min}
        max={max}
        step={step}
        className="[&>span:first-child]:h-full [&>span:first-child]:bg-teal-500"
      />
    </div>
  );
};
