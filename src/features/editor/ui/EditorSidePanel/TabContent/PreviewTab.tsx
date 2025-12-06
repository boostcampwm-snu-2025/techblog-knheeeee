"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import { useEffect } from "react";
import { useEditorStore } from "@/features/editor/model/editorStore";

export default function PreviewTab() {
  const { markdownText } = useEditorStore();

  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    immediatelyRender: false,
    editable: false,
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(markdownText, {
        contentType: "markdown",
      });
    }
  }, [markdownText, editor]);

  return <EditorContent editor={editor} />;
}
