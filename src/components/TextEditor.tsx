import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TextEditorProps {
  name: string;
  onNameChange: (name: string) => void;
}

export const TextEditor = ({ 
  name, 
  onNameChange
}: TextEditorProps) => {
  return (
    <Card className="shadow-elegant border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">Add Your Name</CardTitle>
        <CardDescription>The sender name will appear at the bottom of the card</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Sender Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            className="transition-all duration-200"
          />
        </div>
      </CardContent>
    </Card>
  );
};
