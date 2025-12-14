import { Spinner } from "@/shared/ui/spinner";

export function LoadingMenu() {
  return (
    <div className="px-4 py-2 text-sm text-gray-500 flex gap-2 items-center bg-white border rounded-md">
      <Spinner />
      AI가 문장을 교정하는 중...
    </div>
  );
}
