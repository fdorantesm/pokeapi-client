export type Pagination<T> = {
  docs: T[];
  total: number;
  limit: number;
  offset?: number;
  page: number;
  pages: number;
  prevPage?: number | null;
  nextPage?: number | null;
  hasMore: boolean;
};
