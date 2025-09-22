import { AlphabetItem, WordItem, Story } from '@/types/gameTypes';

// Alphabet Data
export const ALPHABET_DATA: AlphabetItem[] = [
  { letter: 'A', word: 'Apple', emoji: '🍎', example: 'A is for Apple - red and sweet!' },
  { letter: 'B', word: 'Ball', emoji: '⚽', example: 'B is for Ball - let\'s play!' },
  { letter: 'C', word: 'Cat', emoji: '🐱', example: 'C is for Cat - soft and furry!' },
  { letter: 'D', word: 'Dog', emoji: '🐶', example: 'D is for Dog - our best friend!' },
  { letter: 'E', word: 'Elephant', emoji: '🐘', example: 'E is for Elephant - big and strong!' },
  { letter: 'F', word: 'Fish', emoji: '🐠', example: 'F is for Fish - swimming in water!' },
  { letter: 'G', word: 'Grape', emoji: '🍇', example: 'G is for Grape - purple and juicy!' },
  { letter: 'H', word: 'House', emoji: '🏠', example: 'H is for House - where we live!' },
  { letter: 'I', word: 'Ice cream', emoji: '🍦', example: 'I is for Ice cream - cold and yummy!' },
  { letter: 'J', word: 'Juice', emoji: '🧃', example: 'J is for Juice - fresh and sweet!' },
  { letter: 'K', word: 'Kite', emoji: '🪁', example: 'K is for Kite - flying high!' },
  { letter: 'L', word: 'Lion', emoji: '🦁', example: 'L is for Lion - king of animals!' },
  { letter: 'M', word: 'Mouse', emoji: '🐭', example: 'M is for Mouse - small and quick!' },
  { letter: 'N', word: 'Nose', emoji: '👃', example: 'N is for Nose - we smell with it!' },
  { letter: 'O', word: 'Orange', emoji: '🍊', example: 'O is for Orange - round and citrus!' },
  { letter: 'P', word: 'Pizza', emoji: '🍕', example: 'P is for Pizza - cheesy and delicious!' },
  { letter: 'Q', word: 'Queen', emoji: '👸', example: 'Q is for Queen - royal and elegant!' },
  { letter: 'R', word: 'Rainbow', emoji: '🌈', example: 'R is for Rainbow - colorful and beautiful!' },
  { letter: 'S', word: 'Sun', emoji: '☀️', example: 'S is for Sun - bright and warm!' },
  { letter: 'T', word: 'Tree', emoji: '🌳', example: 'T is for Tree - tall and green!' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️', example: 'U is for Umbrella - keeps us dry!' },
  { letter: 'V', word: 'Violin', emoji: '🎻', example: 'V is for Violin - makes beautiful music!' },
  { letter: 'W', word: 'Water', emoji: '💧', example: 'W is for Water - clear and refreshing!' },
  { letter: 'X', word: 'Xylophone', emoji: '🎵', example: 'X is for Xylophone - musical instrument!' },
  { letter: 'Y', word: 'Yacht', emoji: '⛵', example: 'Y is for Yacht - sailing on the sea!' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓', example: 'Z is for Zebra - black and white stripes!' }
];

// Words Data
export const WORDS_DATA: WordItem[] = [
  { word: 'Cat', emoji: '🐱', options: ['🐱', '🐶', '🐭'] },
  { word: 'Apple', emoji: '🍎', options: ['🍎', '🍊', '🍌'] },
  { word: 'Sun', emoji: '☀️', options: ['☀️', '🌙', '⭐'] },
  { word: 'House', emoji: '🏠', options: ['🏠', '🏫', '🏥'] },
  { word: 'Car', emoji: '🚗', options: ['🚗', '🚲', '🚌'] },
  { word: 'Fish', emoji: '🐠', options: ['🐠', '🐸', '🐦'] },
  { word: 'Ball', emoji: '⚽', options: ['⚽', '🏀', '🎾'] },
  { word: 'Tree', emoji: '🌳', options: ['🌳', '🌺', '🌵'] }
];

// Drag and Drop Questions
export const DRAG_QUESTIONS = [
  {
    id: 1,
    title: 'Match the words with pictures',
    items: [
      { id: 'cat', word: 'Cat', emoji: '🐱', correctPosition: 0 },
      { id: 'dog', word: 'Dog', emoji: '🐶', correctPosition: 1 },
      { id: 'bird', word: 'Bird', emoji: '🐦', correctPosition: 2 }
    ],
    dropZones: [
      { id: 'zone-0', emoji: '🐱', position: 0 },
      { id: 'zone-1', emoji: '🐶', position: 1 },
      { id: 'zone-2', emoji: '🐦', position: 2 }
    ]
  },
  {
    id: 2,
    title: 'Match the fruits',
    items: [
      { id: 'apple', word: 'Apple', emoji: '🍎', correctPosition: 0 },
      { id: 'banana', word: 'Banana', emoji: '🍌', correctPosition: 1 },
      { id: 'orange', word: 'Orange', emoji: '🍊', correctPosition: 2 }
    ],
    dropZones: [
      { id: 'zone-0', emoji: '🍎', position: 0 },
      { id: 'zone-1', emoji: '🍌', position: 1 },
      { id: 'zone-2', emoji: '🍊', position: 2 }
    ]
  },
  {
    id: 3,
    title: 'Match the colors',
    items: [
      { id: 'red', word: 'Red', emoji: '🔴', correctPosition: 0 },
      { id: 'blue', word: 'Blue', emoji: '🔵', correctPosition: 1 },
      { id: 'green', word: 'Green', emoji: '🟢', correctPosition: 2 }
    ],
    dropZones: [
      { id: 'zone-0', emoji: '🔴', position: 0 },
      { id: 'zone-1', emoji: '🔵', position: 1 },
      { id: 'zone-2', emoji: '🟢', position: 2 }
    ]
  },
  {
    id: 4,
    title: 'Match the vehicles',
    items: [
      { id: 'car', word: 'Car', emoji: '🚗', correctPosition: 0 },
      { id: 'bus', word: 'Bus', emoji: '🚌', correctPosition: 1 },
      { id: 'bike', word: 'Bike', emoji: '🚲', correctPosition: 2 }
    ],
    dropZones: [
      { id: 'zone-0', emoji: '🚗', position: 0 },
      { id: 'zone-1', emoji: '🚌', position: 1 },
      { id: 'zone-2', emoji: '🚲', position: 2 }
    ]
  },
  {
    id: 5,
    title: 'Match the shapes',
    items: [
      { id: 'circle', word: 'Circle', emoji: '⭕', correctPosition: 0 },
      { id: 'square', word: 'Square', emoji: '⬜', correctPosition: 1 },
      { id: 'triangle', word: 'Triangle', emoji: '🔺', correctPosition: 2 }
    ],
    dropZones: [
      { id: 'zone-0', emoji: '⭕', position: 0 },
      { id: 'zone-1', emoji: '⬜', position: 1 },
      { id: 'zone-2', emoji: '🔺', position: 2 }
    ]
  }
];

// Stories Data
export const STORIES_DATA: Story[] = [
  {
    id: 1,
    title: 'The Little Cat',
    type: 'story',
    level: 'easy',
    content: [
      'Once upon a time, there was a little cat.',
      'The cat was very cute and fluffy.',
      'She loved to play with a red ball.',
      'Every day, she would run and jump.',
      'The cat was very happy!'
    ]
  },
  {
    id: 2,
    title: 'My Family',
    type: 'story',
    level: 'easy',
    content: [
      'I have a big family.',
      'My mom is very kind.',
      'My dad is very strong.',
      'I have a little sister.',
      'We all love each other!'
    ]
  },
  {
    id: 3,
    title: 'The Magic Garden',
    type: 'story',
    level: 'medium',
    content: [
      'In a beautiful garden, flowers bloomed everywhere.',
      'Butterflies danced from flower to flower.',
      'A little girl named Emma discovered the garden.',
      'She saw colorful roses, daisies, and tulips.',
      'Emma felt like she was in a fairy tale.',
      'She promised to visit the garden every day.'
    ]
  },
  {
    id: 4,
    title: 'The Brave Dog',
    type: 'comic',
    level: 'easy',
    content: [
      'Max the dog was very brave.',
      'He protected his family from danger.',
      'One day, a stranger came to the house.',
      'Max barked loudly to warn everyone.',
      'The stranger ran away quickly.',
      'Max was a hero!'
    ],
    images: ['🐕', '🏠', '👤', '🚨', '🏃', '🏆']
  },
  {
    id: 5,
    title: 'The Space Adventure',
    type: 'comic',
    level: 'medium',
    content: [
      'Captain Luna flew her rocket to the moon.',
      'She saw stars twinkling in the dark sky.',
      'On the moon, she found strange rocks.',
      'She collected samples for her research.',
      'Then she flew back to Earth safely.',
      'Everyone was proud of her adventure!'
    ],
    images: ['🚀', '🌙', '⭐', '🪨', '🔬', '🌍']
  }
];

// Utility functions
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getScoreMessage = (score: number, total: number): string => {
  const percentage = score / total;
  if (percentage === 1) return 'Perfect! Amazing work!';
  if (percentage >= 0.8) return 'Great job! Well done!';
  return 'Good effort! Keep practicing!';
};

export const getStarsFromScore = (score: number, total: number): number => {
  const percentage = score / total;
  if (percentage === 1) return 3;
  if (percentage >= 0.8) return 2;
  if (percentage >= 0.5) return 1;
  return 0;
};
