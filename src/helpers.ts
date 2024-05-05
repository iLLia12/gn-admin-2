export function toKebabCase(str: string) {
  return (
    str
      // Convert spaces and underscores to hyphens
      .replace(/[\s_]+/g, "-")
      // Remove all non-word characters except hyphen
      .replace(/[^a-zA-Z0-9-]/g, "")
      // Convert to lowercase
      .toLowerCase()
  );
}
