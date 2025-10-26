
# vortexgrid

VortexGrid is a modern, highly customizable React data grid component designed for advanced data display and manipulation. It supports sorting, pagination, drag-and-drop, persistent order, and a flexible toolbar, making it ideal for dashboards, admin panels, and any data-driven UI.

---

## Features

- **Sortable columns**: Click column headers to sort ascending/descending.
- **Pagination**: Built-in, customizable pagination controls.
- **Row and column drag-and-drop**: Reorder rows and columns interactively.
- **Persistent order**: Save user preferences for row/column order in localStorage.
- **Customizable toolbar**: Add save, reset, export, and filter actions.
- **Row highlighting and click events**: Highlight selected rows and handle row clicks.
- **Custom pagination renderer**: Override default pagination UI.
- **Styling and theming**: Customize colors, shapes, and sizes for toolbar and pagination.
- **Responsive design**: Works well on desktop and mobile.
- **TypeScript support**: Full typings for all props and events.

---

## Installation

```sh
npm install vortexgrid
```

---

## Usage

Import and use the `VortexGrid` component:

```tsx
import { VortexGrid } from 'vortexgrid/react-vortex/VortexGrid';

const columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'email', headerName: 'Email' }
];
const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

<VortexGrid
  columns={columns}
  rowData={data}
  pagination
  pageSize={10}
  toolbarOptions={['save', 'reset', 'export', 'filter']}
  toolbarBackgroundColor={['#0078efff', '#177c12ff', '#dd3c10ff']}
  toolbarTextColor={['#fff', '#fff', '#fff']}
  selectedRowIdxColor="#ffe082"
  onRowClick={(row, idx) => alert(`Clicked: ${row.name}`)}
  enableDragDrop={true}
  paginationColor="#388e3c"
  paginationShape="pill"
  paginationSize="md"
  paginationRenderer={({ page, pageCount, setPage }) => (
    <div>
      <button onClick={() => setPage(page - 1)} disabled={page <= 1}>Prev</button>
      {Array.from({ length: pageCount }, (_, i) => (
        <button key={i + 1} onClick={() => setPage(i + 1)}>{i + 1}</button>
      ))}
      <button onClick={() => setPage(page + 1)} disabled={page >= pageCount}>Next</button>
    </div>
  )}
  style={{ backgroundColor: '#f9f9f9', color: '#333', fontFamily: 'Arial, sans-serif' }}
  className="my-custom-grid"
/>
```

---

## Props & Configuration

| Prop                    | Type                                      | Default                | Description |
|-------------------------|-------------------------------------------|------------------------|-------------|
| columns                 | Array<{ field, headerName, sortable? }>   | Required               | Column definitions |
| rowData                 | Array<any>                                | Required               | Data rows |
| pagination              | boolean                                   | false                  | Enable pagination |
| pageSize                | number                                    | rowData.length         | Rows per page |
| toolbarOptions          | Array<'save'|'reset'|'export'|'filter'>   | ['save','reset','export'] | Toolbar buttons |
| toolbarBackgroundColor  | string[]                                  | ['#0078efff', ...]     | Toolbar button colors |
| toolbarTextColor        | string[]                                  | ['#fff', ...]          | Toolbar text colors |
| selectedRowIdxColor     | string                                    | '#c8e6c9'              | Selected row color |
| onRowClick              | (row, idx) => void                        |                        | Row click handler |
| enableDragDrop          | boolean                                   | true                   | Enable drag-and-drop |
| paginationColor         | string                                    | '#1976d2'              | Pagination button color |
| paginationShape         | 'pill' | 'square'                         | 'pill'                 | Pagination button shape |
| paginationSize          | 'sm' | 'md' | 'lg'                        | 'md'                   | Pagination button size |
| paginationRenderer      | Function                                  |                        | Custom pagination UI |
| style                   | React.CSSProperties                       |                        | Custom styles |
| className               | string                                    |                        | Custom CSS class |
| toolbar                 | React.ReactNode                           |                        | Custom toolbar node |

---

## Advanced Usage

- **Custom Toolbar**: Pass a React node to the `toolbar` prop for a fully custom toolbar.
- **Export CSV**: Use the built-in export button or implement your own logic via toolbar customization.
- **Persistent Order**: The grid saves row/column order in localStorage. Use the save/reset buttons to persist or clear preferences.
- **Styling**: Use `className` and `style` for custom grid appearance. Override default styles in your CSS.
- **Accessibility**: All interactive elements are keyboard accessible.

---

## Example: Custom Toolbar

```tsx
<VortexGrid
  columns={columns}
  rowData={data}
  toolbar={
    <div>
      <button onClick={() => alert('Custom Save')}>Save</button>
      <button onClick={() => alert('Custom Export')}>Export</button>
    </div>
  }
/>
```

---

## License

MIT
