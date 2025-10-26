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
  @Input() toolbarOptions: Array<{name: string, icon?: string, style?: any, onClick?: () => void}> = [
    {
      name: 'save',
      icon: 'Save Order',
      style: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #0078efff',
        color: '#fff',
        background: '#0078efff',
        fontWeight: 500,
        cursor: 'pointer'
      },
      onClick: undefined
    },
    {
      name: 'reset',
      icon: 'Reset Order',
      style: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #177c12ff',
        color: '#fff',
        background: '#177c12ff',
        fontWeight: 500,
        cursor: 'pointer'
      },
      onClick: undefined
    },
    {
      name: 'export',
      icon: 'Export CSV',
      style: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #dd3c10ff',
        color: '#fff',
        background: '#dd3c10ff',
        fontWeight: 500,
        cursor: 'pointer'
      },
      onClick: undefined
    },
    {
      name: 'filter',
      icon: 'Filter',
      style: {
        padding: '8px 16px',
        borderRadius: '4px',
        border: '1px solid #555555ff',
        color: '#fff',
        background: '#555555ff',
        fontWeight: 500,
        cursor: 'pointer'
      },
      onClick: undefined
    }
  ];
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

  get showPagination(): boolean {
    return this.pagination && this.rowData.length > this.currentPageSize;
  }

  getPagedData(): any[] {
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

  saveOrder() {
    localStorage.setItem('gridkit-row-order', JSON.stringify(this.rowData.map(d => d.id)));
    localStorage.setItem('gridkit-column-order', JSON.stringify(this.columns.map(c => c.field)));
  }

  resetOrder() {
    localStorage.removeItem('gridkit-row-order');
    localStorage.removeItem('gridkit-column-order');
    window.location.reload();
  }

  exportCsv() {
    const csvRows: string[] = [];
    csvRows.push(this.columns.map((col: GridColumn) => col.headerName).join(','));
    this.rowData.forEach((row: any) => {
      csvRows.push(this.columns.map((col: GridColumn) => JSON.stringify(row[col.field] ?? '')).join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'grid-data.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
