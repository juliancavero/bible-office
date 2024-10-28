import { FormHelperText, styled } from "@mui/material";
import { forwardRef } from "react";

type SelectProps = {
  options: { value: string; label: string }[];
  error?: boolean;
  helperText?: string;
  includeEmpty?: boolean;
};

const ForwardSelect = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, helperText, includeEmpty, ...props }, ref) => {
    return (
      <>
        <StyledSelect ref={ref} {...props}>
          {includeEmpty && <Option key="empty" value="" />}
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </StyledSelect>
        {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </>
    );
  }
);

type NativeProps = SelectProps & {
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string | undefined;
};

const Select = ({
  options,
  error,
  helperText,
  includeEmpty,
  ...props
}: NativeProps) => {
  return (
    <>
      <StyledSelect {...props}>
        {includeEmpty && <Option key="empty" value="" />}
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </StyledSelect>
      {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </>
  );
};

export { ForwardSelect, Select };

const StyledSelect = styled("select")(({ theme }) => ({
  padding: theme.spacing(1.3, 2),
  fontSize: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
  width: "100%",
}));

const Option = styled("option")(({ theme }) => ({
  borderRadius: theme.spacing(1),
}));
