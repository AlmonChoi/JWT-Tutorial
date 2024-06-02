"use server";
import { signIn } from "lib/auth";
import { redirect } from "next/navigation";

export default async function gotoSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  let authenticated = false;
  let redirectURL = "/";
  try {
    const url = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    authenticated = true; // Not error throw means signin is sucess

    // get callbackUrl, if existed
    let gotoURL = url.split("callbackUrl=");
    if (gotoURL.length === 2) {
      gotoURL = gotoURL[1];
      gotoURL = gotoURL.split("%2F");
      redirectURL = gotoURL[3];
    } else {
      redirectURL = "/";
    }
  } catch (error) {
    // [auth][error] CredentialsSignin means signin is not sucess
    authenticated = false;
  }

  if (authenticated) {
    // redirect needs to be called outside of the try/catch block:
    redirect(redirectURL);
  } else {
    return { result: "Signin fail" };
  }
}
