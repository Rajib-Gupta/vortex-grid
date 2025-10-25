# VortexGrid

A modern, customizable, cross-framework data grid library for React, Angular, Vue, and more. Features sorting, pagination, drag-and-drop, persistent order, and a flexible toolbar.

## Features
- Sortable columns
- Pagination with customizable style
- Row and column drag-and-drop (optional)

# VortexGrid

VortexGrid is a modern, customizable, cross-framework data grid library for React, Angular, and Vue. It provides advanced features like sorting, pagination, drag-and-drop, persistent order, and a flexible toolbar, making it ideal for building interactive data tables in any web application.

---

## Features

- **Sortable columns**: Click column headers to sort data ascending/descending.
- **Pagination**: Built-in, customizable pagination controls.
- **Row and column drag-and-drop**: Reorder rows and columns interactively.
- **Persistent order**: Save user preferences for row/column order in localStorage.
- **Customizable toolbar**: Add save, reset, export, and filter actions.
- **Row highlighting and click events**: Highlight selected rows and handle row clicks.
- **Framework adapters**: Use with React, Angular, or Vue with a consistent API.

---

## Installation

Install for your framework:

```sh
npm install vortexgrid
```

---

## Usage

### React

```tsx
import { VortexGrid } from 'vortexgrid/react-adapter/VortexGrid';

const columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true },
];
const data = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

<VortexGrid
  columns={columns}
  rowData={data}
  pagination
  pageSize={10}
  toolbarOptions={['save', 'reset', 'export']}
  selectedRowIdxColor="#ffe082"
  onRowClick={(row, idx) => console.log(row, idx)}
  enableDragDrop={true}
  paginationColor="#388e3c"
  paginationShape="pill"
  paginationSize="md"
/>
```

### Angular

```html
<vortex-grid
  [columns]="columns"
  [rowData]="data"
  [pagination]="true"
  [pageSize]="10"
  [toolbarOptions]="['save', 'reset', 'export']"
  [selectedRowIdxColor]="'#ffe082'"
  (rowClick)="onRowClicked($event)"
  [enableDragDrop]="true"
  [paginationColor]="'#388e3c'"
  [paginationShape]="'pill'"
  [paginationSize]="'md'"
></vortex-grid>
```

### Vue

```html
<vortex-grid :columns="columns" :rowData="data" :pagination="true" :pageSize="10" />
```

---

## API Reference

### Common Props

- `columns`: Array of column definitions `{ field, headerName, sortable }`
- `rowData`: Array of row objects
- `pagination`: Enable pagination (boolean)
- `pageSize`: Rows per page (number)
- `toolbarOptions`: Array of toolbar buttons (`'save'`, `'reset'`, `'export'`, `'filter'`)
- `toolbarBackgroundColor`: Array of colors for toolbar buttons
- `toolbarTextColor`: Array of text colors for toolbar buttons
- `selectedRowIdxColor`: Highlight color for selected row
- `onRowClick`: Callback for row click `(row, idx)`
- `enableDragDrop`: Enable drag-and-drop for rows/columns (boolean)
- `paginationColor`: Color for pagination buttons
- `paginationShape`: `'pill'` or `'square'`
- `paginationSize`: `'sm'`, `'md'`, `'lg'`

#### React Only
- `paginationRenderer`: Custom pagination renderer (React only)

---

## Development

Clone the repo:

```sh
git clone https://github.com/vortexgrid/vortexgrid.git
cd vortexgrid
npm install
npm run build
```

Run the demo:
- See `/react-adapter/VortexGrid/src/App.tsx` for usage examples.

---

## License

MIT

---

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs, feature requests, or questions.
