import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { forwardRef } from "react";

import type { Design } from "@/types/design";
import { formatCurrency } from "@/utils/currency";

const themes = {
  hellfire: {
    bg: "from-red-900 via-red-800 to-orange-600",
    fill: "from-orange-400 via-red-500 to-red-600",
    glow: "shadow-red-500/50",
    accent: "text-orange-400",
    border: "border-red-600",
  },
  molten: {
    bg: "from-gray-800 via-orange-900 to-yellow-800",
    fill: "from-yellow-400 via-orange-500 to-red-500",
    glow: "shadow-orange-500/50",
    accent: "text-yellow-400",
    border: "border-orange-500",
  },
  shadow: {
    bg: "from-gray-900 via-gray-800 to-black",
    fill: "from-purple-400 via-red-500 to-gray-600",
    glow: "shadow-purple-500/50",
    accent: "text-purple-400",
    border: "border-purple-600",
  },
  crimson: {
    bg: "from-red-950 via-red-900 to-red-800",
    fill: "from-red-400 via-red-500 to-red-700",
    glow: "shadow-red-600/50",
    accent: "text-red-400",
    border: "border-red-500",
  },
  inferno: {
    bg: "from-black via-red-950 to-orange-900",
    fill: "from-orange-300 via-red-400 to-red-600",
    glow: "shadow-orange-400/60",
    accent: "text-orange-300",
    border: "border-orange-400",
  },
};

const fonts = {
  gothic: "font-serif",
  modern: "font-sans",
  metal: "font-mono tracking-widest",
  elegant: "font-light tracking-wide",
};

const ThermometerPreview = forwardRef<
  HTMLDivElement,
  { design: Design; percentage: number }
>(({ design, percentage }, ref) => {
  const theme = themes[design.theme];
  const fontClass = fonts[design.fontStyle];

  const FlameIcon = () => (
    <motion.div
      animate={{
        rotate: [0, 5, -5, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Flame className="w-6 h-6 text-orange-400" />
    </motion.div>
  );

  return (
    <div
      className={`relative bg-gradient-to-b ${theme.bg} rounded-2xl p-8 ${theme.border} border-2 shadow-2xl ${theme.glow} w-full h-full flex flex-col justify-center flex-nowrap`}
    >
      {/* Title */}
      <motion.h1
        className={`text-2xl font-bold text-center text-white mb-2 mt-8 ${fontClass}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {design.title}
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className={`text-center ${theme.accent} mb-6 ${fontClass} text-sm`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {design.subtitle}
      </motion.p>

      <div className="flex-1 flex flex-col justify-center items-center relative" />
      {/* Thermometer Container - ONLY THIS PART GETS TRANSFORMED */}
      <motion.div
        className="absolute flex-1 flex flex-col justify-center"
        style={{
          left: "50%",
        }}
        animate={{
          scaleX: design.scaleX || 1,
          scaleY: design.scaleY || 1,
          rotate: design.rotation || 0,
          translateX: "-50%",
          translateY: `${design.translateY || 0}%`,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {/* Background thermometer */}
        <div className="w-20 h-80 mx-auto bg-black/40 rounded-full border-2 border-gray-600 relative overflow-hidden">
          {/* Fill */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${theme.fill} rounded-full shadow-lg`}
            style={{ height: `${percentage}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          />

          {/* Glow effect */}
          <motion.div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t ${theme.fill} rounded-full blur-sm opacity-60 z-10`}
            style={{ height: `${Math.min(percentage + 10, 100)}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${Math.min(percentage + 10, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
          />

          {/* Decorative marks */}
          {[25, 50, 75].map((mark) => (
            <div
              key={mark}
              className="absolute left-0 w-full h-0.5 bg-gray-500/50"
              style={{ bottom: `${mark}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom flame with proper spacing */}
      {design.showFlame && (
        <div className="flex mt-6 mb-4 justify-center">
          <FlameIcon />
        </div>
      )}

      {/* Stats - STAYS OUTSIDE THE TRANSFORM */}
      <motion.div
        className="text-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        {design.showPercentage && (
          <div className={`text-4xl font-bold ${theme.accent} ${fontClass}`}>
            {percentage.toFixed(1)}%
          </div>
        )}

        <div className="text-white space-y-1">
          <div className={`text-xl font-semibold ${fontClass}`}>
            {formatCurrency(
              // design.current, design
              {
                amount: design.current,
                currency: design.currency,
                customSymbol: design.customSymbol,
                currencySymbolPosition: design.currencySymbolPosition,
              }
            )}
          </div>
          <div className="text-gray-300 text-sm">
            of{" "}
            {formatCurrency(
              // design.goal, design
              {
                amount: design.goal,
                currency: design.currency,
                customSymbol: design.customSymbol,
                currencySymbolPosition: design.currencySymbolPosition,
              }
            )}{" "}
            goal
          </div>
        </div>

        {design.customMessage && (
          <motion.div
            className={`text-center ${theme.accent} text-sm ${fontClass} mt-4 px-4 py-2 bg-black/30 rounded-lg`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            {design.customMessage}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
});

ThermometerPreview.displayName = "ThermometerPreview";

export default ThermometerPreview;
