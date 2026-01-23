import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import { CatchAsync } from "./CatchAsync";
import { prisma } from "../app/lib/prisma";
import { EnvVars } from "../app/config/EnvVars";
import { AuthProviderType, UserRole } from "@prisma/client";

export const CreateSuperAdmin = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: EnvVars.SUPER_ADMIN_EMAIL },
    });

    if (existingAdmin) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const hashedPassword = await bcrypt.hash(
      EnvVars.SUPER_ADMIN_PASS,
      EnvVars.BCRYPT_SALT_ROUND,
    );

    const superAdmin = await prisma.user.create({
      data: {
        name: "Super Admin",
        email: EnvVars.SUPER_ADMIN_EMAIL,
        Role: UserRole.SUPER_ADMIN,
        isVerified: true,
        password: hashedPassword,
        authProvider: AuthProviderType.CREDENTIAL,
        providerID: EnvVars.SUPER_ADMIN_EMAIL,
      },
    });

    console.log("Super Admin created successfully:", superAdmin.email);
  },
);
