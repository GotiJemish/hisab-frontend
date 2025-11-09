import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  AngleUpIcon,
  ChevronDownIcon,
  DownloadIcon,
  SearchIcon,
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

  columns = [],
  data = [],
  loading = false,
  keyField = "id",
  emptyMessage = "No records found",
  rowClick = () => {},
  isSelectable = false,
  hasActions = false,
  selectedIds = [],
  onToggle = () => {},
  onStatusChange = () => {},
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
  const [editingCell, setEditingCell] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => setIsOpen(false);


    const columnsWithIds = useMemo(
    () =>
      columns.map((c, i) => ({
        _id: c.id || c.accessor || `col_${i}`,
        ...c,
      })),
    [columns]
  );

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


  // ------------------------------
  // 🔹 Logic For Get Module Name
  // ------------------------------


  const renderCell = (row, rowIndex) =>{
    columnsWithIds.map((col, colIndex) => {
      const value =
        typeof col.accessor === "function"
          ? col.accessor(row)
          : col.accessor
          ? row[col.accessor]
          : null;
      const isEditing =
        editingCell?.rowId === row[keyField] &&
        editingCell?.colId === col._id;

     const commonProps = {
        key: col._id || colIndex,
        className: `px-4 py-3 text-gray-700 text-start text-sm ${tdClass} ${
          col.tdClassName || ""
        }`,
        style: { ...tdStyle, ...col.tdStyle },
      };

      
        switch (true) {
          // 🟡 Status Dropdown
          case col.isStatusDropdown:
            return (
              <TableCell {...commonProps} onClick={(e) => e.stopPropagation()}>
                <StatusDropdown
                  currentStatus={value}
                  salesOrderId={rid}
                  onStatusUpdated={(newStatus) =>
                    onStatusChange(rid, newStatus)
                  }
                />
              </TableCell>
            );

          // 🟡 Actions
case hasActions:  
return (

          <TableCell
            {...commonProps}
            className={`${commonProps.className} py-4 text-gray-700`}
            key={col._id}
          >
            {hasmultipleActions ? (
              <div className="relative inline-block">
                <div className="relative">
                  <button
                    className="text-gray-500 dark:text-gray-400 "
                    onClick={toggleDropdown}
                  >
                    <ThreeDotIcon className="fill-current" />
                  </button>
                  <Dropdown
                    isOpen={isOpen}
                    onClose={closeDropdown}
                    className="absolute z-10 right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                  >
                    <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                      <li>
                        <DropdownItem
                          onItemClick={closeDropdown}
                          tag="a"
                          href="/profile"
                          className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          View More
                        </DropdownItem>
                      </li>
                    </ul>
                    <button
                      onClick={() => {}}
                      className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      {/* <SignOutIcon className="fill-gray-500 group-hover:fill-gray-700 dark:group-hover:fill-gray-300"/> */}
                      Delete
                    </button>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {col.showEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onEdit?.(row);
                    }}
                    title="Edit"
                  >
                    <EditIcon size={16} />
                  </button>
                )}
                {col.showDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      action.onDelete?.(row);
                    }}
                    title="Delete"
                  >
                    <DeleteIcon size={16} />
                  </button>
                )}
              </div>
            )}
          </TableCell>
        );

          // 🟡 Switch
          case col.isSwitch:
            return (
              <TableCell {...commonProps} onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  type="switch"
                  checked={!!value}
                  onChange={(e) => col.onSwitchChange?.(e.target.checked, row)}
                />
              </TableCell>
            );

          // 🟡 Checkbox
          case col.isCheckBox:
            return (
              <TableCell {...commonProps}>
                <Checkbox
                  checked={!!value}
                  onChange={(e) => col.onCheck?.(e.target.checked, row)}
                />
              </TableCell>
            );

          // 🟡 Editable Cell
          case col.isEditable: {
            const isEditing =
              editingCell?.rowId === rid && editingCell?.colId === col._id;
            return (
              <TableCell
                {...commonProps}
                style={{
                  ...commonProps.style,
                  backgroundColor: isEditing ? "var(--white)" : undefined,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (col.renderEdit)
                    setEditingCell({ rowId: rid, colId: col._id });
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

          // 🟢 Default Cell
          default:
            return (
              <TableCell key={col?.id} {...commonProps}>
                {content}
              </TableCell>
            );
        }
      
    });
  };

  const sortTable = (colId, type) => {
    console.log("Sorting by:", colId, type);
  };
  return (
    <div className="overflow-hidden rounded-xl bg-white dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <Table className={`min-w-full ${className}`} style={tableStyle}>
          <TableHeader
            className={`border-b border-gray-100 dark:border-white/[0.05] ${headClass}`}
            style={headStyle}
          >
            <TableRow className={headTrClass} style={headTrStyle}>
              {isSelectable && (
                <TableCell
                  isHeader
                  className={`px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 ${thClass}`}
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
                  className={`px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 ${thClass} ${
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
                    className={`flex items-center ${
                      col.isSortable ? "justify-between" : ""
                    }`}
                  >
                    {col.title}
                    {col.isSortable && (
                      <div>
                        <AngleUpIcon className="fill-gray-300 dark:fill-gray-700 mb-1" />
                        <AngleUpIcon className="fill-gray-300 dark:fill-gray-700 -rotate-180" />
                      </div>
                    )}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody
            className={`divide-y divide-gray-100 dark:divide-white/[0.05] ${bodyClass}`}
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
                      className={`${trClass} ${
                        "selected-row"
                        // isRowSelected(idx) ? "" : ""
                      }`}
                    >
                      {isSelectable && (
                        <TableCell
                          className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
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
                        className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400"
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
      <div className="border border-t-0 rounded-b-xl border-gray-100 py-4 pl-[18px] pr-4 dark:border-white/[0.05]">
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
  );
};

export default CustomTable;
