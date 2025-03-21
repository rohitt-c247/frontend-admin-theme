"use client";

import {
  TextInput,
  Button,
  Paper,
  Title,
  Grid,
  Select,
  Divider,
  Loader,
  Group,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";

export default function CategoryRegisterView({
  form,
  loading,
  fetchLoading,
  isEditMode,
  handleSubmit,
  handleBack
}) {
  if (fetchLoading) {
    return (
      <Paper shadow="lg" p="xl" radius="md" withBorder>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader size="lg" />
        </div>
      </Paper>
    );
  }

  return (
    <Paper shadow="lg" p="xl" radius="md" withBorder>
      <Group position="apart" mb="md">
        <Group>
          <Button
            variant="subtle"
            leftIcon={<IconArrowLeft size={16} />}
            onClick={handleBack}
          >
            Back to Categories
          </Button>
          <Title order={2} mb="xs">
            {isEditMode ? "Edit Category" : "Add New Category"}
          </Title>
        </Group>
      </Group>
      <Divider my="md" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Category Name"
              placeholder="Enter category name"
              {...form.getInputProps("categoryName")}
              size="md"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              withAsterisk
              label="Category Type"
              placeholder="Select category type"
              data={[
                { value: "product", label: "Product" },
                { value: "service", label: "Service" },
                { value: "course", label: "Course" },
                { value: "other", label: "Other" }
              ]}
              size="md"
              {...form.getInputProps("categoryType")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              withAsterisk
              label="Status"
              placeholder="Select status"
              data={[
                { value: "1", label: "Active" },
                { value: "0", label: "Inactive" }
              ]}
              size="md"
              {...form.getInputProps("status")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              type="submit"
              fullWidth
              mt="lg"
              loading={loading}
              radius="md"
            >
              {isEditMode ? "Update Category" : "Create Category"}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}