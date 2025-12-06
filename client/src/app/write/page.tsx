import { ContentEditor, PostTitleInput } from "@/features/editor";
import EditorActionBar from "@/features/editor/ui/EditorActionBar";
import EditorSidePanel from "@/features/editor/ui/EditorSidePanel/EditorSidePanelTabs";
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
      <div className="w-1/2 h-full">
        <EditorSidePanel />
      </div>
    </div>
  );
}
