import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function ProfileLoadingState() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-md">
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row">
          <Skeleton className="h-28 w-28 rounded-full" />
          <div className="flex-1 space-y-4">
            <Skeleton className="h-7 w-64" />
            <Skeleton className="h-4 w-40" />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} className="h-28 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
