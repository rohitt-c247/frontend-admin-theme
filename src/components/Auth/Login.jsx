"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Flex,
  Grid,
} from "@mantine/core";
import style from "./auth.module.scss";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Checkbox } from "@mantine/core";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token); // Store the token in local storage
        toast.success(response.data.message || "Login successful!"); // Show success toast
        setTimeout(() => {
          router.push("/dashboard"); // Redirect to dashboard page after successful login
        }, 1000); // Delay navigation by 1 second
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={`h-full ${style["auth-section"]}`}>
      <ToastContainer />
      <Grid className="h-100" classNames={{ inner: "h-100" }} gutter="none">
        <Grid.Col span={7}>
          <Flex align="center" className="h-100">
            <Container size={500} w="100%">
              <Paper shadow="lg" p="xl" radius="md" withBorder>
                <Title align="center" order={2} mb="xs">
                  Login
                </Title>
                <Text align="center" size="sm" color="dimmed" mb="md">
                  Enter Your Credentials To Access The ABC Portal
                </Text>

                {error && (
                  <Text color="red" align="center">
                    {error}
                  </Text>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <TextInput
                    label="Email"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <PasswordInput
                    label="Password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Checkbox label="Remember Me" mt="md" />

                  <Button
                    type="submit"
                    fullWidth
                    mt="lg"
                    loading={loading}
                    radius="md"
                    style={{ backgroundColor: "#007bff", color: "#fff" }} // Custom button style
                  >
                    Sign In
                  </Button>
                  <Grid>
                    <Grid.Col span={12}>
                      <Text align="right" mt="xs">
                        Dont't have an account? <a href="/signup">Sign up</a>
                      </Text>
                    </Grid.Col>
                  </Grid>
                </form>
              </Paper>
            </Container>
          </Flex>
        </Grid.Col>
        <Grid.Col span={5} className="h-100">
          <div className={style["auth-image"]}></div>
        </Grid.Col>
      </Grid>
    </section>
  );
}
