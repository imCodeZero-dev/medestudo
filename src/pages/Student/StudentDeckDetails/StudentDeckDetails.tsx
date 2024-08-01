import styles from "./StudentDeckDetails.module.css";
import { StudentDeckDetailsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useStudentDeckDetails } from "./hook";
import { useLocation, useNavigate } from "react-router-dom";

import flashcard1 from "../../../assets/Images/dashboard/flashcard1.png";

import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";

import CreateClassModal from "../../../components/LVL4_Organs/CreateClassModal/CreateClassModal";
import { useState } from "react";
import { IoIosCheckmarkCircle, IoIosPlayCircle } from "react-icons/io";
import { IoEllipsisHorizontal, IoTimeOutline } from "react-icons/io5";
import { BiChevronRight, BiSolidPencil } from "react-icons/bi";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { FaCirclePlus, FaClock, FaRegTrashCan } from "react-icons/fa6";
import { SiRundeck } from "react-icons/si";
import { TbCards } from "react-icons/tb";
import CreateDeckModal from "../../../components/LVL4_Organs/CreateDeckModal/CreateDeckModal";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ConfirmationModal from "../../../components/LVL4_Organs/ConfirmationModal";
import AlertIcon from "../../../assets/svgs/AlertIcon";
import {
  Class,
  DecksWithCardCount,
  deckData,
} from "../../../utils/constants/DataTypes";
import Loader from "../../../components/LVL1_Atoms/Loader";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import {
  dummyDecks,
  dummyFlashCards,
  dummyFlashcardDetails,
} from "../StudentDashboard/StudentDashboard";
import { Controller } from "react-hook-form";
import { formattedTime } from "../../../utils/hooks/helper";
import { useWidth } from "../../../utils/hooks/responsiveHook";
import { breakPoints } from "../../../utils/constants/ResponsiveDesignBreakPoints";

const StudentDeckDetails = ({}: StudentDeckDetailsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(false);
  const location = useLocation();
  const { width } = useWidth();

  const {
    control,
    handleSubmit,
    watch,
    handleCloseCreate,
    onSubmitCreate,
    setCreateModal,
    createModal,
    createLoading,
    classDetails,
    setValue,
    openDeleteModal,
    deleteModal,
    handleDeleteClose,
    onDeleteConfirm,
    deleteLoading,
    anchorEl,
    handleClickOptions,
    handleCloseOptions,
    allClasses,
    allClassesLoading,
    getDetails,
    specificDecks,
    classDecks,
    classDecksLoading,
    handleDeleteClassClose,
    openDeleteClassModal,
    deleteClassModal,
    onDeleteClassConfirm,
    allDecks,
    mode,
    selectedDecks,
    handleAllSelect,
    handleCheckboxDecks,
    totalCardCount,
    classId,
  } = useStudentDeckDetails();
  // console.log("specificDecks", specificDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  const navigateToViewFlashcard = (deck: any) => {
    // console.log("navigateToViewFlashcard", deck);
    navigate(`/student/flashcard/deck/flashcard/${deck?._id}`, {
      state: { ...deck, mode },
    });
  };

  const navigateToViewFlashcardCustom = (deck: any) => {
    // console.log("navigateToViewFlashcard", deck);
    navigate(`/student/flashcard/deck/flashcard/combine`, {
      state: { ids: deck, classIds: classId, mode },
    });
  };

  return (
    <HomeLayout>
      <div className={styles["StudentDeckDetails"]}>
        <div className={styles["StudentDeckDetails-main"]}>
          {classDetails?.length > 0 && !classDetails?.deckId ? (
            <div className={"min-h-[75vh] m-auto flex"}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles["StudentDeckDetails-head"]}>
                <div className={styles["head-left"]}>
                  <img
                    src={classDetails?.deckId?.image}
                    className={styles.image}
                  />
                  <div className={styles["leftDetails"]}>
                    <div>
                      <Text className={styles.heading}>
                        {classDetails?.deckId?.name}
                      </Text>
                      <div className="flex-wrap flex space-x-3 ">
                        <div className="flex items-center space-x-1">
                          <IoIosCheckmarkCircle fill="#1DB954" />
                          <Text className={styles.createdText}>
                            {localeLables.LABEL_MEDESTUDIO_CERTIFIED}
                          </Text>
                        </div>
                        <div className="flex items-center space-x-1 ">
                          <IoTimeOutline />
                          <Text className={styles.estTime}>
                            {localeText?.TEXT_EST_TIME} :{" "}
                            <span className={styles.time}>
                              {" "}
                              {formattedTime((totalCardCount as number) * 5)}
                            </span>
                          </Text>
                        </div>
                      </div>
                    </div>
                    <Button
                      disabled={totalCardCount == 0}
                      className="primaryRounded"
                      rightIcon={<BiChevronRight size={24} />}
                      onClick={() =>
                        navigateToViewFlashcardCustom(selectedDecks)
                      }
                    >
                      {localeButtons.BUTTON_START_STUDYING}
                    </Button>
                    <div className={styles["estTimeDiv"]}></div>
                  </div>
                </div>

                <div className={styles["head-right"]}>
                  <div className="flex ml-auto">
                    <Text className={styles["levelTag"]}>
                      {localeLables.LABEL_MEDESTUDIO_CERTIFIED}
                    </Text>
                  </div>

                  {/* <div className="flex ">
                    {dummyFlashcardDetails[0]?.subjects?.map((sub, i) => (
                      <Text className={styles["searchTag"]}>{sub}</Text>
                    ))}
                  </div> */}
                </div>
              </div>
              <div className={styles["StudentDeckDetails-actions-left"]}>
                <Controller
                  name={`customSelect`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedDecks?.length === allDecks?.length}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          onChange(isChecked);
                          handleAllSelect && handleAllSelect(isChecked);
                        }}
                        className={` form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-full mr-3`}
                      />
                      <Text className={styles["allLabel"]}>
                        {localeText.TEXT_ALL}
                      </Text>
                    </div>
                  )}
                />
                <Text className={styles["allLabel"]}>
                  {`${selectedDecks?.length} ${localeText.TEXT_SELECTED_OF} ${allDecks?.length}`}
                </Text>
              </div>
              <div className={styles["StudentDeckDetails-actions"]}>
                {/* <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => setCreateModal(true)}
              >
                <FaCirclePlus size={24} fill="#FF900E" />
                <Text className={styles.addDeckText}>
                  {localeButtons.BUTTON_ADD_DECK}
                </Text>
              </div> */}
              </div>

              {classDecksLoading ? (
                <div className="py-8">
                  <Loader />
                </div>
              ) : (
                <div className={styles["StudentDeckDetails-decks"]}>
                  {allDecks?.length < 1 ? (
                    <Text>No Deck Created</Text>
                  ) : (
                    <>
                      {allDecks?.map((deck: deckData) => (
                        <div key={deck?._id} className={styles["deckBody"]}>
                          <Controller
                            name={`class-${deck._id}`}
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <>
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedDecks?.find(
                                      (d) => d?._id === deck?._id
                                    ) as boolean | undefined
                                  }
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    onChange(isChecked);
                                    handleCheckboxDecks &&
                                      handleCheckboxDecks(isChecked, deck);
                                  }}
                                  className={` form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out rounded-full mr-3`}
                                />
                              </>
                            )}
                          />
                          <div className={styles["deckBody-left"]}>
                            {/* <SiRundeck /> */}
                            <div>
                              <Text
                                className={`${styles.deckName} line-clamp-1`}
                              >
                                {deck?.subdeck?.name}
                              </Text>
                              <div className="flex items-center space-x-1 my-2">
                                <TbCards size={20} fill="#2A2D31" />
                                <Text className={styles.totalCardsText}>
                                  {` ${deck?.cardCount} Cards`}
                                </Text>
                              </div>
                            </div>
                          </div>
                          <div className={styles["deckBody-right"]}>
                            {deck?.cardCount > 0 && (
                              <IoIosPlayCircle
                                size={width > breakPoints?.sm ? 32 : 24}
                                color="#FF900E"
                                className="cursor-pointer"
                                onClick={() => navigateToViewFlashcard(deck)}
                              />
                            )}
                            {/* <div
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => navigateToCreateFlashcard(deck)}
                          >
                            <FaCirclePlus size={24} fill="#FF900E" />
                            <Text className={styles.addDeckText}>
                              {localeButtons.BUTTON_ADD_CARD}
                            </Text>
                          </div> */}
                            {/* <BiSolidPencil
                                size={25}
                                color="#2A2D31"
                                className="cursor-pointer"
                              /> */}
                            {deck?._id && (
                              <div>
                                <IoEllipsisHorizontal
                                  size={width > breakPoints?.sm ? 25 : 18}
                                  color="#2A2D31"
                                  className="cursor-pointer"
                                  onClick={(event) =>
                                    handleClickOptions(event as any)
                                  }
                                />
                                <Menu
                                  anchorEl={anchorEl}
                                  open={Boolean(anchorEl)}
                                  onClose={handleCloseOptions}
                                  keepMounted
                                >
                                  <MenuItem
                                    onClick={() => openDeleteModal(deck?._id)}
                                  >
                                    Delete
                                  </MenuItem>
                                </Menu>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              )}

              {/* <div className="flex w-64 m-auto">
                <Button
                  className="primaryActive"
                  onClick={() => setCreateModal(true)}
                >
                  {localeButtons.BUTTON_ADD_NEW_DECK}
                </Button>
              </div> */}
            </>
          )}
        </div>

        <div className={styles["StudentDeckDetails-right"]}>
          <div className={styles["right-section-main"]}>
            <div className="flex justify-between items-center">
              <Text className={styles["sectionHeading"]}>
                {localeTitles?.TITLE_RECENT_FLASHCARDS_CREATED}
              </Text>
              <Text
                className={styles["viewMore"]}
                onClick={() => navigate("/professor/classes")}
              >
                {localeTitles?.TITLE_VIEW_MORE}
              </Text>
            </div>

            {allClasses?.slice(0, 8)?.map((data: Class, i: number) => (
              <DashboardFlashcard
                key={i}
                data={data}
                play
                minView
                getDetails={getDetails}
              />
            ))}
          </div>
        </div>
      </div>
      <CreateDeckModal
        setValue={setValue}
        watch={watch}
        control={control}
        handleClose={handleCloseCreate}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitCreate}
        open={createModal}
        loading={createLoading}
        filteredDecks={specificDecks?.[0]}
      />

      <ConfirmationModal
        open={deleteClassModal}
        cancelButtonText={localeButtons?.BUTTON_CANCEL}
        confirmButtonText={localeButtons?.BUTTON_DELETE}
        onConfirm={onDeleteClassConfirm}
        icon={<AlertIcon />}
        title={localeTitles.TITLE_ARE_YOU_SURE_DELETE}
        handleClose={handleDeleteClassClose}
        loading={deleteLoading}
      />
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
    </HomeLayout>
  );
};

export default function StudentDeckDetailsServices() {
  return (
    <StudentRoutes>
      <StudentDeckDetails />
    </StudentRoutes>
  );
}
