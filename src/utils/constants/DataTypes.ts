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
