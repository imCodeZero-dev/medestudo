import styles from "./CreateExamModal.module.css";
import { EditExamModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import SelectDropDown from "../../LVL2_Molecules/ControlSelect/CountrySelectDropDown";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import { totalYears } from "../../../utils/constants/constants";
import SelectComponent from "../../LVL2_Molecules/ControlSelect/SelectComponent";

const CreateExamModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  filteredDecks,
  errors,
  watch,
}: EditExamModalProps) => {
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
            {localeTitles?.TITLE_CREATE_PAST_EXAM}
          </Text>
          <Text className={styles["basic"]}>
            {localeText?.TEXT_ENTER_EXAM_INFO_TO_CREATE}
          </Text>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <div className={styles["inputDiv"]}>
            <Input
              control={control}
              name="title"
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_EXAM_TITLE}
              preDefinedClassName="lesserHeight"
              preDefinedWrapClassName="inputField-wrap"
              type="text"
            />
          </div>
          <div className={styles["inputDiv"]}>
            <CustomSelect
              placeholder="Select Institute"
              name="institute"
              control={control}
              options={filteredDecks}
            />
          </div>
          <div className={styles["inputDiv"]}>
            <CustomSelect
              name="year"
              control={control}
              options={totalYears}
              placeholder="Select Year"
            />
          </div>

          <div className="flex justify-between mt-4 space-x-4">
            <Button type="button" className="primary" onClick={handleClose}>
              {localeButtons.BUTTON_CANCEL}
            </Button>
            <Button
              disabled={
                !(watch("institute") && watch("year") && watch("title"))
              }
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

export default CreateExamModal;
