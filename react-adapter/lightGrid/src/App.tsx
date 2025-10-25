import { VortexGrid } from "vortexgrid";
import "./App.css";
import { mockColumns, mockRowData } from "./data/table.mock";


function App() {

  return (
      <VortexGrid
        columns={mockColumns}
        rowData={mockRowData}
        className="my-custom-grid"
        pageSize={10}
        pagination={true}
        toolbarOptions={['save', 'reset', 'export']}
        toolbarBackgroundColor={['#0078efff', '#177c12ff', '#dd3c10ff']}
        toolbarTextColor={['#fff', '#fff', '#fff']} 
        onRowClick={(row, idx) => {
            console.log("Row clicked", row, idx);
          }}
        style={{
          backgroundColor: "#f9f9f9",
          color: "#333",
          fontFamily: "Arial, sans-serif",
        }}
        enableDragDrop={false}
      />

  );
}

export default App;
