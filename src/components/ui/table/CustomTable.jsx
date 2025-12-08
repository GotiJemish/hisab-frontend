import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AngleUpIcon,
  ChevronDownIcon,
  DownloadIcon,
  PencilIcon,
  SearchIcon,
  TrashBinIcon,
} from "@/icons";
import { usePathname, useSearchParams } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Checkbox from "@/components/form/input/Checkbox";
/* =========================
   Generic Helpers
========================= */

/* =========================
   Sorting (type-aware)
========================= */

const CustomTable = ({
  style = {},
  action = {},
coverClass="",
  columns = [],
  data = [],
  loading = false,
  hasBg=false,
  keyField = "id",
  emptyMessage = "No records found",
  rowClick = () => {},
  isSelectable = false,
  hasActions = false,
  selectedIds = [],
  onToggle = () => {},
  onStatusChange = () => {},
  pagination={}
}) => {
  const {
    // table style
    tableStyle = {},
    className = "",
    // thead tr style
    headTrClass = "",
    headTrStyle = {},
    // thead style
    headClass = "",
    headStyle = {},
    // th style
    thClass = "",
    thStyle = {},
    // tbody style
    bodyClass = "",
    bodyStyle = {},
    //tr style
    trClass = "",
    trStyle = {},
    // td style
    tdClass = "",
    tdStyle = {},
  } = style;
  const {
    onEdit = () => {},
    onDelete = () => {},
    hasmultipleActions = false,
  } = action;
  const {page=1,limit=10}=pagination;
  const [editingCell, setEditingCell] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);

  const toggleSort = (col) => {
    if (!col.isSortable) return;
    setSortConfig((prev) => {
      if (prev.key === col.accessor) {
        return {
          key: col.accessor,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key: col.accessor, direction: "asc" };
    });
  };
  // ✅ Sorting logic
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;
    const sorted = [...data].sort((a, b) => {
      const key = sortConfig.key;
      const aVal = typeof key === "function" ? key(a) : a[key];
      const bVal = typeof key === "function" ? key(b) : b[key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [data, sortConfig]);
  // ------------------------------
  // 🔹 Logic For Get Module Name
  // ------------------------------
  const columnsWithIds = useMemo(
    () =>
      columns.map((c, i) => ({
        _id: c.id || c.accessor || `col_${i}`,
        ...c,
      })),
    [columns]
  );
  const renderCell = (row, rowIndex) => {
    return columnsWithIds.map((col, colIndex) => {
      const rowId = row[col.accessor];

      // ⭐ Resolve value
      const value =
        typeof col.accessor === "function"
          ? col.accessor(row)
          : col.accessor
          ? row[col.accessor]
          : null;

      const content = col.cell ? col.cell(value, row, rowIndex) : value;

      // ⭐ Common props WITHOUT key
      const commonProps = {
        className: `p-4 whitespace-nowrap ${tdClass} ${col.tdClassName || ""}`,
        style: { ...tdStyle, ...(col.tdStyle || {}) },
      };

      const cellKey = col._id || colIndex;

      /* ------------------------------------------------------------------
       * 🟡 STATUS DROPDOWN
       * ------------------------------------------------------------------ */
      if (col.isStatusDropdown) {
        return (
          <TableCell
            key={cellKey}
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          >
            <StatusDropdown
              currentStatus={value}
              salesOrderId={rowId}
              onStatusUpdated={(newStatus) => onStatusChange(rowId, newStatus)}
            />
          </TableCell>
        );
      }

      /* ------------------------------------------------------------------
       * 🟡 ACTION BUTTONS
       * ------------------------------------------------------------------ */
      if (col.isActions) {
        return (
          <TableCell
            key={cellKey + 1}
            {...commonProps}
            className={`${commonProps.className} py-4`}
          >
            <div className="flex items-center gap-2">
              {col.showEdit && (
                <button
                  className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(row);
                  }}
                >
                  <PencilIcon size={20} />
                </button>
              )}

              {col.showDelete && (
                <button
                  className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(row);
                  }}
                >
                  <TrashBinIcon />
                </button>
              )}
            </div>
          </TableCell>
        );
      }

      /* ------------------------------------------------------------------
       * 🟡 SWITCH FIELD
       * ------------------------------------------------------------------ */
      if (col.isSwitch) {
        return (
          <TableCell
            key={cellKey}
            {...commonProps}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              type="switch"
              checked={!!value}
              onChange={(e) => col.onSwitchChange?.(e.target.checked, row)}
            />
          </TableCell>
        );
      }

      /* ------------------------------------------------------------------
       * 🟡 CHECKBOX FIELD
       * ------------------------------------------------------------------ */
      if (col.isCheckBox) {
        return (
          <TableCell key={cellKey} {...commonProps}>
            <Checkbox
              checked={!!value}
              onChange={(e) => col.onCheck?.(e.target.checked, row)}
            />
          </TableCell>
        );
      }

      /* ------------------------------------------------------------------
       * 🟡 EDITABLE CELL
       * ------------------------------------------------------------------ */
      if (col.isEditable) {
        const isEditing =
          editingCell?.rowId === rowId && editingCell?.colId === col._id;

        return (
          <TableCell
            key={cellKey}
            {...commonProps}
            onClick={(e) => {
              e.stopPropagation();
              if (col.renderEdit) setEditingCell({ rowId, colId: col._id });
            }}
          >
            {isEditing && col.renderEdit
              ? col.renderEdit({
                  value,
                  row,
                  stopEditing: () => setEditingCell(null),
                })
              : content}
          </TableCell>
        );
      }

      /* ------------------------------------------------------------------
       * 🟢 DEFAULT CELL
       * ------------------------------------------------------------------ */
      return (
        <TableCell key={cellKey} {...commonProps}>
          <p className="text-sm text-gray-700 dark:text-gray-400">{content}</p>
        </TableCell>
      );
    });
  };

  const sortTable = (colId, type) => {
    console.log("Sorting by:", colId, type);
  };
  return (
    <>
      <div
        className={`overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 ${
          hasBg ? "bg-white dark:bg-white/[0.03]" : ""
        } ${coverClass}`}
      >
        <div className="max-w-full overflow-x-auto custom-scrollbar">
          <Table
            className={`w-full table-auto ${className}`}
            style={tableStyle}
          >
            <TableHeader
              className={`border-b border-gray-100 dark:border-white/[0.05] ${headClass}`}
              style={headStyle}
            >
              <TableRow
                className={`border-b border-gray-200 dark:divide-gray-800 dark:border-gray-800 ${headTrClass}`}
                style={headTrStyle}
              >
                {isSelectable && (
                  <TableCell
                    isHeader
                    className={`p-4 whitespace-nowrap ${thClass}`}
                    style={{ ...thStyle }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Checkbox labelHidden />
                  </TableCell>
                )}
                {columns?.map((col, i) => (
                  <TableCell
                    key={i}
                    isHeader
                    className={`p-4 whitespace-nowrap ${thClass} ${
                      col.className || ""
                    } ${col.isSortable ? "cursor-pointer" : ""}`}
                    style={{ ...thStyle, ...col.style }}
                    onClick={
                      col.isSortable
                        ? (e) => {
                            e.stopPropagation();
                            sortTable(id, col.sortType);
                          }
                        : undefined
                    }
                  >
                    <div
                      className={`flex items-center  ${
                        col.isSortable ? "gap-3" : ""
                      }`}
                    >
                      <p className="text-theme-xs font-medium text-gray-700 dark:text-gray-400">
                        {col.title}
                      </p>
                      {col.isSortable && (
                        <div className="flex flex-col gap-0.5">
                          {/* sortBy === 'customer' && sortDirection === 'asc' ? 'text-brand-500' : 'text-gray-300' */}
                          <AngleUpIcon className="text-gray-300" />
                          <AngleUpIcon className="text-gray-300 -rotate-180" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody
              className={`divide-y divide-gray-100 dark:divide-white/[0.05]  ${bodyClass}`}
              style={bodyStyle}
            >
              {loading || data.length === 0 ? (
                <TableRow className={trClass} style={trStyle}>
                  <TableCell
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    colSpan={columnsWithIds.length}
                  >
                    {loading && "loading"}
                    {data.length === 0 && "No Records Found"}
                    {/* <div className="text-center py-3 h-100 d-flex align-items-center justify-content-center">
                    <Spinner animation="border" />
                  </div> */}
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {data?.map((row, idx) => {
                    return (
                      <TableRow
                        style={trStyle}
                        key={idx}
                        onClick={(e) => {
                          // e.stopPropagation();
                          // if (e.target.closest(".action-dropdown")) return;
                          // rowClick(row);
                        }}
                        className={`transition hover:bg-gray-50 dark:hover:bg-gray-900 ${trClass} ${
                          "selected-row"
                          // isRowSelected(idx) ? "" : ""
                        }`}
                      >
                        {isSelectable && (
                          <TableCell
                            className="p-4 whitespace-nowrap"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Checkbox
                              labelHidden
                              checked={selectedIds.includes(row[keyField])}
                              onChange={(e) =>
                                onToggle(row[keyField], e.target.checked)
                              }
                            />
                          </TableCell>
                        )}
                        {renderCell(row, idx)}

                        <TableCell
                          className="p-4 whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        ></TableCell>
                      </TableRow>
                    );
                  })}
                </>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="border-t rounded-b-xl border-gray-100 py-4  px-4 dark:border-white/[0.05]">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <div className="pb-3 xl:pb-0">
              <p className="pb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-100 dark:border-gray-800 dark:text-gray-400 xl:border-b-0 xl:pb-0 xl:text-left">
                Showing 1 to 5 of 10 entries
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
                disabled
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 rounded bg-brand-500 text-white flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                  1
                </button>
                <button className="px-4 py-2 rounded text-gray-700 dark:text-gray-400 flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500">
                  2
                </button>
              </div>
              <button className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomTable;
