import { auth } from "lib/auth";

export default async function ProtectedPage() {
  let session = await auth();

  return (
    <div className="flex h-[calc(100vh-40px)] bg-slate-500">
      <div className="w-screen flex flex-col space-y-5 justify-center items-center text-white">
        This is Protected Page and You are logged in as {session?.user?.email}
      </div>
    </div>
  );
}
