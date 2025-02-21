"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import {
  Container,
  Paper,
  Title,
  Grid,
  Button,
  PasswordInput,
} from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../assets/scss/admin.module.scss";
import authStyle from "./auth.module.scss";
import axios from "axios";
import { useForm } from "@mantine/form";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints"; // Import API endpoints

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ Using the correct import

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      currentPassword: (value) =>
        value.trim().length === 0 ? "Current password is required" : null,

      newPassword: (value) =>
        value.trim().length === 0
          ? "New password is required"
          : value.trim().length < 8
          ? "New password must be at least 8 characters"
          : null,

      confirmNewPassword: (value, values) =>
        value.trim().length === 0
          ? "Confirm new password is required"
          : value.trim().length < 8
          ? "Confirm new password must be at least 8 characters"
          : value !== values.newPassword
          ? "Passwords do not match"
          : null,
    },
  });

  const handleChangePassword = async (values) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      const response = await axios.post(
        API_ENDPOINTS.CHANGE_PASSWORD,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Password changed successfully!"
        ); // Show success toast
        form.reset();
        setTimeout(() => {
          router.push("/login"); // Redirect to login page after success
        }, 2000); // Delay to allow the toast message to be seen
      } else {
        toast.error(response.data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={authStyle["auth-section"]}>
      <ToastContainer />
      <Container size={500} my={50}>
        <Paper shadow="lg" p="xl" radius="md" withBorder>
          <Title align="center" order={2} mb="xs">
            Change Password
          </Title>
          <form onSubmit={form.onSubmit(handleChangePassword)}>
            <Grid gutter="md">
              <Grid.Col span={12}>
                <PasswordInput
                  label="Current Password"
                  placeholder="Current Password"
                  {...form.getInputProps("currentPassword")}
                  // required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <PasswordInput
                  label="New Password"
                  placeholder="New Password"
                  {...form.getInputProps("newPassword")}
                  // required
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <PasswordInput
                  label="Confirm New Password"
                  placeholder="Confirm New Password"
                  {...form.getInputProps("confirmNewPassword")}
                  // required
                />
              </Grid.Col>
            </Grid>
            <Button
              fullWidth
              mt="lg"
              radius="md"
              className={style.btn}
              type="submit"
              loading={loading}
            >
              Change Password
            </Button>
          </form>
        </Paper>
      </Container>
    </section>
  );
}
