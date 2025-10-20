import { useState, useRef, useCallback } from 'react';
import { templates } from '@/lib/templates';
import { CardCanvas } from '@/components/CardCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { PhotoUpload } from '@/components/PhotoUpload';
import { TextEditor } from '@/components/TextEditor';
import { ShareButtons } from '@/components/ShareButtons';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  const handleDownload = () => {
    if (!canvasRef.current) {
      toast.error('Please wait for the card to render');
      return;
    }

    try {
      const link = document.createElement('a');
      const timestamp = new Date().getTime();
      link.download = `greeting-card-${selectedTemplate.occasion}-${timestamp}.png`;
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
      toast.success('Card downloaded successfully!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download card');
    }
  };

  const handleShare = async () => {
    if (!canvasRef.current) {
      toast.error('Please wait for the card to render');
      return;
    }

    try {
      canvasRef.current.toBlob(async (blob) => {
        if (!blob) {
          toast.error('Failed to generate image');
          return;
        }

        const file = new File([blob], 'greeting-card.png', { type: 'image/png' });

        // Check if Web Share API is available
        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: 'Festive Greeting Card',
              text: `Check out this beautiful ${selectedTemplate.occasion} greeting card!`,
            });
            toast.success('Card shared successfully!');
          } catch (error) {
            if ((error as Error).name !== 'AbortError') {
              console.error('Share error:', error);
              fallbackShare();
            }
          }
        } else {
          fallbackShare();
        }
      }, 'image/png');
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to share card');
    }
  };

  const fallbackShare = () => {
    // For WhatsApp, we'll need to upload to storage first
    // For now, show a message about downloading first
    toast.info('Download the card and share it manually on your preferred platform', {
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8 space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
              Festive Greetings
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-pulse" />
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create beautiful greeting cards for every celebration. Upload your photo, customize, and share instantly!
          </p>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-6">
            <TemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={setSelectedTemplate}
            />
            
            <PhotoUpload photo={photo} onPhotoChange={setPhoto} />
            
            <TextEditor
              name={name}
              message={message}
              onNameChange={setName}
              onMessageChange={setMessage}
              defaultMessage={selectedTemplate.defaultMessage}
            />
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground">Preview</h3>
              <div className="bg-card rounded-2xl p-4 shadow-elegant">
                <CardCanvas
                  template={selectedTemplate}
                  name={name}
                  message={message}
                  photo={photo}
                  onCanvasReady={handleCanvasReady}
                />
              </div>
            </div>

            <ShareButtons onDownload={handleDownload} onShare={handleShare} />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Create, customize, and share beautiful greeting cards for any occasion ✨</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
