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
}: CreateDeckSectionProps) => {
  const {
    localeTitles,
    localeText,
    localeLables,
    localePlaceholders,
    localeButtons,
  } = useLocale();


  const onAdd = (parentIndex: number, level: number) => {
    const currentDecks = getValues("decks") || [];
    const newDeck = { name: "" };
    let currentLevel = currentDecks[parentIndex];
    for (let i = 0; i < level - 1; i++) {
      currentLevel.subDecks = currentLevel.subDecks || [];
      currentLevel.subDecks.push({ name: "" });
      currentLevel = currentLevel.subDecks[currentLevel.subDecks.length - 1];
    }
    currentLevel.subDecks = currentLevel.subDecks || [];
    currentLevel.subDecks.push(newDeck);
    setValue("decks", [...currentDecks]);
  };

  const onDelete = (parentIndex: number, level: number, index: number) => {
    const currentDecks = getValues("decks") || [];
    let currentLevel = currentDecks[parentIndex];
    for (let i = 0; i < level - 1; i++) {
      currentLevel = currentLevel.subDecks[currentLevel.subDecks.length - 1];
    }
    currentLevel.subDecks.splice(index, 1);
    setValue("decks", [...currentDecks]);
  };

  return (
    <div className={styles["CreateDeckSection"]}>
      <Text className={styles["title"]}>{localeTitles?.TITLE_DECKS}</Text>

      <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
        <div className={styles["decksContainer"]}>
          {watch("decks")?.map((deck: any, parentIndex: number) => (
            <div key={parentIndex} className={styles["deckContainer"]}>
              <InputDeck
                control={control}
                name={`decks[${parentIndex}].name`}
                placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                onAdd={() => onAdd(parentIndex, 1)}
                onDelete={() => onDelete(parentIndex, 1, parentIndex)}
              />

              {deck.subDecks?.map((subDeck: any, index: number) => (
                <div key={index} className={styles["subDeckContainer"]}>
                  <InputDeck
                    control={control}
                    name={`decks[${parentIndex}].subDecks[${index}].name`}
                    placeholder={localePlaceholders.PLACEHOLDER_ENTER_NAME}
                    onAdd={() => onAdd(parentIndex, 2)}
                    onDelete={() => onDelete(parentIndex, 2, index)}
                  />

                  {subDeck.subDecks?.map(
                    (nestedDeck: any, nestedIndex: number) => (
                      <div
                        key={nestedIndex}
                        className={styles["nestedDeckContainer"]}
                      >
                        <InputDeck
                          control={control}
                          name={`decks[${parentIndex}].subDecks[${index}].subDecks[${nestedIndex}].name`}
                          placeholder={
                            localePlaceholders.PLACEHOLDER_ENTER_NAME
                          }
                          onAdd={() => onAdd(parentIndex, 3)}
                          onDelete={() => onDelete(parentIndex, 3, nestedIndex)}
                        />

                        {nestedDeck.subDecks?.map(
                          (deepNestedDeck: any, deepNestedIndex: number) => (
                            <div
                              key={deepNestedIndex}
                              className={styles["deepNestedDeckContainer"]}
                            >
                              <InputDeck
                                control={control}
                                name={`decks[${parentIndex}].subDecks[${index}].subDecks[${nestedIndex}].subDecks[${deepNestedIndex}].name`}
                                placeholder={
                                  localePlaceholders.PLACEHOLDER_ENTER_NAME
                                }
                                onAdd={() => onAdd(parentIndex, 4)}
                                onDelete={() =>
                                  onDelete(parentIndex, 4, deepNestedIndex)
                                }
                              />

                              {deepNestedDeck.subDecks?.map(
                                (
                                  deepestNestedDeck: any,
                                  deepestNestedIndex: number
                                ) => (
                                  <div
                                    key={deepestNestedIndex}
                                    className={
                                      styles["deepestNestedDeckContainer"]
                                    }
                                  >
                                    <InputDeck
                                      control={control}
                                      name={`decks[${parentIndex}].subDecks[${index}].subDecks[${nestedIndex}].subDecks[${deepNestedIndex}].subDecks[${deepestNestedIndex}].name`}
                                      placeholder={
                                        localePlaceholders.PLACEHOLDER_ENTER_NAME
                                      }
                                      onAdd={() => onAdd(parentIndex, 5)}
                                      onDelete={() =>
                                        onDelete(
                                          parentIndex,
                                          5,
                                          deepestNestedIndex
                                        )
                                      }
                                    />
                                    {/* Continue nesting for more levels if needed */}
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
          <Button type="button" className="secondaryBtn" onClick={handleClose}>
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
