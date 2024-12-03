import { Skeleton } from "@/components/ui/skeleton";

function HomePageLoader() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-[98%] md:[95%]">
      {Array.from({ length: 12 }).map((_, i) => (
        <div className="flex flex-col space-y-2 border rounded-md p-4" key={i}>
          <div className="flex space-x-2">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-36 h-4" />
          </div>
          <div className="flex flex-col space-y-6">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-[90%] h-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default HomePageLoader;
