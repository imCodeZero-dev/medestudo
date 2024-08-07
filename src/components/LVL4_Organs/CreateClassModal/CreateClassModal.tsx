import styles from "./CreateClassModal.module.css";
import { CreateClassModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import SelectComponent from "../../LVL2_Molecules/ControlSelect/SelectComponent";

const CreateClassModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  filteredDecks,
  custom,
  edit,
}: CreateClassModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  const { width } = useWidth();
  return (
    <div className={styles["CreateClassModal"]}>
      <CustomModal
        open={open}
        onClose={handleClose}
        width={width > breakPoints?.sm ? 600 : "auto"}
      >
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {edit
              ? localeTitles?.TITLE_EDIT_CLASS
              : localeTitles?.TITLE_CREATE_CLASS}
          </Text>
          <Text className={styles["basic"]}>
            {localeText?.TEXT_A_CLASS_IS_A_SET_OF_FLASHCARDS}
          </Text>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <div className={styles["inputDiv"]}>
            {custom ? (
              <Input
                control={control}
                name="title"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_CLASS_TITLE}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
            ) : (
              <CustomSelect
                placeholder="Select Deck"
                name="class"
                control={control}
                options={filteredDecks}
              />
            )}
          </div>

          <div className="flex justify-between mt-4 space-x-4">
            <Button type="button" className="primary" onClick={handleClose}>
              {localeButtons.BUTTON_CANCEL}
            </Button>
            <Button
              type="submit"
              className="primaryActive"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              {localeButtons.BUTTON_CONTINUE}
            </Button>
          </div>
        </form>
      </CustomModal>
    </div>
  );
};

export default CreateClassModal;
