import { PrismaClient } from "@prisma/client";
import { RegistrationSchema } from "../../common/schemas/registration";
import { ServerConstants } from "../../common/constants/server.constants";

const prisma = new PrismaClient();

export async function checkUserByProviderId(id: string) {
  const user = await prisma.user.findFirst({
    where: {
      providerId: id,
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
      providerId: user.providerId,
    },
  });
  return newUser;
}
