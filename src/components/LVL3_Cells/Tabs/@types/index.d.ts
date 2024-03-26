export interface TabsProps {
  value: any;
  onChange: (event: React.SyntheticEvent, newValue: any) => void;
  tabLabels: string[];
}
