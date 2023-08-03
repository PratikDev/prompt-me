import { faker } from "@faker-js/faker";

/**
 * @returns a random username
 */
const username = () =>
  faker.internet.userName({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  });

/**
 * @returns a random prompt between 10 and 100 words
 */
const prompt = () => faker.lorem.sentence({ min: 10, max: 100 });

/**
 *
 * @returns an array of random words between 1 and 5 words long
 */
const tags = () => {
  // Generate a random number between 1 and 5 (inclusive) to determine the array length
  const arrayLength = Math.floor(Math.random() * 5) + 1;

  // Initialize an empty array to hold the random words
  const randomWordsArray = [];

  // Generate random words and add them to the array
  for (let i = 0; i < arrayLength; i++) {
    const randomWord = faker.lorem.word();
    randomWordsArray.push(randomWord);
  }

  return randomWordsArray;
};

/**
 * @returns a random date in the past
 */
const postedAt = () => faker.date.past().toDateString();

export { postedAt, prompt, tags, username };
