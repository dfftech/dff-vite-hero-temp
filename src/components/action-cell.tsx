import React from "react";
import { ICellRendererParams } from "ag-grid-community";
import { Edit, CheckCircle, Circle } from "lucide-react";

interface ActionCellRendererProps extends ICellRendererParams<any> {
  onAction: (data: any, action: "edit" | "status") => void;
}

const ActionCellRenderer: React.FC<ActionCellRendererProps> = ({
  data,
  onAction,
}) => {
  const handleEdit = () => {
    if (data) {
      onAction(data, "edit");
    }
  };

  const handleToggleActive = () => {
    if (data) {
      onAction(data, "status");
    }
  };

  return (
    <div className="flex flex-row items-center gap-4 p-4">
      <Edit
        className="cursor-pointer hover:text-blue-500"
        size={20}
        onClick={handleEdit}
      />
      {data?.isActive || data?.active ? (
        <CheckCircle
          className="cursor-pointer hover:text-green-500"
          size={20}
          onClick={handleToggleActive}
        />
      ) : (
        <Circle
          className="cursor-pointer hover:text-gray-500"
          size={20}
          onClick={handleToggleActive}
        />
      )}
    </div>
  );
};

export default ActionCellRenderer;
