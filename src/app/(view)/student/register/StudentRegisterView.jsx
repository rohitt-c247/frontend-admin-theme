"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Grid,
  NumberInput,
  Select,
  Image,
  Divider,
  Loader,
  Group,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconArrowLeft, IconEdit } from "@tabler/icons-react";

export default function StudentRegisterView({
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
            hr
            onClick={handleBack}
          >
            Back to List
          </Button>
          <Title order={2} mb="xs">
            {isEditMode ? "Edit User" : "Register a new user"}
          </Title>
        </Group>
      </Group>
      <Divider my="md" />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter="md">
          <Grid.Col span={4}>
            <Image
              radius="md"
              h={200}
              w="250"
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
            />
          </Grid.Col>
          <Grid.Col span={8}>

            <Grid gutter="md">
              <Grid.Col span={12}>
                <TextInput
                  withAsterisk
                  label="Full Name"
                  placeholder="Full Name"
                  {...form.getInputProps("name")}
                  size="md"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <TextInput
                  withAsterisk
                  label="Email"
                  autoComplete="off"
                  placeholder="example@email.com"
                  {...form.getInputProps("email")}
                  size="md"
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  withAsterisk
                  label="Phone Number"
                  placeholder="Phone Number"
                  allowDecimal={false}
                  allowNegative={false}
                  hideControls
                  type="text"
                  size="md"
                  {...form.getInputProps("phoneNumber")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  withAsterisk
                  label="Gender"
                  placeholder="Select gender"
                  data={['Male', 'Female', 'Other']}
                  size="md"
                  {...form.getInputProps("gender")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <DateInput
                  withAsterisk
                  valueFormat="YYYY MMM DD"
                  label="Date of Birth"
                  placeholder="Date of Birth"
                  size="md"
                  {...form.getInputProps("dob")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  withAsterisk
                  label="Account Status"
                  placeholder="Select Status"
                  data={[
                    { value: "1", label: 'Active' },
                    { value: "0", label: 'Inactive' }
                  ]}
                  size="md"
                  {...form.getInputProps("status")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <PasswordInput
                  withAsterisk={!isEditMode}
                  label={isEditMode ? "New Password" : "Password"}
                  placeholder="Password"
                  size="md"
                  {...form.getInputProps("password")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <PasswordInput
                  withAsterisk={!isEditMode}
                  label={isEditMode ? "Confirm New Password" : "Confirm Password"}
                  size="md"
                  placeholder="Confirm Password"
                  {...form.getInputProps("confirmPassword")}
                />
              </Grid.Col>
            </Grid>
            <Button
              type="submit"
              fullWidth
              mt="lg"
              loading={loading}
              radius="md"
            >
              {isEditMode ? "Update User" : "Create User"}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}