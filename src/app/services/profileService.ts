import type {
  ChangePasswordPayload,
  NotificationSettings,
  UpdateProfilePayload,
  UserActivity,
  UserProfileResponse,
} from "../types/profile";

export const profileApiEndpoints = {
  getProfile: "/api/profile",
  updateProfile: "/api/profile",
  uploadImage: "/api/profile/upload-image",
  changePassword: "/api/profile/change-password",
  getActivity: "/api/profile/activity",
} as const;

const mockProfile: UserProfileResponse = {
  user: {
    id: "usr-001",
    fullName: "John Doe",
    username: "john.doe",
    email: "john.doe@inventrackpro.com",
    role: "Administrator",
    accountStatus: "Active",
    profileImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&h=180&fit=crop",
    employeeId: "EMP-INV-1007",
    department: "IT & Operations",
    designation: "Inventory Systems Administrator",
    lastLogin: "2026-06-03 10:30 AM",
    phoneNumber: "+1 (555) 123-4567",
    joiningDate: "2021-08-16",
    passwordLastChanged: "2026-05-14 09:20 AM",
    accountCreatedDate: "2021-08-12 02:45 PM",
  },
  notifications: {
    lowStockAlerts: true,
    expiryAlerts: true,
    purchaseOrderAlerts: true,
    dailyReports: false,
    weeklyReports: true,
  },
  summary: {
    productsAdded: 128,
    stockInTransactions: 342,
    stockOutTransactions: 286,
    purchaseOrdersCreated: 74,
  },
};

const mockActivity: UserActivity[] = [
  {
    id: "act-001",
    activity: "Logged In",
    timestamp: "2026-06-03 10:30 AM",
    relatedEntity: "Admin Portal",
  },
  {
    id: "act-002",
    activity: "Product Created",
    timestamp: "2026-06-03 09:55 AM",
    relatedEntity: "Surgical Masks",
  },
  {
    id: "act-003",
    activity: "Product Updated",
    timestamp: "2026-06-02 04:10 PM",
    relatedEntity: "Paracetamol 500mg",
  },
  {
    id: "act-004",
    activity: "Stock In",
    timestamp: "2026-06-02 11:00 AM",
    relatedEntity: "Insulin Vials",
  },
  {
    id: "act-005",
    activity: "Stock Out",
    timestamp: "2026-06-01 03:25 PM",
    relatedEntity: "Organic Apple Juice",
  },
  {
    id: "act-006",
    activity: "Purchase Order Created",
    timestamp: "2026-05-31 01:40 PM",
    relatedEntity: "PO-2407",
  },
];

const delay = (duration = 180) =>
  new Promise((resolve) => window.setTimeout(resolve, duration));

export const profileService = {
  async getProfile(): Promise<UserProfileResponse> {
    await delay();
    return mockProfile;
  },

  async updateProfile(
    payload: UpdateProfilePayload,
  ): Promise<UserProfileResponse> {
    await delay();
    mockProfile.user = {
      ...mockProfile.user,
      ...payload,
    };
    return mockProfile;
  },

  async uploadImage(file: File): Promise<{ profileImage: string }> {
    await delay();
    const profileImage = URL.createObjectURL(file);
    mockProfile.user.profileImage = profileImage;
    return { profileImage };
  },

  async changePassword(payload: ChangePasswordPayload): Promise<{ ok: true }> {
    await delay();
    if (payload.newPassword !== payload.confirmPassword) {
      throw new Error("New password and confirmation must match.");
    }
    mockProfile.user.passwordLastChanged = "2026-06-03 04:35 PM";
    return { ok: true };
  },

  async getActivity(): Promise<UserActivity[]> {
    await delay();
    return mockActivity;
  },

  async updateNotificationSettings(
    settings: NotificationSettings,
  ): Promise<NotificationSettings> {
    await delay(80);
    mockProfile.notifications = settings;
    return mockProfile.notifications;
  },
};
