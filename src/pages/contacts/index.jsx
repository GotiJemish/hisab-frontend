"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { useModal } from "@/hooks/useModal";
import ContactModal from "@/components/modals/ContactModal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { createContact, deleteContactApi, getAllContacts, updateContact } from "@/apis/contacts";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import CustomTable from "@/components/ui/table/CustomTable";
import { MAIN_TABLE_COLUMNS } from "./constants";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import { Country, State, City }  from 'country-state-city';

const ContactsModule = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { showToast } = useToast();
  const { loading, setLoading } = useLoading();
  const [contacts, setContacts] = useState([]);
  const [editableContact, setEditableContact] = useState({
    isEdit: false,
    data: null,
  });
  const [deleteContact, setDeleteContact] = useState({
    isConfirm: false,
    id: null,
  });




  const handleEdit = (contact) => {
    setEditableContact({ isEdit: true, data: contact });
    openModal();
  };
  const handleDelete = (id) => {
    setDeleteContact({ isConfirm: true, id });
  };
  // Confirm delete
  const handleDeleteContact = async () => {
    if (!deleteContact?.id) return;

    try {
      setLoading(true);

      // optimistic update
      const prevContacts = [...contacts];
      setContacts((prev) => prev.filter((c) => c.id !== deleteContact?.id));

      // --------------------
      // API REQUEST
      // --------------------
      const res = await deleteContactApi(deleteContact?.id); // <-- your API

      if (!res?.success) {
        setContacts(prevContacts);
        throw new Error("Delete failed");
      }

      showToast({
        message: "Contact deleted successfully!",
        type: "success",
      });
    } catch (err) {
      showToast({
        message: "Failed to delete contact.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setDeleteContact({ isConfirm: false, id: null });
    }
  };
  /** ---------------------------
   * FETCH CONTACTS
   * -------------------------- */
    const fetchContacts = async () => {
      try {
        setLoading(true);
        const data = await getAllContacts();
        setContacts(data?.data || []);
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
  useEffect(() => {
  

    fetchContacts();
  }, []);

  /** ---------------------------
   * useActionState HANDLER
   * -------------------------- */
  const submitContact = async (prevState, payload) => {
    const isEdit = Boolean(payload.id);

    try {
      setLoading(true);

      // --------------------
      // OPTIMISTIC UPDATE
      // --------------------
      setContacts((prev) => {
        if (isEdit) {
          return prev.map((c) =>
            c.id === payload.id ? { ...c, ...payload } : c
          );
        }
        return [...prev, { ...payload, id: Date.now() }]; // Temp ID
      });

      // --------------------
      // API REQUEST
      // --------------------
      const res = isEdit
        ? await updateContact(payload.id, payload)
        : await createContact(payload);

      // If API returns real contact data, replace optimistic temp data
      if (res?.success && res?.data) {
       fetchContacts();
      }

      showToast({
        message: isEdit ? "Contact updated!" : "Contact added!",
        type: "success",
      });

      closeModal();

      return { success: true };
    } catch (error) {
      showToast({ message: "Error saving contact", type: "error" });

      // Revert optimistic update on error
      setContacts((prev) => prevState.originalContacts || prev);

      return { success: false };
    } finally {
      setEditableContact({ isEdit: false, data: null });
      setLoading(false);
    }
  };

  const [state, formAction, isPending] = useActionState(submitContact, {
    success: false,
    error: null,
  });
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
          action={{
            onEdit: (row) => handleEdit(row),
            onDelete: (row) => handleDelete(row?.id),
          }}
        />
      </div>

      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        // calendarsEvents={{ work: "blue", personal: "red" }}
        title={editableContact?.isEdit ? "Edit Contact" : "New Contact"}
        size="lg"
        editable={editableContact?.isEdit ?editableContact?.data:null}
        submitSuccess={state.success}
        handleSubmit={(payload) => {
          startTransition(() => {
            formAction(payload);
          });
        }}
        isSubmitting={isPending}
      />
      <ConfirmationModal
        isOpen={deleteContact?.isConfirm}
        onClose={() => {
          setDeleteContact({ isConfirm: false, id: null });
        }}
        onConfirm={handleDeleteContact}
        title="Delete Contact"
        description="Are you sure you want to delete this contact? This action cannot be undone."
      />
    </>
  );
};

export default ContactsModule;
