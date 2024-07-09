import styles from "./CustomDeckDetails.module.css";
import { CustomDeckDetailsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useCustomDeckDetails } from "./hook";
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
  deckData,
  DecksWithCardCount,
} from "../../../utils/constants/DataTypes";
import Loader from "../../../components/LVL1_Atoms/Loader";
import { StudentRoutes } from "../../../Routes/protectedRoutes/StudentRoutes";
import {
  dummyDecks,
  dummyFlashCards,
  dummyFlashcardDetails,
} from "../StudentDashboard/StudentDashboard";
import { handleImageURL } from "../../../utils/constants/constants";
import { Controller } from "react-hook-form";
import { DropdownMenu } from "../../../components/LVL3_Cells/ExpandableFlashcard/ExpandableFlashcard";
import { formattedTime, useDropdown } from "../../../utils/hooks/helper";

const CustomDeckDetails = ({}: CustomDeckDetailsProps) => {
  const { localeTitles, localeButtons, localeLables } = useLocale();
  const [cookies] = useCookies(["admin"]);
  const [createFlashcard, setCreateFlashcard] = useState<boolean>(false);
  const location = useLocation();

  const {
    control,
    handleSubmit,
    watch,
    handleCloseCreate,
    onSubmitCreate,
    setCreateModal,
    createModal,
    createLoading,
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
    handleDeleteClassClose,
    openDeleteClassModal,
    deleteClassModal,
    onDeleteClassConfirm,
    allCustomDecks,
    mode,
    deckData,
    handleCheckboxDecks,
    selectedDecks,
    handleAllSelect,
    handleOpenEditClass,
    handleCloseEditClass,
    editClassModal,
    onSubmitClassEdit,
    editLoading,
    handleOpenEditDeck,
    handleCloseEditDeck,
    editDeckModal,
    onSubmitEditDeck,
    allCustomDecksLoading,
  } = useCustomDeckDetails();
  console.log("specificDecks", specificDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();
  const { isDropdownOpen, toggleDropdown, dropdownRef } = useDropdown();

  const totalCardCount = allCustomDecks?.reduce(
    (total: number, item: deckData) => total + item?.cardCount,
    0
  );

  const navigateToViewFlashcard = (deck: any) => {
    console.log("navigateToViewFlashcard", deck);
    navigate(`/student/flashcard/deck/flashcard/custom`, {
      state: { ...deck, mode },
    });
  };

  const navigateToCreateFlashcard = (deck: any) => {
    // console.log("navigateToCreateFlashcard", deck);
    navigate("/student/classes/custom/flashcard", { state: deck });
  };

  const navigateToViewFlashcardCustom = (deck: any) => {
    console.log("navigateToViewFlashcard", deck);
    navigate(`/student/flashcard/deck/flashcard/combine`, {
      state: { ids: deck, mode },
    });
  };

  return (
    <HomeLayout>
      <div className={styles["CustomDeckDetails"]}>
        <div className={styles["CustomDeckDetails-main"]}>
          {/* {classDetails?.length > 0 && !classDetails?.deckId ? (
            <div className={"min-h-[75vh] m-auto flex"}>
              <Loader />
            </div>
          ) : ( */}
          <>
            <div className={styles["CustomDeckDetails-head"]}>
              <div className={styles["head-left"]}>
                <img
                  src={handleImageURL(deckData?.image)}
                  className={styles.image}
                />
                <div className={styles["leftDetails"]}>
                  <div>
                    <Text className={styles.heading}>{deckData?.title}</Text>
                    <div className="flex space-x-3 ">
                      <div className="flex items-center space-x-1">
                        <IoIosCheckmarkCircle fill="#1DB954" />
                        <Text className={styles.createdText}>
                          {`${localeText.TEXT_CREATED_BY} Me`}
                        </Text>
                      </div>
                      <div className="flex items-center space-x-1 ">
                        <IoTimeOutline />
                        <Text className={styles.estTime}>
                          {localeText?.TEXT_EST_TIME} :{" "}
                          <span className={styles.time}>
                            {formattedTime(totalCardCount * 5)}
                          </span>
                        </Text>
                      </div>
                    </div>
                  </div>
                  {/* <Button
                    className="primaryRounded"
                    rightIcon={<BiChevronRight size={24} />}
                    onClick={() => navigateToViewFlashcardCustom(selectedDecks)}
                  >
                    {localeButtons.BUTTON_START_STUDYING}
                  </Button> */}
                  <div className={styles["estTimeDiv"]}></div>
                </div>
              </div>

              <div className={styles["head-right"]}>
                <div
                  className="flex ml-auto space-x-3 items-center relative"
                  ref={dropdownRef}
                >
                  <Text className={styles["levelTag"]}>
                    {localeLables.LABEL_CUSTOM}
                  </Text>
                  <BiSolidPencil
                    size={20}
                    color="#2A2D31"
                    className="cursor-pointer"
                    onClick={handleOpenEditClass}
                  />
                  <IoEllipsisHorizontal
                    size={20}
                    color="#2A2D31"
                    className="cursor-pointer"
                    // onClick={handleClickOptions as any}
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <DropdownMenu
                      openDeleteModal={openDeleteClassModal}
                      data={deckData}
                    />
                  )}
                </div>

                {/* <div className="flex ">
                    {dummyFlashcardDetails[0]?.subjects?.map((sub, i) => (
                      <Text className={styles["searchTag"]}>{sub}</Text>
                    ))}
                  </div> */}
              </div>
            </div>
            <div className={styles["CustomDeckDetails-actions"]}>
              <div className={styles["CustomDeckDetails-actions-left"]}>
                {/* <Controller
                  name={`customSelect`}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          selectedDecks?.length === allCustomDecks?.length
                        }
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
                  {`${selectedDecks?.length} ${localeText.TEXT_SELECTED_OF} ${allCustomDecks?.length}`}
                </Text> */}
              </div>
              <div
                className="flex items-center space-x-1 cursor-pointer"
                onClick={() => setCreateModal(true)}
              >
                <FaCirclePlus size={24} fill="#FF900E" />
                <Text className={styles.addDeckText}>
                  {localeButtons.BUTTON_ADD_DECK}
                </Text>
              </div>
            </div>

            {allCustomDecksLoading ? (
              <div className="py-8">
                <Loader />
              </div>
            ) : (
              <div className={styles["CustomDeckDetails-decks"]}>
                {allCustomDecks?.length < 1 ? (
                  <Text>No Deck Created</Text>
                ) : (
                  <>
                    {allCustomDecks?.map((deck: any, i: number) => (
                      <div key={deck?._id} className={styles["deckBody"]}>
                        <div className={styles["deckBody-left"]}>
                          {/* <SiRundeck /> */}
                          {/* <Controller
                            name={`class-${deck._id}`}
                            control={control}
                            render={({
                              field: { onChange, value },
                              fieldState: { error },
                            }) => (
                              <>
                                <input
                                  type="checkbox"
                                  checked={selectedDecks?.find(
                                    (d: any) => d?._id === deck?._id
                                  )}
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
                          /> */}
                          <div>
                            <Text className={styles.deckName}>
                              {deck?.title}
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
                          <div
                            className="flex items-center space-x-1 cursor-pointer"
                            onClick={() => navigateToCreateFlashcard(deck)}
                          >
                            <FaCirclePlus size={24} fill="#FF900E" />
                            <Text className={styles.addDeckText}>
                              {localeButtons.BUTTON_ADD_CARD}
                            </Text>
                          </div>
                          <IoIosPlayCircle
                            size={32}
                            color="#FF900E"
                            className="cursor-pointer"
                            onClick={() => navigateToViewFlashcard(deck)}
                          />
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
                          <BiSolidPencil
                            size={20}
                            color="#2A2D31"
                            className="cursor-pointer"
                            onClick={() => handleOpenEditDeck(deck)}
                          />
                          {deck?._id && (
                            <div>
                              <IoEllipsisHorizontal
                                size={25}
                                color="#2A2D31"
                                className="cursor-pointer"
                                onClick={(event: any) =>
                                  handleClickOptions(event, deck)
                                }

                                // onClick={(event) =>
                                //   handleClickOptions(event as any)
                                // }
                              />
                              <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseOptions}
                                keepMounted
                              >
                                <MenuItem onClick={() => openDeleteModal()}>
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
            <div className="flex w-64 m-auto">
              <Button
                className="primaryActive"
                onClick={() => setCreateModal(true)}
              >
                {localeButtons.BUTTON_ADD_NEW_DECK}
              </Button>
            </div>
          </>
          {/* )} */}
        </div>

        <div className={styles["CustomDeckDetails-right"]}>
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
        handleClose={editDeckModal ? handleCloseEditDeck : handleCloseCreate}
        handleSubmit={handleSubmit}
        onSubmit={editDeckModal ? onSubmitEditDeck : onSubmitCreate}
        open={editDeckModal ? editDeckModal : createModal}
        loading={createLoading}
        filteredDecks={specificDecks?.[0]}
        custom
        edit={editDeckModal}
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

      <CreateClassModal
        control={control}
        handleClose={handleCloseEditClass}
        handleSubmit={handleSubmit}
        onSubmit={onSubmitClassEdit}
        open={editClassModal}
        loading={editLoading}
        custom
        edit
      />
    </HomeLayout>
  );
};

export default function CustomDeckDetailsServices() {
  return (
    <StudentRoutes>
      <CustomDeckDetails />
    </StudentRoutes>
  );
}
