// Core grid engine for mygrid
// This file defines the main Grid class and interfaces for data, sorting, filtering, and events.

export interface GridColumn {
  field: string;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
}

export interface GridOptions {
  columns: GridColumn[];
  rowData: any[];
  pagination?: boolean;
  pageSize?: number;
}

export interface GridEvent {
  type: string;
  payload?: any;
}

export class Grid {
  private options: GridOptions;
  private currentPage: number = 1;
  private filteredData: any[] = [];
  private sortedData: any[] = [];

  constructor(options: GridOptions) {
    this.options = options;
    this.filteredData = options.rowData;
    this.sortedData = options.rowData;
  }

  // Sorting
  sort(field: string, direction: 'asc' | 'desc') {
    this.sortedData = [...this.filteredData].sort((a, b) => {
      if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Filtering
  filter(field: string, value: any) {
    this.filteredData = this.options.rowData.filter(row => row[field] === value);
    this.sortedData = this.filteredData;
  }

  // Pagination
  getPage(page: number): any[] {
    if (!this.options.pagination || !this.options.pageSize) return this.sortedData;
    const start = (page - 1) * this.options.pageSize;
    return this.sortedData.slice(start, start + this.options.pageSize);
  }

  // Selection, events, etc. can be added here
}
