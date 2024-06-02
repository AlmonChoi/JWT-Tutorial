"use client";
import Link from "next/link";
import { Form } from "components/loginform";
import { SubmitButton } from "components/submit-button";
import signInSchema from "lib/zod";
import gotoSignin from "./gotoSignin";
import toast from "react-hot-toast";

export default function Login() {
  async function clientAction(fromData: FormData) {
    const fmtData = {
      email: fromData.get("email") as string,
      password: fromData.get("password") as string,
    };
    const validation = signInSchema.safeParse(fmtData);
    if (validation.success) {
      // `gotoSignin` used Auth.js signIn component. If sucess, it will redirect to other pages
      const result = await gotoSignin(fmtData);
      if (result) {
        // Return to here means the sign in is not sucess
        toast.error(
          "Sign in fail. Please check the email, password and try again"
        );
      }
    } else {
      toast.error(
        "Validation fail. Please check the email, password and try again"
      );
    }
  }

  return (
    <div className="flex h-[calc(100vh-40px)] w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use email and password to sign in
          </p>
        </div>

        <Form action={clientAction}>
          <SubmitButton>Sign In</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/create" className="font-semibold text-gray-800">
              Create
            </Link>
            {" an account."}
          </p>
        </Form>
      </div>
    </div>
  );
}
