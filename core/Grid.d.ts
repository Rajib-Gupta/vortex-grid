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
export declare class Grid {
    private options;
    private currentPage;
    private filteredData;
    private sortedData;
    constructor(options: GridOptions);
    sort(field: string, direction: 'asc' | 'desc'): void;
    filter(field: string, value: any): void;
    getPage(page: number): any[];
}
//# sourceMappingURL=Grid.d.ts.map