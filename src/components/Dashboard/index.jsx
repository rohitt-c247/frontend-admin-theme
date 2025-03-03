"use client";

import { Container, Grid, Paper, Text, Title } from "@mantine/core";
import { IconChartBar, IconUsers, IconShoppingCart } from "@tabler/icons-react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  return (
    <Container size="xl" py="lg">
      {/* Title */}
      <Title order={2} mb="md">
        Dashboard
      </Title>

      {/* Top Stats */}
      <Grid>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Paper p="md" shadow="sm" radius="md">
            <IconShoppingCart size={32} />
            <Text size="lg" fw={500}>
              Total Sales
            </Text>
            <Text size="xl" fw={700}>
              $95,563
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Paper p="md" shadow="sm" radius="md">
            <IconUsers size={32} />
            <Text size="lg" fw={500}>
              Total Users
            </Text>
            <Text size="xl" fw={700}>
              221,458
            </Text>
          </Paper>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 4 }}>
          <Paper p="md" shadow="sm" radius="md">
            <IconChartBar size={32} />
            <Text size="lg" fw={500}>
              Total Orders
            </Text>
            <Text size="xl" fw={700}>
              65,563
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>

      {/* Chart */}
      <Paper mt="lg" p="md" shadow="sm" radius="md">
        <Title order={3} mb="sm">
          Sales Overview
        </Title>
        <Bar
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [
              {
                label: "Sales",
                data: [12000, 19000, 30000, 50000, 80000],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
              },
            ],
          }}
        />
      </Paper>
    </Container>
  );
}
