import { useTranslation } from "react-i18next";
import { AgGridReact } from "ag-grid-react";
import { useRef, useState, useMemo } from "react";
import { useSignals } from "@preact/signals-react/runtime";

import { columnDefs, getDataSource, gridOptions } from "./common/grid";

import { ArticleLayout } from "@/layouts/article-layout";
import { FloatLayout } from "@/layouts/float-layout";
import TypeButton from "@/types/type.button";
import { ThemeMode } from "@/utils/services/app.event";
import TypeSearch from "@/types/type.search";
import { darkGridTheme, lightGridTheme } from "@/styles/ag.theme";
import { GridLayout } from "@/layouts/grid-layout";

export function ProfilesPage() {
  useSignals();
  const { t } = useTranslation();
  const gridRef = useRef<AgGridReact>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleAction = (data: any, action: "edit" | "status") => {
    console.log(`Action: ${action}, Data:`, data);
  };

  const handleRelaod = () => {
    if (gridRef.current && gridRef.current.api) {
      gridRef.current.api.purgeInfiniteCache();
    }
  };
  const dataSource = useMemo(() => getDataSource(searchTerm), [searchTerm]);
  const onAdd = () => {
    console.log("Add button clicked");
  };

  return (
    <>
      <ArticleLayout>
        <aside className="flex justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold">{t("profiles")}</h2>
          </div>
          <div className="flex gap-2">
            <TypeSearch
              className="w-48"
              placeholder={t("search")}
              value={searchTerm}
              variant="underlined"
              onChange={(value) => {
                setSearchTerm(value);
              }}
            />
            <TypeButton
              action="success"
              label={t("add")}
              name="Plus"
              onPress={onAdd}
            />
          </div>
        </aside>
      </ArticleLayout>
      <GridLayout>
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs(t, handleAction)}
          datasource={dataSource}
          gridOptions={gridOptions}
          theme={ThemeMode.value === "dark" ? darkGridTheme : lightGridTheme}
        />
      </GridLayout>
      <FloatLayout>
        <TypeButton
          action="primary"
          label=""
          name="RotateCcw"
          onPress={handleRelaod}
        />
      </FloatLayout>
    </>
  );
}
