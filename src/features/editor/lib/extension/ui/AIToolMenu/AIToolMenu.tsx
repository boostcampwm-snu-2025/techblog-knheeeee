import { type Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react/menus";
import { SwitchCase } from "@/shared/ui/SwitchCase";
import { IdleMenu } from "./IdleMenu";
import { LoadingMenu } from "./LoadingMenu";
import { ResultMenu } from "./ResultMenu";
import { useAIToolMenuController } from "../../hooks/useAIToolMenuController";

export function AIToolMenu({ editor }: { editor: Editor }) {
  const {
    status,
    bubbleMenuRef,
    handleImproveClick,
    handleAccept,
    handleDiscard,
  } = useAIToolMenuController(editor);

  return (
    <BubbleMenu editor={editor} ref={bubbleMenuRef}>
      <SwitchCase
        value={status}
        caseBy={{
          idle: <IdleMenu onImprove={handleImproveClick} />,
          loading: <LoadingMenu />,
          result: (
            <ResultMenu onAccept={handleAccept} onDiscard={handleDiscard} />
          ),
        }}
        default={<IdleMenu onImprove={handleImproveClick} />}
      />
    </BubbleMenu>
  );
}
