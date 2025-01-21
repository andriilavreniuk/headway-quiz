export interface IAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: string;
  text: string;
  prize: number;
  answers: IAnswer[];
  minCorrectAnswersCount: number;
}
