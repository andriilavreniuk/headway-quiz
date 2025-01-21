import { getIsAllAnswersCorrect, formatPrize } from './utils';

describe('Utility Functions', () => {
  describe('getIsAllAnswersCorrect', () => {
    const answers = [
      { id: '1', text: 'Answer 1', isCorrect: true },
      { id: '2', text: 'Answer 2', isCorrect: false },
      { id: '3', text: 'Answer 3', isCorrect: true },
    ];

    it('returns true if all user answers are correct', () => {
      const userAnswers = ['1', '3'];
      expect(getIsAllAnswersCorrect(answers, userAnswers)).toBe(true);
    });

    it('returns false if any user answer is incorrect', () => {
      const userAnswers = ['1', '2'];
      expect(getIsAllAnswersCorrect(answers, userAnswers)).toBe(false);
    });

    it('returns false if a user answer does not exist in the answers list', () => {
      const userAnswers = ['1', '4'];
      expect(getIsAllAnswersCorrect(answers, userAnswers)).toBe(false);
    });

    it('returns true if no answers are selected (empty userAnswers)', () => {
      const userAnswers: string[] = [];
      expect(getIsAllAnswersCorrect(answers, userAnswers)).toBe(true);
    });
  });

  describe('formatPrize', () => {
    it('correctly formats a value in cents to a dollar amount', () => {
      const cents = 100000;
      expect(formatPrize(cents)).toBe('$1,000');
    });

    it('correctly formats a value with cents', () => {
      const cents = 123456;
      expect(formatPrize(cents)).toBe('$1,234.56');
    });

    it('formats zero correctly', () => {
      const cents = 0;
      expect(formatPrize(cents)).toBe('$0');
    });

    it('formats values under a dollar correctly', () => {
      const cents = 99;
      expect(formatPrize(cents)).toBe('$0.99');
    });
  });
});
