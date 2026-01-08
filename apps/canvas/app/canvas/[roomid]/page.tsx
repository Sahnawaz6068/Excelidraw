"use client";

import { initDraw } from "@/app/draw";
import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current);
    }
  }, [canvasRef]);

  return (
    <div>
      <div className="flex gap-3 mt-4">
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-lg 
               bg-gray-800 text-white font-semibold text-sm
               shadow-md transition-all
               hover:bg-gray-700 hover:-translate-y-0.5
               active:scale-95"
        >
          ▭ Rect
        </button>

        <button
          className="flex items-center gap-2 px-5 py-2 rounded-lg 
               bg-gray-800 text-white font-semibold text-sm
               shadow-md transition-all
               hover:bg-gray-700 hover:-translate-y-0.5
               active:scale-95"
        >
          ◯ Circle
        </button>
      </div>

      <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    </div>
  );
}
