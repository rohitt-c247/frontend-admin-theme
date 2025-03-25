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
  rem,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconEye,
  IconDotsVertical,
} from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";

export default function CategoryListView({
  categories,
  loading,
  deleteLoading,
  deletingId,
  paginationParams,
  handlePageChange,
  handleLimitChange,
  handleDelete,
  handleEdit,
  handleView,
}) {
  const router = useRouter();

  const openDeleteModal = (categoryId, categoryName) => {
    modals.openConfirmModal({
      title: "Delete Category",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete the category <strong>{categoryName}</strong>? This action cannot be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancelled"),
      onConfirm: () => handleDelete(categoryId),
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
        <Title order={2}>Category List</Title>
        <Button component="a" href="/category/add-category">
          Add New Category
        </Button>
      </Group>
      <Divider my="md" />

      {loading ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "3rem" }}
        >
          <Loader size="lg" />
        </div>
      ) : categories.length === 0 ? (
        <Text size="lg" align="center" color="dimmed" my="xl">
          No categories found
        </Text>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <Table striped highlightOnHover>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                  <Table.Th>Created Date</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Actions</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {categories.map((category) => (
                  <Table.Tr key={category.id}>
                    <Table.Td>{category.categoryName}</Table.Td>
                    <Table.Td>{category.categoryType}</Table.Td>
                    <Table.Td>
                      {" "}
                      {new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }).format(new Date(category.createdDate))}
                    </Table.Td>
                    <Table.Td>{renderStatus(category.status)}</Table.Td>
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
                            onClick={() => handleView(category.id)}
                          >
                            View
                          </Menu.Item>
                          <Menu.Item
                            icon={<IconEdit size={rem(14)} />}
                            onClick={() => handleEdit(category._id)}
                          >
                            Edit
                          </Menu.Item>
                          <Menu.Item
                            icon={<IconTrash size={rem(14)} />}
                            color="red"
                            onClick={() => {
                              console.log(
                                "Clicked Delete:",
                                category._id
                              ); // Debug log
                              openDeleteModal(
                                category._id,
                                category.categoryName
                              );
                            }}
                            disabled={
                              deleteLoading &&
                              deletingId === category._id
                            } // Ensure consistency
                          >
                            {deleteLoading && deletingId === category._id
                              ? "Deleting..."
                              : "Delete"}
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
                Showing{" "}
                {(paginationParams.page - 1) * paginationParams.limit + 1} to{" "}
                {Math.min(
                  paginationParams.page * paginationParams.limit,
                  paginationParams.total
                )}{" "}
                of {paginationParams.total} entries
              </Text>
              <Pagination
                total={Math.ceil(
                  paginationParams.total / paginationParams.limit
                )}
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