import { Extension } from "@tiptap/core";

export type AiStatus = "idle" | "loading" | "result";

interface AiToolStorage {
  status: AiStatus;
  originalText: string | null;
  improvedText: string | null;
  diffFrom: number | null;
  diffTo: number | null;
}

interface AiApplyDiffOptions {
  from: number;
  to: number;
  originalText: string;
  improvedText: string;
  diffHtml: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiTool: {
      aiSetStatus: (status: AiStatus) => ReturnType;
      aiApplyDiff: (options: AiApplyDiffOptions) => ReturnType;
      aiAcceptDiff: () => ReturnType;
      aiDiscardDiff: () => ReturnType;
      aiReset: () => ReturnType;
    };
  }

  interface Storage {
    aiTool: AiToolStorage;
  }
}

export const AITool = Extension.create({
  name: "aiTool",

  addStorage(): AiToolStorage {
    return {
      status: "idle",
      originalText: null,
      improvedText: null,
      diffFrom: null,
      diffTo: null,
    };
  },

  addCommands() {
    return {
      aiSetStatus:
        (status: AiStatus) =>
        ({ editor }) => {
          editor.storage.aiTool.status = status;
          editor.view.dispatch(editor.state.tr);
          return true;
        },

      aiApplyDiff:
        ({
          from,
          to,
          originalText,
          improvedText,
          diffHtml,
        }: AiApplyDiffOptions) =>
        ({ editor }) => {
          const storage = editor.storage.aiTool;

          storage.status = "result";
          storage.originalText = originalText;
          storage.improvedText = improvedText;

          editor
            .chain()
            .focus()
            .setTextSelection({ from, to })
            .deleteSelection()
            .insertContent(diffHtml)
            .run();

          const { from: diffFrom, to: diffTo } = editor.state.selection;
          storage.diffFrom = diffFrom;
          storage.diffTo = diffTo;

          editor.view.dispatch(editor.state.tr);

          return true;
        },

      aiAcceptDiff:
        () =>
        ({ editor }) => {
          const storage = editor.storage.aiTool;
          const { diffFrom, diffTo, improvedText } = storage;

          if (
            improvedText == null ||
            diffFrom == null ||
            diffTo == null ||
            diffFrom === diffTo
          ) {
            return false;
          }

          editor
            .chain()
            .focus()
            .setTextSelection({ from: diffFrom, to: diffTo })
            .deleteSelection()
            .insertContent(improvedText)
            .run();

          storage.status = "idle";
          storage.originalText = null;
          storage.improvedText = null;
          storage.diffFrom = null;
          storage.diffTo = null;

          editor.view.dispatch(editor.state.tr);

          return true;
        },

      aiDiscardDiff:
        () =>
        ({ editor }) => {
          const storage = editor.storage.aiTool;
          const { diffFrom, diffTo, originalText } = storage;

          if (
            originalText == null ||
            diffFrom == null ||
            diffTo == null ||
            diffFrom === diffTo
          ) {
            return false;
          }

          editor
            .chain()
            .focus()
            .setTextSelection({ from: diffFrom, to: diffTo })
            .deleteSelection()
            .insertContent(originalText)
            .run();

          storage.status = "idle";
          storage.originalText = null;
          storage.improvedText = null;
          storage.diffFrom = null;
          storage.diffTo = null;

          editor.view.dispatch(editor.state.tr);

          return true;
        },

      aiReset:
        () =>
        ({ editor }) => {
          const storage = editor.storage.aiTool;
          storage.status = "idle";
          storage.originalText = null;
          storage.improvedText = null;
          storage.diffFrom = null;
          storage.diffTo = null;

          editor.view.dispatch(editor.state.tr);

          return true;
        },
    };
  },
});
