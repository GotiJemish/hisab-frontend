"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddButton from "@/components/common/AddButton";
import React from "react";
import MainTable from "@/components/common/main-table/MainTable";

const ContactsModule = () => {
  return (
    <>
      <AddButton />
      <div className="flex justify-between">
        <PageBreadcrumb pageTitle="contacts" />
      </div>
      <div>
       <MainTable/>
      </div>
    </>
  );
};

export default ContactsModule;
