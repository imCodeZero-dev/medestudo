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
}

export interface studentDataType {
  _id: string;
  name: string;
  email: string;
  status: string;
  pic: string;
  createdAt: string;
}
