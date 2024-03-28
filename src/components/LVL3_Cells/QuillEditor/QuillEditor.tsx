import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Controller, Control } from "react-hook-form";
import styles from "./QuillEditor.module.css";

interface RichTextEditorProps {
  name: string;
  borderRadius?: string | number; // Allow specifying border radius as a prop
  placeholder: string;
  control: Control<any>;
}

const Editor = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
      [{ script: "sub" }, { script: "super" }],
      [{ align: [] }],
      ["image", "blockqoute", "code-block"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme

      ["clean"], // remove formatting button
    ],
  },
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  name,
  control,
  placeholder,
  borderRadius = "16px", // Set a default border radius if not provided
}) => {
  return (
    <div
      className={`bg-white rounded-lg my-3`}
      style={{ borderRadius, border: 0,outline:0 }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill
            placeholder={placeholder}
            theme="snow"
            className={styles["editor"]}
            value={field.value}
            onChange={field.onChange}
            modules={Editor}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
