import React, { useRef, useState } from "react";

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
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect touch device (simple check)
  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // Focus input when entering edit mode
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const commonGroupProps = {
    className:
      "bg-black/50 border border-teal-500 text-teal-300 rounded text-xs px-2 w-full",
    type: "number",
    min: isPercentage ? min * 100 : min,
    max: isPercentage ? max * 100 : max,
    step: isPercentage ? step * 100 : step,
    value: isPercentage
      ? (currentValue * 100).toFixed(0)
      : currentValue.toFixed(fixedDecimalPlaces),
    onChange: (e) => {
      const newValue = isPercentage
        ? Number(e.target.value) / 100
        : Number(e.target.value);
      onDesignFieldChange(field, Math.max(min, Math.min(max, newValue)));
    },
  };

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
          {/* Value display: show input if editing (mobile), else hover logic for desktop */}
          {isEditing ? (
            <div className="w-14 py-0.5 inline-flex justify-end items-center text-end h-8">
              <input
                ref={inputRef}
                onBlur={() => setIsEditing(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setIsEditing(false);
                }}
                {...commonGroupProps}
              />
            </div>
          ) : (
            <>
              <div
                className="group-hover:hidden w-14 py-0.5 inline-flex justify-end items-center text-end h-8 cursor-pointer"
                onClick={() => {
                  if (isTouchDevice) setIsEditing(true);
                }}
                tabIndex={isTouchDevice ? 0 : -1}
                aria-label="Edit value"
                role="button"
              >
                {isPercentage
                  ? `${(currentValue * 100).toFixed(0)}%`
                  : `${currentValue.toFixed(fixedDecimalPlaces)}`}
              </div>
              <div className="hidden group-hover:inline-flex w-14 py-0.5 justify-end h-8">
                <input {...commonGroupProps} />
              </div>
            </>
          )}
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
