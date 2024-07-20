export interface IAdmin {
  accessToken: string;
}
export interface IUser {
  accessToken: string;
  // Add other properties as needed
}

export interface AdminCookies {
  admin: {
    token: string;
  };
}

export interface ProfessorCookies {
  cookies: {
    professor: {
      token: string;
    };
  };
}

export interface Tag {
  userId: number;
  _id: number;
  title: string;
  completed: boolean;
}

export interface Flashcard {
  _id: string;
  question: string;
  answer: string;
  tags: string[];
}

export interface Class {
  _id: string;
  deckId: DeckId;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DeckId {
  _id: string;
  name: string;
  subDeck: SubDeck[];
  image: string;
  createdBy: string;
}

export interface SubDeck {
  name: string;
  subDeck: any;
  _id: string;
}

export interface Root {
  decksWithCardCounts: DecksWithCardCount[];
}

export interface DecksWithCardCount {
  _id: string;
  subdeck: SubdeckClass;
  classId: string;
  deckId: DeckIdClass;
  createdAt: string;
  updatedAt: string;
  __v: number;
  cardCount: number;
}

export interface SubdeckClass {
  name: string;
  _id: string;
}

export interface DeckIdClass {
  _id: string;
}
export interface examForm {
  title: string;
  institute: string;
  year: string;
}

export interface examData {
  institute: string;
  questionCount: number;
  title: string;
  updatedAt: string;
  year: string;
  _id: string;
}

export interface DeckDetailType {
  _id: string;
  subdeck: SubdeckType;
  classId: ClassIdType;
  deckId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubdeckType {
  name: string;
  _id: string;
}

export interface ClassIdType {
  _id: string;
  deckId: SubdeckType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ResultDataType {
  _id: string;
  totalQuestions: string;
  achievedMarks: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface dashboardDataType {
  year: string;
  month: string;
  decks: number;
  flashcards: number;
  questions: number;
  prevMonth: number;
  prevMonthCards: number;
  prevMonthQuestions: number;
}

export interface studentDataType {
  _id: string;
  name: string;
  email: string;
  status: string;
  pic: string;
  createdAt: string;
}

export interface studentDataType {
  _id: string;
  name: string;
  email: string;
  status: string;
  pic: string;
  createdAt: string;
}

export interface flashcardLandingType {
  _id?: string;
  image: string;
  title: string;
  createdBy?: {
    pic: string;
    name: string;
  };
}

export interface flashcardData {
  bookmarked?: boolean;
  answer: string;
  answerImage: string;
  cardCount: number;
  createdAt: string;
  deckId: string;
  professorId: string;
  question: string;
  questionImage: string;
  tags: string[];
  // tags?: { title?: string; value?: string; label?: string }[];
  updatedAt?: string;
  _id?: string;
}

export interface deckData {
  cardCount: number;
  classId: string;
  createdAt: string;
  deckId: string;
  subdeck: { name: string; _id: string };
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface reviewDeckType {
  data: Ratingflashcard;
  difficulty: number;
  id: string;
}

export interface Ratingflashcard {
  flashCardId: string;
  rated: {
    _id: string;
    question: string;
    questionImage: string;
    answerImage: string;
    answer: string;
    deckId: string;

    createdAt: string;
    tags: Tag[];
  };
}

interface Answer {
  image: string | null;
  isCorrect: boolean;
  reason: string;
  text: string;
}

export type SelectedAnswersType = { [key: number]: Answer };
