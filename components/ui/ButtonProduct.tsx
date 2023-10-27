import React from "react";
import { Button } from "@mui/material";

interface Props {
  iconButton: JSX.Element;
  textButton: string;
  linkButton?: string;
}

export const ButtonProduct = ({ iconButton, textButton, linkButton }: Props) => {
  return (
    <Button variant="contained" color="secondary" size="large" className="product__btn" sx={{display: {xs: "none", sm: "inline-flex"}}} href={linkButton}>
      <div className="product__btn-icon">{iconButton}</div>
      <div className="product__btn-text">{textButton}</div>
    </Button>
  );
};
