"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomSelect from "@/components/form/CustomSelect";
import Form from "@/components/form/Form";
import InputField from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeIcon, InfoIcon, MinusIcon, PlugInIcon, PlusIcon, SaveIcon, TrashBinIcon } from "@/icons";
import React, { useActionState, useState, useTransition } from "react";
export const invoiceTypeOptions = [{ value: 'default', label: 'Default' },
{ value: 'delivery_challan', label: 'Delivery Challan' },
{ value: 'old_dc', label: 'OLD DC' }]
export const supplyTypeOptions = [{ value: 'regular', label: 'Regular' },
{ value: 'bill_to_ship_to', label: 'Bill To - Ship To' },
{ value: 'bill_from_dispatch_from', label: 'Bill From - Dispatch From' },
{ value: 'a_party', label: '4 Party Transaction' }]
export const paymentConditions = [
  { value: "", label: "Select Payment Condition" },
  { value: "net-7", label: "Net 7 Days" },
  { value: "net-15", label: "Net 15 Days" },
  { value: "net-30", label: "Net 30 Days" },
  { value: "net-60", label: "Net 60 Days" },
  { value: "net-90", label: "Net 90 Days" },
  { value: "due-on-receipt", label: "Due on Receipt" },
  { value: "cash-on-delivery", label: "Cash on Delivery (COD)" },
];
export const currencyOptions = [
  { value: "", label: "Select Currency" },
  { value: "usd", label: "United States Dollar (USD)" },
  { value: "eur", label: "Euro (EUR)" },
  { value: "gbp", label: "British Pound (GBP)" },
  { value: "jpy", label: "Japanese Yen (JPY)" },
  { value: "cad", label: "Canadian Dollar (CAD)" },
  { value: "aud", label: "Australian Dollar (AUD)" },
  { value: "chf", label: "Swiss Franc (CHF)" },
  { value: "cny", label: "Chinese Yuan (CNY)" },
  { value: "inr", label: "Indian Rupee (INR)" },
];
export const discountOptions = [
  { value: 0, label: "0%" },
  { value: 10, label: "10%" },
  { value: 20, label: "20%" },
  { value: 50, label: "50%" },
];
export const itemsOption = [{ value: "", label: "Select Currency" },
{ value: "usd", label: "United States Dollar (USD)" },
{ value: "eur", label: "Euro (EUR)" },]

const InvoiceForm = () => {
  const [addItem, setAddItem] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // ─────────────────────────────────────────────
  // SAVE PRODUCT HANDLER
  // ─────────────────────────────────────────────
  const handleAddItem = (payload) => {
    setInvoiceItems((prev) => [...prev, payload]);
    setAddItem(false);
  };
  // ─────────────────────────────────────────────
  // SAVE INVOICE HANDLER
  // ─────────────────────────────────────────────
  const submitInvoice = async (payload) => {
    try {
      setLoading(true);

      const dataToSend = {
        ...payload,
        items: invoiceItems,
      };

      const res = await createInvoice(dataToSend);

      if (res?.success) {
        showToast({
          message: "Invoice Created!",
          type: "success",
        });
      }
    } catch (err) {
      showToast({
        message: "Error creating invoice",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between mb-6">
        <PageBreadcrumb pageTitle="Create Invoice" />
      </div>
      <Form onSubmit={(e, payload) => {
        e.preventDefault();
        submitInvoice(payload);
      }} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
          {/* ---------------- FORM HEADER ---------------- */}
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-800">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white">
            Create Invoice
          </h2>
        </div>
        {/* ---------------- BASIC INFO ---------------- */}
        <div className="border-b border-gray-200 p-4 sm:p-8 dark:border-gray-800">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <CustomSelect label="Invoice Type" name="invoice_type" options={invoiceTypeOptions} required />

            <CustomSelect label="Supply Type" name="supply_type" options={supplyTypeOptions} required />

            <InputField type="date" id="date" name="date" label="Date" required />

            <InputField id="invoice_number" name="invoice_number" label="Invoice Number" placeholder="WP-3434434" />

            <InputField type="textarea" id="notes" name="notes" label="Notes" rows="7" />

            <InputField type="textarea" id="internal_note" name="internal_note" label="Internal Notes" rows="7" />
         
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 p-4 sm:p-8 dark:border-gray-800">
          <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
            <div className="custom-scrollbar overflow-x-auto">
              <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr className="border-b border-gray-100 whitespace-nowrap dark:border-gray-800">
                    <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      S. No.
                    </th>
                    <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-500 dark:text-gray-400">
                      Products
                    </th>
                    <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Quantity
                    </th>
                    <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Unit Cost
                    </th>
                    <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Discount
                    </th>
                    <th className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Total
                    </th>
                    <th className="relative px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-400">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
 {invoiceItems.map((item, i) => {
                    const total =
                      item.qty * item.rate -
                      (item.rate * item.qty * item.discount) / 100;

                    return (
 <tr key={i}>
                    <td
                      className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                      x-text="idx + 1"
                    >
                      {i + 1}
                    </td>
                    <td
                      className="px-5 py-4 text-sm font-medium whitespace-nowrap text-gray-800 dark:text-white/90"
                      x-text="product.name"
                    >
                     {item.item}
                    </td>
                    <td
                      className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                      x-text="product.quantity"
                    >
                     {item.qty}
                    </td>
                    <td
                      className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                      x-text="'$' + product.price"
                    >
                     {item.rate}
                    </td>
                    <td
                      className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                      x-text="product.discount + '%' "
                    >
                      {item.discount}%
                    </td>
                    <td
                      className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400"
                      x-text="'$' + product.total"
                    >
                      {total.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center">

                        <button
                          className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500"
                           onClick={() =>
                              setInvoiceItems((prev) =>
                                prev.filter((_, idx) => idx !== i)
                              )
                            }
                        >
                          <TrashBinIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                    )})}


                  

                </tbody>
              </table>

              <div className="px-5 py-4 text-center text-gray-400">
                <Button title="Add Item" startIcon={<PlusIcon />} size="sm" variant="outline" onClick={() => setAddItem(true)} />
              </div>
            </div>
          </div>
          {addItem && <div className="mt-5 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
            <Form  onSubmit={(e, payload) => {
                  e.preventDefault();
                  handleAddItem(payload);
                }}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">

                
                <CustomSelect  label="Item"
                    name="item"
                    options={itemsOption}
                    required coverClass="w-full lg:col-span-3" />

                <InputField
                  id="rate"
                  type="number"
                  name="rate"
                  min={0}
                  label="Rate"
                  stepHidden
                  placeholder="Enter product Rate"
                  coverClass="w-full lg:col-span-3"
                />
                {/* <div className="w-full lg:col-span-3">
                  <label className="mb-1 inline-block text-sm font-semibold text-gray-700 dark:text-gray-400">
                    Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter product price"
                    className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                    required=""
                  />
                </div> */}
                <div className="w-full lg:col-span-2">
                  {/* <label className="mb-1 inline-block text-sm font-semibold text-gray-700 dark:text-gray-400">
                    Quantity
                  </label> */}
                  <Label htmlFor="qty" label="Quantity" />
                  <div className="flex h-11 divide-x divide-gray-300 overflow-hidden rounded-lg border border-gray-300 dark:divide-gray-800 dark:border-gray-700">
                    <button
                      type="button"
                      className="inline-flex w-1/3 items-center justify-center bg-white text-gray-700 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <MinusIcon />
                    </button>
                    <div className="w-1/3">
                      <input
                        type="number"
                        min="1"
                        id="qty"
                        name="qty"
                        className="h-full w-full border-0 bg-white text-center text-sm text-gray-700 outline-none focus:ring-0 dark:bg-gray-900 dark:text-gray-400 step-hidden"
                      />
                    </div>
                    <button
                      type="button"
                      className="inline-flex w-1/3 items-center justify-center bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <PlusIcon size={24} />
                    </button>
                  </div>
                </div>


                <CustomSelect label="Discount" options={discountOptions} coverClass="w-full lg:col-span-4" />
                <InputField type="textarea" id="internal_note" label="Internal Notes" placeholder="Internal Notes" rows="7" coverClass="w-full lg:col-span-12" />

                <div className="flex w-full items-end lg:col-span-2">
                  <Button type="submit" title="Save Product" size="sm" className="w-full" />
                </div>
              </div>
            </Form>
            <div className="mt-5 flex max-w-2xl items-center gap-2">

              <InfoIcon size={20} className="text-gray-500 dark:text-gray-400" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                After filling in the product details, press Enter/Return or
                click 'Save Product' to add it to the list.
              </p>
            </div>
          </div>}


          <div className="flex flex-wrap justify-between sm:justify-end">
            <div className="mt-6 w-full space-y-1 text-right sm:w-[220px]">
              <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
                Order summary
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between gap-5">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Sub Total
                  </span>
                  <span
                    className="text-sm font-medium text-gray-700 dark:text-gray-400"
                    x-text="'$' + subtotal"
                  >
                    ₹
                    {invoiceItems
                      .reduce(
                        (acc, item) =>
                          acc +
                          item.qty * item.rate -
                          (item.qty * item.rate * item.discount) / 100,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Vat (10%):
                  </span>
                  <span
                    className="text-sm font-medium text-gray-700 dark:text-gray-400"
                    x-text="'$' + vat"
                  >
                    $385.00
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="font-medium text-gray-700 dark:text-gray-400">
                    Total
                  </span>
                  <span
                    className="text-lg font-semibold text-gray-800 dark:text-white/90"
                    x-text="'$' + total"
                  >
                    $4235.00
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button title="Preview Invoice" startIcon={<EyeIcon />} size="sm" variant="outline" />
            <Button title="Save Invoice" startIcon={<SaveIcon />} size="sm" type="submit" />
          </div>
        </div>
      </Form>

    </>
  );
};

export default InvoiceForm;
// {
//   "contact": 1,                   // ID of the contact
//   "invoice_type": "default",      // "default", "delivery_challan", "proforma", or "credit_note"
//   "supply_type": "regular",       // "regular", "bill_to_ship_to", "bill_from_dispatch_from", "a_party"
//   "invoice_date": "2025-11-30",
//   "notes": "This is a test invoice",
//   "internal_note": "Internal note for accounting",
//   "items": [
//     {
//       "description": "Item 1",
//       "quantity": 2,
//       "rate": 500,
//       "discount": 50
//     },
//     {
//       "description": "Item 2",
//       "quantity": 1,
//       "rate": 1000,
//       "discount": 0
//     }
//   ]
// }
