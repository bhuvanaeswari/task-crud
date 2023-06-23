import React, { useState } from "react";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Typography, Modal, Button, Checkbox } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 310,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  overflowY: "auto",
  padding: "2rem",
};

const TaskList = ({ list, setList }) => {
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const columns = [
    {
      name: "Task Name",
      options: {
        customBodyRender: (value) => (
          <div style={{ marginLeft: "15px" }}>{value}</div>
        ),
      },
    },
    {
      name: "Description",
      options: {
        customBodyRender: (value) => <div>{value}</div>,
      },
    },

    {
      name: "Due Date",
      options: {
        customBodyRender: (value) => (
          <div style={{ marginLeft: "15px" }}>{value}</div>
        ),
      },
    },
    {
      name: "Completed",
      options: {
        customBodyRender: (value) => (
          <div style={{ marginLeft: "30px" }}>{value}</div>
        ),
      },
    },
    "Action",
  ];

  const options = {
    selectableRows: false,
  };

  const data = list.map((task) => [
    task.taskName,
    task.description,
    task.dueDate,
    <Checkbox
      checked={task.completed}
      onChange={() => handleTaskCompletion(task.id)}
    />,
    <DeleteIcon
      sx={{ marginLeft: "25px" }}
      color="error"
      onClick={() => handleDelete(task.id)}
    />,
  ]);

  const handleDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setList(list.filter((user) => user.id !== deleteTaskId));
    setDeleteModalOpen(false);
  };

  const handleTaskCompletion = (taskId) => {
    setList((prevList) =>
      prevList.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <>
      <MUIDataTable
        title="Task List"
        data={data}
        columns={columns}
        options={options}
      />
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box sx={style}>
          <Typography variant="h6" sx={{textAlign:'center'}}>Confirm Delete</Typography>
          <Typography>Are you sure you want to delete this task?</Typography>
          <div  style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}>
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button onClick={confirmDelete} color="error">
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default TaskList;
