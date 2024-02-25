import React from "react";
import { Controller } from "react-hook-form";

interface CheckboxProps {
  name: string;
  label: string;
  control: any; // Update this with the appropriate type for the 'control' prop
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label, control }) => {
  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <input
              type="checkbox"
              id={name}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor={name}
              className="ml-2 block text-sm leading-5 text-gray-900"
            >
              {label}
            </label>
            {error && <span className="text-red-500">{error.message}</span>}
          </>
        )}
      />
    </div>
  );
};

export default Checkbox;
