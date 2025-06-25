import React from "react";
import TextField from "@mui/material/TextField";

const CustomizedInput = ({ name, type, label }) => {
  return (
    <TextField
      margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      name={name}
      label={label}
      type={type}
      InputProps={{
        style: {
          width: "400px",
          borderRadius: 10,
          fontSize: 20,
          color: "white",
        },
      }}
    />
  );
};

export default CustomizedInput;
