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

// Stories Data with Hebrew translations
export const STORIES_DATA: Story[] = [
  // Short Stories (סיפורים קצרים)
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
    ],
    translations: [
      'לפני זמן רב, הייתה חתולה קטנה.',
      'החתולה הייתה חמודה מאוד ופרוותית.',
      'היא אהבה לשחק עם כדור אדום.',
      'כל יום היא הייתה רצה וקופצת.',
      'החתולה הייתה מאוד שמחה!'
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
    ],
    translations: [
      'יש לי משפחה גדולה.',
      'האמא שלי מאוד טובת לב.',
      'האבא שלי מאוד חזק.',
      'יש לי אחות קטנה.',
      'כולנו אוהבים זה את זה!'
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
    ],
    translations: [
      'בגן יפה, פרחים פרחו בכל מקום.',
      'פרפרים רקדו מפרח לפרח.',
      'ילדה קטנה בשם אמה גילתה את הגן.',
      'היא ראתה ורדים צבעוניים, חינניות וצבעונים.',
      'אמה הרגישה כאילו היא באגדה.',
      'היא הבטיחה לבקר בגן כל יום.'
    ]
  },
  
  // Comics (קומיקס עם תמונות)
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
    translations: [
      'מקס הכלב היה מאוד אמיץ.',
      'הוא הגן על המשפחה שלו מפני סכנה.',
      'יום אחד, זר הגיע לבית.',
      'מקס נבח בקול רם כדי להזהיר את כולם.',
      'הזר ברח במהירות.',
      'מקס היה גיבור!'
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
    translations: [
      'קפטן לונה טסה ברקטה שלה לירח.',
      'היא ראתה כוכבים מנצנצים בשמים החשוכים.',
      'על הירח, היא מצאה סלעים מוזרים.',
      'היא אספה דגימות למחקר שלה.',
      'אז היא טסה בחזרה לכדור הארץ בבטחה.',
      'כולם היו גאים בהרפתקה שלה!'
    ],
    images: ['🚀', '🌙', '⭐', '🪨', '🔬', '🌍']
  },
  {
    id: 6,
    title: 'The Magic School',
    type: 'comic',
    level: 'easy',
    content: [
      'Sarah went to a magic school.',
      'She learned to make potions.',
      'Her teacher was a wise wizard.',
      'Sarah practiced every day.',
      'Soon she became a great witch!'
    ],
    translations: [
      'שרה הלכה לבית ספר לקסמים.',
      'היא למדה להכין שיקויים.',
      'המורה שלה היה קוסם חכם.',
      'שרה התאמנה כל יום.',
      'בקרוב היא הפכה למכשפה גדולה!'
    ],
    images: ['🏫', '🧪', '🧙‍♂️', '📚', '🧙‍♀️']
  },
  {
    id: 9,
    title: 'The Superhero Cat',
    type: 'comic',
    level: 'easy',
    content: [
      'Whiskers was no ordinary cat.',
      'She had super powers and could fly.',
      'One day, she saved a bird from a tree.',
      'The bird thanked her with a song.',
      'Whiskers became the city\'s hero!'
    ],
    translations: [
      'וויסקרס לא הייתה חתולה רגילה.',
      'הייתה לה כוח על והיא יכלה לעוף.',
      'יום אחד, היא הצילה ציפור מעץ.',
      'הציפור הודתה לה בשיר.',
      'וויסקרס הפכה לגיבורת העיר!'
    ],
    images: ['🐱', '🦸‍♀️', '🌳', '🐦', '🎵', '🏆']
  },
  {
    id: 10,
    title: 'The Robot Friend',
    type: 'comic',
    level: 'medium',
    content: [
      'Tommy built a robot named Robo.',
      'Robo could talk and play games.',
      'They became best friends quickly.',
      'Together they solved many problems.',
      'Robo helped Tommy learn new things.',
      'Their friendship was amazing!'
    ],
    translations: [
      'טומי בנה רובוט בשם רובו.',
      'רובו יכול היה לדבר ולשחק משחקים.',
      'הם הפכו לחברים הכי טובים במהירות.',
      'יחד הם פתרו בעיות רבות.',
      'רובו עזר לטומי ללמוד דברים חדשים.',
      'החברות שלהם הייתה מדהימה!'
    ],
    images: ['👦', '🤖', '🎮', '🤝', '💡', '❤️']
  },
  {
    id: 11,
    title: 'The Dragon Princess',
    type: 'comic',
    level: 'medium',
    content: [
      'Princess Emma found a baby dragon.',
      'The dragon was lost and scared.',
      'Emma decided to help him find home.',
      'They traveled through magical forests.',
      'Finally, they found the dragon\'s family.',
      'Emma was invited to stay forever!'
    ],
    translations: [
      'הנסיכה אמה מצאה דרקון קטן.',
      'הדרקון היה אבוד ופוחד.',
      'אמה החליטה לעזור לו למצוא בית.',
      'הם נסעו דרך יערות קסומים.',
      'לבסוף, הם מצאו את המשפחה של הדרקון.',
      'אמה הוזמנה להישאר לנצח!'
    ],
    images: ['👸', '🐉', '😢', '🌲', '👨‍👩‍👧‍👦', '🏰']
  },
  {
    id: 12,
    title: 'The Time Machine',
    type: 'comic',
    level: 'hard',
    content: [
      'Professor Alex invented a time machine.',
      'He traveled to the dinosaur age.',
      'He met friendly dinosaurs there.',
      'They showed him their world.',
      'Alex learned about ancient times.',
      'He returned with amazing stories!'
    ],
    translations: [
      'פרופסור אלכס המציא מכונת זמן.',
      'הוא נסע לעידן הדינוזאורים.',
      'הוא פגש דינוזאורים ידידותיים שם.',
      'הם הראו לו את העולם שלהם.',
      'אלכס למד על הזמנים העתיקים.',
      'הוא חזר עם סיפורים מדהימים!'
    ],
    images: ['👨‍🔬', '⏰', '🦕', '🌍', '📚', '✨']
  },
  {
    id: 13,
    title: 'The Pirate Adventure',
    type: 'comic',
    level: 'easy',
    content: [
      'Captain Jack sailed the seven seas.',
      'He searched for hidden treasure.',
      'His parrot Polly helped him navigate.',
      'They found an island with gold.',
      'Jack shared the treasure with everyone.',
      'He became the kindest pirate ever!'
    ],
    translations: [
      'קפטן ג\'ק הפליג בשבעת הימים.',
      'הוא חיפש אוצר נסתר.',
      'התוכי שלו פולי עזר לו לנווט.',
      'הם מצאו אי עם זהב.',
      'ג\'ק חלק את האוצר עם כולם.',
      'הוא הפך לפירט הכי טוב לב!'
    ],
    images: ['🏴‍☠️', '⚓', '🦜', '🏝️', '💰', '❤️']
  },
  {
    id: 14,
    title: 'The Fairy Garden',
    type: 'comic',
    level: 'medium',
    content: [
      'Lily discovered a secret fairy garden.',
      'Tiny fairies lived among the flowers.',
      'They taught her to make magic.',
      'Lily learned to help plants grow.',
      'The fairies made her their queen.',
      'She ruled the garden with kindness!'
    ],
    translations: [
      'לילי גילתה גן פיות סודי.',
      'פיות קטנות חיו בין הפרחים.',
      'הן לימדו אותה לעשות קסמים.',
      'לילי למדה לעזור לצמחים לגדול.',
      'הפיות הפכו אותה למלכה שלהן.',
      'היא שלטה בגן בחמלה!'
    ],
    images: ['👧', '🌸', '🧚‍♀️', '✨', '👑', '🌺']
  },
  {
    id: 15,
    title: 'The Underwater City',
    type: 'comic',
    level: 'hard',
    content: [
      'Marina discovered an underwater city.',
      'Mermaids and fish lived there peacefully.',
      'They showed her their beautiful homes.',
      'Marina learned to breathe underwater.',
      'She became friends with sea creatures.',
      'The ocean became her second home!'
    ],
    translations: [
      'מרינה גילתה עיר תת-ימית.',
      'בתולות ים ודגים חיו שם בשלום.',
      'הן הראו לה את הבתים היפים שלהן.',
      'מרינה למדה לנשום מתחת למים.',
      'היא הפכה לחברה של יצורי הים.',
      'האוקיינוס הפך לבית השני שלה!'
    ],
    images: ['🧜‍♀️', '🏙️', '🐠', '🏠', '🌊', '🏡']
  },
  
  // Advanced Reading (קריאה מתקדמת)
  {
    id: 7,
    title: 'The Ocean Explorer',
    type: 'story',
    level: 'hard',
    content: [
      'Dr. Marina was an ocean explorer who spent years studying marine life.',
      'She discovered a new species of fish that glowed in the dark.',
      'Her research helped scientists understand ocean ecosystems better.',
      'She wrote many books about her underwater adventures.',
      'Dr. Marina inspired many young people to become marine biologists.',
      'Her work continues to protect our oceans today.'
    ],
    translations: [
      'ד"ר מרינה הייתה חוקרת אוקיינוס שבילתה שנים בלימוד החיים הימיים.',
      'היא גילתה מין חדש של דגים שזוהרים בחושך.',
      'המחקר שלה עזר למדענים להבין טוב יותר את המערכות האקולוגיות של האוקיינוס.',
      'היא כתבה ספרים רבים על ההרפתקאות התת-ימיות שלה.',
      'ד"ר מרינה עוררה השראה אצל אנשים צעירים רבים להפוך לביולוגים ימיים.',
      'העבודה שלה ממשיכה להגן על האוקיינוסים שלנו היום.'
    ]
  },
  {
    id: 8,
    title: 'The Future City',
    type: 'story',
    level: 'hard',
    content: [
      'In the year 2050, cities will be very different from today.',
      'Flying cars will transport people through the sky.',
      'Robots will help with daily tasks and chores.',
      'Buildings will be made of smart materials that change color.',
      'People will live in harmony with nature.',
      'Technology will make life easier and more sustainable.'
    ],
    translations: [
      'בשנת 2050, הערים יהיו שונות מאוד מהיום.',
      'מכוניות מעופפות יובילו אנשים דרך השמים.',
      'רובוטים יעזרו במשימות יומיומיות ובמטלות.',
      'בניינים יהיו עשויים מחומרים חכמים שמשנים צבע.',
      'אנשים יחיו בהרמוניה עם הטבע.',
      'טכנולוגיה תהפוך את החיים לקלים יותר וברי קיימא.'
    ]
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
