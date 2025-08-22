import { designDefaults, type Design } from "@/types/design";

export const DesignResetButton: React.FC<{
  fieldsToReset: (keyof Design)[];
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}> = ({ fieldsToReset, design, onDesignFieldChange }) => {
  return (
    fieldsToReset.length > 0 &&
    fieldsToReset.some((key) => design[key] !== designDefaults[key]) && (
      <button
        type="button"
        className="ml-auto px-2 py-1 text-xs bg-teal-700 text-white rounded hover:bg-teal-800 transition"
        onClick={(event) => {
          event.preventDefault();
          fieldsToReset.forEach((key) => {
            onDesignFieldChange(key, designDefaults[key]);
          });
        }}
      >
        Reset
      </button>
    )
  );
};
