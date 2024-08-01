import styles from "./CreateDeckModal.module.css";
import { CreateDeckModalProps } from "./types";
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
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import SelectComponent from "../../LVL2_Molecules/ControlSelect/SelectComponent";

const CreateDeckModal = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  loading,
  filteredDecks,
  setValue,
  watch,
  custom,
  edit,
}: CreateDeckModalProps) => {
  const { width } = useWidth();
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  const subDeck = watch("subDeck");
  const nestedsubDeck = watch("nestedSubDeck");
  const deepNestedsubDeck = watch("deepNestedsubDeck");



  return (
    <div className={styles["CreateDeckModal"]}>
      <CustomModal
        open={open}
        onClose={handleClose}
        width={width > breakPoints?.sm ? 600 : "auto"}
      >
        <div className="text-center">
          <Text className={styles["title"]}>
            {edit
              ? localeTitles.TITLE_EDIT_DECK
              : localeTitles?.TITLE_CREATE_NEW_DECK}
          </Text>
          <Text className={styles["basic"]}>
            {localeText?.TEXT_A_DECK_IS_A_SUBSET_MSG}
          </Text>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          {custom ? (
            <Input
              control={control}
              name="deckTitle"
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_DECK_TITLE}
              preDefinedClassName="lesserHeight"
              preDefinedWrapClassName="inputField-wrap"
              type="text"
            />
          ) : (
            <>
              <div className={styles["inputDiv"]}>
                <Controller
                  name={"class"}
                  control={control}
                  defaultValue={null}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={{ label: filteredDecks?.name }}
                      isSearchable={false}
                      isDisabled
                    />
                  )}
                />
              </div>
              <div className={styles["inputDiv"]}>
                <CustomSelect
                  name="subDeck"
                  control={control}
                  options={filteredDecks?.subDeck}
                />
              </div>

              {subDeck && subDeck?.value?.subDeck?.length > 0 && (
                <div className={styles["inputDiv"]}>
                  <CustomSelect
                    name="nestedSubDeck"
                    control={control}
                    options={subDeck?.value?.subDeck}
                  />
                </div>
              )}

              {nestedsubDeck && nestedsubDeck?.value?.subDeck?.length > 0 && (
                <div className={styles["inputDiv"]}>
                  <CustomSelect
                    name="deepNestedsubDeck"
                    control={control}
                    options={nestedsubDeck?.value?.subDeck}
                  />
                </div>
              )}
              {deepNestedsubDeck &&
                deepNestedsubDeck?.value?.subDeck?.length > 0 && (
                  <div className={styles["inputDiv"]}>
                    <CustomSelect
                      name="lastNestedsubDeck"
                      control={control}
                      options={deepNestedsubDeck?.value?.subDeck}
                    />
                  </div>
                )}
            </>
          )}
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

export default CreateDeckModal;
