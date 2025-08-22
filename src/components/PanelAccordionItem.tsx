import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";

export const PanelAccordionItem: React.FC<
  React.PropsWithChildren<{ value: string; title: React.ReactNode }>
> = ({ value, title, children }) => {
  return (
    <AccordionItem value={value} className="bg-gray-900/50 border-gray-700">
      <AccordionTrigger className="w-full px-4">{title}</AccordionTrigger>
      <AccordionContent className="p-4">{children}</AccordionContent>
    </AccordionItem>
  );
};
