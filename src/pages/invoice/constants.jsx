export const MAIN_TABLE_COLUMNS = [
  { id: "invoice_date", accessor: "invoice_date", isSortable: true, sortType: "date", title: "Date" },
  {
    id: "invoice_number",
    accessor: "invoice_number",
    isSortable: true,
    sortType: "text",
    title: "Invoice Number",
  },
  {
    id: "contact",
    accessor: "contact",
    isSortable: true,
    sortType: "text",
    title: "Contact or Bank",
  },
  {
    id: "total_amount",
    accessor: "total_amount",
    
    isSortable: true,
    sortType: "number",
    title: "Amount",
  },
  {
    id: "internal_note",
    accessor: "internal_note",
    isSortable: true,
    sortType: "text",
    title: "Notes",
  },
 
  { id: "index", isActions: true, title: "", showEdit:true, showDelete:true },
];
// {
//             "id": 13,
//             "bill_id": "INV071225-0004",
//             "invoice_number": "DEC-25070014",
//             "invoice_date": "05-12-2025",
//             "invoice_date_display": "05-12-2025",
//             "user": "47c84493-ddb9-43b3-b659-370909eea472",
//             "contact": 39,
//             "invoice_type": "old_dc",
//             "supply_type": "bill_from_dispatch_from",
//             "items": [
//                 {
//                     "id": 23,
//                     "description": "Jemish Goti",
//                     "quantity": 3,
//                     "rate": "32.00",
//                     "discount": "0.00",
//                     "total": "96.00"
//                 }
//             ],
//             "total_amount": "96.00",
//             "internal_note": "ASFS",
//             "notes": "SDFS",
//             "available_invoice_numbers": [],
//             "next_invoice_number": "DEC-25050001"
//         },