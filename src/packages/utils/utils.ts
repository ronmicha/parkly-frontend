type SortOrder = "asc" | "desc";

export const sortBy = <T = Record<string, unknown>>(
  collection: T[],
  field: keyof T,
  order: SortOrder = "asc"
): T[] => {
  const sortFn = (a: T, b: T) => {
    if (a[field] < b[field]) return -1;
    if (a[field] > b[field]) return 1;
    return 0;
  };

  return [...collection].sort((a, b) =>
    order === "asc" ? sortFn(a, b) : sortFn(b, a)
  );
};
