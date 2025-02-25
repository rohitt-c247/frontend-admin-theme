"use client";

import { useState } from "react";
import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Grid,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../assets/scss/admin.module.scss";
import authStyle from "./auth.module.scss";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      // confirmPassword: "",
      phoneNumber: "",
    },
    validate: {
      name: (value) =>
        value.trim().length < 3
          ? "Full name must be at least 3 characters"
          : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must be at least 6 characters" : null,
      // confirmPassword: (value, values) =>
      //   value !== values.password ? "Passwords do not match" : null,
      phoneNumber: (value) =>
        value.trim().length < 10
          ? "Phone number must be at least 10 characters"
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    console.log("Registering:", values);

    let data = JSON.stringify({
      name: values.name,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: API_ENDPOINTS.REGISTER,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const res = await axios.request(config);

      if (res.data.success) {
        setLoading(false);
        toast.success(res.data.message || "Registration successful!");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setLoading(false);
        toast.error(res.data.message || "Registration failed!");
      }
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <section className={authStyle["auth-section"]}>
      <ToastContainer />
      <Container size={500} my={50}>
        <Paper shadow="lg" p="xl" radius="md" withBorder>
          <Title align="center" order={2} mb="xs">
            Create an Account
          </Title>
          <Text align="center" size="sm" color="dimmed" mb="md">
            Enter your details below to register
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Grid gutter="md">
              <Grid.Col span={12}>
                <TextInput
                  label="Full Name"
                  placeholder="Full Name"
                  {...form.getInputProps("name")}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Email"
                  placeholder="example@email.com"
                  {...form.getInputProps("email")}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <PasswordInput
                  label="Password"
                  placeholder="Password"
                  {...form.getInputProps("password")}
                />
              </Grid.Col>
              <Grid.Col span={12}>
                <TextInput
                  label="Phone Number"
                  placeholder="Phone Number"
                  {...form.getInputProps("phoneNumber")}
                />
              </Grid.Col>
            </Grid>

            <Button
              type="submit"
              fullWidth
              mt="lg"
              loading={loading}
              radius="md"
              className={style.btn}
            >
              Register
            </Button>
            <Grid>
              <Grid.Col span={12}>
                <Text align="center" mt="xs">
                  Already have an account? <a href="/login">Login</a>
                </Text>
              </Grid.Col>
            </Grid>
          </form>
        </Paper>
      </Container>
    </section>
  );
}
