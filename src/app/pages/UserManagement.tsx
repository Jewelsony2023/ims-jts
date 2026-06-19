import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router";
import { Edit, Loader2, Plus, UserCog } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/api";
import { AlertDialog } from "@/components/common/AlertDialog";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Card, CardContent } from "../components/ui/card";

type User = {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

type UserFormState = {
  fullName: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
};

const roleOptions = ["Administrator", "Manager", "Staff"] as const;
const roleIdMap: Record<(typeof roleOptions)[number], number> = {
  Administrator: 1,
  Manager: 2,
  Staff: 3,
};

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function getRoleBadge(role: string) {
  switch (role) {
    case "Administrator":
      return (
        <Badge className="bg-purple-100 text-purple-700">
          Administrator
        </Badge>
      );
    case "Manager":
      return (
        <Badge className="bg-blue-100 text-blue-700">
          Manager
        </Badge>
      );
    default:
      return (
        <Badge className="bg-emerald-100 text-emerald-700">
          Staff
        </Badge>
      );
  }
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState<number | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    title: string;
    message: string;
  }>({
    open: false,
    title: "",
    message: "",
  });

  const [createForm, setCreateForm] = useState<UserFormState>({
    fullName: "",
    email: "",
    password: "",
    role: "Staff",
    isActive: true,
  });

  const [editForm, setEditForm] = useState<Omit<UserFormState, "password">>({
    fullName: "",
    email: "",
    role: "Staff",
    isActive: true,
  });

  const role = localStorage.getItem("role");

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get<User[]>(
        `${import.meta.env.VITE_API_URL}/api/users`,
      );
      setUsers(response.data);
    } catch (error) {
      console.error(error);
      setErrorDialog({
        open: true,
        title: "Failed to load users",
        message: "We couldn't load the user list from the server.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter((user) => user.isActive).length;
    const administrators = users.filter(
      (user) => user.role === "Administrator",
    ).length;
    const managers = users.filter((user) => user.role === "Manager").length;

    return { totalUsers, activeUsers, administrators, managers };
  }, [users]);

  const resetCreateForm = () => {
    setCreateForm({
      fullName: "",
      email: "",
      password: "",
      role: "Staff",
      isActive: true,
    });
  };

  const resetEditForm = () => {
    setEditForm({
      fullName: "",
      email: "",
      role: "Staff",
      isActive: true,
    });
  };

  const openEditDialog = (user: User) => {
    setEditingUser(user);
    setEditForm({
      fullName: user.fullName,
      email: user.email,
      role: user.role as UserFormState["role"],
      isActive: user.isActive,
    });
  };

  const handleCreateUser = async () => {
    if (isSaving) return;

    if (
      !createForm.fullName.trim() ||
      !createForm.email.trim() ||
      !createForm.password.trim()
    ) {
      setErrorDialog({
        open: true,
        title: "Failed to create user",
        message: "Full name, email, and password are required.",
      });
      return;
    }

    setIsSaving(true);
    try {
      await api.post(`${import.meta.env.VITE_API_URL}/api/users`, {
        fullName: createForm.fullName.trim(),
        email: createForm.email.trim(),
        password: createForm.password,
        roleId: roleIdMap[createForm.role as keyof typeof roleIdMap],
        isActive: createForm.isActive,
      });

      toast.success("User created successfully");
      setIsCreateOpen(false);
      resetCreateForm();
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setErrorDialog({
        open: true,
        title: "Failed to create user",
        message: "We couldn't create the user. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser || isSaving) return;

    if (!editForm.fullName.trim() || !editForm.email.trim()) {
      setErrorDialog({
        open: true,
        title: "Failed to update user",
        message: "Full name and email are required.",
      });
      return;
    }

    setIsSaving(true);
    try {
      await api.put(`${import.meta.env.VITE_API_URL}/api/users/${editingUser.userId}`, {
        fullName: editForm.fullName.trim(),
        email: editForm.email.trim(),
        roleId: roleIdMap[editForm.role as keyof typeof roleIdMap],
        isActive: editForm.isActive,
      });

      toast.success("User updated successfully");
      setEditingUser(null);
      resetEditForm();
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setErrorDialog({
        open: true,
        title: "Failed to update user",
        message: "We couldn't update the user. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (user: User) => {
    setIsStatusUpdating(user.userId);
    try {
      await api.patch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.userId}/toggle-status`,
      );

      toast.success(
        `${user.fullName} is now ${user.isActive ? "inactive" : "active"}`,
      );
      await fetchUsers();
    } catch (error) {
      console.error(error);
      setErrorDialog({
        open: true,
        title: "Failed to change status",
        message: "We couldn't update the user's status. Please try again.",
      });
    } finally {
      setIsStatusUpdating(null);
    }
  };

  if (role !== "Administrator") {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl">
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_top_right,_rgba(16,185,129,0.35),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.28),_transparent_28%)]" />
        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="mt-1 max-w-2xl text-sm text-slate-300">
                Manage system users and access roles
              </p>
            </div>
          </div>
          <Button
            className="w-fit bg-emerald-500 px-5 text-white hover:bg-emerald-600"
            onClick={() => setIsCreateOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Total Users</p>
                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  {stats.totalUsers}
                </h3>
              </div>
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <UserCog className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Active Users</p>
                <h3 className="mt-2 text-3xl font-bold text-emerald-600">
                  {stats.activeUsers}
                </h3>
              </div>
              <div className="rounded-2xl bg-emerald-500 p-3 text-white">
                <UserCog className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Administrators</p>
                <h3 className="mt-2 text-3xl font-bold text-purple-600">
                  {stats.administrators}
                </h3>
              </div>
              <div className="rounded-2xl bg-purple-500 p-3 text-white">
                <UserCog className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Managers</p>
                <h3 className="mt-2 text-3xl font-bold text-blue-600">
                  {stats.managers}
                </h3>
              </div>
              <div className="rounded-2xl bg-blue-500 p-3 text-white">
                <UserCog className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-0">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">Users</h2>
            <p className="text-sm text-slate-500">
              View and manage all system users
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16 text-center text-slate-500">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell className="font-medium text-slate-900">
                        {user.fullName}
                      </TableCell>
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {user.isActive ? (
                          <Badge className="bg-emerald-100 text-emerald-700">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {formatDateTime(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(user)}
                          >
                            <Edit className="h-4 w-4 text-slate-600" />
                          </Button>
                          <Button
                            variant="outline"
                            className="h-8 px-3 text-xs"
                            onClick={() => handleToggleStatus(user)}
                            disabled={isStatusUpdating === user.userId}
                          >
                            {isStatusUpdating === user.userId ? (
                              <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                            ) : null}
                            {user.isActive ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) resetCreateForm();
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Create a new system user and assign a role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="create-full-name">Full Name</Label>
              <Input
                id="create-full-name"
                value={createForm.fullName}
                onChange={(event) =>
                  setCreateForm((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={createForm.email}
                onChange={(event) =>
                  setCreateForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-password">Password</Label>
              <Input
                id="create-password"
                type="password"
                value={createForm.password}
                onChange={(event) =>
                  setCreateForm((current) => ({
                    ...current,
                    password: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={createForm.role}
                onValueChange={(value) =>
                  setCreateForm((current) => ({
                    ...current,
                    role: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Active</p>
                <p className="text-sm text-slate-500">
                  Enable the account immediately.
                </p>
              </div>
              <Switch
                checked={createForm.isActive}
                onCheckedChange={(checked) =>
                  setCreateForm((current) => ({
                    ...current,
                    isActive: checked,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateOpen(false)}
              type="button"
            >
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={isSaving} type="button">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Create User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editingUser !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingUser(null);
            resetEditForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update the user profile and access role.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-full-name">Full Name</Label>
              <Input
                id="edit-full-name"
                value={editForm.fullName}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    fullName: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editForm.email}
                onChange={(event) =>
                  setEditForm((current) => ({
                    ...current,
                    email: event.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <Select
                value={editForm.role}
                onValueChange={(value) =>
                  setEditForm((current) => ({
                    ...current,
                    role: value,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <div>
                <p className="text-sm font-medium text-slate-900">Active</p>
                <p className="text-sm text-slate-500">
                  Control whether the user can log in.
                </p>
              </div>
              <Switch
                checked={editForm.isActive}
                onCheckedChange={(checked) =>
                  setEditForm((current) => ({
                    ...current,
                    isActive: checked,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setEditingUser(null);
                resetEditForm();
              }}
              type="button"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateUser} disabled={isSaving} type="button">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={errorDialog.open}
        title={errorDialog.title}
        message={errorDialog.message}
        onClose={() =>
          setErrorDialog({
            open: false,
            title: "",
            message: "",
          })
        }
      />
    </div>
  );
}
