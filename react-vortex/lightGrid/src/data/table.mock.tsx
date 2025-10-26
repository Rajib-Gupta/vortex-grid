import type { GridColumn } from "../../../../core/Grid";

// Mock table data
export const mockColumns: GridColumn[] = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'age', headerName: 'Age', sortable: true },
  { field: 'country', headerName: 'Country', sortable: true }
];

export const mockRowData: any[] = [
  { id: 1, name: 'Alice', age: 30, country: 'USA' },
  { id: 2, name: 'Bob', age: 25, country: 'Canada' },
  { id: 3, name: 'Charlie', age: 35, country: 'UK' },
  { id: 4, name: 'Diana', age: 28, country: 'Australia' },
  { id: 5, name: 'Eve', age: 22, country: 'India' },
  { id: 6, name: 'Frank', age: 40, country: 'Germany' },
  { id: 7, name: 'Grace', age: 27, country: 'France' },
  { id: 8, name: 'Hank', age: 33, country: 'Italy' },
  { id: 9, name: 'Ivy', age: 29, country: 'Spain' },
  { id: 10, name: 'Jack', age: 31, country: 'Netherlands' },
  { id: 11, name: 'Kathy', age: 26, country: 'Sweden' },
  { id: 12, name: 'Leo', age: 38, country: 'Norway' },
  { id: 13, name: 'Mona', age: 24, country: 'Denmark' },
  { id: 14, name: 'Nate', age: 36, country: 'Finland' },
  { id: 15, name: 'Olivia', age: 23, country: 'Switzerland' }
];