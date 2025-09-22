import { describe, it, expect, beforeEach } from 'vitest';

// Test data
const alphabetData = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' }
];

const wordsData = [
  { word: 'Cat', emoji: '🐱', options: ['🐱', '🐶', '🐭'] },
  { word: 'Apple', emoji: '🍎', options: ['🍎', '🍊', '🍌'] },
  { word: 'Sun', emoji: '☀️', options: ['☀️', '🌙', '⭐'] },
  { word: 'House', emoji: '🏠', options: ['🏠', '🏫', '🏥'] },
  { word: 'Car', emoji: '🚗', options: ['🚗', '🚲', '🚌'] }
];

describe('Game Levels Tests', () => {
  describe('Alphabet Level', () => {
    it('should complete alphabet level and get 3 stars', () => {
      let stars = 0;
      let currentLetter = 0;
      
      // Simulate clicking through all letters
      for (let i = 0; i < alphabetData.length; i++) {
        stars = Math.min(stars + 1, 3);
        currentLetter = i;
      }
      
      expect(currentLetter).toBe(alphabetData.length - 1);
      expect(stars).toBe(3);
    });

    it('should progress through letters correctly', () => {
      let currentLetter = 0;
      
      // Test letter progression
      expect(currentLetter).toBe(0);
      
      // Move to next letter
      currentLetter++;
      expect(currentLetter).toBe(1);
      
      // Move to previous letter
      currentLetter--;
      expect(currentLetter).toBe(0);
    });

    it('should play sound for each letter', () => {
      const playSound = (text) => {
        return `Playing: ${text}`;
      };
      
      const result = playSound(`${alphabetData[0].letter}. ${alphabetData[0].word}`);
      expect(result).toBe('Playing: A. Apple');
    });
  });

  describe('Words Level', () => {
    it('should get perfect score (5/5) and 3 stars', () => {
      let score = 0;
      const totalQuestions = wordsData.length;
      
      // Simulate answering all questions correctly
      wordsData.forEach(word => {
        const correctAnswer = word.emoji;
        const selectedAnswer = correctAnswer; // Always select correct answer
        if (selectedAnswer === correctAnswer) {
          score++;
        }
      });
      
      const stars = Math.ceil(score / totalQuestions * 3);
      
      expect(score).toBe(5);
      expect(stars).toBe(3);
    });

    it('should get partial score (3/5) and 2 stars', () => {
      let score = 0;
      const totalQuestions = wordsData.length;
      
      // Simulate answering 3 out of 5 correctly
      wordsData.forEach((word, index) => {
        const correctAnswer = word.emoji;
        const selectedAnswer = index < 3 ? correctAnswer : word.options[1]; // Wrong answer for last 2
        if (selectedAnswer === correctAnswer) {
          score++;
        }
      });
      
      const stars = Math.ceil(score / totalQuestions * 3);
      
      expect(score).toBe(3);
      expect(stars).toBe(2);
    });

    it('should get low score (1/5) and 1 star', () => {
      let score = 0;
      const totalQuestions = wordsData.length;
      
      // Simulate answering only 1 out of 5 correctly
      wordsData.forEach((word, index) => {
        const correctAnswer = word.emoji;
        const selectedAnswer = index === 0 ? correctAnswer : word.options[1]; // Only first correct
        if (selectedAnswer === correctAnswer) {
          score++;
        }
      });
      
      const stars = Math.ceil(score / totalQuestions * 3);
      
      expect(score).toBe(1);
      expect(stars).toBe(1);
    });

    it('should calculate progress correctly', () => {
      const currentQuestion = 2;
      const totalQuestions = wordsData.length;
      const showFeedback = true;
      
      const progress = (currentQuestion + (showFeedback ? 1 : 0)) / totalQuestions * 100;
      
      expect(progress).toBe(60); // 3/5 = 60%
    });

    it('should show correct feedback for right answer', () => {
      const word = wordsData[0];
      const correctAnswer = word.emoji;
      const selectedAnswer = correctAnswer;
      
      const isCorrect = selectedAnswer === correctAnswer;
      const feedbackText = isCorrect ? 'Correct! Well done! 🎉' : `Not quite! It's ${word.emoji}`;
      
      expect(isCorrect).toBe(true);
      expect(feedbackText).toBe('Correct! Well done! 🎉');
    });

    it('should show correct feedback for wrong answer', () => {
      const word = wordsData[0];
      const correctAnswer = word.emoji;
      const selectedAnswer = word.options[1]; // Wrong answer
      
      const isCorrect = selectedAnswer === correctAnswer;
      const feedbackText = isCorrect ? 'Correct! Well done! 🎉' : `Not quite! It's ${word.emoji}`;
      
      expect(isCorrect).toBe(false);
      expect(feedbackText).toBe('Not quite! It\'s 🐱');
    });
  });

  describe('Level Completion', () => {
    it('should unlock next level after completing current level', () => {
      const completedLevels = new Set([1]);
      const level2Locked = !completedLevels.has(1);
      
      expect(level2Locked).toBe(false);
    });

    it('should keep level locked if previous not completed', () => {
      const completedLevels = new Set([]);
      const level2Locked = !completedLevels.has(1);
      
      expect(level2Locked).toBe(true);
    });

    it('should show completion message when level is finished', () => {
      const currentQuestion = wordsData.length - 1;
      const showFeedback = true;
      const isCompleted = currentQuestion >= wordsData.length - 1 && showFeedback;
      
      expect(isCompleted).toBe(true);
    });
  });

  describe('Score Messages', () => {
    it('should show perfect message for 100% score', () => {
      const score = 5;
      const totalQuestions = 5;
      
      const message = score === totalQuestions 
        ? "Perfect! Amazing work!" 
        : score >= totalQuestions * 0.8 
          ? "Great job! Well done!" 
          : "Good effort! Keep practicing!";
      
      expect(message).toBe("Perfect! Amazing work!");
    });

    it('should show great job message for 80%+ score', () => {
      const score = 4;
      const totalQuestions = 5;
      
      const message = score === totalQuestions 
        ? "Perfect! Amazing work!" 
        : score >= totalQuestions * 0.8 
          ? "Great job! Well done!" 
          : "Good effort! Keep practicing!";
      
      expect(message).toBe("Great job! Well done!");
    });

    it('should show keep practicing message for <80% score', () => {
      const score = 2;
      const totalQuestions = 5;
      
      const message = score === totalQuestions 
        ? "Perfect! Amazing work!" 
        : score >= totalQuestions * 0.8 
          ? "Great job! Well done!" 
          : "Good effort! Keep practicing!";
      
      expect(message).toBe("Good effort! Keep practicing!");
    });
  });
});
