// ContactModal.jsx
import React, { useEffect, useState } from "react";
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
const ContactModalInner = ({handleSubmit }) => {
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    gst: "",
    pan: "",
    notes: "",
    amount: "",
    amount_type: "",
  });
  // Billing Address State
  const [billing, setBilling] = useState({
    address1: "",
    address2: "",
    city: "",
    pin: "",
    state: "",
    country: "",
  });

  // Shipping Address State
  const [shipping, setShipping] = useState({
    address1: "",
    address2: "",
    city: "",
    pin: "",
    state: "",
    country: "",
  });

  /** -----------------------------
   * SYNC BILLING → SHIPPING
   * ----------------------------- */
  useEffect(() => {
    if (sameAsBilling) {
      setShipping({ ...billing });
    }
  }, [sameAsBilling, billing]);

  /** -----------------------------
   * GENERIC INPUT HANDLERS
   * ----------------------------- */
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

  /** -----------------------------
   * SUBMIT FUNCTION
   * ----------------------------- */
  const submitData = () => {
    const data = {
      ...form,
      billing_address: billing,
      shipping_address: sameAsBilling ? billing : shipping,
    };

    handleSubmit(data);  // ⬅️ Send to parent  
  };
  return (
    <>
      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
        <InputField
          id="name"
          name="name"
          label="Name"
          type="text"
          onChange={() => {}}
          placeholder="Enter Name"
          required
          coverClass="col-span-1"
        />
        <InputField
          id="mobile"
          name="mobile"
          label="Mobile"
          type="text"
          onChange={() => {}}
          placeholder="Enter Mobile"
          required
          coverClass="col-span-1"
        />
        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          onChange={() => {}}
          placeholder="Enter Email"
          coverClass="col-span-1"
        />
        <div className="col-span-1"></div>
        <InputField
          id="gst"
          name="gst"
          label="GSTIN"
          type="text"
          onChange={() => {}}
          placeholder="Enter GST Number"
          coverClass="col-span-1"
        />
        <InputField
          id="pan"
          name="pan"
          label="PAN No."
          type="text"
          onChange={() => {}}
          placeholder="PAN No."
          coverClass="col-span-1"
        />
        <h6 className="col-span-1 text-gray-800 dark:text-white/90">
          Billing Address
        </h6>
        <div className="col-span-1 grid grid-cols-1 gap-x-2 sm:grid-cols-2">
          <h6 className="text-gray-800 dark:text-white/90">Shipping Address</h6>
          <Checkbox
            label="Same as biling address"
            checked={sameAsBilling}
            onChange={(e) => setSameAsBilling(!sameAsBilling)}
          />
        </div>

        <div className="col-span-1 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <InputField
            id="billing_address_1"
            name="billing_address_1"
            label="Address Line 1"
            type="text"
            value={billing.address1}
            onChange={(e) => handleBillingChange("address1", e.target.value)}
            placeholder="12,abc,skjdn"
            coverClass="col-span-1 sm:col-span-2"
          />
          <InputField
            id="billing_address_2"
            name="billing_address_2"
            label="Address Line 2"
            type="text"
            value={billing.address2}
            onChange={(e) => handleBillingChange("address2", e.target.value)}
            placeholder="12,abc,skjdn"
            coverClass="col-span-1 sm:col-span-2"
          />

          <CustomSelect
            label="City"
            placeholder="select city"
            required
            options={multiOptions}
            onChange={(opt) => handleBillingChange("city", opt?.value)}
            coverClass="col-span-1"
            id="billing_city"
          />
          <InputField
            id="billing_pin"
            name="pin"
            label="Pin code"
            type="number"
            onChange={(e) => handleBillingChange("pin", e.target.value)}
            placeholder="148545"
            stepHidden
            coverClass="col-span-1"
          />

          <CustomSelect
            label="State"
            id="billing_state"
            placeholder="select State"
            required
            options={multiOptions}
            onChange={(opt) => handleBillingChange("state", opt?.value)}
            coverClass="col-span-1"
          />
          <CustomSelect
            label="Country"
            id="billing_country"
            placeholder="select Country"
            required
            onChange={(opt) => handleBillingChange("country", opt?.value)}
            options={multiOptions}
            coverClass="col-span-1"
          />
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <InputField
            id="shipping_address_1"
            name="shipping_address_1"
            label="Address Line 1"
            type="text"
            value={shipping.address1}
            disabled={sameAsBilling}
            onChange={(e) => handleShippingChange("address1", e.target.value)}
            placeholder="12,abc,skjdn"
            coverClass="col-span-1 sm:col-span-2"
          />
          <InputField
            id="shipping_address_2"
            name="shipping_address_2"
            label="Address Line 2"
            type="text"
            value={shipping.address2}
            disabled={sameAsBilling}
            onChange={(e) => handleShippingChange("address2", e.target.value)}
            placeholder="12,abc,skjdn"
            coverClass="col-span-1 sm:col-span-2"
          />

          <CustomSelect
            label="City"
            placeholder="select city"
            required
            options={multiOptions}
            disabled={sameAsBilling}
            onChange={(opt) => handleShippingChange("city", opt?.value)}
            coverClass="col-span-1"
            id="shipping_city"
          />
          <InputField
            id="shipping_pin"
            name="pin"
            label="Pin code"
            type="number"
            value={shipping.pin}
            disabled={sameAsBilling}
            onChange={(e) => handleShippingChange("pin", e.target.value)}
            placeholder="148545"
            stepHidden
            coverClass="col-span-1"
          />

          <CustomSelect
            label="State"
            id="shipping_state"
            placeholder="select State"
            required
            value={shipping.state}
            options={multiOptions}
            disabled={sameAsBilling}
            onChange={(opt) => handleShippingChange("state", opt?.value)}
            coverClass="col-span-1"
          />
          <CustomSelect
            label="Country"
            id="shipping_country"
            placeholder="select Country"
            required
            options={multiOptions}
            value={shipping.country}
            disabled={sameAsBilling}
            onChange={(opt) => handleShippingChange("country", opt?.value)}
            coverClass="col-span-1"
          />
        </div>
        <h6 className="col-span-1 sm:col-span-2 text-gray-800 dark:text-white/90">
          Opening Balance
        </h6>
        <div className="col-span-1 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <InputField
            id="amount"
            name="amount"
            label="Amount"
            type="number"
            min={0}
            onChange={() => {}}
            placeholder="12,abc,skjdn"
            coverClass="col-span-1"
          />
          <CustomSelect
            label="Amount Type"
            placeholder="select Amount type"
            required
            options={multiOptions}
            coverClass="col-span-1"
            id="amount_type"
          />
        </div>
        <InputField
          id="notes"
          name="notes"
          label="Notes"
          type="textarea"
          rows={6}
          onChange={() => {}}
          placeholder="Enter Notes"
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
