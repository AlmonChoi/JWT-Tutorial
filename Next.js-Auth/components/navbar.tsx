import Image from "next/image";
import React from "react";
import Link from "next/link";
import logo from "@/public/next.svg";
import { auth, signOut } from "lib/auth";


const Header = async () => {
  const session = await auth();
  let isLoggedIn = false;
  if (session?.user?.email) {
    isLoggedIn = true;
  }


  return (
    <>
      <div className="w-full h-10 bg-gray-100 sticky top-0">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/">
              <Image
                src={logo}
                alt="logo"
                sizes="100vw"
                priority={true}
                style={{ width: "40%", height: "auto" }}
              />
            </Link>

            <ul className="hidden md:flex gap-x-6 text-black">
              {isLoggedIn ? (
                <>
                  <li>
                    <SignOut />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href="/login">
                      <p>Login</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/create">
                      <p>Create</p>
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/secured">
                  <p>Secured</p>
                </Link>
              </li>
              <li>
                <Link href="/protected">
                  <p>Protected</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
