import { Extension } from "@tiptap/core";
import { Mark, mergeAttributes } from "@tiptap/core";

const DiffAdded = Mark.create({
  name: "diffAdded",
  parseHTML: () => {
    return [{ tag: "span.diff-added" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { class: "diff-added" }),
      0,
    ];
  },
});

const DiffRemoved = Mark.create({
  name: "diffRemoved",
  parseHTML: () => {
    return [{ tag: "span.diff-removed" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { class: "diff-removed" }),
      0,
    ];
  },
});

export const Diff = Extension.create({
  name: "diff",

  addExtensions() {
    return [DiffAdded, DiffRemoved];
  },
});
