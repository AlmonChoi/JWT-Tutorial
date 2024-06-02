"use server";
import { createUser } from "lib/db";
import signInSchema from "lib/zod";

export default async function gotoCreate({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const fmtData = {
    email: email,
    password: password,
  };
  const validation = signInSchema.safeParse(fmtData);
  if (validation.success) {
    let result = await createUser(email, password);
    console.log(result);
    if (result) {
      return "created";
    } else {
      return null;
    }
  } else {
    return null;
  }
}
