import { Skeleton } from "@/components/ui/skeleton";

export const MonstersSkeleton = () => {
  return (
    <>
      <Skeleton className="w-72 h-72 flex flex-col items-center m-2"></Skeleton>
      <Skeleton className="w-72 h-72 flex flex-col items-center m-2"></Skeleton>
      <Skeleton className="w-72 h-72 flex flex-col items-center m-2"></Skeleton>
      <Skeleton className="w-72 h-72 flex flex-col items-center m-2"></Skeleton>
      <Skeleton className="w-72 h-72 flex flex-col items-center m-2"></Skeleton>
      <Skeleton className="w-72 h-72 flex flex-col items-center m-2"></Skeleton>
    </>
  );
};
