import styles from "./DeckDetails.module.css";
import { DeckDetailsProps } from "./types";
import Text from "../../../components/LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import { Button } from "../../../components/LVL1_Atoms/Button";
import { useCookies } from "react-cookie";

import { useDeckDetails } from "./hook";
import { useLocation, useNavigate } from "react-router-dom";
import { ProfessorRoutes } from "../../../Routes/protectedRoutes/ProfessorRoutes";

import DashboardFlashcard from "../../../components/LVL3_Cells/DashboardFlashcard/DashboardFlashcard";

import { IoEllipsisHorizontal, IoTimeOutline } from "react-icons/io5";
import HomeLayout from "../../../components/LVL5_Layouts/HomeLayout/HomeLayout";
import { FaCirclePlus, FaRegTrashCan } from "react-icons/fa6";
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
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { formattedTime } from "../../../utils/hooks/helper";

const DeckDetails = ({}: DeckDetailsProps) => {
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
  } = useDeckDetails();
  // console.log("allDecks", allDecks);
  const navigate = useNavigate();
  const { localeText } = useLocale();

  const totalCardCount = classDecks?.reduce(
    (total: number, item: deckData) => total + item?.cardCount,
    0
  );
  const navigateToCreateFlashcard = (deck: any) => {
    navigate("/professor/classes/deck/flashcard", { state: deck });
  };
  const navigateToViewFlashcard = (deck: any) => {
    navigate(`/professor/classes/deck/flashcard/${deck?._id}`, {
      state: deck,
    });
  };

  return (
    <HomeLayout>
      <div className={styles["DeckDetails"]}>
        <div className={styles["DeckDetails-main"]}>
          {!classDetails?.deckId ? (
            <div className={"min-h-[75vh] m-auto flex"}>
              <Loader />
            </div>
          ) : (
            <>
              <div className={styles["DeckDetails-head"]}>
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
                      <div className="flex space-x-3 ">
                        <div className="flex items-center space-x-1">
                          <IoIosCheckmarkCircle fill="#1DB954" />
                          <Text className={styles.createdText}>
                            {localeText?.TEXT_CREATED_BY}{" "}
                            {classDetails?.deckId?.createdBy}
                          </Text>
                        </div>
                      </div>
                    </div>
                    {/* <Button className="primaryRounded"> */}
                    {/* {localeButtons.BUTTON_PREVIEW} */}
                    <div className={styles["estTimeDiv"]}>
                      <IoTimeOutline />
                      <Text className={styles.estTime}>
                        {localeText?.TEXT_EST_TIME} :{" "}
                        <span className={styles.time}>
                          {formattedTime(totalCardCount * 5)}
                        </span>
                      </Text>
                    </div>
                    {/* </Button> */}
                  </div>
                </div>

                <div className={styles["head-right"]}>
                  {/* <IconButton
                  style={{
                    color: "#475467",
                  }}
                  // onClick={() => handleDelete && handleDelete(row)}
                > */}
                  <FaRegTrashCan
                    size={16}
                    className="cursor-pointer"
                    onClick={openDeleteClassModal}
                  />
                  {/* </IconButton> */}
                  {/* <BiSolidPencil
                    size={25}
                    color="#2A2D31"
                    className="cursor-pointer"
                  />
                  <IoEllipsisHorizontal
                    size={25}
                    color="#2A2D31"
                    className="cursor-pointer"
                  /> */}
                </div>
              </div>
              <div className={styles["DeckDetails-actions"]}>
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

              {/* <div className={styles["DeckDetails-decks"]}>
            {classDetails?.deckId?.subDeck?.map((deck: any, i: number) => (
              <div key={deck?._id} className={styles["deckBody"]}>
                <div className={styles["deckBody-left"]}>
                  <SiRundeck />
                  <div>
                    <Text className={styles.deckName}>{deck?.name}</Text>
                    <div className="flex items-center space-x-1 my-2">
                      <TbCards size={20} fill="#2A2D31" />
                      <Text className={styles.totalCardsText}>20 Cards</Text>
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
                  <BiSolidPencil
                    size={25}
                    color="#2A2D31"
                    className="cursor-pointer"
                  />
                  <div>
                    <IoEllipsisHorizontal
                      size={25}
                      color="#2A2D31"
                      className="cursor-pointer"
                      onClick={handleClickOptions as any}
                    />
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleCloseOptions}
                      keepMounted
                    >
                      <MenuItem onClick={() => openDeleteModal(deck?._id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
              {classDecksLoading ? (
                <div className="py-8">
                  <Loader />
                </div>
              ) : (
                <div className={styles["DeckDetails-decks"]}>
                  {classDecks?.length < 1 ? (
                    <Text>No Deck Created</Text>
                  ) : (
                    <>
                      {classDecks?.map(
                        (deck: DecksWithCardCount, i: number) => (
                          <div key={deck?._id} className={styles["deckBody"]}>
                            <div
                              className={styles["deckBody-left"]}
                              onClick={() =>
                                deck?.cardCount > 0 &&
                                navigateToViewFlashcard(deck)
                              }
                            >
                              <SiRundeck />
                              <div>
                                <Text className={styles.deckName}>
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
                              <div
                                className="flex items-center space-x-1 cursor-pointer"
                                onClick={() => navigateToCreateFlashcard(deck)}
                              >
                                <FaCirclePlus size={24} fill="#FF900E" />
                                <Text className={styles.addDeckText}>
                                  {localeButtons.BUTTON_ADD_CARD}
                                </Text>
                              </div>
                              {/* <BiSolidPencil
                                size={25}
                                color="#2A2D31"
                                className="cursor-pointer"
                              /> */}
                              {deck?._id && (
                                <div>
                                  <IoEllipsisHorizontal
                                    size={25}
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
                        )
                      )}
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
          )}
        </div>

        <div className={styles["DeckDetails-right"]}>
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
        custom={false}
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

export default function DeckDetailsServices() {
  return (
    <ProfessorRoutes>
      <DeckDetails />
    </ProfessorRoutes>
  );
}
