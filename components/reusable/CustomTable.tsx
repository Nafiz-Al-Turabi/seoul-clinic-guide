"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import React from "react";

export interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "image" | "number";
}

interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  actions?: (row: Record<string, any>) => React.ReactNode;
  loading?: boolean;
}

const CustomTable: React.FC<TableProps> = ({
  columns,
  data,
  actions,
  loading,
}) => {
  return (
    <div className=" overflow-hidden bg-white">
      <Table className="w-full">
        <TableHeader className="capitalize">
          <TableRow>
            <TableHead className="w-14 text-base text-[#62636C] text-center font-medium border-b border-[#EEF3F8] ">
              Serial No.
            </TableHead>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="text-[#62636C] text-center text-base py-5 font-medium whitespace-nowrap border-b border-[#EEF3F8]"
              >
                {col.label}
              </TableHead>
            ))}
            {actions && (
              <TableHead className="w-20 text-base text-[#62636C] text-center font-medium border-b border-[#EEF3F8]">
                More
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 2 : 1)}
                className="text-center py-4 text-gray-500"
              >
                Loading...
              </TableCell>
            </TableRow>
          ) : data?.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={row.id || index}
                className="hover:bg-gray-100 text-[#555F7E] text-sm border-b border-[#EEF3F8]"
              >
                <TableCell className="text-center">{index + 1}</TableCell>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    className="text-center text-[#555F7E] py-4 border-b border-[#EEF3F8]"
                  >
                    {col.type === "image" ? (
                      <img
                        src={row[col.key]?.src || row[col.key]}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover mx-auto"
                      />
                    ) : (
                      row[col.key] ?? "N/A"
                    )}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="text-center">{actions(row)}</TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 2 : 1)}
                className="text-center py-4 text-gray-500"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
