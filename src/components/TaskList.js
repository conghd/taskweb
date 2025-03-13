import React, { useState, useEffect } from "react";
import { getTasks, createTask } from "../services/api"; // API calls
import { getUser } from "../services/api"; // Get user info
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Chip,
  Box,
  Button,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

const statusColors = {
  "To do": "warning",
  "In progress": "info",
  "Done": "success",
};

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [totalTasks, setTotalTasks] = useState(0);

  const user = getUser();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [statusFilter, page, rowsPerPage]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks(statusFilter, page + 1, rowsPerPage); // API handles pagination
      setTasks(data.tasks);
      setTotalTasks(data.totalTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleCreateTask = async () => {
    if (!newTask.title || !newTask.description) return;
    
    try {
      await createTask({
        title: newTask.title,
        description: newTask.description,
        status: "To do", // Default status for new tasks
        createdBy: user._id, // Automatically set from logged-in user
      });
      setOpenDialog(false);
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: "90%", mx: "auto", mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Task List
      </Typography>

      {/* Create Task Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="To do">To Do</MenuItem>
          <MenuItem value="In progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Create Task
        </Button>
      </Box>

      {/* Task Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Assigned To</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Created By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task._id} hover>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>
                    <Chip label={task.status} color={statusColors[task.status] || "default"} />
                  </TableCell>
                  <TableCell>{task.assignedTo?.name || "Unassigned"}</TableCell>
                  <TableCell>{task.createdBy?.name || "Unknown"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalTasks} // Assume total count is known (can be fetched from API)
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />

      {/* Create Task Popup (Dialog) */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleCreateTask} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default TaskList;
