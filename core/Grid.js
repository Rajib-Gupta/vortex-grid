// Core grid engine for mygrid
// This file defines the main Grid class and interfaces for data, sorting, filtering, and events.
export class Grid {
    constructor(options) {
        this.currentPage = 1;
        this.filteredData = [];
        this.sortedData = [];
        this.options = options;
        this.filteredData = options.rowData;
        this.sortedData = options.rowData;
    }
    // Sorting
    sort(field, direction) {
        this.sortedData = [...this.filteredData].sort((a, b) => {
            if (a[field] < b[field])
                return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field])
                return direction === 'asc' ? 1 : -1;
            return 0;
        });
    }
    // Filtering
    filter(field, value) {
        this.filteredData = this.options.rowData.filter(row => row[field] === value);
        this.sortedData = this.filteredData;
    }
    // Pagination
    getPage(page) {
        if (!this.options.pagination || !this.options.pageSize)
            return this.sortedData;
        const start = (page - 1) * this.options.pageSize;
        return this.sortedData.slice(start, start + this.options.pageSize);
    }
}
