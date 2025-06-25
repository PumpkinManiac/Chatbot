import React from "react";
import TextField from "@mui/material/TextField";

const CustomizedInput = ({ name, type = "text", label, value, onChange, required = false }) => {
  return (
    <TextField
      margin="normal"
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
      variant="outlined"
      autoComplete="off"
      InputLabelProps={{ style: { color: "white" } }}
      sx={{
        input: {
          color: "white",
          fontSize: "1.1rem",
        },
        "& label": {
          fontSize: "1rem",
        },
        "& .MuiOutlinedInput-root": {
          borderRadius: 2,
          "& fieldset": {
            borderColor: "white",
          },
          "&:hover fieldset": {
            borderColor: "#00fffc",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#00fffc",
            borderWidth: "2px",
          },
        },
        width: "100%", // Removed maxWidth: "10px"
      }}
    />
  );
};

export default CustomizedInput;
