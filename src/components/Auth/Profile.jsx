"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import {
  Container,
  Paper,
  Title,
  Grid,
  Button,
  TextInput,
} from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../assets/scss/admin.module.scss";
import authStyle from "./auth.module.scss";
import axios from "axios";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints"; // Import API endpoints
import Link from "next/link";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const router = useRouter(); // ✅ Using the correct import

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Unauthorized! Redirecting to login...");
          router.push("/login"); // Redirect if no token
          return;
        }

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

  return (
    <section className={authStyle["auth-section"]}>
      <ToastContainer />
      <Container size={500} my={50}>
        <Paper shadow="lg" p="xl" radius="md" withBorder>
          <Title align="center" order={2} mb="xs">
            User Profile
          </Title>
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
                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          <Button
            fullWidth
            mt="lg"
            radius="md"
            className={style.btn}
            component={Link}
            href="/change-password"
          >
            Change Password
          </Button>
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
          <Button
            fullWidth
            mt="lg"
            radius="md"
            className={style.btn}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>
      </Container>
    </section>
  );
}
