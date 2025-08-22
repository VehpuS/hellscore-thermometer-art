import { DollarSign } from "lucide-react";

import type { Design } from "@/types/design";
import { currencies } from "@/utils/currency";
import { PanelAccordionItem } from "./PanelAccordionItem";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const CurrencyControls: React.FC<{
  design: Design;
  onDesignFieldChange: (
    field: keyof Design,
    value: Design[typeof field]
  ) => void;
}> = ({ design, onDesignFieldChange }) => {
  return (
    <PanelAccordionItem
      value="currency-settings"
      title={
        <div className="flex items-center gap-2 my-4">
          <DollarSign className="w-4 h-4 text-green-400" />
          <h3 className="text-white font-semibold">Currency Settings</h3>
        </div>
      }
    >
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
                onDesignFieldChange("current", parseFloat(e.target.value) || 0)
              }
              className="bg-black/50 border-gray-600 text-white"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Currency</Label>
          <Select
            value={design.currency}
            onValueChange={(value) => onDesignFieldChange("currency", value)}
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
              <Label className="text-orange-300 text-xs">Custom Symbol</Label>
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
              <Label className="text-orange-300 text-xs">Symbol Position</Label>
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
    </PanelAccordionItem>
  );
};
