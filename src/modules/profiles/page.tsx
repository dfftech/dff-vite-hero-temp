"use client"; // Mark as Client Component (if using Next.js)

import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState, useEffect } from "react";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { useSignals } from "@preact/signals-react/runtime";

import { columnDefs, getDataSource, gridOptions } from "./common/grid";

import { ArticleLayout } from "@/layouts/article-layout";
import { ContentLayout } from "@/layouts/content-layout";
import { FloatLayout } from "@/layouts/float-layout";
import TypeButton from "@/types/type.button";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ThemeMode } from "@/utils/services/app.event";

// Register AG Grid Community Module
ModuleRegistry.registerModules([AllCommunityModule]);

export function ProfilesPage() {
  useSignals();
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAction = (data: any, action: "edit" | "status") => {
    console.log(`Action: ${action}, Data:`, data);
  };

  // State for row data
  const dataSource = getDataSource(searchTerm);

  // Set data source when component mounts
  useEffect(() => {
    if (gridRef.current && gridRef.current.api) {
      (gridRef.current.api as any).setDatasource(dataSource);
    }
  }, [dataSource]);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.purgeInfiniteCache();
    }
  };

  const onAdd = () => {
    console.log("Add button clicked");
    // Example: Add a new row dynamically
  };

  // Optional: Fetch data if needed
  useEffect(() => {
    // Example API call (uncomment and adjust as needed)
    /*
    fetch("/api/profiles")
      .then((res) => res.json())
      .then((data) => setRowData(data))
      .catch((err) => console.error("Failed to fetch profiles:", err));
    */
  }, []);

  const RenderArticle = () => {
    return (
      <aside className="flex justify-between gap-2">
        <div>
          <input
            className="search-input"
            placeholder="Search across all fields..."
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <h2 className="text-2xl font-bold">{t("profiles")}</h2>
        </div>
        <div className="flex gap-2">
          <TypeButton
            action="success"
            label={t("submit")}
            name="SendHorizontal"
            onPress={onAdd}
          />
        </div>
      </aside>
    );
  };

  const RenderSection = () => {
    return (
      <aside>
        <div
          className={
            ThemeMode.value === "dark"
              ? "ag-theme-quartz-dark"
              : "ag-theme-quartz"
          }
          style={{ height: "400px", width: "100%" }}
        >
          {ThemeMode.value}
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs({ onAction: handleAction })}
            datasource={dataSource}
            gridOptions={gridOptions}
          />
        </div>
      </aside>
    );
  };

  const RenderFloat = () => {
    return (
      <TypeButton action="primary" label="" name="RotateCcw" onPress={onAdd} />
    );
  };

  return (
    <>
      <ArticleLayout>
        <RenderArticle />
      </ArticleLayout>
      <ContentLayout>
        <RenderSection />
      </ContentLayout>
      <FloatLayout>
        <RenderFloat />
      </FloatLayout>
    </>
  );
}
