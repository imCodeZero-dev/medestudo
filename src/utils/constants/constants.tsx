import neuroImg from "../../assets/Images/Landing/neuro.png";
import dentalImg from "../../assets/Images/Landing/dental.png";
import kidneyImg from "../../assets/Images/Landing/kidney.png";
import heartImg from "../../assets/Images/Landing/heart.png";
import clumsy1 from "../../assets/Images/Landing/clumsy 1.png";
import clumsy2 from "../../assets/Images/Landing/clumsy2.png";
import clumsy3 from "../../assets/Images/Landing/clumsy3.png";
import professor1 from "../../assets/Images/Landing/Professor1.png";
import professor2 from "../../assets/Images/Landing/Professor2.png";

export const baseURL = "https://api.medestudo.com/api/v1";
// export const baseURL = "https://167.88.33.35.nip.io/api/v1";
// export const baseURL = "https://medestudo.onrender.com/api/v1";
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

const months = [
  { name: "January", _id: "01" },
  { name: "February", _id: "02" },
  { name: "March", _id: "03" },
  { name: "April", _id: "04" },
  { name: "May", _id: "05" },
  { name: "June", _id: "06" },
  { name: "July", _id: "07" },
  { name: "August", _id: "08" },
  { name: "September", _id: "09" },
  { name: "October", _id: "10" },
  { name: "November", _id: "11" },
  { name: "December", _id: "12" },
];

export const totalMonths = months;

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

export const allFlashcardsData = (localeTitle: any) => [
  {
    title: localeTitle?.TITLE_SURGERY,
    image: neuroImg,
    // createdBy: {
    //   name: "Adam David",
    //   pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    // },
  },

  {
    title: localeTitle?.TITLE_CLINIC,
    image: dentalImg,
    // createdBy: {
    //   name: "Adam David",
    //   pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    // },
  },

  {
    title: localeTitle?.TITLE_GYNECOLOGY_AND_OBSTETRIC,
    image: heartImg,
    // createdBy: {
    //   name: "Adam David",
    //   pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    // },
  },

  {
    title: localeTitle?.TITLE_PEDIATRICS,
    image: kidneyImg,
    // createdBy: {
    //   name: "Adam David",
    //   pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    // },
  },
  {
    title: localeTitle?.TITLE_PREVENTIVE,
    image: neuroImg,
    // createdBy: {
    //   name: "Adam David",
    //   pic: "https://t4.ftcdn.net/jpg/02/44/43/69/360_F_244436923_vkMe10KKKiw5bjhZeRDT05moxWcPpdmb.jpg",
    // },
  },
];

export const features = (localeTitles: any, localeText: any) => [
  {
    pic: clumsy1,
    title: localeTitles.TITLE_FLASHCARDS,
    text: localeText.TEXT_FLASHCARD_MSG,
  },
  {
    pic: clumsy2,
    title: localeTitles.TITLE_PAST_EXAMS,
    text: localeText.TEXT_PASTEXAM_MSG,
  },
  {
    pic: clumsy3,
    title: localeTitles.TITLE_MOCK_EXAMS,
    text: localeText.TEXT_MOCKEXAM_MSG,
  },
];

export const steps = (localeTitles: any, localeText: any) => [
  {
    title: localeTitles.TITLE_SIGNUP_TO_MEDESTUDO,
    description: localeText.TEXT_LOGIN_WITH_GOOGLE_OR_EMAIL,
  },
  {
    title: localeTitles.TITLE_COMPLETE_YOUR_PROFILE,
    description: localeText.TEXT_ANS_FEW_QUESTIONS,
  },
  {
    title: localeTitles.TITLE_EXPLORE,
    description: localeText.TEXT_GET_FAMILIAR_WITH,
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
