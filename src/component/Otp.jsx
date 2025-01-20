/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/system";

function OTP({ separator, length, value, onChange }) {
  const handleInputChange = (event, index) => {
    const newValue = value.split("");
    newValue[index] = event.target.value;
    onChange(newValue.join(""));
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <InputElement
            value={value[index] || ""}
            onChange={(event) => handleInputChange(event, index)}
            maxLength={1}
            aria-label={`Digit ${index + 1} of OTP`}
          />
          {index < length - 1 && separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
};

export default function Otp() {
  const [otp, setOtp] = React.useState("");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <OTP
        separator={<span>-</span>}
        value={otp}
        onChange={setOtp}
        length={6}
      />
      <span>Entered value: {otp}</span>
    </Box>
  );
}

const InputElement = styled("input")(
  ({ theme }) => `
  width: 30px;
  font-size: 1rem;
  text-align: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;

  &:focus {
    outline: none;
    border-color: #007FFF;
    box-shadow: 0 0 4px rgba(0, 127, 255, 0.5);
  }
`
);
