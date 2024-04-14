import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { Controller, Control } from "react-hook-form";
import styles from "./QuillEditor.module.css";
import { QuillEditorProps } from "./@types";

// Quill.register("modules/imageResize", ImageResize);

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
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
    clipboard: {
      matchVisual: true,
    },
    imageResize: {
      parchment: Quill.import("parchment"),
      modules: ["Resize", "DisplaySize"],
    },
  },
  // Add the imageResize module here
  // imageResize: {},
};
const NoToolbar = {
  toolbar: false,
};

const RichTextEditor: React.FC<QuillEditorProps> = ({
  name,
  control,
  placeholder,
  borderRadius = "16px",
  readOnly,
  noHeader,
  key,
}) => {
  return (
    <div
      className={`bg-white rounded-lg my-3`}
      style={{ borderRadius, border: 0, outline: 0 }}
    >
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ReactQuill
            key={key}
            readOnly={readOnly}
            placeholder={placeholder}
            theme="snow"
            className={styles[readOnly ? "editorReadonly" : "editor"]}
            value={field.value}
            onChange={field.onChange}
            modules={noHeader ? NoToolbar : Editor}
          />
        )}
      />
    </div>
  );
};

export default RichTextEditor;
