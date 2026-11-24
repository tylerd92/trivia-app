export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type RootStackParamList = {
  Home: undefined;
  Trivia: undefined;
  Results: { score: number; totalQuestions: number };
};
