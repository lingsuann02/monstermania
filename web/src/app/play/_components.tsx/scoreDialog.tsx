import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MonsterState } from "@/types";

export const ScoreDialog = ({ logs }: { logs?: MonsterState[] }) => {
  if (!logs || !logs?.length) {
    return null;
  }

  const firstLog = logs[0];
  const lastLog = logs[logs.length - 1];

  return (
    <DialogContent className="overflow-y-scroll h-4/5">
      <DialogHeader>
        <DialogTitle>{firstLog.name}</DialogTitle>
        <DialogDescription className="text-left">
          <p>
            {`${firstLog.createdAt}`}
            <br />
            {`${firstLog.name} started the game with ${firstLog.prevHp} HP.`}
          </p>
          {logs.map((log) => {
            const hpChanged = Math.abs(
              log.hpLossDueToRound + log.hpLossDueToSnack,
            );
            const hasLostHp = 0 > log.hpLossDueToRound + log.hpLossDueToSnack;
            return (
              <p key={log.id} className="pt-2">
                {`${log.createdAt.toLocaleString()}`}
                <br />
                {`${hasLostHp ? "Lost" : "Gained"} ${hpChanged} HP. `}
                {`New HP is ${log.hp}.`}
              </p>
            );
          })}
          {!lastLog.hp && (
            <p className="pt-2">
              {`${lastLog.createdAt}`}
              <br />
              {`${lastLog.name} fainted!`}
            </p>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};
