"use client";

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, {
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import CustomTable from "@/components/ui/table/CustomTable";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import ItemModal from "@/components/modals/ItemModal";

import { MAIN_TABLE_COLUMNS } from "./constants";
import {
  createItem,
  deleteItemApi,
  getAllItems,
  updateItem,
} from "@/apis/items";

const ItemsModule = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { loading, setLoading } = useLoading();
  const { showToast } = useToast();

  const [items, setItems] = useState([]);
  const [editableItem, setEditableItem] = useState({ isEdit: false, data: null });
  const [deleteState, setDeleteState] = useState({ isConfirm: false, id: null });

  // --------------------------------------------------------------------
  // FETCH ITEMS
  // --------------------------------------------------------------------
  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getAllItems();
      setItems(res?.data ?? []);
    } catch (error) {
      showToast({ message: "Failed to fetch items.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // --------------------------------------------------------------------
  // EDIT
  // --------------------------------------------------------------------
  const handleEdit = (item) => {
    setEditableItem({ isEdit: true, data: item });
    openModal();
  };

  // --------------------------------------------------------------------
  // DELETE
  // --------------------------------------------------------------------
  const handleDelete = (id) => {
    setDeleteState({ isConfirm: true, id });
  };

  const confirmDelete = async () => {
    const { id } = deleteState;
    if (!id) return;

    const prevItems = [...items];
    setItems((prev) => prev.filter((i) => i.id !== id));

    try {
      setLoading(true);
      const res = await deleteItemApi(id);

      if (res?.success) {
        showToast({ message: "Item deleted successfully!", type: "success" });
        fetchItems();
      }
    } catch (error) {
      setItems(prevItems);
      showToast({ message: "Failed to delete item.", type: "error" });
    } finally {
      setLoading(false);
      setDeleteState({ isConfirm: false, id: null });
    }
  };

  // --------------------------------------------------------------------
  // useActionState SUBMIT HANDLER
  // --------------------------------------------------------------------
  const submitItem = async (prevState, payload) => {
    const isEdit = !!payload.id;
    const previous = [...items];

    try {
      setLoading(true);

      // OPTIMISTIC UPDATE
      setItems((prev) =>
        isEdit
          ? prev.map((i) =>
              i.id === payload.id ? { ...i, ...payload } : i
            )
          : [...prev, { ...payload, id: Date.now() }]
      );

      // API REQUEST
      const res = isEdit
        ? await updateItem(payload.id, payload)
        : await createItem(payload);

      if (res?.success) {
        fetchItems();
      }

      showToast({
        message: isEdit ? "Item updated!" : "Item added!",
        type: "success",
      });

      closeModal();

      return { success: true };
    } catch (err) {
      setItems(previous);
      showToast({
        message: "Failed to save item.",
        type: "error",
      });
      return { success: false };
    } finally {
      setEditableItem({ isEdit: false, data: null });
      setLoading(false);
    }
  };

  const [state, formAction, isPending] = useActionState(submitItem, {
    success: false,
  });

  return (
    <>
      <div className="flex justify-between mb-2">
        <PageBreadcrumb pageTitle="Items" />
        <Button title="Add Item" startIcon={<PlusIcon />} onClick={openModal} />
      </div>

      <CustomTable
        isSelectable
        data={items}
        columns={MAIN_TABLE_COLUMNS}
        hasActions
        hasmultipleActions
        action={{
          onEdit: handleEdit,
          onDelete: (row) => handleDelete(row.id),
        }}
      />

      {/* ITEM MODAL */}
      <ItemModal
        isOpen={isOpen}
        onClose={closeModal}
        title={editableItem.isEdit ? "Edit Item" : "New Item"}
        size="lg"
        editable={editableItem.isEdit ? editableItem.data : null}
        submitSuccess={state.success}
        handleSubmit={(payload) =>
          startTransition(() => formAction(payload))
        }
        isSubmitting={isPending}
      />

      {/* DELETE CONFIRMATION */}
      <ConfirmationModal
        isOpen={deleteState.isConfirm}
        onClose={() => setDeleteState({ isConfirm: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
      />
    </>
  );
};

export default ItemsModule;
