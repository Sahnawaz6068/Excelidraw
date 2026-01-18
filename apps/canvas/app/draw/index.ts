import { HTTP_BACKEND } from '@/config';
import axios from 'axios';

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      height: number;
      width: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export async function initDraw(canvas: HTMLCanvasElement, roomId: string) {
  const ctx = canvas.getContext("2d");
  let existingShape: Shape[] = await getExistingShape(roomId);

  if (!ctx) return;

  // Initial background
  ctx.fillStyle = "rgba(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;
    startX = e.offsetX;
    startY = e.offsetY;
  });

  canvas.addEventListener("mouseup", (e) => {
    clicked = false;
    const width = e.offsetX - startX;
    const height = e.offsetY - startY;

    existingShape.push({
      type: "rect",
      x: startX,
      y: startY,
      height,
      width,
    });
    
    clearCanvas(existingShape, canvas, ctx);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (clicked) {
      const width = e.offsetX - startX;
      const height = e.offsetY - startY;


      clearCanvas(existingShape, canvas, ctx);

      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
}

function clearCanvas(
  existingShape: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  existingShape.forEach((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
    // Added a placeholder for circle logic
    else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
        ctx.stroke();
    }
  });
}

async function getExistingShape(roomId: string) {
  const response = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = response.data.messages;

  const shapes = messages.map((x: {message:string})=>{
    const messagesData =  JSON.parse(x.message)
    return messagesData;
  })
  return shapes;
}