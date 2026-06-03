import { useCallback, useEffect, useMemo, useReducer } from "react";
import { profileService } from "../services/profileService";
import type {
  ChangePasswordPayload,
  NotificationSettings,
  UpdateProfilePayload,
  UserActivity,
  UserProfileResponse,
} from "../types/profile";

interface UserProfileState {
  data: UserProfileResponse | null;
  activity: UserActivity[];
  isLoading: boolean;
  error: string | null;
}

type UserProfileAction =
  | { type: "loading" }
  | { type: "loaded"; payload: UserProfileResponse; activity: UserActivity[] }
  | { type: "profileUpdated"; payload: UserProfileResponse }
  | { type: "notificationsUpdated"; payload: NotificationSettings }
  | { type: "imageUploaded"; payload: string }
  | { type: "error"; payload: string };

const initialState: UserProfileState = {
  data: null,
  activity: [],
  isLoading: true,
  error: null,
};

function reducer(
  state: UserProfileState,
  action: UserProfileAction,
): UserProfileState {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
    case "loaded":
      return {
        data: action.payload,
        activity: action.activity,
        isLoading: false,
        error: null,
      };
    case "profileUpdated":
      return { ...state, data: action.payload, error: null };
    case "notificationsUpdated":
      return state.data
        ? {
            ...state,
            data: { ...state.data, notifications: action.payload },
            error: null,
          }
        : state;
    case "imageUploaded":
      return state.data
        ? {
            ...state,
            data: {
              ...state.data,
              user: { ...state.data.user, profileImage: action.payload },
            },
            error: null,
          }
        : state;
    case "error":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

export function useUserProfile() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      dispatch({ type: "loading" });
      try {
        const [profile, activity] = await Promise.all([
          profileService.getProfile(),
          profileService.getActivity(),
        ]);

        if (isMounted) {
          dispatch({ type: "loaded", payload: profile, activity });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({
            type: "error",
            payload:
              error instanceof Error
                ? error.message
                : "Unable to load profile details.",
          });
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const updateProfile = useCallback(async (payload: UpdateProfilePayload) => {
    const updatedProfile = await profileService.updateProfile(payload);
    dispatch({ type: "profileUpdated", payload: updatedProfile });
  }, []);

  const uploadImage = useCallback(async (file: File) => {
    const result = await profileService.uploadImage(file);
    dispatch({ type: "imageUploaded", payload: result.profileImage });
  }, []);

  const changePassword = useCallback(async (payload: ChangePasswordPayload) => {
    await profileService.changePassword(payload);
    const updatedProfile = await profileService.getProfile();
    dispatch({ type: "profileUpdated", payload: updatedProfile });
  }, []);

  const updateNotification = useCallback(
    async (key: keyof NotificationSettings, checked: boolean) => {
      if (!state.data) {
        return;
      }

      const settings = {
        ...state.data.notifications,
        [key]: checked,
      };
      dispatch({ type: "notificationsUpdated", payload: settings });
      await profileService.updateNotificationSettings(settings);
    },
    [state.data],
  );

  return useMemo(
    () => ({
      ...state,
      updateProfile,
      uploadImage,
      changePassword,
      updateNotification,
    }),
    [state, updateProfile, uploadImage, changePassword, updateNotification],
  );
}
