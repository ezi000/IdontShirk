import Button, { ButtonProps } from "@mui/material/Button";
import styled from "styled-components";

const DefaultButton = ({
  children,
  className,
  bgColor = "black",
  textColor = "#fff",
  startIcon,
  ...props
}: DefaultButtonProps) => {
  return (
    <StyledButton
      disableRipple
      disableElevation
      variant="contained"
      className={className}
      $bgColor={bgColor}
      $textColor={textColor}
      startIcon={startIcon}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Button)<{
  $bgColor: string;
  $textColor: string;
}>`
  && {
    background-color: ${(props) => props.$bgColor};
    color: ${(props) => props.$textColor};
    font-family: "Merriweather", serif;
  }
`;

type DefaultButtonProps = ButtonProps & {
  bgColor?: string;
  textColor?: string;
  startIcon?: React.ReactNode;
};

export default DefaultButton;
