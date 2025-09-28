import axios from "axios";

export const handleApiError = (error, fallbackMessage = "Something went wrong") => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage;
  }

  return fallbackMessage;
};