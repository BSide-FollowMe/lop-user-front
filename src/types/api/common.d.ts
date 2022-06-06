export interface ListResponse<T> {
  data: T[];
  size: number;
  page: number;
  totalPage: number;
  totalElement: number;
}
