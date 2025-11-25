"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import { PlusIcon, SearchIcon } from "@/icons";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import CustomTable from "@/components/ui/table/CustomTable";
import ConfirmationModal from "@/components/modals/ConfirmationModal";


import { MAIN_TABLE_COLUMNS } from "./constants";
import {
  createItem,
  deleteItemApi,
  getAllItems,
  updateItem,
} from "@/apis/items";
import { getAllInvoices } from "@/apis/invoice";
import Link from "next/link";
import { usePathname } from "next/navigation";

const InvoiceModule = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();
const path=usePathname()
  const [invoice, setInvoices] = useState([]);
  const [editableItem, setEditableItem] = useState({
    isEdit: false,
    data: null,
  });
  const [deleteState, setDeleteState] = useState({
    isConfirm: false,
    id: null,
  });

  const userId=localStorage.getItem("userId")
  // --------------------------------------------------------------------
  // FETCH ITEMS
  // --------------------------------------------------------------------
  const fetchAllInvoices = async () => {
    try {
      setLoading(true);
      const res = await getAllInvoices();
      setInvoices(res?.data ?? []);
    } catch (error) {
      showToast({ message: "Failed to fetch items.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  // --------------------------------------------------------------------
  // EDIT
  // --------------------------------------------------------------------
  const handleEdit = (item) => {
    setEditableItem({ isEdit: true, data: item });
    openModal();
  };

  // --------------------------------------------------------------------
  // DELETE
  // --------------------------------------------------------------------
  const handleDelete = (id) => {
    setDeleteState({ isConfirm: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteState;
    if (!id) return;

    const prevItems = [...items];
    setInvoices((prev) => prev.filter((i) => i.id !== id));

    try {
      setLoading(true);
      const res = await deleteItemApi(id);

      if (res?.success) {
        showToast({ message: "Item deleted successfully!", type: "success" });
        fetchAllInvoices();
      }
    } catch (error) {
      setInvoices(prevItems);
      showToast({ message: "Failed to delete item.", type: "error" });
    } finally {
      setLoading(false);
      setDeleteState({ isConfirm: false, id: null });
    }
  };

  // --------------------------------------------------------------------
  // useActionState SUBMIT HANDLER
  // --------------------------------------------------------------------
  const submitItem = async (prevState, payload) => {
    const isEdit = !!payload.id;
    const previous = [...items];

    try {
      setLoading(true);

      // OPTIMISTIC UPDATE
      setInvoices((prev) =>
        isEdit
          ? prev.map((i) => (i.id === payload.id ? { ...i, ...payload } : i))
          : [...prev, { ...payload, id: Date.now() }]
      );

      // API REQUEST
      const res = isEdit
        ? await updateItem(payload.id, payload)
        : await createItem(payload);

      if (res?.success) {
        fetchAllInvoices();
      }

      showToast({
        message: isEdit ? "Item updated!" : "Item added!",
        type: "success",
      });

      closeModal();

      return { success: true };
    } catch (err) {
      setInvoices(previous);
      showToast({
        message: "Failed to save item.",
        type: "error",
      });
      return { success: false };
    } finally {
      setEditableItem({ isEdit: false, data: null });
      setLoading(false);
    }
  };




  return (
    <>
      <div className="flex justify-between mb-6">
        <PageBreadcrumb pageTitle="Invoices" />
        <Button
          title="Add Invoice"
          startIcon={<PlusIcon />}
          as={Link}
          href={`${path}/create`}
        />
      </div>

      {/* <div className="mx-auto max-w-(--breakpoint-2xl) p-4 pb-20 md:p-6 md:pb-6">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
            <h2
              className="text-xl font-semibold text-gray-800 dark:text-white/90"
              x-text="pageName"
            >
              Invoices
            </h2>
            <nav>
              <ol className="flex items-center gap-1.5">
                <li>
                  <a
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
                    href="index.html"
                  >
                    Home
                    <svg
                      className="stroke-current"
                      width={17}
                      height={16}
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </li>
                <li
                  className="text-sm text-gray-800 dark:text-white/90"
                  x-text="pageName"
                >
                  Invoices
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div> */}

      <div>
        {/* <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-800 dark:text-white/90">
                Overview
              </h2>
            </div>
            <div>
              <a
                href="create-invoice.html"
                className="bg-brand-500 shadow-theme-xs hover:bg-brand-600 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M5 10.0002H15.0006M10.0002 5V15.0006"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Create an Invoice
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 rounded-xl border border-gray-200 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-y-0 dark:divide-gray-800 dark:border-gray-800">
            <div className="border-b p-5 sm:border-r lg:border-b-0">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
                Overdue
              </p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">
                $120.80
              </h3>
            </div>
            <div className="border-b p-5 lg:border-b-0">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
                Due within next 30 days
              </p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">
                0.00
              </h3>
            </div>
            <div className="border-b p-5 sm:border-r sm:border-b-0">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
                Average time to get paid
              </p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">
                24 days
              </h3>
            </div>
            <div className="p-5">
              <p className="mb-1.5 text-sm text-gray-400 dark:text-gray-500">
                Upcoming Payout
              </p>
              <h3 className="text-3xl text-gray-800 dark:text-white/90">
                $3,450.50
              </h3>
            </div>
          </div>
        </div> */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-800">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                Invoices
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your most recent invoices list
              </p>
            </div>

            <div className="flex gap-3.5">
              <div className="hidden h-11 items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 lg:inline-flex dark:bg-gray-900">
                {/* className="filterStatus === 'All' ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800' : 'text-gray-500 dark:text-gray-400'" */}
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900  dark:hover:text-white shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800">
                  All Invoices
                </button>
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">
                  All Invoices
                </button>
                <button className="text-theme-sm h-10 rounded-md px-3 py-2 font-medium hover:text-gray-900 dark:hover:text-white text-gray-500 dark:text-gray-400">
                  All Invoices
                </button>
              </div>
              <div className="hidden flex-col gap-3 sm:flex sm:flex-row sm:items-center">
                <div className="relative">
                  <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    
                    <SearchIcon/>
                  </span>

                  <input
                    type="text"
                    placeholder="Search..."
                    className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                  />
                </div>
                

                <div className="relative" x-data="{ showFilter: false }">
                  <button
                    className="shadow-theme-xs flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 sm:w-auto sm:min-w-[100px] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M14.6537 5.90414C14.6537 4.48433 13.5027 3.33331 12.0829 3.33331C10.6631 3.33331 9.51206 4.48433 9.51204 5.90415M14.6537 5.90414C14.6537 7.32398 13.5027 8.47498 12.0829 8.47498C10.663 8.47498 9.51204 7.32398 9.51204 5.90415M14.6537 5.90414L17.7087 5.90411M9.51204 5.90415L2.29199 5.90411M5.34694 14.0958C5.34694 12.676 6.49794 11.525 7.91777 11.525C9.33761 11.525 10.4886 12.676 10.4886 14.0958M5.34694 14.0958C5.34694 15.5156 6.49794 16.6666 7.91778 16.6666C9.33761 16.6666 10.4886 15.5156 10.4886 14.0958M5.34694 14.0958L2.29199 14.0958M10.4886 14.0958L17.7087 14.0958"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                    Filter
                  </button>
                  <div
                    className="absolute right-0 z-10 mt-2 w-56 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    style={{ display: "none" }}
                  >
                    <div className="mb-5">
                      <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
                        Category
                      </label>
                      <input
                        type="text"
                        className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                        placeholder="Search category..."
                      />
                    </div>
                    <div className="mb-5">
                      <label className="mb-2 block text-xs font-medium text-gray-700 dark:text-gray-300">
                        Customer
                      </label>
                      <input
                        type="text"
                        className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-10 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                        placeholder="Search customer..."
                      />
                    </div>
                    <button className="bg-brand-500 hover:bg-brand-600 h-10 w-full rounded-lg px-3 py-2 text-sm font-medium text-white">
                      Apply
                    </button>
                  </div>
                </div>
                <button className="shadow-theme-xs flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M16.6671 13.3333V15.4166C16.6671 16.1069 16.1074 16.6666 15.4171 16.6666H4.58301C3.89265 16.6666 3.33301 16.1069 3.33301 15.4166V13.3333M10.0013 3.33325L10.0013 13.3333M6.14553 7.18708L9.99958 3.33549L13.8539 7.18708"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  Export
                </button>
              </div>
            </div>
          </div>
          <CustomTable
            isSelectable
            coverClass="border-0"
            data={[]}
            columns={MAIN_TABLE_COLUMNS}
            hasActions
            hasmultipleActions
            action={{
              onEdit: handleEdit,
              onDelete: (row) => handleDelete(row.id),
            }}
          />
        </div>
      </div>

      {/* <CustomTable
        isSelectable
        data={items}
        columns={MAIN_TABLE_COLUMNS}
        hasActions
        hasmultipleActions
        action={{
          onEdit: handleEdit,
          onDelete: (row) => handleDelete(row.id),
        }}
      /> */}

  
      {/* DELETE CONFIRMATION */}
      <ConfirmationModal
        isOpen={deleteState.isConfirm}
        onClose={() => setDeleteState({ isConfirm: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
};

export default InvoiceModule;

function invoiceTable() {
  return {
    invoices: [
      {
        id: 1,
        number: "#323534",
        customer: "Lindsey Curtis",
        creationDate: "August 7, 2028",
        dueDate: "February 28, 2028",
        total: 999,
        status: "Paid",
      },
      {
        id: 2,
        number: "#323535",
        customer: "John Doe",
        creationDate: "July 1, 2028",
        dueDate: "January 1, 2029",
        total: 1200,
        status: "Unpaid",
      },
      {
        id: 3,
        number: "#323536",
        customer: "Jane Smith",
        creationDate: "June 15, 2028",
        dueDate: "December 15, 2028",
        total: 850,
        status: "Draft",
      },
      {
        id: 4,
        number: "#323537",
        customer: "Michael Brown",
        creationDate: "May 10, 2028",
        dueDate: "November 10, 2028",
        total: 1500,
        status: "Paid",
      },
      {
        id: 5,
        number: "#323538",
        customer: "Emily Davis",
        creationDate: "April 5, 2028",
        dueDate: "October 5, 2028",
        total: 700,
        status: "Unpaid",
      },
      {
        id: 6,
        number: "#323539",
        customer: "Chris Wilson",
        creationDate: "March 1, 2028",
        dueDate: "September 1, 2028",
        total: 1100,
        status: "Paid",
      },
      {
        id: 7,
        number: "#323540",
        customer: "Jessica Lee",
        creationDate: "February 20, 2028",
        dueDate: "August 20, 2028",
        total: 950,
        status: "Draft",
      },
      {
        id: 8,
        number: "#323541",
        customer: "David Kim",
        creationDate: "January 15, 2028",
        dueDate: "July 15, 2028",
        total: 1300,
        status: "Paid",
      },
      {
        id: 9,
        number: "#323542",
        customer: "Sarah Clark",
        creationDate: "December 10, 2027",
        dueDate: "June 10, 2028",
        total: 800,
        status: "Unpaid",
      },
      {
        id: 10,
        number: "#323543",
        customer: "Matthew Lewis",
        creationDate: "November 5, 2027",
        dueDate: "May 5, 2028",
        total: 1400,
        status: "Paid",
      },
      {
        id: 11,
        number: "#323544",
        customer: "Olivia Walker",
        creationDate: "October 1, 2027",
        dueDate: "April 1, 2028",
        total: 1200,
        status: "Draft",
      },
      {
        id: 12,
        number: "#323545",
        customer: "Daniel Hall",
        creationDate: "September 20, 2027",
        dueDate: "March 20, 2028",
        total: 1000,
        status: "Paid",
      },
      {
        id: 13,
        number: "#323546",
        customer: "Sophia Allen",
        creationDate: "August 15, 2027",
        dueDate: "February 15, 2028",
        total: 900,
        status: "Unpaid",
      },
      {
        id: 14,
        number: "#323547",
        customer: "James Young",
        creationDate: "July 10, 2027",
        dueDate: "January 10, 2028",
        total: 1600,
        status: "Paid",
      },
      {
        id: 15,
        number: "#323548",
        customer: "Ava Hernandez",
        creationDate: "June 5, 2027",
        dueDate: "December 5, 2027",
        total: 1050,
        status: "Draft",
      },
      {
        id: 16,
        number: "#323549",
        customer: "William King",
        creationDate: "May 1, 2027",
        dueDate: "November 1, 2027",
        total: 1150,
        status: "Paid",
      },
      {
        id: 17,
        number: "#323550",
        customer: "Mia Wright",
        creationDate: "April 20, 2027",
        dueDate: "October 20, 2027",
        total: 980,
        status: "Unpaid",
      },
      {
        id: 18,
        number: "#323551",
        customer: "Benjamin Lopez",
        creationDate: "March 15, 2027",
        dueDate: "September 15, 2027",
        total: 1250,
        status: "Paid",
      },
      {
        id: 19,
        number: "#323552",
        customer: "Charlotte Hill",
        creationDate: "February 10, 2027",
        dueDate: "August 10, 2027",
        total: 890,
        status: "Draft",
      },
      {
        id: 20,
        number: "#323553",
        customer: "Elijah Scott",
        creationDate: "January 5, 2027",
        dueDate: "July 5, 2027",
        total: 1350,
        status: "Paid",
      },
      {
        id: 21,
        number: "#323554",
        customer: "Amelia Green",
        creationDate: "December 1, 2026",
        dueDate: "June 1, 2027",
        total: 1020,
        status: "Unpaid",
      },
      {
        id: 22,
        number: "#323555",
        customer: "Lucas Adams",
        creationDate: "November 20, 2026",
        dueDate: "May 20, 2027",
        total: 1120,
        status: "Paid",
      },
      {
        id: 23,
        number: "#323556",
        customer: "Harper Nelson",
        creationDate: "October 15, 2026",
        dueDate: "April 15, 2027",
        total: 970,
        status: "Draft",
      },
      {
        id: 24,
        number: "#323557",
        customer: "Henry Carter",
        creationDate: "September 10, 2026",
        dueDate: "March 10, 2027",
        total: 1280,
        status: "Paid",
      },
      {
        id: 25,
        number: "#323558",
        customer: "Evelyn Mitchell",
        creationDate: "August 5, 2026",
        dueDate: "February 5, 2027",
        total: 1080,
        status: "Unpaid",
      },
    ],
    selected: [],
    sortBy: "number",
    sortDirection: "asc",
    currentPage: 1,
    itemsPerPage: 10,
    filterStatus: "All",
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selected = [];
      } else {
        this.selected = this.paginatedInvoices.map((i) => i.id);
      }
    },
    toggleRow(id) {
      if (this.selected.includes(id)) {
        this.selected = this.selected.filter((i) => i !== id);
      } else {
        this.selected.push(id);
      }
    },
    get isAllSelected() {
      return (
        this.paginatedInvoices.length > 0 &&
        this.paginatedInvoices.every((i) => this.selected.includes(i.id))
      );
    },
    sort(field) {
      if (this.sortBy === field) {
        this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
      } else {
        this.sortBy = field;
        this.sortDirection = "asc";
      }
    },
    get filteredInvoices() {
      if (this.filterStatus === "All") return this.invoices;
      return this.invoices.filter((i) => i.status === this.filterStatus);
    },
    get sortedInvoices() {
      return this.filteredInvoices.slice().sort((a, b) => {
        let valA = a[this.sortBy];
        let valB = b[this.sortBy];
        if (this.sortBy === "total") {
          valA = Number(valA);
          valB = Number(valB);
        }
        if (valA < valB) return this.sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    },
    get paginatedInvoices() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedInvoices.slice(start, end);
    },
    get totalPages() {
      return Math.ceil(this.invoices.length / this.itemsPerPage);
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    get visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  };
}
