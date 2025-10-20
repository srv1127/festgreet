import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface TextEditorProps {
  name: string;
  message: string;
  onNameChange: (name: string) => void;
  onMessageChange: (message: string) => void;
  defaultMessage: string;
}

export const TextEditor = ({
  name,
  message,
  onNameChange,
  onMessageChange,
  defaultMessage,
}: TextEditorProps) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Recipient Name
        </Label>
        <Input
          id="name"
          placeholder="Enter name..."
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="transition-all focus:shadow-glow"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-sm font-medium">
          Message
        </Label>
        <Input
          id="message"
          placeholder={defaultMessage}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          className="transition-all focus:shadow-glow"
        />
      </div>
    </Card>
  );
};
