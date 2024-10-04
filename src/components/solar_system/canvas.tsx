// react
import React, { useRef, useEffect, useState } from "react";
// style


export default function App() {
  // useRef
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // getCtx
  const [getCtx, setGetCtx] = useState<CanvasRenderingContext2D | null>(null);
  // painting state
  const [painting, setPainting] = useState<boolean>(false);

  useEffect(() => {
    // canvas useRef
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 650;
      canvas.height = 540;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineJoin = "round";
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "#000000";
        setGetCtx(ctx);
      }
      setPainting(true)
    }
  }, []);

  const drawFn = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // mouse position
    const mouseX = e.nativeEvent.offsetX;
    const mouseY = e.nativeEvent.offsetY;
    // drawing
    if (!painting && getCtx) {
      getCtx.beginPath();
      getCtx.moveTo(mouseX, mouseY);
    } else if (getCtx) {
      getCtx.lineTo(mouseX, mouseY);
      getCtx.stroke();
    }
  }

  return (
      <div className="view">
        <div className="canvasWrap">
          <canvas 
            className="canvas"
            ref={canvasRef}
            onMouseMove={e => drawFn(e)}
          >
          </canvas>
        </div>
      </div>
  )
}

