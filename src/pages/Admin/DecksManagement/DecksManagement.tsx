import styles from "./DecksManagement.module.css";
import { DecksManagementProps } from "./types";
import AdminLayout from "../../../components/LVL5_Layouts/AdminLayout/AdminLayout";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { IoMdAdd } from "react-icons/io";

import { useDecksManagement } from "./hook";
import { AdminRoutes } from "../../../Routes/protectedRoutes/AdminRoutes";
import CreateDeckSection from "../../../components/LVL4_Organs/CreateDeckSection/CreateDeckSection";
import InputDeck from "../../../components/LVL1_Atoms/InputDeck/InputDeck";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { RxPencil1 } from "react-icons/rx";
import { useState } from "react";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";

const DecksManagement = ({}: DecksManagementProps) => {
  const { localeTitles, localeButtons, localePlaceholders } = useLocale();
  const {
    control,
    createSection,
    handleCreate,
    handleCreateCancel,
    handleSubmit,
    onCreateSubmission,
    setValue,
    getValues,
    watch,
    allDecks,
    handleDeleteOpen,
    handleDeleteClose,
    deleteModal,
    onDeleteConfirm,
    deleteLoading,
  } = useDecksManagement();

  const [expandedDecks, setExpandedDecks] = useState<boolean[]>([]);

  const toggleDeckExpansion = (parentIndex: number) => {
    const newExpandedDecks = [...expandedDecks];
    newExpandedDecks[parentIndex] = !newExpandedDecks[parentIndex];
    setExpandedDecks(newExpandedDecks);
  };

  return (
    <AdminLayout>
      <div className={styles["DecksManagement"]}>
        <div className={styles["DecksManagement-head"]}>
          <div className={styles["head-left"]}>
            <Text className={styles["mainHeading"]}>
              {localeTitles?.TITLE_DECKS}
            </Text>
            <Text className={styles["greyText"]}>
              {localeTitles?.WELCOME_TRACK_WHATS_GOING_ON_YOUR_PLATFORM}
            </Text>
          </div>
          <div className={styles["head-right"]}>
            {!createSection && (
              <Button
                leftIcon={<IoMdAdd />}
                className="purpleBtn"
                onClick={handleCreate}
              >
                {localeButtons?.BUTTON_CREATE_DECK}
              </Button>
            )}
          </div>
        </div>

        {createSection ? (
          <CreateDeckSection
            control={control}
            handleSubmit={handleSubmit}
            onSubmit={onCreateSubmission}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
            handleCreateCancel={handleCreateCancel}
          />
        ) : (
          <div className={styles["deckBody"]}>
            {allDecks?.map((deck: any, parentIndex: number) => (
              <>
                <div key={parentIndex} className={styles["deckContainer"]}>
                  <div className="flex justify-between items-center mb-2">
                    <Text className={styles["eachDeckHeading"]}>
                      Deck {parentIndex + 1}
                    </Text>

                    <div className="flex space-x-6">
                      <RxPencil1 className="cursor-pointer" />
                      <GoTrash
                        className="cursor-pointer"
                        onClick={() => handleDeleteOpen(deck)}
                      />
                      {expandedDecks[parentIndex] ? (
                        <FaAngleUp
                          className="cursor-pointer"
                          onClick={() => toggleDeckExpansion(parentIndex)}
                        />
                      ) : (
                        <FaAngleDown
                          className="cursor-pointer"
                          onClick={() => toggleDeckExpansion(parentIndex)}
                        />
                      )}
                    </div>
                  </div>
                  <InputDeck
                    control={control}
                    name={deck?.name}
                    defaultValue={deck?.name}
                  />

                  <div
                    className={
                      expandedDecks[parentIndex]
                        ? `${styles["show"]}`
                        : `${styles["hide"]}`
                    }
                  >
                    {deck.subDeck?.map((subDeck: any, index: number) => (
                      <div key={index} className={styles["subDeckContainer"]}>
                        <InputDeck
                          control={control}
                          name={subDeck?.name}
                          defaultValue={subDeck?.name}
                        />

                        {subDeck.subDeck?.map(
                          (nestedDeck: any, nestedIndex: number) => (
                            <div
                              key={nestedIndex}
                              className={styles["nestedDeckContainer"]}
                            >
                              <InputDeck
                                control={control}
                                name={nestedDeck?.name}
                                defaultValue={nestedDeck?.name}
                              />

                              {nestedDeck.subDeck?.map(
                                (
                                  deepNestedDeck: any,
                                  deepNestedIndex: number
                                ) => (
                                  <div
                                    key={deepNestedIndex}
                                    className={
                                      styles["deepNestedDeckContainer"]
                                    }
                                  >
                                    <InputDeck
                                      control={control}
                                      name={deepNestedDeck?.name}
                                      defaultValue={deepNestedDeck?.name}
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ))}
          </div>
        )}

        <ConfirmationModal
          open={deleteModal}
          cancelButtonText={localeButtons?.BUTTON_CANCEL}
          confirmButtonText={localeButtons?.BUTTON_DELETE}
          onConfirm={onDeleteConfirm}
          icon={<AlertIcon />}
          title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
          handleClose={handleDeleteClose}
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default function DecksManagementServices() {
  return (
    <AdminRoutes>
      <DecksManagement />
    </AdminRoutes>
  );
}
