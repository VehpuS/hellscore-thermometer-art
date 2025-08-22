import { motion } from "framer-motion";
import { Download, Flame, Zap } from "lucide-react";
import { useRef, useState } from "react";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
  type QueryParamConfig,
} from "use-query-params";

import CustomizationPanel from "@/components/CustomizationPanel";
import ExportModal from "@/components/ExportModal";
import ThermometerPreview from "@/components/ThermometerPreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Design } from "@/types/design";

const designDefaults: Design = {
  goal: 10000,
  current: 3500,
  currency: "ILS", // Changed default currency
  customSymbol: "",
  symbolPosition: "before",
  title: "HELLSCORE FUNDRAISER",
  subtitle: "Support ...",
  theme: "hellfire",
  fontStyle: "gothic",
  showPercentage: true,
  customMessage: "Help us ...",
  scale: 1,
  rotation: 0,
  showFlames: true,
};

export default function Home() {
  const [design, setDesign] = useQueryParams({
    goal: withDefault(NumberParam, designDefaults.goal),
    current: withDefault(NumberParam, designDefaults.current),
    currency: withDefault(StringParam, designDefaults.currency),
    customSymbol: withDefault(StringParam, designDefaults.customSymbol),
    symbolPosition: withDefault(
      StringParam as QueryParamConfig<Design["symbolPosition"]>,
      designDefaults.symbolPosition
    ),
    title: withDefault(StringParam, designDefaults.title),
    subtitle: withDefault(StringParam, designDefaults.subtitle),
    theme: withDefault(StringParam, designDefaults.theme),
    fontStyle: withDefault(StringParam, designDefaults.fontStyle),
    showPercentage: withDefault(BooleanParam, designDefaults.showPercentage),
    customMessage: withDefault(StringParam, designDefaults.customMessage),
    scale: withDefault(NumberParam, designDefaults.scale),
    rotation: withDefault(NumberParam, designDefaults.rotation),
    showFlames: withDefault(BooleanParam, designDefaults.showFlames),
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const previewRef = useRef(null);

  const handleDesignChange = (field, value) => {
    setDesign((prev) => {
      const newDesign = { ...prev, [field]: value };
      // If a standard currency is chosen, reset custom fields
      if (field === "currency" && value !== "custom") {
        newDesign.customSymbol = "";
        newDesign.symbolPosition = "before";
      }
      return newDesign;
    });
  };

  const handlePresetChange = (preset) => {
    setDesign((prev) => ({ ...prev, ...preset }));
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const percentage =
    design.goal > 0 ? Math.min((design.current / design.goal) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-lg border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center shadow-lg">
                <Flame className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">HELLSCORE</h1>
                <p className="text-red-300 text-sm">
                  Fundraising Thermometer Generator
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* <Button
                onClick={saveDesign}
                variant="outline"
                className="border-red-600 text-red-400 hover:bg-red-600/20"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Design
              </Button> */}
              <Button
                onClick={handleExport}
                className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customization Panel */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-black/40 backdrop-blur-lg border-red-900/30 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Zap className="w-5 h-5 text-orange-400" />
                <h2 className="text-xl font-bold text-white">Customize</h2>
              </div>
              <CustomizationPanel
                design={design}
                onDesignChange={handleDesignChange}
                onPresetChange={handlePresetChange}
              />
            </Card>
          </motion.div>

          {/* Preview Area */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-black/40 backdrop-blur-lg border-red-900/30 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-white">Preview</h2>
              </div>

              <div className="bg-gray-900/50 rounded-xl p-2 sm:p-4 transition-all duration-300 w-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full overflow-hidden" ref={previewRef}>
                  <ThermometerPreview design={design} percentage={percentage} />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <ExportModal
        open={showExportModal}
        onOpenChange={setShowExportModal}
        design={design}
        previewRef={previewRef}
      />
    </div>
  );
}
