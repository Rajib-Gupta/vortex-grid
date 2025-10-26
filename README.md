# VortexGrid

A modern, customizable, cross-framework data grid library for React, Angular, Vue, and more. Features sorting, pagination, drag-and-drop, persistent order, and a flexible toolbar.

## Features

- **Sortable columns**: Click column headers to sort data ascending/descending.
- **Pagination**: Built-in, customizable pagination controls with shapes and sizes.
- **Row and column drag-and-drop**: Reorder rows and columns interactively.
- **Persistent order**: Save user preferences for row/column order in localStorage.
- **Customizable toolbar**: Add save, reset, export, and filter actions with custom colors.
- **Row highlighting and click events**: Highlight selected rows and handle row clicks.
- **Export to CSV**: Built-in export functionality.
- **Accessibility**: Keyboard navigation and ARIA support.
- **Responsive design**: Works well on desktop and mobile.
- **Framework adapters**: Consistent API across React, Angular, and Vue.

---

## Installation

Install the appropriate package for your framework:

### React
```sh
npm install vortexgrid-react
```

### Angular
```sh
npm install ng-vortexgrid
```

### Vue
```sh
npm install vue-vortexgrid
```

---

## Usage

### React

```tsx
import { VortexGrid } from 'vortexgrid';

const columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'email', headerName: 'Email' }
];
const data = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

function App() {
  return (
    <VortexGridReact
      columns={columns}
      rowData={data}
      pagination={true}
      pageSize={10}
      toolbarOptions={[
        {
          name: "save",
          icon: <span>Save</span>,
          style: {
            padding: "8px 16px",
            borderRadius: "4px",
            border: `1px solid #0078efff`,
            color: "#fff",
            background: "#0078efff",
            fontWeight: 500,
          },
          onClick: () => {
            console.log("Save clicked");
          },
        },
        {
          name: "reset",
          icon: <span>Reset</span>,
          style: {
            padding: "8px 16px",
            borderRadius: "4px",
            border: `1px solid #177c12ff`,
            color: "#fff",
            background: "#177c12ff",
            fontWeight: 500,
          },
          onClick: () => {
            console.log("Reset clicked");
          },
        },
        {
          name: "export",
          icon: <span>Export</span>,
          style: {
            padding: "8px 16px",
            borderRadius: "4px",
            border: `1px solid #dd3c10ff`,
            color: "#fff",
            background: "#dd3c10ff",
            fontWeight: 500,
          },
          onClick: () => {
            console.log("Export clicked");
          },
        },
        {
          name: "filter",
          icon: <span>Filter</span>,
          style: {
            padding: "8px 16px",
            borderRadius: "4px",
            border: `1px solid #555555ff`,
            color: "#fff",
            background: "#555555ff",
            fontWeight: 500,
          },
          onClick: () => {
            console.log("Filter clicked");
          },
        },
      ]}
      selectedRowIdxColor="#ffe082"
      onRowClick={(row, idx) => console.log('Clicked:', row, idx)}
      enableDragDrop={true}
      paginationColor="#388e3c"
      paginationShape="pill"
      paginationSize="md"
    />
  );
}
```

### Angular

Import the module in your app:

```typescript
import { VortexGridModule } from 'ng-vortexgrid';

@NgModule({
  imports: [VortexGridModule]
})
export class AppModule {}
```

Use in your template:

```html
<vortex-grid
  [columns]="columns"
  [rowData]="data"
  [pagination]="true"
  [pageSize]="10"
  [toolbarOptions]="toolbarOptions"
  [selectedRowIdxColor]="'#ffe082'"
  (rowClick)="onRowClicked($event)"
  [enableDragDrop]="true"
  [paginationColor]="'#388e3c'"
  [paginationShape]="'pill'"
  [paginationSize]="'md'"
></vortex-grid>
```

Component code:

```typescript
columns = [
  { field: 'id', headerName: 'ID', sortable: true },
  { field: 'name', headerName: 'Name', sortable: true },
  { field: 'email', headerName: 'Email' }
];
data = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

toolbarOptions = [
   {
      name: 'save',
      icon: 'Save Order',
      style: {
         padding: '8px 16px',
         borderRadius: '4px',
         border: '1px solid #0078efff',
         color: '#fff',
         background: '#0078efff',
         fontWeight: 500
      },
      onClick: () => {
         console.log('Save clicked');
      }
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
         fontWeight: 500
      },
      onClick: () => {
         console.log('Reset clicked');
      }
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
         fontWeight: 500
      },
      onClick: () => {
         console.log('Export clicked');
      }
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
         fontWeight: 500
      },
      onClick: () => {
         console.log('Filter clicked');
      }
   }
];onRowClicked(event: { row: any, idx: number }) {
  console.log('Clicked:', event.row);
}
```

### Vue

```html
<template>
  <vortex-grid
    :columns="columns"
    :row-data="data"
    :pagination="true"
    :page-size="10"
    :toolbar-options="['save', 'reset', 'export']"
    :selected-row-idx-color="'#ffe082'"
    @row-click="onRowClick"
    :enable-drag-drop="true"
    :pagination-color="'#388e3c'"
    :pagination-shape="'pill'"
    :pagination-size="'md'"
  />
</template>

<script>
import { VortexGrid } from 'vue-vortexgrid';

export default {
  components: { VortexGrid },
  data() {
    return {
      columns: [
        { field: 'id', headerName: 'ID', sortable: true },
        { field: 'name', headerName: 'Name', sortable: true },
        { field: 'email', headerName: 'Email' }
      ],
      data: [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' }
      ]
    };
  },
  methods: {
    onRowClick(row, idx) {
      console.log('Clicked:', row, idx);
    }
  }
};
</script>
```

---

## API Reference

### Common Props

| Prop                    | Type                                      | Default                | Description |
|-------------------------|-------------------------------------------|------------------------|-------------|
| columns                 | Array<{ field, headerName, sortable? }>   | Required               | Column definitions |
| rowData                 | Array<any>                                | Required               | Data rows |
| pagination              | boolean                                   | false                  | Enable pagination |
| pageSize                | number                                    | rowData.length         | Rows per page |
| toolbarOptions          | Array<{name:string, icon?:ReactNode, style?:CSSProperties, onClick?:() => void}> | [{name:'save',...},...] | Toolbar buttons with custom config |
| selectedRowIdxColor     | string                                    | '#c8e6c9'              | Selected row color |

*Note: `toolbarBackgroundColor` and `toolbarTextColor` are deprecated. Use `style` property in `toolbarOptions` for custom styling.*
| enableDragDrop          | boolean                                   | true                   | Enable drag-and-drop |
| paginationColor         | string                                    | '#1976d2'              | Pagination button color |
| paginationShape         | 'pill' | 'square'                         | 'pill'                 | Pagination button shape |
| paginationSize          | 'sm' | 'md' | 'lg'                        | 'md'                   | Pagination button size |

### React Specific
- `onRowClick`: `(row: any, idx: number) => void`

### Angular Specific
- `(rowClick)`: EventEmitter<{ row: any, idx: number }>

### Vue Specific
- `@row-click`: `(row: any, idx: number) => void`

---

## Development

Clone the repo:

```sh
git clone https://github.com/Rajib-Gupta/light-grid.git
cd light-grid
npm install
```

Build all packages:
```sh
npm run build
```

Run demos:
- React: `cd react-vortex && npm start`
- Angular: `cd vortexgrid-workspace && ng serve`
- Vue: `cd vue-vortex && npm run serve`

---

## Contributing

Pull requests and issues are welcome! Please open an issue for bugs, feature requests, or questions.

---

## License

MIT
