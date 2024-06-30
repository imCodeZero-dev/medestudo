import React, { useEffect, useRef, useState } from "react";
import { InterestedInFormProps } from "./@types";
import styles from "./InterestedInForm.module.css";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../LVL1_Atoms/Button";
import CustomSelect from "../../LVL2_Molecules/ControlSelect/CustomSelect";
import { totalYears } from "../../../utils/constants/constants";
import CountrySelectDropDown from "../../LVL2_Molecules/ControlSelect/CountrySelectDropDown";
import { Country, City, State } from "country-state-city";
import StateSelectDropDown from "../../LVL2_Molecules/ControlSelect/StateSelectDropDown";
import Input from "../../LVL1_Atoms/Input";
import Checkbox from "../../LVL1_Atoms/CheckBox";

const InterestedInForm: React.FC<InterestedInFormProps> = ({
  control,
  handleSubmit,
  onSubmit,
  loading,
  watch,
  allSubjects,
  arrayOfSubjects,
  selectedCheckboxes,
  setSelectedCheckboxes,
  moveBack,
}) => {
  // const { localeText, localeDropdowns } = useLocale();
  const {
    localeText,
    localeTitles,
    localeButtons,
    localeLables,
    localePlaceholders,
  } = useLocale();
  const [viewPassword, setViewPassword] = useState<boolean>(false);

  const handleView = () => {
    setViewPassword(!viewPassword);
  };

  //   useEffect(() => {
  // console.log('watch("state")',watch("state"))
  //   },[watch("state")])
  return (
    <div className={styles["InterestedInForm"]}>
      <Text className={styles.title}>
        {localeTitles.TITLE_WHAT_ARE_YOU_INTERESETED_IN}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["selectDivs"]}>
          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {localeLables.LABEL_SELECT_COUNTRY}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>

            <StateSelectDropDown
              items={Country?.getAllCountries()}
              name="country"
              control={control}
              labelKey="name"
              valueKey="isoCode"
              hideLabel
            />
          </div>
          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {localeLables.LABEL_SELECT_CITY}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>
            {watch("country") && (
              <StateSelectDropDown
                items={City?.getCitiesOfCountry(
                  JSON?.parse(watch("country")).isoCode
                )}
                name="city"
                control={control}
                labelKey="name"
                valueKey="cityCode"
                hideLabel
              />
            )}
          </div>

          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {localeLables.LABEL_SELECT_HOSPITAL}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>
            <Input
              // label={localeLables?.LABEL_USERNAME}
              control={control}
              name="hospital"
              placeholder={localePlaceholders.PLACEHOLDER_ENTER_HOSPITAL_NAME}
              preDefinedClassName="lesserHeight"
              preDefinedWrapClassName="inputField-wrap"
              type="text"
            />
          </div>
          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {localeLables.LABEL_SELECT_SPECIALITY}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>

            <CustomSelect
              name="speciality"
              control={control}
              options={allSubjects}
              placeholder="Select Speciality"
            />
          </div>

          <div className={styles["inputDiv"]}>
            <Text className={styles["labelText"]}>
              {`* ${selectedCheckboxes?.length} ${localeLables.LABEL_SPECIALITIES_SELECTED}`}{" "}
              <span className={styles["mandatory"]}>*</span>
            </Text>

            <div className="flex flex-col space-y-3 mt-4">
              {arrayOfSubjects?.map((itm, i) => (
                <Checkbox
                  key={i}
                  control={control}
                  label={itm}
                  name={itm}
                  selectedCheckboxes={selectedCheckboxes}
                  setSelectedCheckboxes={setSelectedCheckboxes}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles["actionBtns"]}>
          <Button type="button" className="primary" onClick={moveBack}>
            {localeButtons.BUTTON_BACK}
          </Button>
          <Button
            type="submit"
            className="primaryActive"
            loading={loading}
            onClick={handleSubmit(onSubmit)}
          >
            {localeButtons.BUTTON_NEXT}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InterestedInForm;
