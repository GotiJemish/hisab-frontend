export const MAIN_TABLE_COLUMNS = [
  { id: "index", accessor: "", isSortable: true, sortType: "", title: "index" },
  {
    id: "name",
    accessor: "name",
    isSortable: true,
    sortType: "text",
    title: "Name",
  },
  {
    id: "type",
    accessor: "type",
    isSortable: true,
    sortType: "text",
    title: "Payment Type",
  },
  {
    id: "price",
    accessor: "rate",
    
    isSortable: true,
    sortType: "number",
    title: "Sales Price",
  },
  {
    id: "unit types",
    accessor: "unit_type",
    isSortable: true,
    sortType: "text",
    title: "Stock",
  },
 
  { id: "index", isActions: true, title: "", showEdit:true, showDelete:true },
];
