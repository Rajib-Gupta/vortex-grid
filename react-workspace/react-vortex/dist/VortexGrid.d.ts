import React from "react";
export interface GridColumn {
    field: string;
    headerName: string;
    sortable?: boolean;
    filterable?: boolean;
}
export interface VortexGridProps {
    /** Pagination color (default: #1976d2) */
    paginationColor?: string;
    /** Pagination shape: 'pill' | 'square' (default: 'pill') */
    paginationShape?: "pill" | "square";
    /** Pagination size: 'sm' | 'md' | 'lg' (default: 'md') */
    paginationSize?: "sm" | "md" | "lg";
    /** Custom pagination renderer */
    paginationRenderer?: (props: {
        page: number;
        pageCount: number;
        setPage: (p: number) => void;
    }) => React.ReactNode;
    /** Enable drag-and-drop for rows and columns */
    enableDragDrop?: boolean;
    columns: GridColumn[];
    rowData: any[];
    pagination?: boolean;
    pageSize?: number;
    className?: string;
    style?: React.CSSProperties;
    toolbar?: React.ReactNode;
    toolbarColor?: string;
    toolbarOptions?: Array<{
        name: string;
        icon?: React.ReactNode;
        style?: React.CSSProperties;
        onClick?: () => void;
    }>;
    selectedRowIdxColor?: string;
    onRowClick?: (row: any, idx: number) => void;
}
export declare const VortexGridReact: React.FC<VortexGridProps>;
//# sourceMappingURL=VortexGrid.d.ts.map