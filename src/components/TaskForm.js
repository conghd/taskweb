import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Typography,
  Box,
} from "@mui/material";

const TaskForm = ({ onSubmit, task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "Incomplete");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    onSubmit({ title, description, status });
    setTitle("");
    setDescription("");
    setStatus("Incomplete");
    setError("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3, width: "100%" }}>
      <Typography variant="h6">{task ? "Edit Task" : "Add New Task"}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={!!error}
          helperText={error}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <MenuItem value="Incomplete">Incomplete</MenuItem>
            <MenuItem value="Complete">Complete</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {task ? "Update Task" : "Add Task"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default TaskForm;
