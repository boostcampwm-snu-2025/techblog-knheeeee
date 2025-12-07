import diff from "fast-diff";

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function diffToHtml(original: string, improved: string) {
  const diffs = diff(original, improved);
  console.log(diffs);

  const htmlParts = diffs.map(([type, text]) => {
    if (type === 0) {
      return `<span>${escapeHtml(text)}</span>`;
    }

    if (type === -1) {
      return `<span class="diff-removed">${escapeHtml(text)}</span>`;
    }
    if (type === 1) {
      return `<span class="diff-added">${escapeHtml(text)}</span>`;
    }

    return "";
  });

  return htmlParts.join("");
}
