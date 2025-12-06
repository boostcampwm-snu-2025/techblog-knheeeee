"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Placeholder } from "@tiptap/extensions";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { BubbleMenu } from "@tiptap/react/menus";
import { Button } from "@/shared/ui/button";
import { ButtonGroup } from "@/shared/ui/button-group";

import { useEditorStore } from "../model/editorStore";

export default function ContentEditor() {
  const { setMarkdownText } = useEditorStore();
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
    ],
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setMarkdownText(editor.getText());
    },
  });

  return (
    <>
      {editor && (
        <BubbleMenu editor={editor}>
          <ButtonGroup>
            <Button variant="outline" onClick={() => {}}>
              표현 다듬기
            </Button>
            <Button variant="outline" onClick={() => {}}>
              AI에게 질문하기
            </Button>
          </ButtonGroup>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </>
  );
}
