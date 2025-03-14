import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Redirect after login
import { getUser, loginUser } from "../services/api"; // API call
import { Button, TextField, Paper, Typography } from "@mui/material";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginUser(name, email); // API call
      if (user) {
        console.log(user);
        navigate("/tasks"); // Redirect to task list after login
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h6" gutterBottom>Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
        <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="dense" />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
      </form>
    </Paper>
  );
};

export default Login;
