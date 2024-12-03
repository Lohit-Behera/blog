import { cn } from "@/lib/utils";

function Avatar({ className, latter }: { className?: string; latter: string }) {
  return (
    <div
      className={cn(
        "w-10 h-10 bg-muted rounded-full flex justify-center items-center cursor-default",
        className
      )}
    >
      {latter}
    </div>
  );
}

export default Avatar;
