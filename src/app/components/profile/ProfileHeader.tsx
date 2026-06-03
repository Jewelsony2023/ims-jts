import {
  CalendarClock,
  Camera,
  IdCard,
  KeyRound,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import type { UserEntity } from "../../types/profile";

interface ProfileHeaderProps {
  user: UserEntity;
  onEditProfile: () => void;
  onChangePassword: () => void;
  onUploadImage: (file: File) => void;
}

function getInitials(fullName: string) {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileHeader({
  user,
  onEditProfile,
  onChangePassword,
  onUploadImage,
}: ProfileHeaderProps) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative w-fit">
              <Avatar className="h-28 w-28 border-4 border-white shadow-md">
                <AvatarImage src={user.profileImage} alt={user.fullName} />
                <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
              </Avatar>
              <label
                className="absolute bottom-1 right-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-white shadow-md transition-colors hover:bg-emerald-600"
                title="Upload profile image"
              >
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onUploadImage(file);
                    }
                  }}
                />
              </label>
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-800">
                  {user.fullName}
                </h1>
                <Badge className="bg-emerald-100 text-emerald-700">
                  {user.accountStatus}
                </Badge>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-500">
                @{user.username}
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 text-sm text-slate-600 sm:grid-cols-2 xl:grid-cols-3">
                <div className="flex items-center gap-2">
                  <IdCard className="h-4 w-4 text-slate-400" />
                  <span>{user.employeeId}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-slate-400" />
                  <span>{user.role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-slate-400" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{user.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-slate-400" />
                  <span>Last login: {user.lastLogin}</span>
                </div>
                <div className="text-slate-700">
                  {user.department} / {user.designation}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 xl:justify-end">
            <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={onEditProfile}>
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="bg-white" onClick={onChangePassword}>
              <KeyRound className="h-4 w-4" />
              Change Password
            </Button>
            <label>
              <Button variant="outline" className="bg-white" asChild>
                <span>
                  <Camera className="h-4 w-4" />
                  Upload Image
                </span>
              </Button>
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) {
                    onUploadImage(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
