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
