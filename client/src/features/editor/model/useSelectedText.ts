import { Editor } from "@tiptap/react";

export function useSelectedText(editor: Editor | null) {
  return () => {
    if (!editor) return "";
    const { from, to } = editor.state.selection;
    return editor.state.doc.textBetween(from, to, "\n");
  };
}
