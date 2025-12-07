"use client";

import { cn } from "@/shared/ui/lib/utils";
import { useEditorStore } from "../model/editorStore";

interface PostTitleInputProps {
  className?: string;
}

export default function PostTitleInput({ className }: PostTitleInputProps) {
  const { title, setTitle } = useEditorStore();
  return (
    <input
      type="text"
      placeholder="제목을 입력하세요"
      className={cn(
        "border-none outline-none font-black p-0 h-auto text-4xl",
        className
      )}
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
