import { Box, IconButton, Input } from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import { useState, useEffect } from "react";

interface Props {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter = ({
  currentValue,
  updatedQuantity,
  maxValue,
}: Props) => {
  const [newCurrentValue, setNewCurrentValue] = useState(currentValue);
  const [inputValue, setInputValue] = useState(currentValue);

  useEffect(() => {
    setNewCurrentValue(currentValue);
    setInputValue(currentValue);
  }, [currentValue]);

  const addOrRemove = (value: number) => {
    const newValue = newCurrentValue + value;

    if (newValue <= maxValue && newValue >= 0) {
      setNewCurrentValue(newValue);
      setInputValue(newValue);
      updatedQuantity(newValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);

    if (!isNaN(newValue) && newValue >= 1 && newValue <= maxValue) {
      setNewCurrentValue(newValue);
      updatedQuantity(newValue);
    }
    setInputValue(newValue);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid rgba(0, 0, 0, 0.5)"
      sx={{height: {xs: 33.25, md: 51}}}
    >
      <IconButton
        onClick={() => addOrRemove(-1)}
        sx={{
          borderRadius: 0,
          height: '100%',
          width: 40,
        }}
        size="small"
        color="secondary"
        disabled={newCurrentValue <= 1}
      >
        <Remove sx={{ fontSize: 14 }} />
      </IconButton>
      <Input
        type="text"
        value={newCurrentValue}
        sx={{
          borderBottom: "none",
          width: 40,
          ":after, :before": { display: "none" },
          ".MuiInput-input": { textAlign: "center" },
          height: "100%",
          borderLeft: '1px solid #23232380',
          borderRight: '1px solid #23232380',
        }}
        onChange={handleInputChange}
      />

      <IconButton
        onClick={() => addOrRemove(1)}
        sx={{
          borderRadius: 0,
          height: '100%',
          width: 40,
        }}
        size="small"
        color="secondary"
        disabled={newCurrentValue >= maxValue}
      >
        <Add sx={{ fontSize: 14 }} />
      </IconButton>
    </Box>
  );
};
