import { create } from "zustand";
import { produce } from "immer";

interface EditorState {
  markdownText: string;
  title: string;
}

interface EditorActions {
  setMarkdownText: (markdownText: string) => void;
  setTitle: (title: string) => void;
  reset: () => void;
}

export const useEditorStore = create<EditorState & EditorActions>((set) => ({
  markdownText: "",
  title: "",
  setMarkdownText: (markdownText) =>
    set(
      produce((draft) => {
        draft.markdownText = markdownText;
      })
    ),
  setTitle: (title) =>
    set(
      produce((draft) => {
        draft.title = title;
      })
    ),
  reset: () =>
    set(
      produce((draft) => {
        draft.markdownText = "";
        draft.title = "";
      })
    ),
}));
