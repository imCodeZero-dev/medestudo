import styles from "./CreateTagsModal.module.css";
import { CreateTagsModalProps } from "./types";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";

const EditTagsModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
}: CreateTagsModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  return (
    <div className={styles["CreateTagsModal"]}>
      <CustomModal open={open} onClose={handleClose}>
        <img src={tagIcon} className="" />

        <Text className={styles["title"]}>{localeTitles?.TITLE_EDIT_TAGS}</Text>
        <Text className={styles["basic"]}>
          {localeText?.TEXT_A_TAG_WILL_BE_USED_TO_LINK_QUESTIONS}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <div className={styles["inputDiv"]}>
            <Input
              label={localeLables?.LABEL_TAG_TITLE}
              control={control}
              name="title"
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_TAG}
              preDefinedClassName="lesserHeight"
              preDefinedWrapClassName="inputField-wrap"
              type="text"
            />
          </div>

          <div className="flex justify-between mt-4">
            <Button
              type="button"
              className="secondaryBtn"
              onClick={handleClose}
            >
              {localeButtons.BUTTON_CANCEL}
            </Button>
            <Button
              type="submit"
              className="purpleBtn"
              loading={loading}
              onClick={handleSubmit(onSubmit)}
            >
              {localeButtons.BUTTON_SAVE}
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default EditTagsModal;
