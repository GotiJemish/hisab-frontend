"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useEffect, useRef, useState } from "react";
import { useModal } from "@/hooks/useModal";
import ContactModal from "@/components/modals/ContactModal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { createContact, getAllContacts } from "@/apis/contacts";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import CustomTable from "@/components/ui/table/CustomTable";
import { MAIN_TABLE_COLUMNS } from "./constants";

const ContactsModule = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { showToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [contacts, setContacts] = useState([
    {
      id: 35,
      name: "1",
      mobile: "8849853373",
      email: "gja5364@gmail.com",
      pan: "qqqqqqqqqq",
      gst: "qqqqqqqqqqqqqqq",
      billing_address: "asdas",
      billing_city: "asda",
      billing_state: "asda",
      billing_pincode: "148545",
      same_as_billing: false,
      shipping_address: "",
      shipping_city: "",
      shipping_state: "",
      shipping_pincode: "",
      total_amount: "0.00",
      payment_type: "receivable",
      payment_status: "pending",
      notes: "asdad",
      created_at: "2025-11-07T16:10:16.450208Z",
      updated_at: "2025-11-07T16:10:16.450236Z",
      user: "47c84493-ddb9-43b3-b659-370909eea472",
    },
  ]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await getAllContacts();
        setContacts(data?.data);
      } catch (error) {
        setLoading(false);
        showToast({
          message: "Failed to fetch contacts.",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);
  // console.log(contacts);
  const submitContact = async (payload) => {
    console.log("adguad", payload);

    try {
      setLoading(true);
      const data = await createContact(payload);
      if (data?.success) {
        closeModal;
        showToast({
          message: "contact add successfully.",
          type: "success",
        });
      }
    } catch (error) {
      setLoading(false);
      showToast({
        message: "Failed to add contacts.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-between align-center mb-2">
        <PageBreadcrumb pageTitle="contacts" />
        <Button
          title="Add Contact"
          startIcon={<PlusIcon />}
          onClick={openModal}
        />
      </div>
      <div>
        <CustomTable
          isSelectable={true}
          columns={MAIN_TABLE_COLUMNS}
          hasActions
          data={contacts}
          hasmultipleActions
        />
      </div>

      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        calendarsEvents={{ work: "blue", personal: "red" }}
        title="New Contact"
        size="lg"
        handleSubmit={(data) => {
          submitContact(data);
        }}
      />
    </>
  );
};

export default ContactsModule;
{
  /* <Tooltip message="Add New Item" position="top"></Tooltip> */
}
