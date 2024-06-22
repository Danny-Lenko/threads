"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import colors from "tailwindcss/colors";
import { Tag } from "lucide-react";

import { RequestTag as TagType } from "@/lib/models/request.model";

interface Props {
  tag: TagType;
}

export function RequestTag({ tag }: Props) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const paramsTag = params.get("tag");

  const tagSortApplied = paramsTag === tag;

  const pathname = usePathname();
  const { replace } = useRouter();

  const tagColor =
    tag === "new"
      ? "text-green-700"
      : tag === "revision"
      ? "text-sky-700"
      : "text-yellow-600";

  const tagFill =
    tagSortApplied && tag === "new"
      ? colors.green[500]
      : tagSortApplied && tag === "revision"
      ? colors.sky[500]
      : tagSortApplied && tag === "resubmission"
      ? colors.yellow[400]
      : "";

  function handleTagClick() {
    if (tagSortApplied) {
      params.delete("tag");
      return replace(`${pathname}?${params.toString()}`);
    }
    params.set("tag", tag);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      title={tag.toString().charAt(0).toUpperCase() + tag.toString().slice(1)}
      className="absolute right-[calc(150rem/16)] cursor-pointer"
      onClick={handleTagClick}
    >
      <Tag className={tagColor} fill={tagFill} />
    </div>
  );
}
