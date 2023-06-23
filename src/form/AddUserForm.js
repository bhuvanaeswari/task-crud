import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Close } from "@mui/icons-material";
import {
  Box,
  Typography,
  TextField,
  Button,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import InputCover from "../parts/InputCover";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: 450,
  maxWidth: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "1rem",
  overflowY: "auto",
};

const AddUserForm = ({ isValid, onSubmit, setShowForm }) => {
  const handleClose = () => {
    reset();
    setShowForm(false);
  };
  const handleCancelClose = () => {
    reset();
  };
  const schema = yup.object().shape({
    taskName: yup
      .string()
      .required("TaskName is required")
      .nullable(true)
      .trim(),
  });
  const {
    register,
    watch,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      taskName: "",
      description: "",
      dueDate: null,
    },
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Box sx={style}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: "20px",
          }}
        >
          <Typography
            variant="h5"
            className="font-bolder"
            sx={{ marginTop: "10px" }}
          >
            AddUserForm
          </Typography>
          <IconButton
            onClick={handleClose}
            sx={{
              cursor: "pointer",
              position: "absolute",
              top: 0,
              right: 0,
              marginLeft: "auto",
              borderRadius: "50%", 
              backgroundColor: "green", 
            }}
          >
            <Close  sx={{fontSize:"10px"}}/>
          </IconButton>
        </div>
        <div className="px-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputCover label="TaskName" star="*">
              <TextField
                rows={10}
                size="small"
                sx={{ width: "62%" }}
                {...register("taskName", { required: true })}
              />
              <div style={{color:"red"}}>
              <Typography variant="caption" className="text-red-500">
                {errors?.taskName?.message}
              </Typography>
              </div>
            </InputCover>
            <InputCover label="Description">
              <TextareaAutosize
                minRows={5}
                maxRows={5}
                {...register("description")}
                style={{ width: "62%" }}
              />
            </InputCover>
            <InputCover label="Due Date" >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Basic date picker"
                  value={watch("dueDate")} 
                  onChange={(date) =>
                    setValue("dueDate", date, { shouldValidate: true })
                  } 
                />
              </LocalizationProvider>
            </InputCover>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <Button
                className="mr-10 text-white"
                variant="contained"
                onClick={handleCancelClose}
                color="error"
              >
                cancel
              </Button>
              <Button disabled={isValid} variant="contained" type="submit">
                Add
              </Button>
            </div>
          </form>
        </div>
      </Box>
    </>
  );
};

export default AddUserForm;
