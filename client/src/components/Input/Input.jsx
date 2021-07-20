import TextField from "@material-ui/core/TextField";
import "./Input.scss";

function Input({
  helperText,
  label,
  id,
  type,
  error,
  disabled,
  onChange,
  name,
  value,
}) {
  return (
    <>
      <TextField
        error={error ? true : false}
        disabled={disabled}
        id={id}
        name={name}
        label={label ? label : "Error"}
        helperText={helperText}
        className="input"
        type={type}
        onChange={onChange}
        value={value ? value : ""}
      />
    </>
  );
}

export default Input;
