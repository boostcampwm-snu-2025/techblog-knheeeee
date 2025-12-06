import {
  ContentEditor,
  ContentPreview,
  PostTitleInput,
} from "@/features/editor";
import EditorActionBar from "@/features/editor/ui/EditorActionBar";
import Divider from "@/shared/ui/Divider";

export default function Write() {
  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full max-w-1/2 h-full">
        <div className="flex flex-col gap-8 px-8 py-6 flex-1 overflow-y-auto">
          <PostTitleInput />
          <Divider />
          <ContentEditor />
        </div>
        <EditorActionBar />
      </div>
      <ContentPreview />
    </div>
  );
}
