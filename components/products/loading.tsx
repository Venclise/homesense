import { Skeleton } from "@/components/ui/skeleton";

export default function Loading({ length }: { length: number }) {
  return (
    <div className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 lg:gap-5 lg:p-10 ">
      {Array.from({ length: length }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl   p-3 space-y-3 h-[22rem]  flex flex-col items-center justify-center"
        >
          <Skeleton className="h-[80%] w-full rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      ))}
    </div>
  );
}
