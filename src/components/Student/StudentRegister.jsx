"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    TextInput,
    PasswordInput,
    Button,
    Paper,
    Title,
    Grid,
    NumberInput,
    Select,
    FileInput,
    Image,
    Divider,
} from "@mantine/core";
import { useForm, yupResolver } from '@mantine/form';
import { DateInput } from "@mantine/dates";
import { toast } from "react-toastify";

import { studentService } from "@/services/student-service";
import { userCreateValidationSchema } from "@/constants/validationSchema/user";

import style from "../../assets/scss/admin.module.scss";
import "react-toastify/dist/ReactToastify.css";

export default function StudentRegister() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            gender: "",
            dob: "",
            status: "0"
        },
        validate: yupResolver(userCreateValidationSchema),
        transformValues: (values) => ({
            ...values,
            phoneNumber: values.phoneNumber.toString(),
        }),
    });

    const handleSubmit = async (values) => {
        console.log(values);
        setLoading(true);
        const { confirmPassword, status, ...payload } = values;
        payload.status = parseInt(status, 10);
        try {
            const res = await studentService.studentRegister(payload);
            if (res && res.success) {
                setLoading(false);
                toast.success(res.message || messageHandler.SIGNUP_SUCCESS);
                router.push("/users");
                form.reset();
            } else {
                setLoading(false);
                toast.error(res ? res.message : messageHandler.SIGNUP_FAILED);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast.error(error.message || messageHandler.SIGNUP_FAILED);
        }
    };

    return (
        <Paper shadow="lg" p="xl" radius="md" withBorder>
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
                        <Title order={2} mb="xs">
                            Register a new user
                        </Title>
                        <Divider my="md" />
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
                                    label="Date of Birth" placeholder="Date of Birth"
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
                                    withAsterisk
                                    label="Password"
                                    placeholder="Password"
                                    size="md"
                                    {...form.getInputProps("password")}
                                />
                            </Grid.Col>
                            <Grid.Col span={6}>
                                <PasswordInput
                                    withAsterisk
                                    label="Confirm Password"
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
                            className={style.btn}
                        >
                            Create User
                        </Button>
                    </Grid.Col>
                </Grid>
            </form>
        </Paper>
    );
}
