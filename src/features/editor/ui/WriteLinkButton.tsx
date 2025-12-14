import { Button } from "@/shared/ui/button";
import Link from "next/link";

export function WriteLinkButton() {
  return (
    <Button asChild>
      <Link href="/write">글 쓰기</Link>
    </Button>
  );
}
