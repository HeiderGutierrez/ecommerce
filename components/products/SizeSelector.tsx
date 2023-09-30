import { ISize } from "@/interfaces";
import { Box, Button } from "@mui/material";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector = ({ selectedSize, sizes, onSelectedSize }: Props) => {
  return (
    <Box display={"flex"} gap={2} marginBottom={2} marginTop={2} flexWrap={"wrap"}>
      {sizes.map((size, index) => (
        <Button key={index} size="small" color="secondary" variant={selectedSize === size ? 'contained' : 'outlined'} onClick={() => onSelectedSize(size)}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
