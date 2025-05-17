// components/DataTable.tsx
import React from "react";
import Link from "next/link";

type CellValue = string | number | null | React.ReactNode;

export interface Column {
  header: string;
  accessor: keyof any | ((row: any) => CellValue);
  numeric?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  className?: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, className }) => (
  <div className={`overflow-x-auto border rounded-md shadow-sm ${className ?? ""}`}>
    <table className="min-w-full text-sm text-left">
      <thead className="bg-[#00173d] text-white">
        <tr>
          {columns.map(col => (
            <th
              key={col.header}
              className={`py-3 px-4 ${col.numeric ? "text-right" : ""}`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length} className="py-6 px-4 text-center text-gray-500">
              No data
            </td>
          </tr>
        ) : (
          data.map((row, i) => (
            <tr
              key={i}
              className="border-t bg-[#e8f1f2] hover:bg-[#c2e8f8]"
            >
              {columns.map(col => {
                const value =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : row[col.accessor];

                return (
                  <td
                    key={col.header}
                    className={`py-3 px-4 ${col.numeric ? "text-right" : ""}`}
                  >
                    {value ?? "—"}
                  </td>
                );
              })}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

export default DataTable;
