import { Switch, styled } from "@mui/material";
import { type ClassValue, clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_FOLDER,
  CLOUDINARY_UPLOAD_PRESET,
} from "../constants/constants";
import dayjs from "dayjs";
import { reviewDeckType } from "../constants/DataTypes";

interface Item {
  createdAt: string;
}

export const IOSSwitch = styled((props: any) => (
  <Switch
    checked={props.checked}
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const useDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return { isDropdownOpen, toggleDropdown, dropdownRef };
};

export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", CLOUDINARY_FOLDER);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const data = await response.json();
  return data.secure_url; // Return the URL of the uploaded image
};

export const getDecodedText = (data: any) => {
  const decodedQuestion = data ? atob(data) : "";

  const tempElement = document?.createElement("div");
  tempElement.innerHTML = decodedQuestion;

  // Get all <p> elements within the temporary element
  const paragraphs = tempElement?.querySelectorAll("p, h1, h2, h3,h4,h5,h6");

  // Extract text content from each <p> element
  const textContents = Array?.from(paragraphs)?.map((p) => p?.textContent);
  return textContents;
};

export const constructUrlWithParams = (baseUrl: string, array: string[]) => {
  const params = array.map((item) => `data=${item}`).join("&");
  return `${baseUrl}?${params}`;
};

export const constructUrlWithParamsOccurance = (
  baseUrl: string,
  array: string[]
) => {
  // const params = array.map((item) => `${item},`).join("&");
  console.log("constructUrlWithParamsOccurance", array);
  const params = array.join(",");
  return `${baseUrl}&classId=${params}`;
};

export function formattedTime(seconds: number) {
  if (seconds < 60) {
    return `${seconds} ${seconds === 1 ? "sec" : "secs"}`;
  }

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hourStr = hours > 0 ? `${hours} ${hours > 1 ? "hours" : "hour"}` : "";
  const minuteStr =
    minutes > 0 ? `${minutes} ${minutes > 1 ? "mins" : "min"}` : "";
  const secondStr =
    remainingSeconds > 0
      ? `${remainingSeconds} ${remainingSeconds > 1 ? "secs" : "sec"}`
      : "";

  return [hourStr, minuteStr, secondStr].filter(Boolean).join(", ");
}

export const generateYearsArray = (numYears: number): string[] => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: numYears }, (_, index) =>
    (currentYear - index).toString()
  );
};

export const countAllQuestions = (questionsArray: any) =>
  questionsArray.reduce(
    (total: number, item: any) => total + item.questions,
    0
  );
export const countAllFlashcards = (flashcardsArray: any) =>
  flashcardsArray.reduce(
    (total: number, item: any) => total + item.flashcards,
    0
  );

export const getCurrentAndPreviousMonthData = (data: any) => {
  const now = dayjs();

  const currentMonth = now.format("MMMM");
  const currentYear = now.format("YYYY");

  const previousMonthDate = now.subtract(1, "month");
  const previousMonth = previousMonthDate.format("MMMM");
  const previousYear = previousMonthDate.format("YYYY");

  const currentMonthData = data.find(
    (item: any) => item.month === currentMonth && item.year === currentYear
  );
  const previousMonthData = data.find(
    (item: any) => item.month === previousMonth && item.year === previousYear
  );

  return {
    currentMonthData,
    previousMonthData,
  };
};

export const scrollToExploreFlashcards = (navigate: any) => {
  const currentPath = window.location.pathname;

  if (currentPath !== "/home") {
    navigate("/home", { state: { scrollTo: "exploreFlashcards" } });
  } else {
    document
      .getElementById("exploreFlashcards")
      ?.scrollIntoView({ behavior: "smooth" });
  }
};

export const calculateConfidenceLevel = (
  rating: number,
  totalFlashcards: number
): number => {
  const percentage = ((rating / 5) * 100) / 100;

  return percentage / totalFlashcards;
};

const getDateDiffInDays = (date1: Date, date2: Date): number => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getWeekStart = (date: Date): Date => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

const getMonthStart = (date: Date): Date => {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const categorizeReviewDecks = (reviewDecks: reviewDeckType[]) => {
  const today = new Date();
  const weekStart = getWeekStart(today);
  const monthStart = getMonthStart(today);

  const todayCount = reviewDecks?.filter((deck) => {
    const createdAt = new Date(deck.data.rated?.createdAt);
    return getDateDiffInDays(today, createdAt) === 0;
  }).length;

  const thisWeekCount = reviewDecks?.filter((deck) => {
    const createdAt = new Date(deck.data.rated?.createdAt);
    return createdAt >= weekStart;
  }).length;

  const thisMonthCount = reviewDecks?.filter((deck) => {
    const createdAt = new Date(deck.data.rated?.createdAt);
    return createdAt >= monthStart;
  }).length;

  return {
    today: todayCount,
    thisWeek: thisWeekCount,
    thisMonth: thisMonthCount,
  };
};

export const countItemsFromCurrentMonth = (items: Item[]): number => {
  const currentMonth = dayjs().month();
  const currentYear = dayjs().year();

  return items.filter((item) => {
    const itemDate = dayjs(item.createdAt);
    return itemDate.month() === currentMonth && itemDate.year() === currentYear;
  }).length;
};


export function decodeBase64Unicode(str:string) {
  // Decode base64 string to binary string
  const binaryStr = atob(str);

  // Convert binary string to byte array
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  // Decode byte array to UTF-8 string
  return new TextDecoder('utf-8').decode(bytes);
}