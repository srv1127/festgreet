import { useEffect, useRef } from 'react';
import { Template } from '@/lib/templates';

interface CardCanvasProps {
  template: Template;
  name: string;
  message: string;
  photo: string | null;
  onCanvasReady?: (canvas: HTMLCanvasElement) => void;
}

export const CardCanvas = ({ template, name, message, photo, onCanvasReady }: CardCanvasProps) => {
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

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 1200, 1600);
      const colors = template.background.match(/hsl\([^)]+\)|#[a-fA-F0-9]{6}/g) || ['#667eea', '#764ba2'];
      
      if (colors.length >= 2) {
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(0.5, colors[1]);
        if (colors[2]) gradient.addColorStop(1, colors[2]);
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 1600);

      // Draw photo if provided
      if (photo) {
        try {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = photo;
          });

          // Draw circular photo
          const photoSize = 400;
          const photoX = 600;
          const photoY = 450;

          ctx.save();
          ctx.beginPath();
          ctx.arc(photoX, photoY, photoSize / 2, 0, Math.PI * 2);
          ctx.closePath();
          ctx.clip();

          const aspectRatio = img.width / img.height;
          let drawWidth = photoSize;
          let drawHeight = photoSize;
          let drawX = photoX - photoSize / 2;
          let drawY = photoY - photoSize / 2;

          if (aspectRatio > 1) {
            drawHeight = photoSize / aspectRatio;
            drawY = photoY - drawHeight / 2;
          } else {
            drawWidth = photoSize * aspectRatio;
            drawX = photoX - drawWidth / 2;
          }

          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          ctx.restore();

          // Add photo border
          ctx.beginPath();
          ctx.arc(photoX, photoY, photoSize / 2 + 8, 0, Math.PI * 2);
          ctx.strokeStyle = template.accentColor;
          ctx.lineWidth = 12;
          ctx.stroke();
        } catch (error) {
          console.error('Error loading photo:', error);
        }
      }

      // Draw decorations
      ctx.font = '60px Arial';
      template.decorations.forEach((decoration) => {
        const x = (decoration.position.x / 100) * 1200;
        const y = (decoration.position.y / 100) * 1600;
        ctx.font = `${decoration.size}px Arial`;
        ctx.fillText(decoration.content, x, y);
      });

      // Draw message
      ctx.fillStyle = template.textColor;
      ctx.font = `bold 120px ${template.fontFamily}, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      ctx.fillText(message || template.defaultMessage, 600, photo ? 900 : 600);

      // Draw name if provided
      if (name) {
        ctx.font = `600 80px ${template.fontFamily}, serif`;
        ctx.fillStyle = template.accentColor;
        ctx.fillText(name, 600, photo ? 1050 : 750);
      }

      // Draw occasion tag
      ctx.shadowBlur = 0;
      ctx.font = '40px Poppins, sans-serif';
      ctx.fillStyle = template.textColor;
      ctx.globalAlpha = 0.8;
      ctx.fillText(template.occasion.toUpperCase(), 600, 1450);
      ctx.globalAlpha = 1;

      if (onCanvasReady) {
        onCanvasReady(canvas);
      }
    };

    renderCard();
  }, [template, name, message, photo, onCanvasReady]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-auto rounded-2xl shadow-elegant"
    />
  );
};
