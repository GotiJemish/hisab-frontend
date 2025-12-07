"use client"
import React, { useEffect, useState, useTransition } from "react";

import {
  PlusIcon,
  MinusIcon,
  TrashBinIcon,
  EyeIcon,
  SaveIcon,
  InfoIcon,
} from "@/icons";




import { createInvoice, getInvoiceNumber } from "@/apis/invoice";
import { getAllContacts } from "@/apis/contacts";
import { getAllItems } from "@/apis/items";
import Button from "@/components/ui/button/Button";
import CustomSelect from "@/components/form/CustomSelect";
import InputField from "@/components/form/input/InputField";
import Form from "@/components/form/Form";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Label from "@/components/form/Label";
import { invoiceTypeOptions, supplyTypeOptions, discountOptions } from "./data";
import { dateFormate } from "@/utilities/functions";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";


const InvoiceForm = () => {
  const { showToast } = useToast();
  const date = dateFormate(new Date(), "YYYY-MM-DD");

  const { loading, setLoading } = useLoading();
const router=useRouter();
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [invoiceNoData, setInvoiceNoData] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState("");

  const [formPayload, setFormPayload] = useState({
    invoice_type: "",
    supply_type: "",
    invoice_date: date,
    contact: "",
    notes: "",
    internal_note: "",
  });

  const [addItem, setAddItem] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [item, setItem] = useState({
    item: null,
    quantity: 1,
    rate: "",
    discount: "",
  });


  /* ------------------------------ Fetch Invoice No ------------------------------ */
  const fetchInvoiceNo = async () => {
    try {
      const res = await getInvoiceNumber(date);
      setInvoiceNoData(res.data);
      setInvoiceNo(res.data.next_invoice_number);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoiceNo();
  }, [date]);

  /* ------------------------------ Load Contact Options ------------------------------ */
  const loadContactOptions = async (input) => {
    const res = await getAllContacts();
    return res.data
      .filter((c) => c.name.toLowerCase().includes(input.toLowerCase()))
      .map((c) => ({ label: c.name, value: c.id }));
  };

  /* ------------------------------ Load Item Options ------------------------------ */
  const loadItemOptions = async (input) => {
    const res = await getAllItems();
    console.log(res.data);

    return res.data
      .filter((c) => c.name.toLowerCase().includes(input.toLowerCase()))
      .map((c) => ({ label: c.name, value: c.id }));
  };

  /* ------------------------------ Update Form Fields ------------------------------ */
  const updateForm = (key, value) => {
    setFormPayload((prev) => ({ ...prev, [key]: value }));
  };

  const updateItemField = (key, value) => {
    setItem((prev) => ({ ...prev, [key]: value }));
  };

  /* ------------------------------ Qty Controls ------------------------------ */
  const incrementQty = () =>
    updateItemField("quantity", Number(item.quantity) + 1);

  const decrementQty = () =>
    item.quantity > 1 &&
    updateItemField("quantity", Number(item.quantity) - 1);

  /* ------------------------------ Save Item ------------------------------ */
  const handleSaveItem = () => {
    if (!item.item || !item.rate) {
      showToast({ message: "Please fill item details", type: "error" });
      return;
    }

    const payload = {
      item: item.item.label,
      qty: Number(item.quantity),
      rate: Number(item.rate),
      discount: Number(item.discount || 0),
    };

    setInvoiceItems((prev) => [...prev, payload]);
    setAddItem(false);

    setItem({
      item: null,
      quantity: 1,
      rate: "",
      discount: "",
    });
  };

  /* ------------------------------ Submit Invoice ------------------------------ */
  const submitInvoice = async () => {
    try {
      setLoading(true);

      const finalPayload = {
        invoice_number: invoiceNo,
        contact: formPayload.contact?.value,
        invoice_type: formPayload.invoice_type?.value,
        supply_type: formPayload.supply_type?.value,
        invoice_date: formPayload.invoice_date,
        notes: formPayload.notes || "",
        internal_note: formPayload.internal_note || "",
        items: invoiceItems.map((i) => ({
          item: i.item,
          description: i.item,
          quantity: i.qty,
          rate: i.rate,
          discount: i.discount,
        })),
      };

      const res = await createInvoice(finalPayload);

      if (res.success) {
        showToast({ message: "Invoice Created!", type: "success" });
        setFormPayload({
          invoice_type: "",
          supply_type: "",
          invoice_date: "",
          contact: "",
          notes: "",
          internal_note: "",
        })
        setItem({
          item: null,
          quantity: 1,
          rate: "",
          discount: "",
        })
        router.back()
      }
    } catch (err) {
      showToast({ message: "Error creating invoice", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------ Subtotal ------------------------------ */
  const subTotal = invoiceItems
    .reduce(
      (acc, i) =>
        acc + i.qty * i.rate - (i.qty * i.rate * i.discount) / 100,
      0
    )
    .toFixed(2);

  /* ------------------------------ UI ------------------------------ */
  return (
    <>
      <div className="flex justify-between mb-6">
        <PageBreadcrumb pageTitle="Create Invoice" />
      </div>

      <Form
        onSubmit={(e) => {
          e.preventDefault();
          submitInvoice();
        }}
        className="rounded-2xl border border-gray-200 bg-white dark:bg-white/[0.03]"
      >
        {/* ---------------- HEADER ---------------- */}
        <div className="border-b px-6 py-4">
          <CustomSelect
            label="Invoice No."
            value={{ label: invoiceNo, value: invoiceNo }}
            options={
              invoiceNoData?.missing_numbers?.map((m) => ({
                label: m,
                value: m,
              })) || []
            }
            onChange={(v) => setInvoiceNo(v?.value)}
          />
        </div>

        {/* ---------------- BASIC INFO ---------------- */}
        <div className="border-b p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            <CustomSelect
              label="Invoice Type"
              name="invoice_type"
              options={invoiceTypeOptions}
              required
              value={formPayload.invoice_type}
              onChange={(v) => updateForm("invoice_type", v)}
            />

            <CustomSelect
              label="Supply Type"
              name="supply_type"
              options={supplyTypeOptions}
              required
              value={formPayload.supply_type}
              onChange={(v) => updateForm("supply_type", v)}
            />

            <InputField
              type="date"
              label="Date"
              name="invoice_date"
              required
              value={formPayload.invoice_date}
              onChange={(e) => updateForm("invoice_date", e.target.value)}
            />

            <CustomSelect
              label="Bill To"
              name="contact"
              loadOptions={loadContactOptions}
              defaultOptions
              required
              value={formPayload.contact}
              onChange={(v) => updateForm("contact", v)}
            />

            <InputField
              type="textarea"
              name="notes"
              label="Notes"
              rows="7"
              value={formPayload.notes}
              onChange={(e) => updateForm("notes", e.target.value)}
            />

            <InputField
              type="textarea"
              name="internal_note"
              label="Internal Notes"
              rows="7"
              value={formPayload.internal_note}
              onChange={(e) => updateForm("internal_note", e.target.value)}
            />
          </div>
        </div>

        {/* ---------------- ITEM TABLE ---------------- */}
        <div className="border-b p-8">
          <div className="rounded-xl border overflow-hidden">
            <div className="custom-scrollbar overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr className="border-b">
                    <th className="px-5 py-4">S. No.</th>
                    <th className="px-5 py-4">Product</th>
                    <th className="px-5 py-4">Qty</th>
                    <th className="px-5 py-4">Rate</th>
                    <th className="px-5 py-4">Discount</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceItems.map((i, idx) => {
                    const total =
                      i.qty * i.rate - (i.qty * i.rate * i.discount) / 100;

                    return (
                      <tr key={idx} className="border-b">
                        <td className="px-5 py-4">{idx + 1}</td>
                        <td className="px-5 py-4">{i.item}</td>
                        <td className="px-5 py-4">{i.qty}</td>
                        <td className="px-5 py-4">{i.rate}</td>
                        <td className="px-5 py-4">{i.discount}%</td>
                        <td className="px-5 py-4">{total.toFixed(2)}</td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() =>
                              setInvoiceItems((prev) =>
                                prev.filter((_, id) => id !== idx)
                              )
                            }
                            className="text-gray-500 hover:text-red-500"
                          >
                            <TrashBinIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="px-5 py-4 text-center">
                <Button
                  title="Add Item"
                  startIcon={<PlusIcon />}
                  size="sm"
                  variant="outline"
                  onClick={() => setAddItem(true)}
                />
              </div>
            </div>
          </div>

          {/* ---------------- ADD NEW ITEM FORM ---------------- */}
          {addItem && (
            <div className="mt-5 border p-6 rounded-xl">

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
                <CustomSelect
                  label="Item"
                  name="item"
                  loadOptions={loadItemOptions}
                  defaultOptions
                  required
                  value={item.item}
                  onChange={(v) => updateItemField("item", v)}
                  coverClass="lg:col-span-3"
                />

                <InputField
                  type="number"
                  name="rate"
                  label="Rate"
                  value={item.rate}
                  onChange={(e) => updateItemField("rate", e.target.value)}
                  min={0}
                  placeholder="Enter Rate"
                  coverClass="lg:col-span-3"
                />

                <div className="lg:col-span-2">
                  <Label label="Quantity" />
                  <div className="flex h-11 divide-x rounded-lg border">
                    <button
                      type="button"
                      disabled={item.quantity <= 1}
                      onClick={decrementQty}
                      className="flex-1"
                    >
                      <MinusIcon />
                    </button>

                    <input
                      type="number"
                      min="1"
                      className="w-1/3 text-center"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemField("quantity", e.target.value)
                      }
                    />

                    <button type="button" onClick={incrementQty} className="flex-1">
                      <PlusIcon />
                    </button>
                  </div>
                </div>

                <CustomSelect
                  label="Discount"
                  options={discountOptions}
                  value={discountOptions.find((d) => d.value === item.discount)}
                  onChange={(v) => updateItemField("discount", v?.value)}
                  coverClass="lg:col-span-4"
                />

                <div className="flex items-end lg:col-span-2">
                  <Button
                    title="Save Product"
                    className="w-full"
                    onClick={handleSaveItem}
                  />
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <InfoIcon size={20} className="text-gray-500" />
                <p className="text-sm text-gray-500">
                  Press Enter or click "Save Product"
                </p>
              </div>
            </div>
          )}

          {/* ---------------- ORDER SUMMARY ---------------- */}
          <div className="mt-6 flex justify-end">
            <div className="space-y-2 w-[220px]">
              <p className="font-medium">Order Summary</p>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ {subTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>VAT (10%)</span>
                <span>₹ {(subTotal * 0.1).toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₹ {(subTotal * 1.1).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- ACTION BUTTONS ---------------- */}
        <div className="p-8 flex justify-end gap-3">
          <Button title="Preview Invoice" variant="outline" startIcon={<EyeIcon />} />
          <Button title="Save Invoice" startIcon={<SaveIcon />} type="submit" />
        </div>
      </Form>
    </>
  );
};

export default InvoiceForm;