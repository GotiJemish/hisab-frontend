"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useEffect, useRef, useState } from "react";
import MainTable from "@/components/common/main-table/MainTable";
import { useModal } from "@/hooks/useModal";
import ContactModal from "@/components/modals/ContactModal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { getAllContacts } from "@/apis/contacts";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";

const ContactsModule = () => {
  const { isOpen, openModal, closeModal } = useModal();
    const { showToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [contacts, setContacts] = useState([
    {
        "id": 35,
        "name": "1",
        "mobile": "8849853373",
        "email": "gja5364@gmail.com",
        "pan": "qqqqqqqqqq",
        "gst": "qqqqqqqqqqqqqqq",
        "billing_address": "asdas",
        "shipping_address": "asfasa",
        "city": "asda",
        "state": "asda",
        "country": "India",
        "pincode": "148545",
        "notes": "asdad",
        "created_at": "2025-11-07T16:10:16.450208Z",
        "updated_at": "2025-11-07T16:10:16.450236Z",
        "user": "47c84493-ddb9-43b3-b659-370909eea472"
    }
]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await getAllContacts();
        setContacts(data);
      } catch (error) {
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
  return (
    <>
      <div className="flex justify-between align-center mb-2">
        <PageBreadcrumb pageTitle="contacts" />
        <Button title="Add Contact" startIcon={<PlusIcon/>} onClick={openModal}/>
      </div>
      <div>
        <MainTable />
      </div>
     
       <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        calendarsEvents={{ work: "blue", personal: "red" }}
        
        title="dhbv"
      />
    </>
  );
};

export default ContactsModule;
{/* <Tooltip message="Add New Item" position="top"></Tooltip> */}