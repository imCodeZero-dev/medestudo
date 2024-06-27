import { useEffect, useState } from "react";
import styles from "./ProfileInfo.module.css";
import logoImg from "../../../assets/MedEstudo-assets/MedEstudo-Final-Logos/Logo/medestudo-logo-horizontal-blue.png";
import { useLocation, useNavigate } from "react-router-dom";

import { ProfileInfoProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import Input from "../../LVL1_Atoms/Input";
import { Button } from "../../LVL1_Atoms/Button";
import AvatarUploader from "../../LVL2_Molecules/ImageUploader/AvatarUploader";
import { Country, City } from "country-state-city";
import CountrySelectDropDown from "../../LVL2_Molecules/ControlSelect/CountrySelectDropDown";
import { useCookies } from "react-cookie";
import StateSelectDropDown from "../../LVL2_Molecules/ControlSelect/StateSelectDropDown";

const ProfileInfo = ({
  control,
  controlImage,
  handleSubmit,
  generalLoading,
  onSubmitGeneral,
  handleSubmitImage,
  onSubmitImage,
  imageLoading,
  watch,
}: ProfileInfoProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { localeTitles, localeLables, localePlaceholders, localeButtons } =
    useLocale();
  const watchImg = watch("pic");
  console.log("watchImg", watchImg);

  return (
    <div className={styles.ProfileInfo}>
      <div className="grid grid-cols-3 lg:space-x-6 my-6 space-y-5 lg:space-y-0">
        <form
          onSubmit={handleSubmit(onSubmitGeneral)}
          className={`${styles["form"]} col-span-full  lg:col-span-2`}
        >
          <div className={styles["ProfileInfo-section-1"]}>
            <Text className={styles.heading}>
              {localeTitles.TITLE_GENERAL_INFO}
            </Text>
            <div className="mt-4">
              <Input
                label={localeLables?.LABEL_NAME}
                control={control}
                name="name"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
            </div>

            <div className="grid md:grid-cols-2 md:space-x-2 my-4 space-y-3 md:space-y-0">
              <Input
                label={localeLables?.LABEL_USERNAME}
                control={control}
                name="username"
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_USERNAME}
                preDefinedClassName="lesserHeight"
                preDefinedWrapClassName="inputField-wrap"
                type="text"
              />
              {/* <CountrySelectDropDown
                items={Country?.getAllCountries()}
                name="location"
                control={control}
                label="Location"
              /> */}

              <div>
                <Text className={styles["label14"]}>Location</Text>
                <StateSelectDropDown
                  items={Country?.getAllCountries()}
                  name="location"
                  control={control}
                  labelKey="name"
                  valueKey="isoCode"
                  hideLabel
                />
              </div>
            </div>
            <Button
              type="submit"
              loading={generalLoading}
              className="purpleBtn"
              onClick={handleSubmit(onSubmitGeneral)}
            >
              {localeButtons?.BUTTON_UPDATE}
            </Button>
          </div>
        </form>

        <form
          onSubmit={handleSubmitImage(onSubmitImage)}
          // className={styles["form"]}
          className={`${styles["form"]} col-span-full  lg:col-span-1`}
        >
          <div className={styles["ProfileInfo-section-2"]}>
            <div className="flex flex-col justify-between h-full items-center md:items-start space-y-3 lg:space-y-0">
              <Text className={styles.heading}>
                {localeTitles.TITLE_PROFILE_IMAGE}
              </Text>

              <AvatarUploader control={controlImage} name="pic" watch={watch} />
              <Button
                disabled={!watchImg?.name}
                className="purpleBtn"
                type="submit"
                loading={imageLoading}
                onClick={handleSubmitImage(onSubmitImage)}
              >
                {localeButtons?.BUTTON_CHANGE_IMAGE}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;
