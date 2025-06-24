import { IDatasource, IGetRowsParams, ColDef } from "ag-grid-community";
import { GridOptions } from "ag-grid-community";
import { TFunction } from "i18next";

import { profileListCall } from "./service";

import ActionCellRenderer from "@/grid/action-cell";
import { SkeletonTable } from "@/skeleton/skeleton-table";
import NoRowsComponent from "@/components/no-rows";
import { ShowToast } from "@/utils/services/app.event";
import { t, trans } from "@/i18n";

export const gridOptions: GridOptions = {
  rowModelType: "infinite",
  infiniteInitialRowCount: 10,
  pagination: true,
  paginationPageSize: 10,
  loadingCellRenderer: SkeletonTable,
  paginationPageSizeSelector: false,
  noRowsOverlayComponent: NoRowsComponent,
  defaultColDef: {
    flex: 1,
    sortable: true,
    filter: false,
    resizable: true,
    minWidth: 100,
  },
};

export const columnDefs = (t: TFunction, onAction: Function): ColDef<any>[] => [
  {
    field: "id",
    headerName: t("id"),
    maxWidth: 100,
  },
  {
    field: "nameLang",
    headerName: t("name"),
    flex: 1,
    valueGetter: (params) => trans(params.data?.nameLang),
  },
  {
    headerName: t("actions"),
    field: "actions",
    maxWidth: 120,
    cellRenderer: ActionCellRenderer,
    cellRendererParams: { onAction },
    sortable: false,
    filter: false,
  },
];

export const getDataSource = (searchTerm: string): IDatasource => ({
  getRows: async (params: IGetRowsParams) => {
    const query = {
      orderby: "createdAt",
      skip: params.startRow,
      limit: 100,
      searchTerm: searchTerm,
      query: {
        name: searchTerm,
      },
    };

    try {
      const respData: any = await profileListCall(query);
      const lastRow = respData.total || -1;

      params.successCallback(respData.data, lastRow);
    } catch (error) {
      ShowToast(t((error as any)?.message), "warning");
      params.failCallback();
    }
  },
});
