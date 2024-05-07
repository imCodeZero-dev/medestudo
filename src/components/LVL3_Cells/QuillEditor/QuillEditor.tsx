import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Controller, Control } from "react-hook-form";
import styles from "./QuillEditor.module.css";
import { QuillEditorProps } from "./@types";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

const EditorWithMedia = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
  // Add the imageResize module here
  // imageResize: {},
};
const Editor = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },

  // Add the imageResize module here
  // imageResize: {},
};

const NoToolbar = {
  toolbar: false,
};

const QuillEditor: React.FC<QuillEditorProps> = ({
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
      className={`bg-white rounded-lg`}
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

export default QuillEditor;
