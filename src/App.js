import "./App.css";
import AddUserForm from "./form/AddUserForm";
import { initialTasks } from "./data/initialTasks";
import { useState } from "react";
import dayjs from "dayjs";
import TaskList from "./table/TaskList";
import { Button, Checkbox } from "@mui/material";

function App() {
  const [list, setList] = useState(initialTasks);
  const [isValid, setIsValid] = useState(false);
  const [showForm, setShowForm] = useState(false);

  console.log(initialTasks, list);

  const addUser = (user) => {
    const formattedDueDate = dayjs(user.dueDate).format("YYYY-MM-DD");
    console.log(user, formattedDueDate);
    user.id = list.length + 1;
    user.dueDate = formattedDueDate;
    user.completed = "true"
    setList([...list, user]);
    setShowForm(false);
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  return (
    <div className="App">
       {!showForm && (
        <Button onClick={handleAddButtonClick} variant="contained" sx={{marginTop:"10px"}}>
          Create a New Task
        </Button>
      )}
      {showForm ? (
        <AddUserForm
          isValid={isValid}
          onSubmit={(data) => addUser(data)}
          setShowForm={setShowForm}
        />
      ) : (
        <TaskList list={list} setList={setList} />
      )}
    </div>
  );
}

export default App;
