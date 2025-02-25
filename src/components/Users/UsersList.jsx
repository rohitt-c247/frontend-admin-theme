import { useEffect, useMemo, useState } from "react";
import {
  Container,
  Paper,
  Title,
  TextInput,
  ActionIcon,
  Group,
  Loader,
  Table,
  ScrollArea,
} from "@mantine/core";
import axios from "axios";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  IconSearch,
  IconFilter,
  IconList,
  IconMaximize,
} from "@tabler/icons-react";

export default function UsersListPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.USER_LIST, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedUsers = response.data?.data?.users;
        if (Array.isArray(fetchedUsers)) {
          setUsers(fetchedUsers);
        } else {
          toast.error("Invalid user data format");
          setUsers([]);
        }
      } catch (error) {
        toast.error("Error fetching user list");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phoneNumber", header: "Phone Number" },
    ],
    []
  );

  // Filtered data
  const filteredUsers = useMemo(
    () =>
      users.filter((user) =>
        `${user?.name} ${user?.email} ${user?.phoneNumber}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search, users]
  );

  // Table instance
  const table = useReactTable({
    columns,
    data: filteredUsers,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <ToastContainer />
      <Container fluid size="lg">
        <Paper shadow="lg" p="md" radius="md" withBorder>
          {/* Header and Toolbar */}
          <Group position="apart" mb="md">
            <Title order={2}>Users List</Title>
            <Group>
              <ActionIcon variant="outline">
                <IconSearch size={18} />
              </ActionIcon>
              <ActionIcon variant="outline">
                <IconFilter size={18} />
              </ActionIcon>
              <ActionIcon variant="outline">
                <IconList size={18} />
              </ActionIcon>
              <ActionIcon variant="outline">
                <IconMaximize size={18} />
              </ActionIcon>
            </Group>
          </Group>

          {/* Search Input */}
          <TextInput
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            mb="md"
            style={{ maxWidth: "300px" }}
          />

          {/* Table or Loader */}
          {loading ? (
            <Loader size="lg" />
          ) : (
            <ScrollArea>
              <Table striped highlightOnHover>
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th key={header.id}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ScrollArea>
          )}
        </Paper>
      </Container>
    </>
  );
}
