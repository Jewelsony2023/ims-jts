import { useEffect, useState } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AlertDialog } from "@/components/common/AlertDialog";
import { subscribeToSessionExpired } from "@/lib/sessionDialog";
import { Toaster } from "@/app/components/ui/sonner";

export default function App() {
  const [sessionAlertOpen, setSessionAlertOpen] = useState(false);
  const [sessionAlertMessage, setSessionAlertMessage] = useState("");

  useEffect(() => {
    return subscribeToSessionExpired((message) => {
      setSessionAlertMessage(message);
      setSessionAlertOpen(true);
    });
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-right" />
      <AlertDialog
        open={sessionAlertOpen}
        title="Session Expired"
        message={sessionAlertMessage}
        onClose={() => {
          setSessionAlertOpen(false);
          window.location.href = "/login";
        }}
      />
    </>
  );
}
