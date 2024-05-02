import { Press_Start_2P as FontSans } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Monster } from "@/types";
import { ReactNode } from "react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: "400",
});

export const MonsterCard = ({
  monster,
  onMonsterSelected,
  isSelected = false,
  isSelectable = false,
  className,
  children,
}: {
  monster: Monster;
  className?: string;
  onMonsterSelected?: (monster: Monster) => void;
  isSelected?: boolean;
  isSelectable?: boolean;
  children?: ReactNode;
}) => {
  return (
    <Button
      key={monster.name}
      onClick={() => {
        if (onMonsterSelected) {
          onMonsterSelected(monster);
        }
      }}
      variant={isSelectable ? "outline" : "ghost"}
      className={cn(
        "w-[300px] h-[300px] items-center justify-center m-2",
        isSelected && "ring-4 ring-amber-400 ring-offset-2",
        isSelectable
          ? "!cursor-pointer"
          : "!cursor-default bg-transparent hover:bg-transparent border-0",
        className
      )}
    >
      <div className="w-full h-full p-2">
        <h3 className="font-bold text-xl my-5">{monster.name}</h3>
        <div className="whitespace-pre text-xs">
          <span style={{ color: `#${monster.color}` }}>{monster.type}</span>
        </div>
        {children}
      </div>
    </Button>
  );
};
