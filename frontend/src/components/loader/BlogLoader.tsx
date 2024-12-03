import { Skeleton } from "../ui/skeleton";

function BlogLoader() {
  return (
    <div className="w-[98%] md:w-[90%] grid gap-4 p-4 border rounded-md">
      <div className="flex space-x-2">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="w-36 h-4" />
      </div>
      <Skeleton className="w-[90%] h-6" />
      <Skeleton className="w-44 h-3" />
      <Skeleton className="w-[90%] h-4" />
      <Skeleton className="w-[60%] h-4" />
      <Skeleton className="w-[50%] h-4" />
      <Skeleton className="w-[90%] h-4" />
      <Skeleton className="w-[70%] h-4" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-[80%] h-4" />
    </div>
  );
}

export default BlogLoader;
