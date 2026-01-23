interface superAdmin {
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASS: string;
}

interface EnvVars {
  PORT: string;
  DATABASE_URL: string;
  SUPER_ADMIN_ENV: superAdmin;
  BCRYPT_SALT_ROUND: string;
}

const LoadEnvVariables = () => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DATABASE_URL",
    "SUPER_ADMIN_PASS",
    "SUPER_ADMIN_EMAIL",
    "BCRYPT_SALT_ROUND",
  ];
  requiredEnvVariables.forEach((varName) => {
    if (!process.env[varName]) {
      throw new Error(
        `Environment variable ${varName} is required but not defined.`,
      );
    }
  });
  return {
    PORT: process.env.PORT as string,
    DATABASE_URL: process.env.DATABASE_URL as string,
    SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};
export const EnvVars = LoadEnvVariables();
