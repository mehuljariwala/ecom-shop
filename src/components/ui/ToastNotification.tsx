"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToast, hideToast } from "../../store/slices/uiSlice";
import { useToast } from "../../hooks/use-toast";

const ToastNotification = () => {
  const toast = useSelector(selectToast);
  const dispatch = useDispatch();
  const { toast: showToast } = useToast();

  useEffect(() => {
    if (toast.show) {
      // Display toast using shadcn/ui toast
      showToast({
        title: toast.type.charAt(0).toUpperCase() + toast.type.slice(1),
        description: toast.message,
        variant: toast.type === "error" ? "destructive" : "default",
      });

      // Hide the toast in Redux after showing it
      setTimeout(() => {
        dispatch(hideToast());
      }, 100);
    }
  }, [toast.show, toast.message, toast.type, showToast, dispatch]);

  return null; // This component doesn't render anything directly
};

export default ToastNotification;
