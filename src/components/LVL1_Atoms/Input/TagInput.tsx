import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Tag } from "../../../utils/constants/DataTypes";

interface TagInputProps {
  control: any; // Replace 'any' with your specific type for 'control'
  allTags: Tag[]; // Assuming 'allTags' is an array of objects with '_id' and 'title' properties
}

const TagInput: React.FC<TagInputProps> = ({ control, allTags }) => {
  return (
    <div>
      <Controller
        name="tags"
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
