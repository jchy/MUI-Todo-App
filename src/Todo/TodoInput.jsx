import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function TodoInput({ onAdd }) {
  const [state, setState] = useState("");

  return (
    <Box>
      <div>
        <TextField
          label="Add events"
          color="secondary"
          focused
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="Add something"
        />
        <Button
          variant="contained"
          onClick={() => {
            onAdd(state);
            setState("");
          }}
        >
          ADD
        </Button>
      </div>
    </Box>
  );
}

export default TodoInput;
