import styles from "./CreateClassModal.module.css";
import { CreateClassModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import SelectDropDown from "../../LVL2_Molecules/ControlSelect/CountrySelectDropDown";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import CountrySelectDropDown from "../../LVL2_Molecules/ControlSelect/CountrySelectDropDown";

const CreateClassModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  filteredDecks,
}: CreateClassModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  return (
    <div className={styles["CreateClassModal"]}>
      <CustomModal open={open} onClose={handleClose}>
        <Text className={styles["title"]}>
          {localeTitles?.TITLE_CREATE_CLASS}
        </Text>
        <Text className={styles["basic"]}>
          {localeText?.TEXT_A_CLASS_IS_A_SET_OF_FLASHCARDS}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <div className={styles["inputDiv"]}>
            {/* <SelectDropDown
              items={filteredDecks}
              name="class"
              control={control}
              labelKey="name"
              valueKey="isoCode"
              label="Location"
            /> */}
            <CustomSelect
              name="class"
              control={control}
              options={filteredDecks}
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
