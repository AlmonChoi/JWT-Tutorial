import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: false,
      email: true,
      password: true,
    },
  });

  return user;
}

export async function createUser(email: string, password: string) {
  // check if user existed before creation
  const user = await prisma.user.findUnique({
    where: { email: email },
    select: {
      id: false,
      email: true,
      password: false,
    },
  });

  if (user) return false; // user already existed

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  return true;
}
