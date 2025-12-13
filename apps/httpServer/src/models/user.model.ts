import { prisma } from "@repo/database"; // import prisma client instance
import { userData } from "../types/userModel"; // import types of user data

// handle database operations related to user model

// create new user in user table
export async function createUser(userData: userData) {
  return await prisma.user.create({
    data: {
      username: userData.username,
      email: userData.email,
      password: userData.password,
    },
  });
}

//find user by id in user table
export async function findUserById(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, username: true },
  });
}

// find user by email from user table
export async function findUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email: email },
      select: { id: true, username: true, email: true, password: true },
    });
  } catch (err) {
    console.log(err);
  }
}

//find and update user by id in user table
export async function findAndUpdateUserbyId(userData: {
  id: string;
  username: string;
}) {
  return await prisma.user.update({
    where: { id: userData.id },
    data: { username: userData.username },
  });
}