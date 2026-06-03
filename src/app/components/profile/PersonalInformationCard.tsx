import { useEffect, useState } from "react";
import { UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import type { UpdateProfilePayload, UserEntity } from "../../types/profile";

interface PersonalInformationCardProps {
  user: UserEntity;
  isEditing: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSave: (payload: UpdateProfilePayload) => Promise<void>;
}

export function PersonalInformationCard({
  user,
  isEditing,
  onCancel,
  onEdit,
  onSave,
}: PersonalInformationCardProps) {
  const [form, setForm] = useState<UpdateProfilePayload>({
    fullName: user.fullName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    department: user.department,
    designation: user.designation,
  });

  useEffect(() => {
    setForm({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      department: user.department,
      designation: user.designation,
    });
  }, [user]);

  const displayFields = [
    { label: "Full Name", value: user.fullName },
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phoneNumber },
    { label: "Department", value: user.department },
    { label: "Designation", value: user.designation },
    { label: "Joining Date", value: user.joiningDate },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg">
          <UserCog className="h-5 w-5 text-emerald-600" />
          Personal Information
        </CardTitle>
        {!isEditing && (
          <Button variant="outline" className="bg-white" onClick={onEdit}>
            Edit
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                ["fullName", "Full Name"],
                ["email", "Email"],
                ["phoneNumber", "Phone"],
                ["department", "Department"],
                ["designation", "Designation"],
              ].map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Input
                    value={form[key as keyof UpdateProfilePayload]}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        [key]: event.target.value,
                      }))
                    }
                    className="bg-white"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <Label>Username</Label>
                <Input value={user.username} disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label>Joining Date</Label>
                <Input value={user.joiningDate} disabled className="bg-slate-50" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" className="bg-white" onClick={onCancel}>
                Cancel
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => onSave(form)}>
                Save Changes
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {displayFields.map((field) => (
              <div key={field.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase text-slate-500">
                  {field.label}
                </p>
                <p className="mt-2 font-medium text-slate-800">{field.value}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
