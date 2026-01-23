import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { AuthProviderType, UserRole, UserStatus } from "@prisma/client";

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

      authProvider: AuthProviderType.CREDENTIAL, // ✅ fixed
      providerID: payload.email, // required
      Role: UserRole.USER, // optional, default is USER
      userStatus: UserStatus.PENDING, // optional, default is PENDING
      isVerified: false,
    },
  });

  return result;
};

export const UserService = {
  createUser,
};
