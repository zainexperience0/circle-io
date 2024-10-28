import { initialCommunity } from "@/actions/community";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { init } from "next/dist/compiled/webpack/webpack";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export const Navbar = async () => {
  const community = await initialCommunity();
  const user = await currentUser();
  return (
    <header className="h-20 sticky top-0 bg-white w-full border-b-2 border-slate-200 px-4">
      <div className="mx-auto flex h-full w-full items-center justify-between lg:max-w-screen-lg">
        <Link href={"/"} className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image
            src={"/logo.png"}
            alt="logo"
            height={40}
            width={40}
            className="bg-purple-700 rounded-md"
          />
          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            Arloo.co
          </h1>
        </Link>
        <div className="flex gap-x-3">
          <Link
            href={"https://github.com/zainexperience0"}
            target="_blank"
            rel="noreferrer noopener"
            className="pt-1"
          >
            <FaGithub className="h-8 w-8" />
          </Link>
          {user ? (
            <>
              <Avatar>
                <AvatarImage src={`${user.image}`} />
                <AvatarFallback>
                  {user.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {community && (
                <Link
                  href={
                    community
                      ? `/community/${community.url}/getting-started`
                      : "/community/create"
                  }
                >
                  <Button variant={"sidebarOutline"}>Enter</Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href={"/auth/sign-in"}>
                <Button variant={"primary"}>Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
