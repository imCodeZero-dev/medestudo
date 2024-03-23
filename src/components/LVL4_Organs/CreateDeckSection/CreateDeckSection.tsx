// CreateDeckSection.tsx
import styles from "./CreateDeckSection.module.css";
import { CreateDeckSectionProps } from "./types";
import Text from "../../LVL1_Atoms/Text/Text";
import useLocale from "../../../locales";
import InputDeck from "../../LVL1_Atoms/InputDeck/InputDeck";
import { Controller, useFormContext } from "react-hook-form";
import { Button } from "../../LVL1_Atoms/Button";

const CreateDeckSection = ({
  open,
  handleClose,
  handleSubmit,
  onSubmit,
  control,
  setValue,
  getValues,
  watch,
  handleCreateCancel,
  editModal,
}: CreateDeckSectionProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();
  const counter: { [key: number]: number } = {};

  const onAdd = (
    parentIndex: number,
    level: number,
    nestedIndex?: number,
    deepNestedDeck?: number
  ) => {
    const currentDecks = getValues("deck") || [];
    console.log("currentDecks", currentDecks);
    let currentLevel: any = currentDecks[parentIndex];
    if (currentLevel == undefined) {
      currentLevel = currentDecks[0]?.subDeck[parentIndex];
    }
    if (
      nestedIndex !== undefined &&
      nestedIndex !== null &&
      !isNaN(nestedIndex)
    ) {
      currentLevel = currentLevel?.subDeck[nestedIndex];
    }
    if (
      deepNestedDeck !== undefined &&
      deepNestedDeck !== null &&
      !isNaN(deepNestedDeck)
    ) {
      currentLevel = currentLevel?.subDeck[deepNestedDeck];
    }

    for (let i = 0; i < level - 1; i++) {
      currentLevel.subDeck = currentLevel.subDeck || [];

      // Check if the current level has sub-decks
      const lastSubDeck = currentLevel.subDeck[parentIndex];
      if (lastSubDeck && lastSubDeck.subDeck) {
        // Move to the last sub-deck
        currentLevel = lastSubDeck;
      } else {
        // If there is no sub-deck, create a new one and move to it
        currentLevel.subDeck.push({ name: "", subDeck: [] });
        currentLevel = currentLevel.subDeck[currentLevel.subDeck.length - 1];
        setValue("deck", [...currentDecks]);
        return;
      }
    }

    // Create a new sub-deck object
    const newSubDeck = { name: "", subDeck: [] };

    // Initialize currentLevel.subDeck if it's undefined
    currentLevel.subDeck = currentLevel.subDeck || [];

    // Add the new sub-deck to the current level's subDeck array
    currentLevel.subDeck.push(newSubDeck);

    // Update the form value with the modified decks
    setValue("deck", [...currentDecks]);
  };

  console.log("watchIndex", watch("deck"));

  const onDelete = (
    parentIndex: number,
    index?: number,
    nestedIndex?: number,
    deepNestedIndex?: number,
    lastNestedDeck?: number
  ) => {
    const currentDecks = getValues("deck") || [];

    if (
      lastNestedDeck !== undefined &&
      lastNestedDeck !== null &&
      deepNestedIndex !== undefined &&
      deepNestedIndex !== null &&
      nestedIndex !== undefined &&
      nestedIndex !== null &&
      index !== undefined &&
      index !== null
    ) {
      // If lastNestedDeck, deepNestedIndex, nestedIndex, and index are provided, remove the last nested level
      const parentDeck =
        currentDecks[parentIndex]?.subDeck[index]?.subDeck[nestedIndex]
          ?.subDeck[deepNestedIndex];
      if (parentDeck && parentDeck.subDeck) {
        parentDeck.subDeck.splice(lastNestedDeck, 1);
        setValue("deck", [...currentDecks]);
      }
    } else if (
      deepNestedIndex !== undefined &&
      deepNestedIndex !== null &&
      nestedIndex !== undefined &&
      nestedIndex !== null &&
      index !== undefined &&
      index !== null
    ) {
      // If deepNestedIndex, nestedIndex, and index are provided, remove the deep nested level
      const parentDeck =
        currentDecks[parentIndex]?.subDeck[index]?.subDeck[nestedIndex];
      if (
        parentDeck &&
        parentDeck.subDeck &&
        deepNestedIndex < parentDeck.subDeck.length
      ) {
        parentDeck.subDeck.splice(deepNestedIndex, 1);
        setValue("deck", [...currentDecks]);
      }
    } else if (
      nestedIndex !== undefined &&
      nestedIndex !== null &&
      index !== undefined &&
      index !== null
    ) {
      // If nestedIndex and index are provided, remove the nested level
      const parentDeck = currentDecks[parentIndex]?.subDeck[index];
      if (
        parentDeck &&
        parentDeck.subDeck &&
        nestedIndex < parentDeck.subDeck.length
      ) {
        parentDeck.subDeck.splice(nestedIndex, 1);
        setValue("deck", [...currentDecks]);
      }
    } else if (
      index !== undefined &&
      index !== null &&
      index < currentDecks[parentIndex]?.subDeck.length
    ) {
      // If index is provided, remove the subDeck level
      const parentDeck = currentDecks[parentIndex];
      if (
        parentDeck &&
        parentDeck.subDeck &&
        index < parentDeck.subDeck.length
      ) {
        parentDeck.subDeck.splice(index, 1);
        setValue("deck", [...currentDecks]);
      }
    } else {
      // If neither nestedIndex nor index is provided, remove the parent deck
      if (parentIndex !== undefined && parentIndex !== null) {
        if (parentIndex < currentDecks.length) {
          currentDecks.splice(parentIndex, 1);
          setValue("deck", [...currentDecks]);
        }
      }
    }
  };

  return (
    <div className={styles["CreateDeckSection"]}>
      <Text className={styles["title"]}>{localeTitles?.TITLE_DECKS}</Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["decksContainer"]}>
          {watch("deck")?.map((deck: any, parentIndex: number) => (
            <div key={parentIndex} className={styles["deckContainer"]}>
              <InputDeck
                control={control}
                name={`deck[${parentIndex}].name`}
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                onAdd={() => onAdd(parentIndex, 1)}
                // onDelete={() => onDelete(parentIndex)} // Delete parent deck
              />

              {deck.subDeck?.map((subDeck: any, index: number) => (
                <div
                  key={parentIndex + "-" + index}
                  className={styles["subDeckContainer"]}
                >
                  <InputDeck
                    control={control}
                    name={`deck[${parentIndex}].subDeck[${index}].name`}
                    placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                    onAdd={() => onAdd(index, 2)}
                    onDelete={() => onDelete(parentIndex, index)} // Delete subDeck
                  />

                  {subDeck.subDeck?.map(
                    (nestedDeck: any, nestedIndex: number) => (
                      <div
                        key={nestedIndex}
                        className={styles["nestedDeckContainer"]}
                      >
                        <InputDeck
                          control={control}
                          name={`deck[${parentIndex}].subDeck[${index}].subDeck[${nestedIndex}].name`}
                          placeholder={
                            localePlaceholders.PLACEHOLDER_ENTER_NAME
                          }
                          onAdd={() => onAdd(index, 3, nestedIndex)}
                          onDelete={() =>
                            onDelete(parentIndex, index, nestedIndex)
                          } // Delete nestedIndex
                        />

                        {nestedDeck.subDeck?.map(
                          (deepNestedDeck: any, deepNestedIndex: number) => (
                            <div
                              key={deepNestedIndex}
                              className={styles["deepNestedDeckContainer"]}
                            >
                              <InputDeck
                                control={control}
                                name={`deck[${parentIndex}].subDeck[${index}].subDeck[${nestedIndex}].subDeck[${deepNestedIndex}].name`}
                                placeholder={
                                  localePlaceholders.PLACEHOLDER_ENTER_NAME
                                }
                                onAdd={() =>
                                  onAdd(index, 4, nestedIndex, deepNestedDeck)
                                }
                                onDelete={() =>
                                  onDelete(
                                    parentIndex,
                                    index,
                                    nestedIndex,
                                    deepNestedIndex
                                  )
                                } // Delete deepNestedIndex
                              />
                              {deepNestedDeck?.subDeck?.map(
                                (
                                  lastNestedDeck: any,
                                  lastNestedIndex: number
                                ) => (
                                  <div
                                    key={lastNestedIndex}
                                    className={
                                      styles["deepNestedDeckContainer"]
                                    }
                                  >
                                    <InputDeck
                                      control={control}
                                      name={`deck[${parentIndex}].subDeck[${index}].subDeck[${nestedIndex}].subDeck[${deepNestedIndex}].subDeck[${lastNestedDeck}].name`}
                                      placeholder={
                                        localePlaceholders.PLACEHOLDER_ENTER_NAME
                                      }
                                      onDelete={() =>
                                        onDelete(
                                          parentIndex,
                                          index,
                                          nestedIndex,
                                          deepNestedIndex,
                                          lastNestedDeck
                                        )
                                      }
                                    />
                                  </div>
                                )
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <Button
            type="button"
            className="secondaryBtn"
            onClick={handleCreateCancel}
          >
            {localeButtons.BUTTON_CANCEL}
          </Button>
          <Button
            type="submit"
            className="purpleBtn"
            onClick={handleSubmit(onSubmit)}
          >
            {editModal
              ? localeButtons?.BUTTON_UPDATE
              : localeButtons.BUTTON_CREATE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeckSection;
