import { useState, useRef, useCallback } from 'react';
import { templates } from '@/lib/templates';
import { CardCanvas } from '@/components/CardCanvas';
import { TemplateSelector } from '@/components/TemplateSelector';
import { TextEditor } from '@/components/TextEditor';
import { ShareButtons } from '@/components/ShareButtons';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

const Index = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [name, setName] = useState('');
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
            Create beautiful AI-powered greeting cards for every celebration. Choose a template, add your name, and share instantly!
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
            
            <TextEditor
              name={name}
              onNameChange={setName}
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
                  message={selectedTemplate.defaultMessage}
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
          <p>Made with love by curiousweber</p>
             <a
        href="https://instagram.com/your_instagram_id" // replace with your Instagram ID
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 hover:text-pink-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5z" />
          <path d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" />
          <circle cx="17.5" cy="6.5" r="0.9" />
        </svg>
      </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;
