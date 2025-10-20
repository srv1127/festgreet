import { useEffect, useRef } from 'react';
import { Template } from '@/lib/templates';

interface CardCanvasProps {
  template: Template;
  name: string;
  message: string;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const CardCanvas = ({ template, name, message, onCanvasReady }: CardCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution
    const scale = 2;
    canvas.width = 1200 * scale;
    canvas.height = 1600 * scale;
    canvas.style.width = '100%';
    canvas.style.height = 'auto';
    ctx.scale(scale, scale);

    const renderCard = async () => {
      // Clear canvas
      ctx.clearRect(0, 0, 1200, 1600);

      // Draw AI-generated background image
      try {
        const bgImage = new Image();
        bgImage.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          bgImage.onload = resolve;
          bgImage.onerror = reject;
          bgImage.src = template.backgroundImage;
        });

        // Draw background image to cover entire canvas
        ctx.drawImage(bgImage, 0, 0, 1200, 1600);

        // Add semi-transparent overlay for better text readability
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, 1200, 1600);
      } catch (error) {
        console.error('Error loading background image:', error);
        // Fallback to solid color
        ctx.fillStyle = '#667eea';
        ctx.fillRect(0, 0, 1200, 1600);
      }

      // Draw decorations
      ctx.font = '60px Arial';
      template.decorations.forEach((decoration) => {
        const x = (decoration.position.x / 100) * 1200;
        const y = (decoration.position.y / 100) * 1600;
        ctx.font = `${decoration.size}px Arial`;
        ctx.fillText(decoration.content, x, y);
      });

      // Draw message at top
      ctx.fillStyle = template.textColor;
      ctx.font = `bold 120px ${template.fontFamily}, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.fillText(message || template.defaultMessage, 600, 400);

      // Draw quote in the middle with word wrapping
      ctx.font = `italic 45px ${template.fontFamily}, serif`;
      ctx.fillStyle = template.textColor;
      ctx.shadowBlur = 20;
      
      // Word wrap for quote
      const maxWidth = 1000;
      const lineHeight = 60;
      const words = template.quote.split(' ');
      let line = '';
      let y = 850;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, 600, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 600, y);

      // Draw sender name at bottom
      if (name) {
        ctx.font = `600 65px ${template.fontFamily}, serif`;
        ctx.fillStyle = template.accentColor;
        ctx.shadowBlur = 20;
        ctx.fillText(`~ ${name}`, 600, 1450);
      }

      ctx.shadowBlur = 0;

      if (onCanvasReady) {
        onCanvasReady(canvas);
      }
    };

    renderCard();
  }, [template, name, message, onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-2xl shadow-elegant"
    />
  );
};
