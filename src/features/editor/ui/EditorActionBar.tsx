import { Button } from "@/shared/ui/button";

export default function EditorActionBar() {
  return (
    <div className="flex justify-between items-center px-8 py-6 h-fit border-t border-gray-200">
      <Button variant="outline">나가기</Button>
      <div className="flex gap-2">
        <Button variant="outline">임시저장</Button>
        <Button variant="default">출간하기</Button>
      </div>
    </div>
  );
}
