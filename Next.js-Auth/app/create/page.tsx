"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Form } from "components/loginform";
import { SubmitButton } from "components/submit-button";
import signInSchema from "lib/zod";
import gotoCreate from "./gotoCreate";
import toast from "react-hot-toast";

export default function Login() {
  async function clientAction(fromData: FormData) {
    const fmtData = {
      email: fromData.get("email") as string,
      password: fromData.get("password") as string,
    };
    const validation = signInSchema.safeParse(fmtData);
    if (validation.success) {
      const result = await gotoCreate(fmtData);
      if (result === "created") {
        toast.success("Account Created. Please Sign in", { duration: 10000 });
        redirect("/login");
      } else {
        toast.error(
          "Account creation fail. Please check the email, password and try again"
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
          <h3 className="text-xl font-semibold">Create</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <Form action={clientAction}>
          <SubmitButton>Create</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Already have an account? "}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {" instead."}
          </p>
        </Form>
      </div>
    </div>
  );
}
