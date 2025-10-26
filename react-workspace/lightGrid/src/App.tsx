import { VortexGridReact } from "vortexgrid/react-adapter/VortexGrid";
import "./App.css";
import { mockColumns, mockRowData } from "./data/table.mock";

function App() {
  return (
    <VortexGridReact
      columns={mockColumns}
      rowData={mockRowData}
      className="my-custom-grid"
      pagination={true}
      pageSize={5}
      toolbarOptions={[
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
      ]}
      onRowClick={(row, idx) => {
        console.log("Row clicked", row, idx);
      }}
      style={{
        backgroundColor: "#f9f9f9",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
      enableDragDrop={true}
    />
  );
}

export default App;
