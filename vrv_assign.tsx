import React, { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2 } from "lucide-react";

const RBACDashboard = () => {
  // Mock initial data
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  ]);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      permissions: ["create_user", "edit_user", "delete_user", "manage_roles"],
      description: "Full system access",
    },
    {
      id: 2,
      name: "Editor",
      permissions: ["edit_user"],
      description: "Can edit user information",
    },
    {
      id: 3,
      name: "Viewer",
      permissions: [],
      description: "Read-only access",
    },
  ]);

  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showRoleDialog, setShowRoleDialog] = useState(false);
  const [loading, setLoading] = useState(false); // For button states

  const permissions = [
    "create_user",
    "edit_user",
    "delete_user",
    "manage_roles",
  ];

  // Input validation function
  const validateInput = (input) => {
    // Example: simple email regex check
    if (!input || input.trim() === "") return false;
    return true;
  };

  // User Management Table
  const UserTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button onClick={() => setShowUserDialog(true)} className="text-sm">
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{user.name}</td>
                    <td className="px-4 py-3 text-sm">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant="secondary">{user.role}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Badge variant={user.status === "Active" ? "success" : "destructive"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log(`Edit user ${user.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log(`Delete user ${user.id}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Role Management Table
  const RoleTable = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Roles</h2>
        <Button onClick={() => setShowRoleDialog(true)} className="text-sm">
          <Plus className="mr-2 h-4 w-4" /> Add Role
        </Button>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Permissions</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {roles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{role.name}</td>
                    <td className="px-4 py-3 text-sm">{role.description}</td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission) => (
                          <Badge key={permission} variant="outline">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log(`Edit role ${role.id}`)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => console.log(`Delete role ${role.id}`)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Dashboard Header */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Role-Based Access Control Dashboard</CardTitle>
          <CardDescription>
            Manage users, roles, and permissions for your organization
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Tabs for Users and Roles */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <UserTable />
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <RoleTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RBACDashboard;
