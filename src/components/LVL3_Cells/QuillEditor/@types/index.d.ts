export interface QuillEditorProps {
  name: string;
  borderRadius?: string | number; // Allow specifying border radius as a prop
  placeholder: string;
  control: Control<any>;
  readOnly?: boolean;
  noHeader?: boolean;
  key?: number;
  setValue:any
}
