"use client";

import { type Editor } from "@tiptap/core";
import { BubbleMenu } from "@tiptap/react/menus";
import { useCallback, useEffect, useState } from "react";
import { diffToHtml } from "../../diffText";
import { SwitchCase } from "@/shared/ui/SwitchCase";
import { ButtonGroup } from "@/shared/ui/button-group";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";
import type { AiStatus } from "../AITool";

function IdleMenu({ onImprove }: { onImprove: () => void }) {
  return (
    <ButtonGroup>
      <Button variant="outline" onClick={onImprove}>
        표현 다듬기
      </Button>
      <Button variant="outline">AI에게 질문하기</Button>
    </ButtonGroup>
  );
}

function LoadingMenu() {
  return (
    <div className="px-4 py-2 text-sm text-gray-500 flex gap-2 items-center bg-white border rounded-md">
      <Spinner />
      AI가 문장을 교정하는 중...
    </div>
  );
}

function ResultMenu({
  onAccept,
  onDiscard,
}: {
  onAccept: () => void;
  onDiscard: () => void;
}) {
  return (
    <ButtonGroup>
      <Button onClick={onAccept}>Accept</Button>
      <Button variant="outline" onClick={onDiscard}>
        Discard
      </Button>
    </ButtonGroup>
  );
}

export function AIToolMenu({ editor }: { editor: Editor }) {
  const [status, setStatus] = useState<AiStatus>(
    editor.storage.aiTool?.status ?? "idle"
  );

  useEffect(() => {
    const handler = () => {
      setStatus(editor.storage.aiTool.status);
    };

    editor.on("transaction", handler);
    return () => {
      editor.off("transaction", handler);
    };
  }, [editor]);

  const handleImproveClick = useCallback(async () => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    if (from === to) return;

    const selected = editor.state.doc.textBetween(from, to, "\n");
    if (!selected) return;

    editor.commands.aiSetStatus("loading");

    try {
      const res = await fetch("/api/editor/improve", {
        method: "POST",
        body: JSON.stringify({ text: selected }),
      });

      const data = await res.json();
      const improved = (data.improvedText as string | undefined)?.trim();

      if (!improved || improved.length === 0) {
        editor.commands.aiSetStatus("idle");
        return;
      }

      const diffHtml = diffToHtml(selected, improved);

      editor.commands.aiApplyDiff({
        from,
        to,
        originalText: selected,
        improvedText: improved,
        diffHtml,
      });
    } catch (e) {
      console.error(e);
      editor.commands.aiSetStatus("idle");
    }
  }, [editor]);

  const handleAccept = useCallback(() => {
    if (!editor) return;
    editor.commands.aiAcceptDiff();
  }, [editor]);

  const handleDiscard = useCallback(() => {
    if (!editor) return;
    editor.commands.aiDiscardDiff();
  }, [editor]);

  const shouldShow = editor.state.selection.from !== editor.state.selection.to;

  if (!shouldShow) {
    return null;
  }

  return (
    <BubbleMenu editor={editor}>
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
