import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

interface ShareButtonsProps {
  onDownload: () => void;
  onShare: () => void;
}

export const ShareButtons = ({ onDownload, onShare }: ShareButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        onClick={onDownload}
        size="lg"
        className="bg-gradient-primary hover:opacity-90 transition-all shadow-elegant font-semibold"
      >
        <Download className="w-5 h-5 mr-2" />
        Download
      </Button>
      <Button
        onClick={onShare}
        size="lg"
        variant="secondary"
        className="font-semibold shadow-elegant hover:shadow-glow transition-all"
      >
        <Share2 className="w-5 h-5 mr-2" />
        Share
      </Button>
    </div>
  );
};
