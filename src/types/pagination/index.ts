export type Pagination = {
  count: number;
  page: number;
  perPage: number;
  countPages: number;
};

export const PAGINATION_DEFAULT = {
  count: 0,
  perPage: 10,
  page: 1,
  countPages: 0,
};
