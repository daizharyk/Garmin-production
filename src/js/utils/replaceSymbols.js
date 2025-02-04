export function replaceSymbols(text) {
  if (!text) return "";
  return text
    .replace(/®/g, '<sup class="registered">®</sup>')
    .replace(/™/g, '<sup class="trademark2">™</sup>');
}
