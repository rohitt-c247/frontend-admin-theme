"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Loader,
  TextInput,
  ActionIcon,
  Group,
  Select,
  Button,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import getAllUser from "@/services/user-service";
import { IconEdit, IconTrash } from "@tabler/icons-react";

const PAGE_SIZES = [10, 15, 20];

export default function UsertListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState(searchParams.get('search') || "");
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
  const [limit, setLimit] = useState(
    searchParams.get('limit') && searchParams.get('limit') !== "null"
      ? searchParams.get('limit')
      : String(PAGE_SIZES[1])
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || "name");
  const [orderBy, setOrderBy] = useState(searchParams.get('orderBy') || "asc");
  const [totalRecords, setTotalRecords] = useState(0);
  const [editUser, setEditUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser({ limit: Number(limit), sortBy, orderBy, search, page });
        setUsers(response.data.users);
        setTotalRecords(response.data.total);
      } catch (error) {
        toast.error("An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [limit, sortBy, orderBy, search, page]);

  useEffect(() => {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit,
      sortBy,
      orderBy,
      search,
    }).toString();

    router.push(`${window.location.pathname}?${queryParams}`);
  }, [page, limit, sortBy, orderBy, search]);

  const TableColumns = [
    { accessor: 'name', title: 'Name' },
    { accessor: 'email', title: 'Email' },
    { accessor: 'phoneNumber', title: 'Phone Number' },
    {
      accessor: "actions",
      title: "Actions",
      render: (row) => (
        <Group>
          <ActionIcon color="blue" onClick={() => handleEditUser(row)}>
            <IconEdit />
          </ActionIcon>
          <ActionIcon color="red" onClick={() => handleDeleteUser(row.id)}>
            <IconTrash />
          </ActionIcon>
        </Group>
      ),
    },
  ];

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
      <Title order={1} >Users</Title>
      <Container>
        <Group position="apart" mb="md">
          <TextInput
            label="Search"
            placeholder="Search users"
            value={search}
            onChange={(event) => setSearch(event.currentTarget.value)}
          />
          <Select
            label="Sort By"
            value={sortBy}
            onChange={setSortBy}
            data={[
              { value: 'name', label: 'Name' },
              { value: 'email', label: 'Email' },
              { value: 'phoneNumber', label: 'Phone Number' },
            ]}
          />
          <Select
            label="Order By"
            value={orderBy}
            onChange={setOrderBy}
            data={[
              { value: 'asc', label: 'Ascending' },
              { value: 'desc', label: 'Descending' },
            ]}
          />
          <Button
            component="a"
            href="/create-user"
            color="blue"
          >
            Add User
          </Button>
        </Group>
        {loading ? (
          <Loader />
        ) : (
          <DataTable
            records={users}
            columns={TableColumns}
            totalRecords={totalRecords}
            recordsPerPage={Number(limit)}
            withTableBorder
            withColumnBorders
            borderRadius="sm"
            highlightOnHover
            striped
            verticalAlign="top"
            pinLastColumn
            page={page}
            onPageChange={setPage}
            recordsPerPageOptions={PAGE_SIZES.map(size => String(size))}
            onRecordsPerPageChange={(value) => setLimit(value)}
          />
        )}
      </Container>
    </>
  );
}
