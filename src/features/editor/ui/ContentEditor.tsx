"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { Placeholder } from "@tiptap/extensions";
import StarterKit from "@tiptap/starter-kit";
import Typography from "@tiptap/extension-typography";
import Highlight from "@tiptap/extension-highlight";
import { Markdown } from "@tiptap/markdown";

export default function ContentEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      Typography,
      Highlight,
      Markdown,
    ],
    immediatelyRender: false,
  });

  return <EditorContent editor={editor} />;
}
