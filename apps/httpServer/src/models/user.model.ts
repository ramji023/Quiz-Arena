import { prisma } from "@repo/database";
import { userData } from "../types/userModel";

// create new user
export async function createUser(userData: userData) {
  return await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    },
  });
}

//find user
export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, username: true, email: true },
    });
  } catch (err) {
    console.log(err);
  }
}

//find and update user by id
export async function findAndUpdateUserbyId(userData: {
  id: string;
  username: string;
}) {
  return await prisma.user.update({
    where: { id: userData.id },
    data: { username: userData.username },
  });
}

//find user by id
export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, username: true },
  });
}
