"use client";

import { useEffect, useState } from "react";
import { Container, Paper, Title, Table, Loader } from "@mantine/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "../../assets/scss/admin.module.scss";
import axios from "axios";
import { API_ENDPOINTS } from "../../../frameworks/utils/api-endpoints";

export default function UserListPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.USER_LIST, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response.data); // Debugging API response

        if (response.data.success) {
          setUsers(
            Array.isArray(response.data.data.users)
              ? response.data.data.users
              : []
          );
        } else {
          toast.error(response.data.message || "Failed to fetch user list");
        }
      } catch (error) {
        toast.error("An error occurred while fetching user list");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <section className={style["user-section"]}>
      <ToastContainer />
      <Container size="lg" my={50}>
        <Paper shadow="lg" p="xl" radius="md" withBorder>
          <Title align="center" order={2} mb="xs">
            User List
          </Title>
          {loading ? (
            <Loader size="lg" />
          ) : (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phoneNumber || "N/A"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center" }}>
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Paper>
      </Container>
    </section>
  );
}
