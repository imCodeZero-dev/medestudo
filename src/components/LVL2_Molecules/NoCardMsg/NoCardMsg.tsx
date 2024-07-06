import React from "react";
import ImageWithLoader from "../ImageWithLoader/Image";
import Text from "../../LVL1_Atoms/Text/Text";

interface Props {
  msg: string;
}

function NoCardMsg({ msg }: Props) {
  return (
    <div className="flex  flex-col justify-center text-center items-center space-y-4">
      <ImageWithLoader
        src="https://i.pinimg.com/originals/b9/37/12/b9371273ae94a946e92074d1b9696680.gif"
        alt=""
        className="h-24 w-24"
      />
      <Text className="text-xl font-bold">{msg}</Text>
    </div>
  );
}

export default NoCardMsg;
