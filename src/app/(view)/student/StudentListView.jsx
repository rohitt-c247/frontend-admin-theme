"use client";

import {
  Table,
  Group,
  Button,
  Text,
  Paper,
  Title,
  Divider,
  Badge,
  Pagination,
  Select,
  ActionIcon,
  Loader,
  Menu,
  rem
} from "@mantine/core";
import { IconEdit, IconTrash, IconEye, IconDotsVertical } from "@tabler/icons-react";
import { modals } from "@mantine/modals";

export default function StudentListView({
  students,
  loading,
  deleteLoading,
  deletingId,
  paginationParams,
  handlePageChange,
  handleLimitChange,
  handleEdit,
  handleView,
  handleDelete,
  handleAddNew
}) {
  const openDeleteModal = (studentId, studentName) => {
    modals.openConfirmModal({
      title: "Delete Student",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the student <strong>{studentName}</strong>? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancelled"),
      onConfirm: () => handleDelete(studentId),
    });
  };

  const renderStatus = (status) => {
    if (status === 1) {
      return <Badge color="green">Active</Badge>;
    }
    return <Badge color="red">Inactive</Badge>;
  };

  return (
    <Paper shadow="lg" p="xl" radius="md" withBorder>
      <Group position="apart" mb="md">
        <Title order={2}>Student List</Title>
        <Button onClick={handleAddNew}>
          Add New Student
        </Button>
      </Group>
      <Divider my="md" />

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <Loader size="lg" />
        </div>
      ) : students.length === 0 ? (
        <Text size="lg" align="center" color="dimmed" my="xl">
          No students found
        </Text>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Email</Table.Th>
                  <Table.Th>Phone</Table.Th>
                  <Table.Th>Gender</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {students.map((student) => (
                  <Table.Tr key={student.id}>
                    <Table.Td>{student.name}</Table.Td>
                    <Table.Td>{student.email}</Table.Td>
                    <Table.Td>{student.phoneNumber}</Table.Td>
                    <Table.Td>{student.gender}</Table.Td>
                    <Table.Td>{renderStatus(student.status)}</Table.Td>
                    <Table.Td>
                      <Menu
                        shadow="md"
                        width={150}
                        position="bottom-end"
                        withArrow
                        arrowPosition="center"
                      >
                        <Menu.Target>
                          <ActionIcon>
                            <IconDotsVertical size={16} />
                          </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item 
                            icon={<IconEye size={rem(14)} />} 
                            onClick={() => handleView(student.id)}
                          >
                            View
                          </Menu.Item>
                          <Menu.Item 
                            icon={<IconEdit size={rem(14)} />} 
                            onClick={() => handleEdit(student.id)}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item 
                            icon={<IconTrash size={rem(14)} />} 
                            color="red"
                            onClick={() => openDeleteModal(student.id, student.name)}
                            disabled={deleteLoading && deletingId === student.id}
                          >
                            {deleteLoading && deletingId === student.id ? "Deleting..." : "Delete"}
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>

          <Group position="apart" mt="xl">
            <Group spacing="xs">
              <Text size="sm">Rows per page:</Text>
              <Select
                value={paginationParams.limit.toString()}
                onChange={(value) => handleLimitChange(parseInt(value))}
                data={["10", "20", "50", "100"]}
                style={{ width: 80 }}
                size="xs"
              />
            </Group>
            <Group spacing="xs">
              <Text size="sm">
                Showing {(paginationParams.page - 1) * paginationParams.limit + 1} to{" "}
                {Math.min(paginationParams.page * paginationParams.limit, paginationParams.total)} of{" "}
                {paginationParams.total} entries
              </Text>
              <Pagination
                total={Math.ceil(paginationParams.total / paginationParams.limit)}
                value={paginationParams.page}
                onChange={handlePageChange}
                size="sm"
              />
            </Group>
          </Group>
        </>
      )}
    </Paper>
  );
}