export interface BaseListDTO<T> {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
}
