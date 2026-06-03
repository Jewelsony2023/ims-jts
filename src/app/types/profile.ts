export type AccountStatus = "Active" | "Inactive" | "Locked";

export interface UserEntity {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  accountStatus: AccountStatus;
  profileImage: string;
  employeeId: string;
  department: string;
  designation: string;
  lastLogin: string;
  phoneNumber: string;
  joiningDate: string;
  passwordLastChanged: string;
  accountCreatedDate: string;
}

export interface NotificationSettings {
  lowStockAlerts: boolean;
  expiryAlerts: boolean;
  purchaseOrderAlerts: boolean;
  dailyReports: boolean;
  weeklyReports: boolean;
}

export interface UserActivity {
  id: string;
  activity: string;
  timestamp: string;
  relatedEntity: string;
}

export interface UserProfileSummary {
  productsAdded: number;
  stockInTransactions: number;
  stockOutTransactions: number;
  purchaseOrdersCreated: number;
}

export interface UserProfileResponse {
  user: UserEntity;
  notifications: NotificationSettings;
  summary: UserProfileSummary;
}

export interface UpdateProfilePayload {
  fullName: string;
  email: string;
  phoneNumber: string;
  department: string;
  designation: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
