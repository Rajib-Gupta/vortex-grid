import React, { useEffect, useState } from "react";
import { type GridColumn } from "../core/Grid";

export interface LightGridProps {
  /** Pagination color (default: #1976d2) */
  paginationColor?: string;
  /** Pagination shape: 'pill' | 'square' (default: 'pill') */
  paginationShape?: 'pill' | 'square';
  /** Pagination size: 'sm' | 'md' | 'lg' (default: 'md') */
  paginationSize?: 'sm' | 'md' | 'lg';
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
  toolbarOptions?: Array<"save" | "reset" | "export" | "filter">;
  toolbarBackgroundColor?: string[];
  toolbarTextColor?: string[];
  selectedRowIdxColor?: string;
  onRowClick?: (row: any, idx: number) => void;
}

export const LightGrid: React.FC<LightGridProps> = ({
  columns,
  rowData,
  pagination,
  pageSize,
  className,
  style,
  toolbar,
  toolbarBackgroundColor,
  toolbarTextColor,
  toolbarOptions,
  selectedRowIdxColor,
  onRowClick,
  enableDragDrop = true,
  paginationColor = '#1976d2',
  paginationShape = 'pill',
  paginationSize = 'md',
  paginationRenderer,
}) => {
  const [selectedRowIdx, setSelectedRowIdx] = useState<number | null>(null);
  const STORAGE_KEY_ROW_ORDER = "lightgrid-row-order";
  const COL_STORAGE_KEY = "lightgrid-column-order";
  const effectiveToolbarBackgroundColor = toolbarBackgroundColor ?? [
    "#0078efff",
    "#177c12ff",
    "#dd3c10ff",
  ];
  const effectiveToolbarTextColor = toolbarTextColor ?? [
    "#fff",
    "#fff",
    "#fff",
  ];
  const effectiveToolbarOptions = toolbarOptions ?? ["save", "reset", "export"];

  const initialColumnsOrder = React.useMemo(() => {
    const savedColOrder = localStorage.getItem(COL_STORAGE_KEY);
    if (savedColOrder) {
      try {
        const order = JSON.parse(savedColOrder);
        // Map saved order to columns, filter out any undefined
        const ordered = order
          .map((field: string) => columns.find((col) => col.field === field))
          .filter((col: any): col is GridColumn => !!col);
        // Add any new columns not in saved order
        const missing = columns.filter((col) => !order.includes(col.field));

        return [...ordered, ...missing];
      } catch {}
    }
    return columns;
  }, [columns]);

  // Memoize initial data order
  const initialData = React.useMemo(() => {
    const savedRowOrder = localStorage.getItem(STORAGE_KEY_ROW_ORDER);

    if (savedRowOrder) {
      try {
        const rowOrder = JSON.parse(savedRowOrder ?? "[]");
        return rowOrder
          .map((id: any) => rowData.find((row: any) => row.id === id))
          .filter(Boolean);
      } catch {
        return rowData;
      }
    }
    return rowData;
  }, [rowData]);

  const [data, setData] = useState<any[]>(initialData);
  const [columnsOrder, setColumnsOrder] =
    useState<GridColumn[]>(initialColumnsOrder);
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<{
    field: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [draggedColIdx, setDraggedColIdx] = useState<number | null>(null);
  const [currentPageSize, setCurrentPageSize] = useState<number>(
    pageSize || rowData.length
  ); // setCurrentPageSize is unused and can be removed if not needed

  // Sync columnsOrder with initialColumnsOrder when columns change or after refresh
  useEffect(() => {
    setColumnsOrder(initialColumnsOrder);
  }, [initialColumnsOrder]);

  // Only update data when rowData, page, or initialData changes
  useEffect(() => {
    let pageData = initialData;
    if (pagination) {
      const startIdx = (page - 1) * (currentPageSize ?? initialData.length);
      const endIdx = startIdx + (currentPageSize ?? initialData.length);
      pageData = initialData.slice(startIdx, endIdx);
    }
    setData(pageData);
  }, [page, initialData, pagination, currentPageSize]);

  // Row drag and drop handlers
  const onDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };
  const onDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };
  const onDrop = (idx: number) => {
    if (draggedIdx === null || draggedIdx === idx) return;
    const newData = [...data];
    const [removed] = newData.splice(draggedIdx, 1);
    newData.splice(idx, 0, removed);
    setData(newData);
    setDraggedIdx(null);
  };

  // Column drag and drop handlers
  const onColDragStart = (colIdx: number) => {
    setDraggedColIdx(colIdx);
  };
  const onColDragOver = (e: React.DragEvent<HTMLTableHeaderCellElement>) => {
    e.preventDefault();
  };
  const onColDrop = (colIdx: number) => {
    if (draggedColIdx === null || draggedColIdx === colIdx) return;
    const newOrder = [...columnsOrder];
    const [removed] = newOrder.splice(draggedColIdx, 1);
    newOrder.splice(colIdx, 0, removed);
    setColumnsOrder(newOrder);
    setDraggedColIdx(null);
  };

  // Sorting handler for column headers
  const handleSort = (field: string) => {
    if (!columns.find((col) => col.field === field)?.sortable) return;
    setSort((prev) => {
      if (!prev || prev.field !== field) {
        return { field, direction: "asc" };
      }
      return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
    });
    setData((prevData) => {
      const direction =
        sort?.field === field && sort?.direction === "asc" ? "desc" : "asc";
      const sorted = [...initialData].sort((a, b) => {
        if (a[field] < b[field]) return direction === "asc" ? -1 : 1;
        if (a[field] > b[field]) return direction === "asc" ? 1 : -1;
        return 0;
      });
      if (pagination) {
        const startIdx = (page - 1) * (currentPageSize ?? sorted.length);
        const endIdx = startIdx + (currentPageSize ?? sorted.length);
        return sorted.slice(startIdx, endIdx);
      }
      return sorted;
    });
  };

  return (
    <React.Fragment>
      <table className={className} style={style}>
        <thead>
          <tr>
            <td
              colSpan={columns.length}
              style={{ padding: "8px 0", textAlign: "right" }}
            >
              {React.isValidElement(toolbar) ? (
                toolbar
              ) : (
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "flex-end",
                  }}
                >
                  {effectiveToolbarOptions.includes("save") && (
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        border: `1px solid ${effectiveToolbarBackgroundColor[0]}`,
                        color: effectiveToolbarTextColor[0],
                        background: effectiveToolbarBackgroundColor[0],
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        localStorage.setItem(
                          STORAGE_KEY_ROW_ORDER,
                          JSON.stringify(data.map((d) => d.id))
                        );
                        localStorage.setItem(
                          COL_STORAGE_KEY,
                          JSON.stringify(columnsOrder.map((c) => c.field))
                        );
                      }}
                    >
                      Save Order
                    </button>
                  )}
                  {effectiveToolbarOptions.includes("reset") && (
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        border: `1px solid ${effectiveToolbarBackgroundColor[1]}`,
                        color: effectiveToolbarTextColor[1],
                        background: effectiveToolbarBackgroundColor[1],
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        localStorage.removeItem(STORAGE_KEY_ROW_ORDER);
                        localStorage.removeItem(COL_STORAGE_KEY);
                        window.location.reload();
                      }}
                    >
                      Reset Order
                    </button>
                  )}
                  {effectiveToolbarOptions.includes("export") && (
                    <button
                      style={{
                        padding: "8px 16px",
                        borderRadius: "4px",
                        border: `1px solid ${effectiveToolbarBackgroundColor[2]}`,
                        color: effectiveToolbarTextColor[2],
                        background: effectiveToolbarBackgroundColor[2],
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        const csvRows: string[] = [];
                        csvRows.push(
                          columnsOrder
                            .map((col: GridColumn) => col.headerName)
                            .join(",")
                        );
                        data.forEach((row: any) => {
                          csvRows.push(
                            columnsOrder
                              .map((col: GridColumn) =>
                                JSON.stringify(row[col.field] ?? "")
                              )
                              .join(",")
                          );
                        });
                        const csvContent = csvRows.join("\n");
                        const blob = new Blob([csvContent], {
                          type: "text/csv",
                        });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "grid-data.csv";
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                      }}
                    >
                      Export CSV
                    </button>
                  )}
                </div>
              )}
            </td>
          </tr>
          <tr>
            {columnsOrder.map((col: GridColumn, colIdx: number) => (
              <th
                key={col.field}
                onClick={() => col.sortable && handleSort(col.field)}
                draggable={enableDragDrop}
                onDragStart={enableDragDrop ? () => onColDragStart(colIdx) : undefined}
                onDragOver={enableDragDrop ? onColDragOver : undefined}
                onDrop={enableDragDrop ? () => onColDrop(colIdx) : undefined}
                style={{
                  cursor: enableDragDrop ? "move" : "default",
                  background: draggedColIdx === colIdx ? "#e3f2fd" : undefined,
                  userSelect: "none",
                }}
              >
                {col.headerName}
                {col.sortable && (
                  <span
                    style={{
                      marginLeft: 6,
                      fontSize: "1em",
                      opacity: sort?.field === col.field ? 1 : 0.4,
                      color: "#ffffffff",
                    }}
                  >
                    {sort?.field === col.field
                      ? sort.direction === "asc"
                        ? "↑"
                        : "↓"
                      : "⇅"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any, idx: number) => (
            <tr
              key={row.id}
              draggable={enableDragDrop}
              onDragStart={enableDragDrop ? () => onDragStart(idx) : undefined}
              onDragOver={enableDragDrop ? onDragOver : undefined}
              onDrop={enableDragDrop ? () => onDrop(idx) : undefined}
              onClick={() => {
                setSelectedRowIdx(idx);
                onRowClick?.(row, idx);
              }}
              style={{
                cursor: enableDragDrop ? "move" : "pointer",
                background:
                  draggedIdx === idx
                    ? "#e3f2fd"
                    : selectedRowIdx === idx
                    ? selectedRowIdxColor ?? "#c8e6c9"
                    : undefined,
              }}
            >
              {columnsOrder.map((col: GridColumn) => (
                <td
                  key={col.field}
                  style={{
                    cursor: "move",
                    background: draggedIdx === idx ? "#e3f2fd" : undefined,
                  }}
                >
                  {row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {pagination && (
          <tfoot className="pagination">
            <tr>
              <td colSpan={columns.length} style={{ textAlign: "center", padding: "16px 0" }}>
                {paginationRenderer ? (
                  paginationRenderer({
                    page,
                    pageCount: Math.ceil(rowData.length / (currentPageSize || 1)),
                    setPage,
                  })
                ) : (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <button
                      style={{
                        padding:
                          paginationSize === 'lg' ? '10px 20px' : paginationSize === 'sm' ? '4px 8px' : '7px 14px',
                        borderRadius: paginationShape === 'pill' ? '999px' : '4px',
                        border: `1px solid ${paginationColor}`,
                        background: page > 1 ? paginationColor : '#e0e0e0',
                        color: page > 1 ? '#fff' : '#888',
                        cursor: page > 1 ? 'pointer' : 'not-allowed',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        boxShadow: page > 1 ? '0 2px 8px rgba(25, 118, 210, 0.08)' : undefined,
                      }}
                      disabled={page <= 1}
                      onClick={() => {
                        if (page > 1) setPage(page - 1);
                      }}
                      aria-label="Previous page"
                    >
                      &#8592; Prev
                    </button>
                    {/* Numbered page buttons */}
                    {Array.from({ length: Math.ceil(rowData.length / (currentPageSize || 1)) }, (_, i) => (
                      <button
                        key={i + 1}
                        style={{
                          padding:
                            paginationSize === 'lg' ? '10px 20px' : paginationSize === 'sm' ? '4px 8px' : '7px 14px',
                          borderRadius: paginationShape === 'pill' ? '999px' : '4px',
                          border: page === i + 1 ? `2px solid ${paginationColor}` : `1px solid #bdbdbd`,
                          background: page === i + 1 ? paginationColor : '#fff',
                          color: page === i + 1 ? '#fff' : '#333',
                          fontWeight: page === i + 1 ? 700 : 500,
                          margin: '0 2px',
                          cursor: 'pointer',
                          boxShadow: page === i + 1 ? `0 2px 8px ${paginationColor}33` : undefined,
                          transition: 'all 0.2s',
                        }}
                        onClick={() => setPage(i + 1)}
                        aria-current={page === i + 1 ? 'page' : undefined}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      style={{
                        padding:
                          paginationSize === 'lg' ? '10px 20px' : paginationSize === 'sm' ? '4px 8px' : '7px 14px',
                        borderRadius: paginationShape === 'pill' ? '999px' : '4px',
                        border: `1px solid ${paginationColor}`,
                        background: page < Math.ceil(rowData.length / (currentPageSize || 1)) ? paginationColor : '#e0e0e0',
                        color: page < Math.ceil(rowData.length / (currentPageSize || 1)) ? '#fff' : '#888',
                        cursor: page < Math.ceil(rowData.length / (currentPageSize || 1)) ? 'pointer' : 'not-allowed',
                        fontWeight: 500,
                        transition: 'all 0.2s',
                        boxShadow: page < Math.ceil(rowData.length / (currentPageSize || 1)) ? '0 2px 8px rgba(25, 118, 210, 0.08)' : undefined,
                      }}
                      disabled={page >= Math.ceil(rowData.length / (currentPageSize || 1))}
                      onClick={() => {
                        if (page < Math.ceil(rowData.length / (currentPageSize || 1))) setPage(page + 1);
                      }}
                      aria-label="Next page"
                    >
                      Next &#8594;
                    </button>
                  </div>
                )}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </React.Fragment>
  );
};
