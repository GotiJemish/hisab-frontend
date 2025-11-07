// 📁 /apis/contacts.js
import apiClient from "@/utilities/apiClients";
import { handleApiError } from "@/utilities/functions";

export const getAllContacts = async () => {
  try {
    // ✅ Pass user as query param
    const response = await apiClient.get(`/contacts/`);
    return response.data; // or response.data.data based on your backend response
  } catch (error) {
    console.error("Error fetching contacts:", error);
   handleApiError(error, "error");
    throw error;
  }
};




