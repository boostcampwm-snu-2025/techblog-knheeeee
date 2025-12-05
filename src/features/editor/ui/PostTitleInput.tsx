import { cn } from "@/shared/lib/utils";

interface PostTitleInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function PostTitleInput({
  className,
  value,
  onChange,
}: PostTitleInputProps) {
  return (
    <input
      type="text"
      placeholder="제목을 입력하세요"
      className={cn(
        "border-none outline-none font-black p-0 h-auto text-4xl",
        className
      )}
      value={value}
      onChange={onChange}
    />
  );
}
