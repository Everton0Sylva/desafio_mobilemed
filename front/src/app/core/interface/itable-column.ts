export interface ITableColumn<T = any> {
  key: Extract<keyof T, string>;
  header: string;
  sortable?: boolean;
  type?: 'doc' | 'fone' | 'date' | 'cidade';
}
