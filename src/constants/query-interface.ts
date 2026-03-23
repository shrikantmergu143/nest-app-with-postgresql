export interface QueryOptions<T> {
  sortBy?: keyof T;
  order?: 'ASC' | 'DESC';
}
