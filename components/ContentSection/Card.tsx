import { badgeVariants } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

export const Card = function ({
  prompt,
  user,
  tags,
  postedAt,
  createdBy,
}: {
  prompt: string;
  user: string;
  postedAt: string;
  tags: string[];
  createdBy: string;
}) {
  return (
    <div className="w-full mb-3 mx-auto border p-3 rounded-md break-inside-avoid shadow-sm">
      <div className="flex space-x-4">
        <Link href={`/user/${createdBy}`}>
          <Image
            className={`w-12 h-12 rounded-full`}
            src={`https://picsum.photos/200`}
            width={50}
            height={50}
            alt={user}
          />
        </Link>

        <div className="space-y-1 flex-1">
          <Link href={`/user/${createdBy}`}>
            <h4 className="text-sm font-semibold break-all">@{user}</h4>
          </Link>

          <p className="text-sm text-slate-800 dark:text-slate-400">{prompt}</p>

          <div className="flex items-center pt-2">
            <span className="text-xs text-muted-foreground">
              Posted {postedAt}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center flex-wrap gap-x-2 gap-y-1.5 text-sm">
        {tags.map((tag, index) => (
          <Link
            key={index}
            href={`/`}
            className={badgeVariants({ variant: "secondary" })}
          >
            #{tag}
          </Link>
        ))}
      </div>
    </div>
  );
};
