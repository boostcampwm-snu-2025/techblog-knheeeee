import { Editor, Extension } from "@tiptap/core";
import { diffToHtml } from "../diffText";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiTool: {
      improveSelection: () => ReturnType;
      acceptDiff: () => ReturnType;
      discardDiff: () => ReturnType;
    };
  }

  interface Storage {
    aiTool: {
      status: "idle" | "loading" | "result";
      diffHtml: string | null;
      originalText: string | null;
      improvedText: string | null;
    };
  }
}

export const AITool = Extension.create({
  name: "aiTool",

  addStorage() {
    return {
      status: "idle",
      diffHtml: null,
      originalText: null,
      improvedText: null,
      range: null,
    };
  },

  addCommands() {
    return {
      improveSelection:
        () =>
        ({ editor }: { editor: Editor }) => {
          (async () => {
            const { from, to } = editor.state.selection;
            const selected = editor.state.doc.textBetween(from, to, "");

            if (!selected) return;

            editor.storage.aiTool.status = "loading";

            editor.storage.aiTool.originalText = selected;
            editor.storage.aiTool.diffHtml = null;

            const improvedText = await fetch("/api/editor/improve", {
              method: "POST",
              body: JSON.stringify({ text: selected }),
            })
              .then((r) => r.json())
              .then((r) => r.improvedText);

            if (!improvedText) return;
            const diffHtml = diffToHtml(selected, improvedText);

            editor
              .chain()
              .focus()
              .deleteSelection()
              .insertContent(diffHtml)
              .run();

            const end = editor.state.selection.$to.pos;
            editor.commands.setTextSelection({ from, to: end });

            editor.storage.aiTool.status = "result";
            editor.storage.aiTool.diffHtml = diffHtml;
            editor.storage.aiTool.improvedText = improvedText;
          })();

          return true;
        },

      acceptDiff:
        () =>
        ({ editor }: { editor: Editor }) => {
          const improvedText = editor.storage.aiTool.improvedText;

          if (!improvedText) return false;

          const { from, to } = editor.state.selection;

          editor
            .chain()
            .focus()
            .setTextSelection({ from, to })
            .deleteSelection()
            .insertContent(improvedText)
            .run();

          editor.storage.aiTool.status = "idle";
          editor.storage.aiTool.diffHtml = null;
          editor.storage.aiTool.improvedText = null;

          return true;
        },

      discardDiff:
        () =>
        ({ editor }: { editor: Editor }) => {
          const originalText = editor.storage.aiTool.originalText;
          if (!originalText) return false;

          editor.chain().focus().insertContent(originalText).run();

          editor.storage.aiTool.status = "idle";
          editor.storage.aiTool.diffHtml = null;
          editor.storage.aiTool.improvedText = null;

          return true;
        },
    };
  },
});
