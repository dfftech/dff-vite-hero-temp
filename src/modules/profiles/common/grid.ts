import { IDatasource, IGetRowsParams, ColDef } from "ag-grid-community";
import { GridOptions } from "ag-grid-community";

import ActionCellRenderer from "@/components/action-cell";
import { SkeletonTable } from "@/skeleton/skeletion-table";

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
    cellRenderer: ActionCellRenderer,
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
      // Simulate backend API call
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?${query}`
      );
      const data: any[] = await response.json();

      // Transform data, adding isActive (mocked)
      const rowsThisBlock: any[] = data.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isActive: user.id % 2 === 0, // Mock active status (replace with actual API field)
      }));

      // Calculate last row for infinite scrolling
      const lastRow =
        data.length < endRow - startRow ? startRow + data.length : -1;

      params.successCallback(rowsThisBlock, lastRow);
    } catch (error) {
      params.failCallback();
    }
  },
});

export const gridOptions: GridOptions = {
  rowModelType: "infinite",
  cacheBlockSize: 20,
  maxBlocksInCache: 2,
  infiniteInitialRowCount: 20,
  loadingCellRenderer: SkeletonTable,
  defaultColDef: {
    flex: 1,
    sortable: true,
    filter: false,
  },
};
