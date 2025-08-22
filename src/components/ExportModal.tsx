import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Image, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ExportModal({
  open,
  onOpenChange,
  design,
  previewRef,
}) {
  const [exportSettings, setExportSettings] = useState({
    size: "social",
    format: "png",
  });
  const [isExporting, setIsExporting] = useState(false);

  const exportImage = async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      // Create a temporary canvas to capture the preview
      const canvas = document.createElement("canvas");
      canvas.width = design.width * 2;
      canvas.height = design.height * 2;
      const ctx = canvas.getContext("2d");

      // Fill with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Convert the preview element to canvas using html2canvas
      const { default: html2canvas } = await import("html2canvas");
      const previewCanvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
      });

      // Draw the preview canvas onto our export canvas, centered
      const x = (canvas.width - previewCanvas.width) / 2;
      const y = (canvas.height - previewCanvas.height) / 2;
      ctx.drawImage(previewCanvas, x, y);

      // Create download link
      const link = document.createElement("a");
      link.download = `hellscore-thermometer-${Date.now()}.${
        exportSettings.format
      }`;
      link.href = canvas.toDataURL(`image/${exportSettings.format}`, 1);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      onOpenChange(false);
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-900 border-red-900/30 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Image className="w-5 h-5 text-orange-400" />
            Export Thermometer
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Format</Label>
              <Select
                value={exportSettings.format}
                onValueChange={(value) =>
                  setExportSettings((prev) => ({ ...prev, format: value }))
                }
              >
                <SelectTrigger className="bg-black/50 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="png" className="text-white">
                    PNG (Transparent)
                  </SelectItem>
                  <SelectItem value="jpeg" className="text-white">
                    JPEG
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <h4 className="text-orange-400 font-semibold mb-2">
              Export Preview
            </h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>
                Size: {design.width * 2} × {design.height * 2}px (High Quality)
              </div>
              <div>Format: {exportSettings.format.toUpperCase()}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={exportImage}
            disabled={isExporting}
            className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Image
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
