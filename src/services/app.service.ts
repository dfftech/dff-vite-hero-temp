import { signal } from "@preact/signals-react";
import { ConstKeys } from "dff-util";
import { t } from "i18next";

import { ShowToast } from "@/utils/services/app.event";
import { SiteConfig } from "@/config/site-config";

export interface GridParams {
  page: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: "asc" | "desc";
}

export interface GridResponse<T> {
  data: T[];
  totalRecords: number;
  page: number;
  pageSize: number;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

class GridService {
  // Simulate API call with dummy data
  async fetchGridData(params: GridParams): Promise<GridResponse<UserData>> {
    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate dummy data
    const dummyData: UserData[] = Array.from({ length: params.pageSize }, (_, index) => ({
      id: (params.page - 1) * params.pageSize + index + 1,
      name: `User ${(params.page - 1) * params.pageSize + index + 1}`,
      email: `user${(params.page - 1) * params.pageSize + index + 1}@example.com`,
      role: ["Admin", "User", "Manager"][Math.floor(Math.random() * 3)],
      status: ["Active", "Inactive"][Math.floor(Math.random() * 2)],
    }));

    return {
      data: dummyData,
      totalRecords: 100, // Total number of records (dummy value)
      page: params.page,
      pageSize: params.pageSize,
    };
  }
}

export const gridService = new GridService();
