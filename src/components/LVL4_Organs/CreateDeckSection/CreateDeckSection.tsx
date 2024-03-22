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
    nestedIndex: number,
    deepNestedDeck: number
  ) => {
    console.log(
      "parentIndex",
      parentIndex,
      "level",
      level,
      nestedIndex,
      deepNestedDeck
    );
    const currentDecks = getValues("deck") || [];
    console.log("currentDecks", currentDecks);
    let currentLevel: any = currentDecks[parentIndex];
    if (currentLevel == undefined) {
      currentLevel = currentDecks[0]?.subDeck[parentIndex];

      console.log("aaaa", currentLevel);
    }
    if (
      nestedIndex !== undefined &&
      nestedIndex !== null &&
      !isNaN(nestedIndex)
    ) {
      console.log("currentLevel11111", currentLevel);
      currentLevel = currentLevel?.subDeck[nestedIndex];
    }
    if (
      deepNestedDeck !== undefined &&
      deepNestedDeck !== null &&
      !isNaN(deepNestedDeck)
    ) {
      console.log("currentLevel11111", currentLevel);
      currentLevel = currentLevel?.subDeck[deepNestedDeck];
    }
    console.log("currentLevel", currentLevel);
    // Traverse to the specified level in the deck hierarchy
    for (let i = 0; i < level - 1; i++) {
      currentLevel.subDeck = currentLevel.subDeck || []; // Ensure subDeck is initialized

      // Check if the current level has sub-decks
      const lastSubDeck = currentLevel.subDeck[parentIndex];
      console.log("lastSubDeck", lastSubDeck);
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

  const onDelete = (parentIndex: number, index: number) => {
    const currentDecks = getValues("deck") || [];
    let currentLevel: any = currentDecks;

    // Navigate to the specified parent index in the deck hierarchy
    for (let i = 0; i < parentIndex; i++) {
      currentLevel = currentLevel[parentIndex]?.subDeck || [];
    }

    // Check if the current level has sub-decks to delete
    if (currentLevel.subDeck) {
      // Remove the sub-deck at the specified index
      currentLevel.subDeck.splice(index, 1);

      // Update the form value with the modified decks
      setValue("deck", [...currentDecks]);
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
                onDelete={() => onDelete(parentIndex, parentIndex)}
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
                    onDelete={() => onDelete(parentIndex, index)}
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
                          onDelete={() => onDelete(parentIndex, nestedIndex)}
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
                                // onAdd={() => onAdd(index, 4, nestedIndex, deepNestedDeck)}
                                onDelete={() =>
                                  onDelete(parentIndex, deepNestedIndex)
                                }
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
            {localeButtons.BUTTON_CREATE}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateDeckSection;
