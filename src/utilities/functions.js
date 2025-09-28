import axios from "axios";
import { useAuth } from "@/context/AuthContext";

export const handleApiError = (error, fallbackMessage = "Something went wrong") => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage;
  }

  return fallbackMessage;
};

export const useUserPath = () => {
  const { user } = useAuth();

  return (path = "") => `/${user?.user_id}${path}`;
};
