import { Autocomplete, FormHelperText, styled, TextField } from "@mui/material";
import { forwardRef } from "react";

type AutocompleteProps = {
  options: { value: string; label: string }[];
  error?: boolean;
  helperText?: string;
  label: string;
};

const AutocompleteCustom = forwardRef<HTMLSelectElement, AutocompleteProps>(
  ({ options, error, helperText, label, ...props }, ref) => {
    return (
      <>
        <StyledAutoComplete
          renderInput={(params) => <TextField {...params} label={label} />}
          options={options}
          {...props}
          ref={ref}
          //isOptionEqualToValue={(option, value) => option.value === value.value}
        />
        {error && <FormHelperText error={error}>{helperText}</FormHelperText>}
      </>
    );
  }
);

export default AutocompleteCustom;

const StyledAutoComplete = styled(Autocomplete)(({ theme }) => ({
  //padding: theme.spacing(2),
  fontSize: theme.spacing(2),
  borderRadius: theme.spacing(1),
  //border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
  "&:hover": {
    borderColor: theme.palette.primary.main,
  },
}));
