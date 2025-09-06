import { motion } from "framer-motion";
import { Download, Flame, Zap } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import {
  BooleanParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
  type QueryParamConfig,
} from "use-query-params";

import CustomizationPanel from "@/components/CustomizationPanel";
import { DesignValueSlider } from "@/components/DesignValueSlider";
import ExportModal from "@/components/ExportModal";
import ThermometerPreview from "@/components/ThermometerPreview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { designDefaults, sizeOptions, type Design } from "@/types/design";

const headerHeight = "100px";
const pageComponentsPadding = "2rem";

export default function Home() {
  const [design, setDesign] = useQueryParams({
    goal: withDefault(NumberParam, designDefaults.goal),
    current: withDefault(NumberParam, designDefaults.current),
    currency: withDefault(StringParam, designDefaults.currency),
    customSymbol: withDefault(StringParam, designDefaults.customSymbol),
    currencySymbolPosition: withDefault(
      StringParam as QueryParamConfig<Design["currencySymbolPosition"]>,
      designDefaults.currencySymbolPosition
    ),
    title: withDefault(StringParam, designDefaults.title),
    subtitle: withDefault(StringParam, designDefaults.subtitle),
    theme: withDefault(
      StringParam as QueryParamConfig<Design["theme"]>,
      designDefaults.theme
    ),
    fontStyle: withDefault(
      StringParam as QueryParamConfig<Design["fontStyle"]>,
      designDefaults.fontStyle
    ),
    showPercentage: withDefault(BooleanParam, designDefaults.showPercentage),
    customMessage: withDefault(StringParam, designDefaults.customMessage),
    scaleX: withDefault(NumberParam, designDefaults.scaleX),
    scaleY: withDefault(NumberParam, designDefaults.scaleY),
    previewScale: withDefault(NumberParam, designDefaults.previewScale),
    rotation: withDefault(NumberParam, designDefaults.rotation),
    translateY: withDefault(NumberParam, designDefaults.translateY),
    showFlame: withDefault(BooleanParam, designDefaults.showFlame),
    sizePreset: withDefault(
      StringParam as QueryParamConfig<Design["sizePreset"]>,
      designDefaults.sizePreset
    ),
    width: withDefault(
      NumberParam,
      designDefaults.width ||
        sizeOptions.find(({ value }) => value === designDefaults.sizePreset)
          ?.width
    ),
    height: withDefault(
      NumberParam,
      designDefaults.height ||
        sizeOptions.find(({ value }) => value === designDefaults.sizePreset)
          ?.height
    ),
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const previewRef = useRef(null);

  const handleDesignFieldChange = useCallback(
    (field: keyof Design, value: Design[typeof field]) => {
      setDesign((prev) => {
        const newDesign = { ...prev, [field]: value };
        // If a standard currency is chosen, reset custom fields
        if (field === "currency" && value !== "custom") {
          newDesign.customSymbol = "";
          newDesign.currencySymbolPosition = "before";
        }
        return newDesign;
      });
    },
    [setDesign]
  );

  const handleExport = () => {
    setShowExportModal(true);
  };

  const percentage =
    design.goal > 0 ? Math.min((design.current / design.goal) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-950">
      {/* Header */}
      <header
        className="bg-black/50 backdrop-blur-lg border-b border-red-900/30"
        style={{ height: headerHeight }}
      >
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
        <div
          className="grid lg:grid-cols-3 gap-8"
          style={{
            height: `calc(100vh - ${headerHeight} - 2 * ${pageComponentsPadding})`,
          }}
        >
          {/* Customization Panel */}
          <motion.div
            className="lg:col-span-1 h-full overflow-auto"
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
                onDesignFieldChange={handleDesignFieldChange}
              />
            </Card>
          </motion.div>

          {/* Preview Area */}
          <motion.div
            className="lg:col-span-2 h-full overflow-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-black/40 backdrop-blur-lg border-red-900/30 p-8">
              <div className="flex items-center justify-between mb-8 sticky top-0 left-0 z-10 px-2 bg-black/80 pb-3 flex-col">
                <h2 className="text-xl w-full font-bold text-white">Preview</h2>
                <div className="w-full flex justify-start">
                  <DesignValueSlider
                    label="Preview Scale"
                    field="previewScale"
                    design={design}
                    onDesignFieldChange={handleDesignFieldChange}
                    isPercentage
                    min={0.01}
                    max={3}
                    step={0.01}
                  />
                </div>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-2 sm:p-4 transition-all duration-300 w-full overflow-auto select-none">
                <div
                  className="w-full h-full"
                  ref={previewRef}
                  style={{
                    width: design.width,
                    height: design.height,
                    transform: `scale(${design.previewScale})`,
                  }}
                >
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
