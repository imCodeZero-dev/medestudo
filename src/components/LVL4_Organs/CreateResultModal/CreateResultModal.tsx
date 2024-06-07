import styles from "./CreateResultModal.module.css";
import { CreateResultModalProps } from "./types";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";

const CreateResultModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  errors,
  watch,
}: CreateResultModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  return (
    <div className={styles[""]}>
      <CustomModal open={open} onClose={handleClose}>
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {localeTitles?.TITLE_SAVE_RESULT}
          </Text>
          <Text className={styles["basic"]}>
            {localeText?.TEXT_ENTER_UNIQUE_TITLE_TO_SAVE_RESULT}
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <div className={styles["inputDiv"]}>
            <Input
              control={control}
              name="title"
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_TITLE}
              preDefinedClassName="lesserHeight"
              preDefinedWrapClassName="inputField-wrap"
              type="text"
            />
          </div>

          <div className="flex justify-between mt-4 space-x-4">
            <Button type="button" className="primary" onClick={handleClose}>
              {localeButtons.BUTTON_CANCEL}
            </Button>
            <Button
              disabled={!watch("title")}
              type="submit"
              className="primaryActive"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              {localeButtons.BUTTON_CREATE}
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateResultModal;
