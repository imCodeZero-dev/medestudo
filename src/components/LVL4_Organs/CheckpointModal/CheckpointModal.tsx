import styles from "./CheckpointModal.module.css";
import { CheckpointModalProps } from "./types";
import addUserIcon from "../../../assets/Images/dashboard/Featured.png";
import tagIcon from "../../../assets/Images/dashboard/Tags.png";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import CustomModal from "../../LVL2_Molecules/CustomModal/CustomModal";
import Text from "../../LVL1_Atoms/Text/Text";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import CircularProgressChart from "../../LVL3_Cells/CircularProgressChart/CircularProgressChart";

const CheckpointModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  filteredDecks,
}: CheckpointModalProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  return (
    <div className={styles["CheckpointModal"]}>
      <CustomModal open={open} onClose={handleClose}>
        <div className={styles["modal-head"]}>
          <Text className={styles["title"]}>
            {localeTitles?.TITLE_CHECKPOINT}
          </Text>
          <CircularProgressChart percentage={95} />
        </div>
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
              placeholder="Select Deck"
              name="class"
              control={control}
              options={filteredDecks}
            />
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

export default CheckpointModal;
