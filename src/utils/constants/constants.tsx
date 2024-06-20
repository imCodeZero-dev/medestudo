import neuroImg from "../../assets/Images/Landing/neuro.png";
import dentalImg from "../../assets/Images/Landing/dental.png";
import kidneyImg from "../../assets/Images/Landing/kidney.png";
import heartImg from "../../assets/Images/Landing/heart.png";
import clumsy1 from "../../assets/Images/Landing/clumsy 1.png";
import clumsy2 from "../../assets/Images/Landing/clumsy2.png";
import clumsy3 from "../../assets/Images/Landing/clumsy3.png";
import professor1 from "../../assets/Images/Landing/Professor1.png";
import professor2 from "../../assets/Images/Landing/Professor2.png";

export const baseURL = "https://medestudo.onrender.com/api/v1";
export const CLOUDINARY_CLOUD_NAME = "dkzlc4bhv";
export const CLOUDINARY_UPLOAD_PRESET = "medestudo";
export const CLOUDINARY_FOLDER = "medestudo";
// export const CLOUDINARY_API_KEY = '272835819821555'
// export const CLOUDINARY_API_SECRET = 'oBauWSezU370wL-fI5ukx7eHtUY'
// export const CLOUDINARY_API_ENVIRONMENT_VARIABLE = 'CLOUDINARY_URL=cloudinary://272835819821555:oBauWSezU370wL-fI5ukx7eHtUY@dvgprzcdg'

export const passwordRegex =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

export const handleImageURL = (file: string) => {
  if (!file) {
    return "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg";
  }
  return file;
};

export const privacySettings = (localeLabel: any, localeText: any) => [
  {
    value: "recieveEmails",
    text: localeText.TEXT_RECEIVE_EMAILS,
    label: localeLabel.LABEL_EMAIL,
  },
  {
    value: "recieveNotificationsOnUpdates",
    text: localeText.TEXT_RECEIVE_NOTIFICATIONS_ON_UPDATES,
    label: localeLabel.LABEL_UPDATE_NOTIFICATIONS,
  },
  {
    value: "recieveNotificationsOnPaper",
    text: localeText.TEXT_RECEIVE_NOTIFICATIONS_ON_PAPER,
    label: localeLabel.LABEL_NEW_PAPER_NOTIFICATIONS,
  },
];

const currentYear = new Date().getFullYear();
const years = [];

for (let year = currentYear; year >= 1970; year--) {
  years.push({ name: year.toString(), _id: year.toString() });
}

export const totalYears = years;

export const surveySteps = (localeLabel: any) => [
  {
    label: localeLabel.LABEL_COLLEGE_DETAILS,
  },
  {
    label: localeLabel.LABEL_INTERESETS,
  },
  {
    label: localeLabel.LABEL_GOALS_ON_WEBSITE,
  },
];

export const allFlashcardsData = [
  {
    title: "Neurological Surgery Flashcard",
    image: neuroImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },

  {
    title: "Dental RTC Surgical Flashcards",
    image: dentalImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },

  {
    title: "Neurological Surgery Flashcard",
    image: heartImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },

  {
    title: "Neurological Surgery Flashcard",
    image: kidneyImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },
  {
    title: "Neurological Surgery Flashcard",
    image: neuroImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },

  {
    title: "Dental RTC Surgical Flashcards",
    image: dentalImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },

  {
    title: "Neurological Surgery Flashcard",
    image: heartImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },

  {
    title: "Neurological Surgery Flashcard",
    image: kidneyImg,
    createdBy: {
      name: "Adam David",
      pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    },
  },
];

export const features = (localeTitles: any) => [
  {
    pic: clumsy1,
    title: localeTitles.TITLE_FLASHCARDS,
    text: "Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem, tempus id condimentum ",
  },
  {
    pic: clumsy2,
    title: localeTitles.TITLE_PAST_EXAMS,
    text: "Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem, tempus id condimentum ",
  },
  {
    pic: clumsy3,
    title: localeTitles.TITLE_MOCK_EXAMS,
    text: "Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem, tempus id condimentum ",
  },
];

export const steps = [
  {
    title: "Signup to Medestudo",
    description:
      "Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem, tempus id condimentum",
  },
  {
    title: "Complete Profile",
    description:
      "Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem, tempus id condimentum",
  },
  {
    title: "Explore",
    description:
      "Lorem ipsum dolor sit amet, onsectetur adipiscing elit. Nunc sem lorem, tempus id condimentum",
  },
];

export const dummyTestimonials = [
  {
    pic: professor1,
    title: "Adam David",
    msg: "Etiam sit amet imperdiet dolor. Maecenas lectus lectus, porttitor vel velit ut, interdum molestie nibh. Vivamus vulputate ut justo eget posuere. Etiam congue, dolor eget tristique finibus, nisi ex tincidunt nisl  vel semper sem sem et est. In arcu augue,",
  },
  {
    pic: professor2,
    title: "Adam David",
    msg: "Etiam sit amet imperdiet dolor. Maecenas lectus lectus, porttitor vel velit ut, interdum molestie nibh. Vivamus vulputate ut justo eget posuere. Etiam congue, dolor eget tristique finibus, nisi ex tincidunt nisl  vel semper sem sem et est. In arcu augue,",
  },
];
