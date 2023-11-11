import { PrismaClient } from "@prisma/client";
import { RegistrationSchema } from "../../common/schemas/registration";
import { ServerConstants } from "../../common/constants/server.constants";

const prisma = new PrismaClient();

export async function checkUserByProviderUid(providerUid: string) {
  const user = await prisma.user.findFirst({
    where: {
      providerUid: providerUid,
    },
  });
  return user ? true : false;
}

export async function checkUserByEmailAddress(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      emailAddress: email,
    },
  });
  return user ? true : false;
}

export async function createUser(user: RegistrationSchema) {
  const newUser = await prisma.user.create({
    data: {
      emailAddress: user.email,
      emailVerified: user.emailVerified,
      firstName: user.firstName,
      lastName: user.lastName,
      provider: user.provider,
      photoURL: user.photoURL ?? ServerConstants.REGISTRATION.DEFAULT_PHOTO_URL,
      providerUid: user.providerUid,
    },
  });
  return newUser;
}

export async function getUserByEmailAndProviderUid(
  email: string,
  providerUid: string
) {
  const user = await prisma.user.findFirst({
    where: {
      emailAddress: email,
      providerUid: providerUid,
    },
  });
  return user;
}

export async function checkUserByEmailAndProviderType(
  email: string,
  provider: string
) {
  const user = await prisma.user.findFirst({
    where: {
      emailAddress: email,
      provider: provider,
    },
  });
  return user ? true : false;
}

export async function getUserByEmailOnly(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      emailAddress: email,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      photoURL: true,
      provider: true,
      providerUid: true,
      emailAddress: true,
      emailVerified: true,
    },
  });
  return user;
}
