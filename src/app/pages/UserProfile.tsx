import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { NotificationSettingsCard } from "../components/profile/NotificationSettingsCard";
import { PersonalInformationCard } from "../components/profile/PersonalInformationCard";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileLoadingState } from "../components/profile/ProfileLoadingState";
import { RecentActivityPanel } from "../components/profile/RecentActivityPanel";
import { Card, CardContent } from "../components/ui/card";
import { useUserProfile } from "../hooks/useUserProfile";

export function UserProfile() {
  const {
    data,
    activity,
    error,
    isLoading,
    updateProfile,
    uploadImage,
    updateNotification,
  } = useUserProfile();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

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
          Manage user information, contact details, notification preferences, and activity.
        </p>
      </div>

      <ProfileHeader
        user={data.user}
        onEditProfile={() => setIsEditingProfile(true)}
        onUploadImage={uploadImage}
      />

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
          <NotificationSettingsCard
            settings={data.notifications}
            onChange={updateNotification}
          />
        </div>
      </div>
    </div>
  );
}
