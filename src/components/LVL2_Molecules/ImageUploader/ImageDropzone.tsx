import React, { useCallback, useEffect, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import useLocale from "../../../locales";
import styles from "./AvatarUploader.module.css";
import { IoImageOutline } from "react-icons/io5";

interface ImageDropzoneProps {
  control: any; // Adjust the type according to your requirements
  name: string;
  setValue: any;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  control,
  name,
  setValue,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const { localeText } = useLocale();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setIsDragActive(false);
  }, []);

  const accept: Accept = {
    image: ["image/*"],
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  useEffect(() => {
    if (files.length > 0) {
      setValue(name, files[0]);
    }
  }, [setValue, files, name]);

  return (
    <div className="relative">
      {files.length === 0 ? (
        <Controller
          name={name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <div
                {...getRootProps()}
                className={`dropzone flex items-center  cursor-pointer ${
                  isDragActive ? "animate-pulse" : ""
                }`}
              >
                {field.value && typeof field.value === "string" ? (
                  <>
                    <img
                      src={field.value}
                      // alt="Uploaded Image"
                      style={{ maxWidth: "100px", maxHeight: "50px" }}
                      className="cursor-pointer"
                    />
                  </>
                ) : (
                  <>
                    <input {...getInputProps()} />
                    <div className="p-2 bg-gray-100 rounded-md">
                      <IoImageOutline size={22} />
                    </div>
                    <p className={` ml-2 ${styles.uploadtext}`}>
                      {localeText.TEXT_UPLOAD_IMAGE}
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        />
      ) : (
        <ul className="flex flex-wrap gap-2">
          {files.map((file, index) => (
            <li key={index} className="relative">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ maxWidth: "100px", maxHeight: "50px" }}
                className="cursor-pointer"
              />
              <FaTimes
                className="absolute top-0 right-[-24px] cursor-pointer text-red-500"
                onClick={() => setFiles(files.filter((f, i) => i !== index))}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ImageDropzone;
