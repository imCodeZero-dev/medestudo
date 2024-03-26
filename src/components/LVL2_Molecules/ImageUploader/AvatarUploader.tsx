import React, { useRef } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone";
import { FaPencil } from "react-icons/fa6";
import AvatarImg from "../../../assets/Images/dashboard/Avatar.png";
import styles from "./AvatarUploader.module.css";
import { ErrorMessage } from "../../LVL1_Atoms/ErrorMessage";
import { cn } from "../../../utils/hooks/helper";
import { RxAvatar } from "react-icons/rx";

interface AvatarUploaderProps {
  control: Control<any>;
  name: string;
  watch: any;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  control,
  name,
  watch,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log("watchName", watch(name));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, formState: { errors } }) => (
        <>
          <Dropzone
            multiple={false}
            onDrop={(acceptedFiles) => {
              //
              onChange(acceptedFiles[0]);
            }}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div {...getRootProps()} className={styles["uploadCard"]}>
                <input {...getInputProps()} />
                <div>
                  <div className="relative w-44">
                    {/* <img
                      src={
                        watch(name)
                          ? URL.createObjectURL(watch(name))
                          : AvatarImg
                      }
                      className={`${styles["image"]}   ${
                        isDragActive
                          ? "bg-[#139D3A] text-white animate-pulse"
                          : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                      }`}
                    /> */}
                    <RxAvatar
                      className={`${styles["image"]}   ${
                        isDragActive
                          ? "bg-[#139D3A] text-white animate-pulse"
                          : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                      }`}
                    />
                    <div className="absolute top-0 right-0 z-10 cursor-pointer">
                      <FaPencil />
                    </div>
                  </div>
                </div>
                {!!errors && (
                  <ErrorMessage errors={errors?.[name]?.message as string} />
                )}
              </div>
            )}
          </Dropzone>
        </>
      )}
    />
  );
};

export default AvatarUploader;
