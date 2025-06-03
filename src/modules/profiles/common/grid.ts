import { IDatasource, IGetRowsParams, ColDef } from "ag-grid-community";
import { GridOptions } from "ag-grid-community";

import ActionCellRenderer from "@/components/action-cell";
import { SkeletonTable } from "@/skeleton/skeletion-table";
import NoRowsComponent from "@/components/no-rows";
import { darkGridTheme, lightGridTheme } from "@/styles/ag.theme";

export type ActionType = {
  onAction: (data: any, action: "edit" | "status") => void;
};

export const columnDefs = ({ onAction }: ActionType): ColDef<any>[] => [
  { field: "id", maxWidth: 100 },
  { field: "name" },
  { field: "email" },
  {
    headerName: "Actions",
    maxWidth: 120,
    cellRendererSelector: (params) => {
      if (params.data) {
        return { component: ActionCellRenderer, params: { onAction } };
      }
    },
    cellRendererParams: { onAction },
    sortable: false,
    filter: false,
  },
];

export const getDataSource = (searchTerm: string): IDatasource => ({
  getRows: async (params: IGetRowsParams) => {
    const startRow = params.startRow;
    const endRow = params.endRow;

    // Build query parameters
    let query = `startRow=${startRow}&endRow=${endRow}`;

    if (searchTerm) {
      query += `&search=${encodeURIComponent(searchTerm)}`;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Simulate backend API call
      const response = await fetch(`https://jsonplaceholder.typicode.com/users?${query}`);
      const data: any[] = await response.json();

      //throw new Error("Simulated error"); // Simulate an error for testing
      // Transform data, adding isActive (mocked)
      const rowsThisBlock: any[] = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.id % 2 === 0, // Mock active status (replace with actual API field)
      }));

      // Calculate last row for infinite scrolling
      // const lastRow = data.length < endRow - startRow ? startRow + data.length : -1;
      const lastRow = 1000;

      // params.successCallback([], 0);
      params.successCallback(rowsThisBlock, lastRow);
    } catch (error) {
      console.error("Error fetching rows:", error);
      params.failCallback();
    }
  },
});

export const gridOptions: GridOptions = {
  rowModelType: "infinite",
  infiniteInitialRowCount: 10, // Initial row count matches page size
  pagination: true, // Enable pagination
  paginationPageSize: 10, // Display 10 rows per page
  loadingCellRenderer: SkeletonTable,
  paginationPageSizeSelector: false, // Allow user to change page size
  noRowsOverlayComponent: NoRowsComponent,
  defaultColDef: {
    flex: 1,
    sortable: true,
    filter: false,
    resizable: true,
    minWidth: 100,
  },
};
