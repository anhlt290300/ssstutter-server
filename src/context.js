import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const createContext = async () => ({
  prisma: prisma,
});

export { createContext };
