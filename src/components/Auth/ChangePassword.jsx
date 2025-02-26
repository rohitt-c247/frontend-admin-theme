"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Title,
  Grid,
  Button,
  PasswordInput,
  Text,
  Anchor,
  Image,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../assets/scss/admin.module.scss";
import authStyle from "./auth.module.scss";
import axios from "axios";
import { useForm } from "@mantine/form";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";
import { IconTrash, IconEdit } from "@tabler/icons-react";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const router = useRouter();

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
          : value !== values.newPassword
          ? "Passwords do not match"
          : null,
    },
  });

  const handleChangePassword = async (values) => {
    setLoading(true);
    if (!token) {
      toast.error("Unauthorized request. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        API_ENDPOINTS.CHANGE_PASSWORD,
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(
          response.data.message || "Password changed successfully!"
        );
        form.reset();
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setImage(null);

  return (
    <section className={authStyle["auth-section"]}>
      <ToastContainer />
      <Container fluid w="100%">
        <Grid>
          <Grid.Col span={12}>
            <Title order={3}>Manage Profile</Title>
            <Text color="dimmed">
              Dashboard / <Anchor href="#">Manage Profile</Anchor>
            </Text>
          </Grid.Col>
          <Grid.Col span={4}>
            <div>
              <Text size="sm">Upload Profile</Text>

              <div
                style={{
                  border: "1px dashed #d9d9d9",
                  padding: 20,
                  borderRadius: 10,
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <Dropzone
                  onDrop={handleDrop}
                  accept={IMAGE_MIME_TYPE}
                  maxSize={3 * 1024 ** 2} // 3MB file size limit
                >
                  {image ? (
                    <Image
                      src={image}
                      alt="Profile"
                      width={120}
                      height={120}
                      radius="50%"
                      mx="auto"
                      className={style["profile-image"]}
                    />
                  ) : (
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        background: "#f1f3f5",
                        margin: "auto",
                      }}
                    />
                  )}
                  <Button
                    component="label"
                    variant="subtle"
                    color="blue"
                    leftSection={<IconEdit size={16} />}
                    mt="sm"
                  >
                    Change Profile
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </Button>
                  <Text size="xs" color="dimmed" mt="xs">
                    Or Drag And Drop Here
                  </Text>
                </Dropzone>

                {image && (
                  <Button
                    variant="subtle"
                    color="red"
                    size="xs"
                    onClick={handleRemoveImage}
                    style={{ position: "absolute", top: 10, right: 10 }}
                  >
                    <IconTrash size={18} />
                  </Button>
                )}
              </div>

              <Text size="xs" color="dimmed" align="center" mt="sm">
                Supported File Formats : JPEG, PNG, GIF, JPG
              </Text>
            </div>
          </Grid.Col>
          <Grid.Col span={8}>
            <Paper>
              <form onSubmit={form.onSubmit(handleChangePassword)}>
                <Grid gutter="md">
                  <Grid.Col span={12}>
                    <PasswordInput
                      label="Current Password"
                      placeholder="Current Password"
                      {...form.getInputProps("currentPassword")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <PasswordInput
                      label="New Password"
                      placeholder="New Password"
                      {...form.getInputProps("newPassword")}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <PasswordInput
                      label="Confirm New Password"
                      placeholder="Confirm New Password"
                      {...form.getInputProps("confirmNewPassword")}
                    />
                  </Grid.Col>
                </Grid>
                <Grid>
                  <Grid.Col offset={8} span={4}>
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
                  </Grid.Col>
                </Grid>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
