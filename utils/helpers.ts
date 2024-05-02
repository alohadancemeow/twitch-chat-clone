import { faker } from "@faker-js/faker";
import { Author, Badge, MessageModel } from "./models";

export const generateFakeMessage = (): MessageModel => {
  return {
    id: faker.string.uuid(),
    author: {
      rgbColor: faker.internet.color({
        redBase: 250,
        greenBase: 250,
        blueBase: 250,
      }),
      username: faker.internet.userName(),
      badges: generateRandomBadges(),
    },
    content: faker.lorem.sentence(),
  };
};

const generateRandomBadges = (): Badge[] => {
  const badge = (badge: Badge, prob: number) =>
    faker.helpers.maybe(() => badge, { probability: prob });

  return [
    badge("vip", 0.1),
    badge("moderator", 0.1),
    badge("prime", 0.2),
    badge("turbo", 0.1),
  ].filter((x) => x !== undefined) as Badge[];
};

export const generateUser = (): Author => {
  return {
    rgbColor: faker.internet.color({
      redBase: 250,
      greenBase: 250,
      blueBase: 250,
    }),
    username: faker.internet.userName(),
    badges: generateRandomBadges(),
  };
};

export const generateMessage = (options?: {
  content?: string;
  author?: Author;
}): MessageModel => {
  return {
    id: faker.string.uuid(),
    author: options?.author ?? generateUser(),
    content: options?.content ?? generateRandomSentence(),
  };
};

const generateRandomSentence = () => {
  const sentences: string[] = [
    "Hello! 👋🏻",
    "🤣🤣🤣🤣",
    "lol",
    "So cool! 😎",
    "I love this chat! 😍",
    "Please don't write bad words!",
    "Subscribe to Gionatha's channel!",
    "Don't forget to like and subscribe!",
    "Is anybody here ?",
    "Byeeee",
  ];

  return faker.helpers.arrayElement(sentences);
};
