# NgVortexgrid

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.0.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build ng-vortexgrid
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:
   ```bash
   cd dist/ng-vortexgrid
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

# ng-vortexgrid

ng-vortexgrid is a modern, highly customizable Angular data grid library for advanced data display and manipulation. It supports sorting, pagination, drag-and-drop, persistent order, a flexible toolbar, custom pagination, export to CSV, accessibility, and more. Ideal for dashboards, admin panels, and any data-driven UI.

---

## Features

- **Sortable columns**: Click column headers to sort ascending/descending.
- **Pagination**: Built-in, customizable pagination controls.
- **Row and column drag-and-drop**: Reorder rows and columns interactively.
- **Persistent order**: Save user preferences for row/column order in localStorage.
- **Customizable toolbar**: Add save, reset, export, and filter actions.
- **Row highlighting and click events**: Highlight selected rows and handle row clicks.
- **Custom pagination controls**: Style and configure pagination buttons, shapes, and sizes.
- **Export to CSV**: Built-in export button for downloading grid data.
- **Toolbar customization**: Use default or custom toolbar templates.
- **Styling and theming**: Customize colors, shapes, and sizes for toolbar and pagination.
- **Accessibility**: Keyboard navigation and ARIA support.
- **Responsive design**: Works well on desktop and mobile.
- **TypeScript support**: Full typings for all inputs and events.

---

## Installation

```sh
npm install ng-vortexgrid
```

---

## Usage

Import the module and use the `<vortex-grid>` component:

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
   [style]="{ backgroundColor: '#f9f9f9', color: '#333', fontFamily: 'Arial, sans-serif' }"
   class="my-custom-grid"
></vortex-grid>
```

Example component code:

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
];

onRowClicked(event: { row: any, idx: number }) {
   alert(`Clicked: ${event.row.name}`);
}
```

---

## Inputs & Configuration

| Input                    | Type                                      | Default                | Description |
|--------------------------|-------------------------------------------|------------------------|-------------|
| columns                  | Array<{ field, headerName, sortable? }>   | Required               | Column definitions |
| rowData                  | Array<any>                                | Required               | Data rows |
| pagination               | boolean                                   | false                  | Enable pagination |
| pageSize                 | number                                    | rowData.length         | Rows per page |
| toolbarOptions           | Array<{name:string, icon?:string, style?:any, onClick?:() => void}> | [{name:'save',...},...] | Toolbar buttons with custom config |
| selectedRowIdxColor      | string                                    | '#c8e6c9'              | Selected row color |
| enableDragDrop           | boolean                                   | true                   | Enable drag-and-drop |
| paginationColor          | string                                    | '#1976d2'              | Pagination button color |
| paginationShape          | 'pill' | 'square'                         | 'pill'                 | Pagination button shape |
| paginationSize           | 'sm' | 'md' | 'lg'                        | 'md'                   | Pagination button size |
| style                    | object                                    |                        | Custom styles |
| class                    | string                                    |                        | Custom CSS class |

*Note: `toolbarBackgroundColor` and `toolbarTextColor` are deprecated. Use `style` property in `toolbarOptions` for custom styling.*

---

## Advanced Usage

- **Custom Toolbar**: Use `toolbar` input or override toolbar template for full customization.
- **Export CSV**: Use the built-in export button or implement your own logic via toolbar customization.
- **Persistent Order**: The grid saves row/column order in localStorage. Use the save/reset buttons to persist or clear preferences.
- **Styling**: Use `class` and `style` for custom grid appearance. Override default styles in your CSS.
- **Accessibility**: All interactive elements are keyboard accessible and ARIA-labeled.
- **Responsive**: The grid adapts to different screen sizes and layouts.

---

## Example: Custom Toolbar

```html
<vortex-grid
   [columns]="columns"
   [rowData]="data"
   [toolbar]="customToolbar"
></vortex-grid>

<ng-template #customToolbar>
   <button (click)="saveOrder()">Save</button>
   <button (click)="exportCSV()">Export</button>
</ng-template>
```

---

## Accessibility & Internationalization

- All buttons and interactive elements are keyboard accessible.
- ARIA attributes are used for better screen reader support.
- You can localize button labels and messages as needed.

---

## License

MIT
