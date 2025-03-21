"use client";

import {
  Paper,
  Title,
  Text,
  Grid,
  Group,
  Button,
  Divider,
  Badge,
  Loader,
  Avatar,
  Box,
  Card,
  List,
  ThemeIcon
} from "@mantine/core";
import { IconArrowLeft, IconEdit, IconUser, IconMail, IconPhone, IconCalendar, IconGenderBigender } from "@tabler/icons-react";
import dayjs from 'dayjs';

export default function StudentDetailView({
  student,
  loading,
  handleEdit,
  handleBack
}) {
  if (loading) {
    return (
      <Paper shadow="lg" p="xl" radius="md" withBorder>
        <div style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
          <Loader size="lg" />
        </div>
      </Paper>
    );
  }

  if (!student) {
    return (
      <Paper shadow="lg" p="xl" radius="md" withBorder>
        <Text align="center" size="lg" color="dimmed">
          Student not found
        </Text>
      </Paper>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return dayjs(dateString).format("MM-DD-YYYY || HH:mm:ss");
    } catch (error) {
      return dateString;
    }
  };

  const getStatusBadge = (status) => {
    if (status === 1) {
      return <Badge color="green" size="lg">Active</Badge>;
    }
    return <Badge color="red" size="lg">Inactive</Badge>;
  };

  return (
    <Paper shadow="lg" p="xl" radius="md" withBorder>
      <Group position="apart" mb="md">
        <Group>
          <Button
            variant="subtle"
            leftIcon={<IconArrowLeft size={16} />}
            onClick={handleBack}
          >
            Back to List
          </Button>
          <Title order={2}>Student Details</Title>
        </Group>
        <Button
          leftIcon={<IconEdit size={16} />}
          onClick={handleEdit}
        >
          Edit Student
        </Button>
      </Group>
      <Divider my="md" />

      <Grid gutter="xl">
        <Grid.Col span={4}>
          <Card p="lg" radius="md" withBorder>
            <Card.Section p="lg" style={{ textAlign: "center" }}>
              <Avatar
                size={120}
                radius={120}
                mx="auto"
                color="blue"
                src={student.profileImage}
              >
                {student.name ? student.name.charAt(0).toUpperCase() : "S"}
              </Avatar>
              <Title order={3} mt="md">{student.name}</Title>
              <Text color="dimmed" size="sm">{student.email}</Text>
              <Box mt="md">
                {getStatusBadge(student.status)}
              </Box>
            </Card.Section>
            <Card.Section p="lg">
              <List spacing="md">
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <IconPhone size={16} />
                    </ThemeIcon>
                  }
                >
                  {student.phoneNumber || "No phone number"}
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <IconGenderBigender size={16} />
                    </ThemeIcon>
                  }
                >
                  {student.gender || "Not specified"}
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="blue" size={24} radius="xl">
                      <IconCalendar size={16} />
                    </ThemeIcon>
                  }
                >
                  {formatDate(student.dob) || "Not specified"}
                </List.Item>
              </List>
            </Card.Section>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={8}>
          <Card p="lg" radius="md" withBorder>
            <Title order={3} mb="md">Detailed Information</Title>
            <Divider mb="xl" />
            
            <Grid gutter="lg">
              <InfoItem label="Student ID" value={student.id} />
              <InfoItem label="Full Name" value={student.name} />
              <InfoItem label="Email Address" value={student.email} />
              <InfoItem label="Phone Number" value={student.phoneNumber} />
              <InfoItem label="Gender" value={student.gender} />
              <InfoItem label="Date of Birth" value={formatDate(student.dob)} />
              <InfoItem label="Status" value={getStatusBadge(student.status)} isComponent />
              <InfoItem label="Registration Date" value={formatDate(student.createdAt)} />
              <InfoItem label="Last Updated" value={formatDate(student.updatedAt)} />
            </Grid>
            
            {student.additionalInfo && (
              <>
                <Title order={4} mt="xl" mb="md">Additional Information</Title>
                <Divider mb="md" />
                <Text>{student.additionalInfo}</Text>
              </>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

// Helper component for displaying information in a consistent format
function InfoItem({ label, value, isComponent = false, span = 6 }) {
  return (
    <Grid.Col span={span}>
      <Box mb="md">
        <Text weight={600} size="sm" color="dimmed">
          {label}
        </Text>
        {isComponent ? (
          value
        ) : (
          <Text size="md">{value || "Not provided"}</Text>
        )}
      </Box>
    </Grid.Col>
  );
}