import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MonsterWithHp, Settings } from "@/types";

export const HpBar = ({
  monster,
  settings,
}: {
  monster: MonsterWithHp;
  settings: Settings;
}) => {
  const hpAsPercentage =
    monster.hp >= settings.startingHp
      ? 100
      : (monster.hp / settings.startingHp) * 100;

  const currentStatus = monster.hp === 0 && "Fainted";

  return (
    <div className="w-full px-5 relative mb-2 mt-6">
      <Progress className="h-7" value={hpAsPercentage}></Progress>
      <div className="absolute inset-0 h-7 w-full text-center text-white">
        <div className="flex h-full w-full items-center justify-center">
          {currentStatus ? (
            currentStatus
          ) : (
            <>
              {monster.hp}/{settings.startingHp}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
