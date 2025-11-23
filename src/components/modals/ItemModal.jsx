import React, { useCallback, useEffect, useState } from "react";
import withModal from "../ui/modal/withModal";
import InputField from "../form/input/InputField";
import CustomSelect from "../form/CustomSelect";
import Switch from "../form/switch/Switch";

// ITEM TYPE OPTIONS
const ITEM_TYPE_OPTIONS = [
  { value: "service", label: "Service" },
  { value: "product", label: "Product" },
  { value: "charge", label: "Charge" },
];

// UNIT MEASURE OPTIONS
const UNIT_OPTIONS = [
  { value: "Pcs", label: "Pcs" },
  { value: "Kg", label: "Kg" },
  { value: "Gram", label: "Gram" },
  { value: "Ltr", label: "Ltr" },
];

// TAX CATEGORY OPTIONS
const TAX_OPTIONS = [
  { value: "none", label: "None" },
  { value: "gst-0.25", label: "GST 0.25%" },
  { value: "gst-1", label: "GST 1%" },
  { value: "gst-3", label: "GST 3%" },
  { value: "gst-5", label: "GST 5%" },
  { value: "gst-12", label: "GST 12%" },
  { value: "gst-18", label: "GST 18%" },
  { value: "gst-28", label: "GST 28%" },
  { value: "nil-rated", label: "Nil Rated" },
  { value: "non-gst", label: "Non GST" },
  { value: "exempt", label: "Exempt" },
];

// const DISCOUNT_TYPE_OPTIONS = [
//   { value: "percentage", label: "%" },
//   { value: "flat", label: "Flat" },
// ];

const ItemModalInner = ({
  handleSubmit,
  setInternalSubmit,
  editable=null,
  submitSuccess=false,
}) => {
  const [form, setForm] = useState({
    name: "",
    item_type: "service",
    sac: "",
    unit_type: "Pcs",
    tax_category: "none",
    invoice_description: "",
    rate: "",
    with_tax: false,
    discount: "",
  });

  /** RESET FORM */
  const resetForm = () => {
    setForm({
      name: "",
      item_type: "service",
      sac: "",
      unit_type: "Pcs",
      tax_category: "none",
      invoice_description: "",
      rate: "",
      with_tax: false,
      discount: "",
    });
  };

  useEffect(() => {
    if (submitSuccess) resetForm();
  }, [submitSuccess]);

  /** SET EDIT MODE VALUES */
  useEffect(() => {
    if (editable) {
      setForm({
        name: editable.name,
        item_type: editable.type,
        sac: editable.sac,
        unit_type: editable.unit_type,
        tax_category: editable.tax_category,
        invoice_description: editable.invoice_description,
        rate: editable.rate,
        with_tax: editable.with_tax,
        discount: editable.discount,

        id: editable.id,
      });
    }
  }, [editable]);

  /** SUBMIT PAYLOAD */
  const submitData = useCallback(() => {
    const payload = {
      name: form.name,
      type: form.item_type,
      sac: form.sac,
      unit_type: form.unit_type,
      tax_category: form.tax_category,
      invoice_description: form.invoice_description,
      rate: form.rate,
      with_tax: form.with_tax,
      discount: form.discount,

      id: form.id, // only for edit
    };

    handleSubmit(payload);
  }, [form, handleSubmit]);

  useEffect(() => {
    setInternalSubmit(() => submitData);
  }, [submitData]);

  /** HANDLE INPUT CHANGE */
  const updateForm = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {/* NAME */}
        <InputField
          id="name"
          label="Item Name"
          type="text"
          value={form.name}
          onChange={(e) => updateForm("name", e.target.value)}
          required
        />

        {/* ITEM TYPE */}
        <CustomSelect
          label="Item Type"
          options={ITEM_TYPE_OPTIONS}
          value={ITEM_TYPE_OPTIONS.find((o) => o.value === form.item_type)}
          onChange={(opt) => updateForm("item_type", opt.value)}
        />

        {/* SAC */}
        <InputField
          id="sac"
          label="SAC"
          type="number"
          min={9900}
          value={form.sac}
          onChange={(e) => updateForm("sac", e.target.value)}
        />

        {/* UNIT TYPE */}
        <CustomSelect
          label="Unit of Measurement"
          options={UNIT_OPTIONS}
          value={UNIT_OPTIONS.find((o) => o.value === form.unit_type)}
          onChange={(opt) => updateForm("unit_type", opt.value)}
        />

        {/* TAX CATEGORY */}
        <CustomSelect
          label="Tax Category"
          options={TAX_OPTIONS}
          value={TAX_OPTIONS.find((o) => o.value === form.tax_category)}
          onChange={(opt) => updateForm("tax_category", opt.value)}
        />

        {/* DESCRIPTION */}
        <InputField
          id="invoice_description"
          label="Invoice Description"
          type="textarea"
          rows={4}
          value={form.invoice_description}
          onChange={(e) => updateForm("invoice_description", e.target.value)}
          coverClass="col-span-2"
        />

 <h6 className="col-span-1 sm:col-span-2 text-gray-800 dark:text-white/90">
          Sales Price
        </h6>
 <div className="col-span-1 align-middle sm:col-span-2 grid grid-cols-1 gap-x-2 sm:grid-cols-3">
        {/* RATE */}
        <InputField
          id="rate"
          label="Rate"
          type="number"
          min={0}
          value={form.rate}
          onChange={(e) => updateForm("rate", e.target.value)}
            coverClass="col-span-1"
        />

        {/* WITH TAX SWITCH */}
        <Switch
          label="With Tax"
          checked={form.with_tax}
          onChange={(val) => updateForm("with_tax", val)}
          coverClass="col-span-1"
          id="with_tax"
        />

        {/* DISCOUNT */}
        <InputField
          id="discount"
          label="Discount"
          type="number"
          min={0}
          max={form.rate}
          value={form.discount}
          onChange={(e) => updateForm("discount", e.target.value)}
            coverClass="col-span-1"
        />
        </div>
      </div>
    </>
  );
};

const ItemModal = withModal(ItemModalInner, "Add or Edit Item");
export default ItemModal;






