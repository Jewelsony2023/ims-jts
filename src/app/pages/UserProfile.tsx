import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { AccountSecurityCard } from "../components/profile/AccountSecurityCard";
import { ChangePasswordDialog } from "../components/profile/ChangePasswordDialog";
import { NotificationSettingsCard } from "../components/profile/NotificationSettingsCard";
import { PersonalInformationCard } from "../components/profile/PersonalInformationCard";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileLoadingState } from "../components/profile/ProfileLoadingState";
import { ProfileSummaryCards } from "../components/profile/ProfileSummaryCards";
import { RecentActivityPanel } from "../components/profile/RecentActivityPanel";
import { Card, CardContent } from "../components/ui/card";
import { useUserProfile } from "../hooks/useUserProfile";

export function UserProfile() {
  const {
    data,
    activity,
    error,
    isLoading,
    changePassword,
    updateProfile,
    uploadImage,
    updateNotification,
  } = useUserProfile();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  if (isLoading) {
    return <ProfileLoadingState />;
  }

  if (error || !data) {
    return (
      <Card className="border-none shadow-md">
        <CardContent className="flex items-center gap-3 p-6 text-orange-700">
          <AlertTriangle className="h-5 w-5" />
          {error || "Profile data is unavailable."}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Profile</h1>
        <p className="mt-1 text-slate-600">
          Manage account identity, security, notification preferences, and user activity.
        </p>
      </div>

      <ProfileHeader
        user={data.user}
        onEditProfile={() => setIsEditingProfile(true)}
        onChangePassword={() => setIsPasswordDialogOpen(true)}
        onUploadImage={uploadImage}
      />

      <ProfileSummaryCards summary={data.summary} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-6">
          <PersonalInformationCard
            user={data.user}
            isEditing={isEditingProfile}
            onEdit={() => setIsEditingProfile(true)}
            onCancel={() => setIsEditingProfile(false)}
            onSave={async (payload) => {
              await updateProfile(payload);
              setIsEditingProfile(false);
            }}
          />
          <RecentActivityPanel activity={activity} />
        </div>

        <div className="space-y-6">
          <AccountSecurityCard
            user={data.user}
            onChangePassword={() => setIsPasswordDialogOpen(true)}
          />
          <NotificationSettingsCard
            settings={data.notifications}
            onChange={updateNotification}
          />
        </div>
      </div>

      <ChangePasswordDialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
        onSubmit={changePassword}
      />
    </div>
  );
}
