import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

const createUser = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  // hash password
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
  });

  return result;
};

export const UserService = {
  createUser,
};
