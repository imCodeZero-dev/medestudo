import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Tag } from "../../../utils/constants/DataTypes";

interface TagInputProps {
  control: any;
  allTags: Tag[] | undefined;
  name: string;
}

const TagInput: React.FC<TagInputProps> = ({ control, allTags, name }) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            isMulti
            options={allTags?.map((tag) => ({
              value: tag._id,
              label: tag.title,
            }))}
            value={field.value}
            onChange={(selectedTags: any) => field.onChange(selectedTags)}
          />
        )}
      />
    </div>
  );
};

export default TagInput;
