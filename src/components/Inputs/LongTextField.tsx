import { TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

type LongTextFieldProps = TextFieldProps & {
  error: boolean | undefined;
  helperText: string | undefined;
};

const LongTextField = forwardRef<HTMLTextAreaElement, LongTextFieldProps>(
  ({ error, helperText, ...props }: LongTextFieldProps, ref) => {
    return (
      <TextField
        fullWidth
        multiline
        minRows={10}
        maxRows={10}
        error={!!error}
        helperText={error}
        {...props}
        inputRef={ref}
      />
    );
  }
);

export default LongTextField;
