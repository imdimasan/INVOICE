import Button from "@material-ui/core/Button";
import "./Buttons.scss";

function Buttons({ children, variant, color, onClick, disabled }) {
  return (
    <Button
      variant={variant ? variant : "contained"}
      color={color ? color : "primary"}
      children={children}
      onClick={onClick}
      className="buttons"
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default Buttons;
