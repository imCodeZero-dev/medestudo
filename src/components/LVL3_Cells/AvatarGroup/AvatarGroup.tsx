import React from "react";
import { AvatarGroupProps } from "./@types";
import styles from "./AvatarGroup.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";

const AvatarGroup: React.FC<AvatarGroupProps> = ({ students }) => {
  const { localeText, localeTitles } = useLocale();

  return (
    <div className={styles.container}>
      <div className={styles.avatars}>
        {students?.slice(0, 4)?.map((student) => (
          <img
            key={student._id}
            src={student.pic}
            alt={student.name}
            className={styles.avatar}
          />
        ))}
      </div>
      <Text className={styles.studentCount}>
        {students?.length} {localeTitles.TITLE_STUDENTS}
      </Text>
    </div>
  );
};

export default AvatarGroup;
