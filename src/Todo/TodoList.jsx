import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getTodosFailure,
  getTodosRequest,
  getTodosSuccess,
  removeTodo,
  toggleTodo
} from "../redux/app/action";
import { getTodos } from "./api";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.primary,
  background: theme.palette.text.secondary
}));

function TodoItem({ title, status, onDelete, id, onToggle }) {
  const [selected, setSelected] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        padding: "1rem",
        gap: "2rem",
        border: "1px solid gray",
        margin: "20px"
      }}
    >
      <Stack direction="row" spacing={2}>
        <Item>{title}</Item>
        <Item>{`${status}`}</Item>
      </Stack>
      <Button
        onClick={() => onDelete(id)}
        variant="outlined"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <ToggleButton
        value="check"
        selected={selected}
        onClick={() => {
          setSelected(!selected), onToggle(id);
        }}
      >
        Toggle
      </ToggleButton>
    </div>
  );
}

function TodoList() {
  const { todos, isLoading, isError } = useSelector(
    (state) => state.app,
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // getTodos(dispatch);
    dispatch(getTodos());
  }, []);

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };

  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };
  console.log(todos);
  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3> Something went wrong!</h3>}
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
