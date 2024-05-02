import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-medium">Monster Mania</h1>
        <p className="text-3xl mb-20">(づ｡◕‿‿◕｡)づ</p>
      </div>
      <div className="flex flex-col w-full">
        <Link passHref className="mx-auto" href="/new">
          <Button className="text-2xl mb-5 py-6 w-56">New Game</Button>
        </Link>
        <Link passHref className="mx-auto" href="/games">
          <Button className="text-2xl mb-5 py-6 w-56">Load Game</Button>
        </Link>
      </div>
    </>
  );
}
