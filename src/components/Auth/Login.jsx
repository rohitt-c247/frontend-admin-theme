"use client";

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Checkbox,
  Grid,
} from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import useAuth from "@/hooks/useAuth"; // Import useAuth hook
import { loginSchema } from '@/constants/validationSchema'; // Import authSchema
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

export default function LoginPage() {
  const { login, loading, error } = useAuth(); 
  
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(loginSchema), // Use authSchema for validation
  });

  const handleLogin = async (values) => {
    await login(values.email, values.password); // Use form values for login
  };

  return (
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
        onSubmit={form.onSubmit((values) => handleLogin(values))} // Use form's onSubmit handler
      >
        <TextInput
          label="Email"
          placeholder="example@email.com"
          withAsterisk
          {...form.getInputProps('email')}
          
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          withAsterisk
          {...form.getInputProps('password')}
          
        />
        <Checkbox label="Remember Me" mt="md" />

        <Button
          type="submit"
          fullWidth
          mt="lg"
          loading={loading} // Show loading state
          radius="md"
          style={{ backgroundColor: "#007bff", color: "#fff" }} // Custom button style
        >
          Sign In
        </Button>
        <Grid>
          <Grid.Col span={12}>
            <Text align="right" mt="xs">
              Dont't have an account? <Link href="/signup">Sign up</Link>
            </Text>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}
