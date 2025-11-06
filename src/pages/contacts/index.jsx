"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useEffect, useRef, useState } from "react";
import MainTable from "@/components/common/main-table/MainTable";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/ui/modal";
import ContactModal from "@/components/modals/ContactModal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";

const ContactsModule = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventTitle, setEventTitle] = useState("");
  const { isOpen, openModal, closeModal } = useModal();
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("");


  const handleAddOrUpdateEvent = () => {
    if (selectedEvent) {
      // Update existing event
    
    } else {
      // Add new event
      const newEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel },
      };
     
    }
    closeModal();
    resetModalFields();
  };
  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("");
    setSelectedEvent(null);
  };
  const calendarsEvents = {
    Danger: "danger",
    Success: "success",
    Primary: "primary",
    Warning: "warning",
  };

  useEffect(() => {
    // Initialize with some events
  
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