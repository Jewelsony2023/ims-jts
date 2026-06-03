import { useState } from "react";
import { KeyRound } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { ChangePasswordPayload } from "../../types/profile";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: ChangePasswordPayload) => Promise<void>;
}

const initialForm: ChangePasswordPayload = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function ChangePasswordDialog({
  open,
  onOpenChange,
  onSubmit,
}: ChangePasswordDialogProps) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit(form);
      setForm(initialForm);
      onOpenChange(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to change password.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5 text-emerald-600" />
            Change Password
          </DialogTitle>
          <DialogDescription>
            Update the password used to access your inventory account.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {[
            ["currentPassword", "Current Password"],
            ["newPassword", "New Password"],
            ["confirmPassword", "Confirm New Password"],
          ].map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label>{label}</Label>
              <Input
                type="password"
                value={form[key as keyof ChangePasswordPayload]}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    [key]: event.target.value,
                  }))
                }
              />
            </div>
          ))}
          {error && (
            <p className="rounded-lg bg-orange-50 p-3 text-sm text-orange-700">
              {error}
            </p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="bg-white"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-emerald-500 hover:bg-emerald-600"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating" : "Update Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
