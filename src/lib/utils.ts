export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(text: string, max = 158) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
}
