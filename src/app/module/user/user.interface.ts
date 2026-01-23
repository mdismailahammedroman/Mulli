import { UserRole } from "@prisma/client";
export enum isActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum AuthProviderType {
  GOOGLE = "google",
  CREDENTIAL = "credential",
}

export interface IAuthProvider {
  provider: AuthProviderType; //goole ,credintial
  providerID: string;
}
export enum userStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  SUSPENDED = "SUSPENDED",
  REJECTED = "REJECTED",
}

export interface IUserCreateInput {
  name: string;
  email: string;
  password?: string; // optional for OAuth
  Role?: UserRole; // default USER
  isVerified?: boolean;
  userStatus?: userStatus;
  provider?: AuthProviderType; // for auth provider
}
export interface IUser {
  id?: string;
  name: string;
  email: string;
  Role: UserRole;
  password?: string;
  picture?: string;
  phone?: string;
  address?: string;
  isDeleted?: boolean;
  userStatus?: userStatus;
  isVerified?: boolean;
  nationalId?: string;
  profileImage?: string;
  dateOfBirth?: Date;
  commissionRate?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
