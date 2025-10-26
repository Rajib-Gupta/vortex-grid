import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
export const VortexGridReact = ({ columns, rowData, pagination, pageSize, className, style, toolbar, toolbarOptions, selectedRowIdxColor, onRowClick, enableDragDrop = true, paginationColor = "#1976d2", paginationShape = "pill", paginationSize = "md", paginationRenderer, }) => {
    console.log("rowData", rowData);
    const [selectedRowIdx, setSelectedRowIdx] = useState(null);
    const STORAGE_KEY_ROW_ORDER = "gridkit-row-order";
    const COL_STORAGE_KEY = "gridkit-column-order";
    const effectiveToolbarOptions = toolbarOptions ?? [
        {
            name: "save",
            icon: _jsx("span", { children: "Save" }),
            style: {
                padding: "8px 16px",
                borderRadius: "4px",
                border: `1px solid #0078efff`,
                color: "#fff",
                background: "#0078efff",
                fontWeight: 500,
                cursor: "pointer",
            },
            onClick: undefined,
        },
        {
            name: "reset",
            icon: _jsx("span", { children: "Reset" }),
            style: {
                padding: "8px 16px",
                borderRadius: "4px",
                border: `1px solid #177c12ff`,
                color: "#fff",
                background: "#177c12ff",
                fontWeight: 500,
                cursor: "pointer",
            },
            onClick: undefined,
        },
        {
            name: "export",
            icon: _jsx("span", { children: "Export" }),
            style: {
                padding: "8px 16px",
                borderRadius: "4px",
                border: `1px solid #dd3c10ff`,
                color: "#fff",
                background: "#dd3c10ff",
                fontWeight: 500,
                cursor: "pointer",
            },
            onClick: undefined,
        },
        {
            name: "filter",
            icon: _jsx("span", { children: "Filter" }),
            style: {
                padding: "8px 16px",
                borderRadius: "4px",
                border: `1px solid #555555ff`,
                color: "#fff",
                background: "#555555ff",
                fontWeight: 500,
                cursor: "pointer",
            },
            onClick: undefined,
        },
    ];
    const initialColumnsOrder = React.useMemo(() => {
        const savedColOrder = localStorage.getItem(COL_STORAGE_KEY);
        if (savedColOrder) {
            try {
                const order = JSON.parse(savedColOrder);
                // Map saved order to columns, filter out any undefined
                const ordered = order
                    .map((field) => columns.find((col) => col.field === field))
                    .filter((col) => !!col);
                // Add any new columns not in saved order
                const missing = columns.filter((col) => !order.includes(col.field));
                return [...ordered, ...missing];
            }
            catch { }
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
                    .map((id) => rowData.find((row) => row.id === id))
                    .filter(Boolean);
            }
            catch {
                return rowData;
            }
        }
        return rowData;
    }, [rowData]);
    const [data, setData] = useState(initialData);
    const [columnsOrder, setColumnsOrder] = useState(initialColumnsOrder);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState(null);
    const [draggedIdx, setDraggedIdx] = useState(null);
    const [draggedColIdx, setDraggedColIdx] = useState(null);
    const [currentPageSize, setCurrentPageSize] = useState(pageSize || rowData.length);
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
    const onDragStart = (idx) => {
        setDraggedIdx(idx);
    };
    const onDragOver = (e) => {
        e.preventDefault();
    };
    const onDrop = (idx) => {
        if (draggedIdx === null || draggedIdx === idx)
            return;
        const newData = [...data];
        const [removed] = newData.splice(draggedIdx, 1);
        newData.splice(idx, 0, removed);
        setData(newData);
        setDraggedIdx(null);
    };
    // Column drag and drop handlers
    const onColDragStart = (colIdx) => {
        setDraggedColIdx(colIdx);
    };
    const onColDragOver = (e) => {
        e.preventDefault();
    };
    const onColDrop = (colIdx) => {
        if (draggedColIdx === null || draggedColIdx === colIdx)
            return;
        const newOrder = [...columnsOrder];
        const [removed] = newOrder.splice(draggedColIdx, 1);
        newOrder.splice(colIdx, 0, removed);
        setColumnsOrder(newOrder);
        setDraggedColIdx(null);
    };
    // Sorting handler for column headers
    const handleSort = (field) => {
        if (!columns.find((col) => col.field === field)?.sortable)
            return;
        setSort((prev) => {
            if (!prev || prev.field !== field) {
                return { field, direction: "asc" };
            }
            return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
        });
        setData((prevData) => {
            const direction = sort?.field === field && sort?.direction === "asc" ? "desc" : "asc";
            const sorted = [...initialData].sort((a, b) => {
                if (a[field] < b[field])
                    return direction === "asc" ? -1 : 1;
                if (a[field] > b[field])
                    return direction === "asc" ? 1 : -1;
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
    return (_jsx(React.Fragment, { children: _jsxs("table", { className: className, style: style, children: [_jsxs("thead", { children: [_jsx("tr", { children: _jsx("td", { colSpan: columns.length, style: { padding: "8px 0", textAlign: "right" }, children: React.isValidElement(toolbar) ? (toolbar) : (_jsx("div", { style: {
                                        display: "flex",
                                        gap: "8px",
                                        justifyContent: "flex-end",
                                    }, children: effectiveToolbarOptions.map((option) => {
                                        return (_jsx("button", { style: option.style, onClick: () => {
                                                if (option.onClick) {
                                                    option.onClick();
                                                }
                                                else {
                                                    if (option.name === "save") {
                                                        localStorage.setItem(STORAGE_KEY_ROW_ORDER, JSON.stringify(data.map((d) => d.id)));
                                                        localStorage.setItem(COL_STORAGE_KEY, JSON.stringify(columnsOrder.map((c) => c.field)));
                                                    }
                                                    else if (option.name === "reset") {
                                                        localStorage.removeItem(STORAGE_KEY_ROW_ORDER);
                                                        localStorage.removeItem(COL_STORAGE_KEY);
                                                        window.location.reload();
                                                    }
                                                    else if (option.name === "export") {
                                                        const csvRows = [];
                                                        csvRows.push(columnsOrder
                                                            .map((col) => col.headerName)
                                                            .join(","));
                                                        data.forEach((row) => {
                                                            csvRows.push(columnsOrder
                                                                .map((col) => JSON.stringify(row[col.field] ?? ""))
                                                                .join(","));
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
                                                    }
                                                }
                                            }, children: option.icon ? option.icon : option.name }));
                                    }) })) }) }), _jsx("tr", { children: columnsOrder.map((col, colIdx) => (_jsxs("th", { onClick: () => col.sortable && handleSort(col.field), draggable: enableDragDrop, onDragStart: enableDragDrop ? () => onColDragStart(colIdx) : undefined, onDragOver: enableDragDrop ? onColDragOver : undefined, onDrop: enableDragDrop ? () => onColDrop(colIdx) : undefined, style: {
                                    cursor: enableDragDrop ? "move" : "default",
                                    background: draggedColIdx === colIdx ? "#e3f2fd" : undefined,
                                    userSelect: "none",
                                }, children: [col.headerName, col.sortable && (_jsx("span", { style: {
                                            marginLeft: 6,
                                            fontSize: "1em",
                                            opacity: sort?.field === col.field ? 1 : 0.4,
                                            color: "#ffffffff",
                                        }, children: sort?.field === col.field
                                            ? sort?.direction === "asc"
                                                ? "↑"
                                                : "↓"
                                            : "⇅" }))] }, col.field))) })] }), _jsx("tbody", { children: data.map((row, idx) => (_jsx("tr", { draggable: enableDragDrop, onDragStart: enableDragDrop ? () => onDragStart(idx) : undefined, onDragOver: enableDragDrop ? onDragOver : undefined, onDrop: enableDragDrop ? () => onDrop(idx) : undefined, onClick: () => {
                            setSelectedRowIdx(idx);
                            onRowClick?.(row, idx);
                        }, style: {
                            cursor: enableDragDrop ? "move" : "pointer",
                            background: draggedIdx === idx
                                ? "#e3f2fd"
                                : selectedRowIdx === idx
                                    ? selectedRowIdxColor ?? "#c8e6c9"
                                    : undefined,
                        }, children: columnsOrder.map((col) => (_jsx("td", { style: {
                                cursor: "move",
                                background: draggedIdx === idx ? "#e3f2fd" : undefined,
                            }, children: row[col.field] }, col.field))) }, row.id))) }), pagination && rowData.length > (currentPageSize || rowData.length) && (_jsx("tfoot", { className: "pagination", children: _jsx("tr", { children: _jsx("td", { colSpan: columns.length, style: { textAlign: "center", padding: "16px 0" }, children: paginationRenderer ? (paginationRenderer({
                                page,
                                pageCount: Math.ceil(rowData.length / (currentPageSize || 1)),
                                setPage,
                            })) : (_jsxs("div", { style: {
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                }, children: [_jsx("button", { style: {
                                            padding: paginationSize === "lg"
                                                ? "10px 20px"
                                                : paginationSize === "sm"
                                                    ? "4px 8px"
                                                    : "7px 14px",
                                            borderRadius: paginationShape === "pill" ? "999px" : "4px",
                                            border: `1px solid ${paginationColor}`,
                                            background: page > 1 ? paginationColor : "#e0e0e0",
                                            color: page > 1 ? "#fff" : "#888",
                                            cursor: page > 1 ? "pointer" : "not-allowed",
                                            fontWeight: 500,
                                            transition: "all 0.2s",
                                            boxShadow: page > 1
                                                ? "0 2px 8px rgba(25, 118, 210, 0.08)"
                                                : undefined,
                                        }, disabled: page <= 1, onClick: () => {
                                            if (page > 1)
                                                setPage(page - 1);
                                        }, "aria-label": "Previous page", children: "\u2190 Prev" }), Array.from({
                                        length: Math.ceil(rowData.length / (currentPageSize || 1)),
                                    }, (_, i) => (_jsx("button", { style: {
                                            padding: paginationSize === "lg"
                                                ? "10px 20px"
                                                : paginationSize === "sm"
                                                    ? "4px 8px"
                                                    : "7px 14px",
                                            borderRadius: paginationShape === "pill" ? "999px" : "4px",
                                            border: page === i + 1
                                                ? `2px solid ${paginationColor}`
                                                : `1px solid #bdbdbd`,
                                            background: page === i + 1 ? paginationColor : "#fff",
                                            color: page === i + 1 ? "#fff" : "#333",
                                            fontWeight: page === i + 1 ? 700 : 500,
                                            margin: "0 2px",
                                            cursor: "pointer",
                                            boxShadow: page === i + 1
                                                ? `0 2px 8px ${paginationColor}33`
                                                : undefined,
                                            transition: "all 0.2s",
                                        }, onClick: () => setPage(i + 1), "aria-current": page === i + 1 ? "page" : undefined, children: i + 1 }, i + 1))), _jsx("button", { style: {
                                            padding: paginationSize === "lg"
                                                ? "10px 20px"
                                                : paginationSize === "sm"
                                                    ? "4px 8px"
                                                    : "7px 14px",
                                            borderRadius: paginationShape === "pill" ? "999px" : "4px",
                                            border: `1px solid ${paginationColor}`,
                                            background: page <
                                                Math.ceil(rowData.length / (currentPageSize || 1))
                                                ? paginationColor
                                                : "#e0e0e0",
                                            color: page <
                                                Math.ceil(rowData.length / (currentPageSize || 1))
                                                ? "#fff"
                                                : "#888",
                                            cursor: page <
                                                Math.ceil(rowData.length / (currentPageSize || 1))
                                                ? "pointer"
                                                : "not-allowed",
                                            fontWeight: 500,
                                            transition: "all 0.2s",
                                            boxShadow: page <
                                                Math.ceil(rowData.length / (currentPageSize || 1))
                                                ? "0 2px 8px rgba(25, 118, 210, 0.08)"
                                                : undefined,
                                        }, disabled: page >=
                                            Math.ceil(rowData.length / (currentPageSize || 1)), onClick: () => {
                                            if (page <
                                                Math.ceil(rowData.length / (currentPageSize || 1)))
                                                setPage(page + 1);
                                        }, "aria-label": "Next page", children: "Next \u2192" })] })) }) }) }))] }) }));
};
