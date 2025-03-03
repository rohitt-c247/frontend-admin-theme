"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Grid,
  NumberInput,
} from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import { toast } from "react-toastify";
import { signupSchema } from "@/constants/validationSchema";

import style from "../../assets/scss/admin.module.scss";
import "react-toastify/dist/ReactToastify.css";
import signupService from "@/services/signup-service";
import Link from "next/link";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
    validate: yupResolver(signupSchema), 
    transformValues: (values) => ({
      ...values,
      phoneNumber: values.phoneNumber.toString(), 
    }),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const { confirmPassword, ...payload } = values; 
    try {
      const res = await signupService.signup(payload); 
      if (res && res.success) { 
        setLoading(false);
        toast.success(res.message || messageHandler.SIGNUP_SUCCESS);
        router.push("/login");
        form.reset();
      } else {
        setLoading(false);
        toast.error(res ? res.message : messageHandler.SIGNUP_FAILED);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message || messageHandler.SIGNUP_FAILED);
    }
  };

  return (
    <Paper shadow="lg" p="xl" radius="md" withBorder>
      <Title align="center" order={2} mb="xs">
        Create an Account
      </Title>
      <Text align="center" size="sm" color="dimmed" mb="md">
        Enter your details below to register
      </Text>

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Grid gutter="md">
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Full Name"
              placeholder="Full Name"
              {...form.getInputProps("name")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="example@email.com"
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="Password"
              {...form.getInputProps("password")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              withAsterisk
              label="Confrim Password"
              placeholder="Confrim Password"
              {...form.getInputProps("confirmPassword")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
          <NumberInput
            withAsterisk
            label="Phone Number"
            placeholder="Phone Number"
            allowDecimal={false}
            allowNegative={false}
            hideControls
            type="text"
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
              Already have an account? <Link href="/login">Login</Link>
            </Text>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}
