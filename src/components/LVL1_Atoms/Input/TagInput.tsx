import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Tag } from "../../../utils/constants/DataTypes";
import { ErrorMessage } from "../ErrorMessage";

interface TagInputProps {
  control: any;
  allTags: Tag[] | undefined;
  name: string;
  placeholder: string;
}

const TagInput: React.FC<TagInputProps> = ({
  control,
  allTags,
  name,
  placeholder,
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field, formState: { errors } }) => (
          // render={({ field: { onChange, value }, formState: { errors } }) => {
          <>
            <Select
              isMulti
              options={allTags?.map((tag) => ({
                value: tag._id,
                label: tag.title,
              }))}
              value={field.value}
              placeholder={placeholder}
              onChange={(selectedTags: any) => field.onChange(selectedTags)}
            />
            {/* Log errors to the console */}
            {errors && (
              <ErrorMessage errors={`${errors?.[name]?.message as any}`} />
            )}
          </>
        )}
      />
    </div>
  );
};

export default TagInput;
