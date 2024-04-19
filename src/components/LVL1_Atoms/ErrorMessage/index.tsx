import React from "react";

export type Props = Partial<{
  errors: string;
  className: string;
}>;

export const ErrorMessage: React.FC<Props> = ({
  errors = [],
  className = "",
}) => {
  return errors !== "undefined" && errors?.length > 0 ? (
    <div
      className={`text-red-500 text-left text-xs w-full mt-2 ml-4 ${className}`}
    >
      {errors}
    </div>
  ) : null;
};
