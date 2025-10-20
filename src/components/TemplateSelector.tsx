import { Template } from '@/lib/templates';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: Template;
  onSelectTemplate: (template: Template) => void;
}

export const TemplateSelector = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">Choose Template</h3>
      <div className="grid grid-cols-2 gap-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`relative cursor-pointer transition-all hover:scale-105 overflow-hidden ${
              selectedTemplate.id === template.id
                ? 'ring-2 ring-primary shadow-glow'
                : 'hover:shadow-elegant'
            }`}
            onClick={() => onSelectTemplate(template)}
          >
            <div
              className="h-32 flex items-center justify-center relative bg-cover bg-center"
              style={{ backgroundImage: `url(${template.backgroundImage})` }}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="text-center relative z-10">
                <p className="text-2xl font-display font-bold text-white drop-shadow-lg">
                  {template.occasion}
                </p>
                {template.decorations[0] && (
                  <span className="text-4xl">{template.decorations[0].content}</span>
                )}
              </div>
              {selectedTemplate.id === template.id && (
                <div className="absolute top-2 right-2 bg-primary rounded-full p-1 z-10">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
