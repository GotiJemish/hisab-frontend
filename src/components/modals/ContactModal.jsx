// ContactModal.jsx
import React, { useCallback, useEffect, useState } from "react";
import withModal from "../ui/modal/withModal";
import Button from "../ui/button/Button";
import InputField from "../form/input/InputField";
import Form from "../form/Form";
import Checkbox from "../form/input/Checkbox";
import MultiSelect from "../form/CustomSelect";
import CustomSelect from "../form/CustomSelect";
const multiOptions = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
  { value: "4", label: "Option 4" },
  { value: "5", label: "Option 5" },
];

const ContactModalInner = ({ handleSubmit, setInternalSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    gst: "",
    pan: "",
    notes: "",
    total_amount: "",
    payment_type: "",
    same_as_billing: false,
  });

  const [billing, setBilling] = useState({
    billing_address: "",
    billing_city: "",
    billing_state: "",
    billing_pincode: "",
    billing_country: "",
  });

  const [shipping, setShipping] = useState({
    shipping_address: "",
    shipping_city: "",
    shipping_state: "",
    shipping_pincode: "",
    shipping_country: "",
  });

  const sameAsBilling = form.same_as_billing;

  /** --------------------------------------------------
   * SYNC SHIPPING WHEN SAME-AS-BILLING IS TRUE
   * -------------------------------------------------- */
  useEffect(() => {
    if (sameAsBilling) {
      setShipping({
        shipping_address: billing.billing_address,
        shipping_city: billing.billing_city,
        shipping_state: billing.billing_state,
        shipping_pincode: billing.billing_pincode,
        shipping_country: billing.billing_country,
      });
    }
  }, [sameAsBilling, billing]);

  /** --------------------------------------------------
   * SUBMIT HANDLER
   * -------------------------------------------------- */
  const submitData = useCallback(() => {
    const payload = {
      ...form,
      billing_address: billing,
      shipping_address: sameAsBilling ? billing : shipping,
    };

    handleSubmit(payload);
  }, [form, billing, shipping, sameAsBilling, handleSubmit]);

  useEffect(() => {
    setInternalSubmit(() => submitData);
  }, [submitData]);

  /** --------------------------------------------------
   * GENERIC CHANGERS
   * -------------------------------------------------- */
  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (field, value) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
  };

  const handleShippingChange = (field, value) => {
    if (sameAsBilling) return;
    setShipping((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        {/* FORM FIELDS */}
        <InputField
          id="name"
          name="name"
          label="Name"
          type="text"
          value={form.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
          placeholder="Enter Name"
          required
          coverClass="col-span-1"
        />

        <InputField
          id="mobile"
          name="mobile"
          label="Mobile"
          type="text"
          value={form.mobile}
          onChange={(e) => handleFormChange("mobile", e.target.value)}
          placeholder="Enter Mobile"
          required
          coverClass="col-span-1"
        />

        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleFormChange("email", e.target.value)}
          placeholder="Enter Email"
          coverClass="col-span-1"
        />

        <div />

        <InputField
          id="gst"
          name="gst"
          label="GSTIN"
          type="text"
          value={form.gst}
          onChange={(e) => handleFormChange("gst", e.target.value)}
          placeholder="Enter GST Number"
          coverClass="col-span-1"
        />

        <InputField
          id="pan"
          name="pan"
          label="PAN No."
          type="text"
          value={form.pan}
          onChange={(e) => handleFormChange("pan", e.target.value)}
          placeholder="Enter PAN"
          coverClass="col-span-1"
        />

        {/* BILLING - SHIPPING HEADINGS */}
        <h6 className="col-span-1 text-gray-800 dark:text-white/90">
          Billing Address
        </h6>

        <div className="col-span-1 grid grid-cols-1 gap-x-2 sm:grid-cols-2">
          <h6 className="text-gray-800 dark:text-white/90">Shipping Address</h6>

          <Checkbox
            label="Same as billing address"
            checked={sameAsBilling}
            onChange={() => handleFormChange("same_as_billing", !sameAsBilling)}
          />
        </div>

        {/* BILLING START */}
        <div className="col-span-1 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <InputField
            label="Address"
            id="billing_address"
            type="text"
            value={billing.billing_address}
            onChange={(e) =>
              handleBillingChange("billing_address", e.target.value)
            }
            coverClass="col-span-1 sm:col-span-2"
          />

          <CustomSelect
            label="City"
            id="billing_city"
            options={multiOptions}
            value={multiOptions.find((o) => o.value === billing.billing_city)}
            onChange={(opt) => handleBillingChange("billing_city", opt?.value)}
            coverClass="col-span-1"
          />

          <InputField
            id="billing_pincode"
            label="Pin Code"
            type="number"
            value={billing.billing_pincode}
            onChange={(e) =>
              handleBillingChange("billing_pincode", e.target.value)
            }
            stepHidden
            coverClass="col-span-1"
          />

          <CustomSelect
            label="State"
            id="billing_state"
            options={multiOptions}
            value={multiOptions.find((o) => o.value === billing.billing_state)}
            onChange={(opt) => handleBillingChange("billing_state", opt?.value)}
            coverClass="col-span-1"
          />

          <CustomSelect
            label="Country"
            id="billing_country"
            coverClass="col-span-1"
            options={multiOptions}
            value={multiOptions.find(
              (o) => o.value === billing.billing_country
            )}
            onChange={(opt) =>
              handleBillingChange("billing_country", opt?.value)
            }
          />
        </div>

        {/* SHIPPING */}
        <div className="col-span-1 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <InputField
            label="Address"
            id="shipping_address"
            type="text"
            value={shipping.shipping_address}
            disabled={sameAsBilling}
            onChange={(e) =>
              handleShippingChange("shipping_address", e.target.value)
            }
            coverClass="col-span-1 sm:col-span-2"
          />

          <CustomSelect
            label="City"
            id="shipping_city"
            disabled={sameAsBilling}
            options={multiOptions}
            value={multiOptions.find((o) => o.value === shipping.shipping_city)}
            onChange={(opt) =>
              handleShippingChange("shipping_city", opt?.value)
            }
            coverClass="col-span-1"
          />

          <InputField
            id="shipping_pincode"
            label="Pin Code"
            type="number"
            value={shipping.shipping_pincode}
            disabled={sameAsBilling}
            onChange={(e) =>
              handleShippingChange("shipping_pincode", e.target.value)
            }
            stepHidden
            coverClass="col-span-1"
          />

          <CustomSelect
            label="State"
            id="shipping_state"
            disabled={sameAsBilling}
            options={multiOptions}
            value={multiOptions.find(
              (o) => o.value === shipping.shipping_state
            )}
            onChange={(opt) =>
              handleShippingChange("shipping_state", opt?.value)
            }
            coverClass="col-span-1"
          />

          <CustomSelect
            label="Country"
            id="shipping_country"
            disabled={sameAsBilling}
            options={multiOptions}
            value={multiOptions.find(
              (o) => o.value === shipping.shipping_country
            )}
            onChange={(opt) =>
              handleShippingChange("shipping_country", opt?.value)
            }
            coverClass="col-span-1"
          />
        </div>

        {/* Opening Balance */}
        <h6 className="col-span-1 sm:col-span-2 text-gray-800 dark:text-white/90">
          Opening Balance
        </h6>
        <div className="col-span-1 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <InputField
            id="total_amount"
            label="Total Amount"
            type="number"
            value={form.total_amount}
            min={0}
            onChange={(e) => handleFormChange("total_amount", e.target.value)}
            coverClass="col-span-1"
          />

          <CustomSelect
            label="Payment Type"
            id="payment_type"
            options={multiOptions}
            value={multiOptions.find((o) => o.value === form.payment_type)}
            onChange={(opt) => handleFormChange("payment_type", opt?.value)}
            coverClass="col-span-1"
          />
        </div>
        <InputField
          id="notes"
          name="notes"
          label="Notes"
          type="textarea"
          rows={6}
          value={form.notes}
          onChange={(e) => handleFormChange("notes", e.target.value)}
          coverClass="col-span-1 sm:col-span-2"
        />
      </div>
    </>
  );
};

const ContactModal = withModal(ContactModalInner, "Add or Edit Event");
export default ContactModal;
{
  /* <div class="col-span-1">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Last Name
            </label>
            <input type="text" placeholder="Chowdhury" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
          </div>

          <div class="col-span-1">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Email Address
            </label>
            <input type="email" placeholder="randomuser@pimjo.com" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
          </div>

          <div class="col-span-1">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Phone
            </label>
            <input type="text" placeholder="+09 363 398 46" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
          </div>

          <div class="col-span-1 sm:col-span-2">
            <label class="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
              Bio
            </label>
            <input type="text" placeholder="Team Manager" class="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
          </div> */
}
