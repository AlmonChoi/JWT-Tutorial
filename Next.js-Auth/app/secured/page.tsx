import { auth } from "lib/auth";

export default async function SecuredPage() {
  let session = await auth();

  return (
    <div className="flex h-[calc(100vh-40px)] bg-gray-400">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center text-white">
        This is Secured Page and You are logged in as {session?.user?.email}
      </div>
    </div>
  );
}
