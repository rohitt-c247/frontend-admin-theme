"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Title,
  Grid,
  Button,
  TextInput,
  Anchor,
  Text,
  Image,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./auth.module.scss";
import axios from "axios";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";
import Link from "next/link";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser({
            name: response.data.data.name,
            email: response.data.data.email,
            phoneNumber: response.data.data.phoneNumber,
          });
        } else {
          toast.error(response.data.message || "Failed to fetch user details");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Retrieve the token from local storage
      const response = await axios.put(
        API_ENDPOINTS.UPDATE_PROFILE,
        {
          name: user.name,
          email: user.email,
          // phoneNumber: user.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message || "Profile updated successfully!"); // Show success toast
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    toast.success("Logged out successfully!", {
      onClose: () => router.push("/login"), // Redirect after toast disappears
    });
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
    <section className={style["auth-section"]}>
      <ToastContainer />
      <Container fluid w="100%">
        <Grid>
          <Grid.Col span={12}>
            <Title order={3}>Manage Profile</Title>
            <Text color="dimmed">
              Dashboard / <Anchor href="#">Manage Profile</Anchor>
            </Text>
          </Grid.Col>
        </Grid>
        <Grid>
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
              <Grid gutter="md">
                <Grid.Col span={12}>
                  <TextInput
                    label="Name"
                    placeholder="Name"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    label="Email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <TextInput
                    label="Phone Number"
                    placeholder="Phone Number"
                    value={user.phoneNumber}
                    disabled
                  />
                </Grid.Col>
              </Grid>
              <Grid>
                <Grid.Col span={4}>
                  <Button
                    fullWidth
                    mt="lg"
                    radius="md"
                    className={style.btn}
                    component={Link}
                    href="/change-password"
                    passHref
                  >
                    <Anchor
                      component="span"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      Change Password
                    </Anchor>
                  </Button>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button
                    fullWidth
                    mt="lg"
                    radius="md"
                    className={style.btn}
                    onClick={handleUpdate}
                    loading={loading}
                  >
                    Update Profile
                  </Button>
                </Grid.Col>
                <Grid.Col span={4}>
                  <Button
                    fullWidth
                    mt="lg"
                    radius="md"
                    className={style.btn}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Grid.Col>
              </Grid>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>
    </section>
  );
}
