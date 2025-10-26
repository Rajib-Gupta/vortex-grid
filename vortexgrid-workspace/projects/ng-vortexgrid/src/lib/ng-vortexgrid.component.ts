import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface GridColumn {
  field: string;
  headerName: string;
  sortable?: boolean;
}

@Component({
  selector: 'vortex-grid',
  templateUrl: './ng-vortexgrid.component.html',
  styleUrls: ['./ng-vortexgrid.component.css'],
  standalone: false
})
export class VortexGridTableComponent {
  @Input() columns: GridColumn[] = [];
  @Input() rowData: any[] = [];
  @Input() pagination: boolean = false;
  @Input() pageSize: number = 10;
  @Input() toolbarOptions: Array<'save' | 'reset' | 'export' | 'filter'> = ['save', 'reset', 'export'];
  @Input() toolbarBackgroundColor: string[] = ['#0078efff', '#177c12ff', '#dd3c10ff'];
  @Input() toolbarTextColor: string[] = ['#fff', '#fff', '#fff'];
  @Input() selectedRowIdxColor: string = '#c8e6c9';
  @Input() enableDragDrop: boolean = true;
  @Input() paginationColor: string = '#1976d2';
  @Input() paginationShape: 'pill' | 'square' = 'pill';
  @Input() paginationSize: 'sm' | 'md' | 'lg' = 'md';

  @Output() rowClick = new EventEmitter<{ row: any, idx: number }>();

  selectedRowIdx: number | null = null;
  page: number = 1;
  sort: { field: string, direction: 'asc' | 'desc' } | null = null;
  draggedIdx: number | null = null;
  draggedColIdx: number | null = null;

  get currentPageSize(): number {
    return this.pageSize || this.rowData.length;
  }

  get pagedData(): any[] {
    if (!this.pagination) return this.rowData;
    const startIdx = (this.page - 1) * this.currentPageSize;
    const endIdx = startIdx + this.currentPageSize;
    return this.rowData.slice(startIdx, endIdx);
  }
      getTotalPages(): number {
        return Math.ceil(this.rowData.length / this.currentPageSize);
      }

      getPagesArray(): number[] {
        return Array(this.getTotalPages()).fill(0).map((_, i) => i + 1);
      }

      isLastPage(): boolean {
        return this.page >= this.getTotalPages();
      }

      isFirstPage(): boolean {
        return this.page <= 1;
      }

  onRowClick(row: any, idx: number) {
    this.selectedRowIdx = idx;
    this.rowClick.emit({ row, idx });
  }

  setPage(p: number) {
    this.page = p;
  }

  handleSort(field: string) {
    const col = this.columns.find(c => c.field === field);
    if (!col?.sortable) return;
    if (!this.sort || this.sort.field !== field) {
      this.sort = { field, direction: 'asc' };
    } else {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    }
    this.rowData = [...this.rowData].sort((a, b) => {
      if (a[field] < b[field]) return this.sort!.direction === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return this.sort!.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
