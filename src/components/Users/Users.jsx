"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Title,
  Loader,
  TextInput,
  ActionIcon,
  Group,
  Modal,
  Button,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export default function UserListPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const PAGE_SIZE = 25; // Number of rows per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.USER_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fetchedUsers = response.data?.data?.users;
        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers);
        } else {
          toast.error("Invalid user data format");
          setUsers([]);
        }
      } catch (error) {
        toast.error("An error occurred while fetching user list");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) => {
    const lowerSearch = search.toLowerCase();
    return (
      user.name?.toLowerCase().includes(lowerSearch) ||
      user.email?.toLowerCase().includes(lowerSearch) ||
      user.phoneNumber?.includes(search)
    );
  });

  const handleEditUser = (user) => {
    setEditUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_ENDPOINTS.USER_LIST}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("An error occurred while deleting the user");
    }
  };

  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const { name, email } = editUser; // Only include allowed fields
      await axios.put(
        `${API_ENDPOINTS.USER_LIST}/${editUser.id}`,
        { name, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(
        users.map((user) =>
          user.id === editUser.id ? { ...user, name, email } : user
        )
      );
      setIsEditModalOpen(false);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("An error occurred while updating the user");
    }
  };

  return (
    <>
      <ToastContainer />
      <Container fluid size="lg">
        <Paper shadow="lg" p="md" radius="md" withBorder>
          <Title order={2} mb="xs">
            Users List
          </Title>

          <TextInput
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb="md"
            style={{ maxWidth: "300px" }}
          />

          {loading ? (
            <Loader size="lg" />
          ) : (
            <div className={filteredUsers.length > 0 ? "has-users" : ""}>
              <DataTable
                columns={[
                  { accessor: "name", title: "Name", sortable: true },
                  { accessor: "email", title: "Email", sortable: true },
                  {
                    accessor: "phoneNumber",
                    title: "Phone Number",
                    render: (row) => row.phoneNumber || "N/A",
                  },
                  {
                    accessor: "actions",
                    title: "Actions",
                    render: (row) => (
                      <Group spacing="xs">
                        <ActionIcon
                          color="blue"
                          onClick={() => handleEditUser(row)}
                        >
                          <IconEdit size={16} />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          onClick={() => handleDeleteUser(row.id)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    ),
                  },
                ]}
                records={filteredUsers.slice(
                  (page - 1) * PAGE_SIZE,
                  page * PAGE_SIZE
                )}
                totalRecords={filteredUsers.length}
                recordsPerPage={PAGE_SIZE}
                page={page}
                onPageChange={setPage}
                striped
                highlightOnHover
                withColumnBorders
                noRecordsText={filteredUsers.length > 0 ? "" : "No users found"}
              />
            </div>
          )}
        </Paper>
      </Container>

      <Modal
        opened={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit User"
      >
        <TextInput
          label="Name"
          value={editUser?.name || ""}
          onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
          mb="md"
        />
        <TextInput
          label="Email"
          value={editUser?.email || ""}
          onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          mb="md"
        />
        <TextInput
          label="Phone Number"
          value={editUser?.phoneNumber || ""}
          onChange={(e) =>
            setEditUser({ ...editUser, phoneNumber: e.target.value })
          }
          mb="md"
        />
        <Group spacing="md">
          <Button onClick={handleSaveUser}>Save</Button>
          <Button variant="default" onClick={() => setIsEditModalOpen(false)}>
            Cancel
          </Button>
        </Group>
      </Modal>
    </>
  );
}
