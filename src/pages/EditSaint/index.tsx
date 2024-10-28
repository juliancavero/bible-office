import MainPaper from "@/components/Containers/MainPaper";
import LongTextField from "@/components/Inputs/LongTextField";
import { ForwardSelect } from "@/components/Inputs/Select";
import Markdown from "@/components/Text/Markdown";
import { months } from "@/utils/calendar";
import {
  Button,
  FormControlLabel,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import useEditSaint from "./useEditSaint";

const EditSaintPage = () => {
  const { register, handleSubmit, errors, onSubmit, text, image } =
    useEditSaint();

  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Editar Santo
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledBox>
          <TextField
            fullWidth
            {...register("name", { required: "Este campo es requerido" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <LongTextField
            error={!!errors.text}
            helperText={errors.text?.message}
            {...register("text", { required: "Este campo es requerido" })}
          />

          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Día"
                type="number"
                {...register("day", { required: "Este campo es requerido" })}
                error={!!errors.day}
                helperText={errors.day?.message}
              />
            </Grid>
            <Grid item xs={3}>
              <ForwardSelect
                options={months}
                {...register("month", {
                  required: "Este campo es requerido",
                  valueAsNumber: true,
                })}
                error={!!errors.month}
                helperText={errors.month?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <input {...register("image")} type="file" />
            </Grid>
          </Grid>
          <FormControlLabel
            control={<input type="checkbox" {...register("isMain")} />}
            label="Principal"
          />
          <Button fullWidth type="submit" variant="contained">
            Guardar
          </Button>
        </StyledBox>
      </form>
      <Grid container spacing={3} style={{ marginTop: 5 }}>
        <Grid item xs={9}>
          <Markdown children={text} />
        </Grid>
        <Grid item xs={3}>
          {image && <img src={image} alt="Saint" style={{ width: "100%" }} />}
        </Grid>
      </Grid>
    </MainPaper>
  );
};

export default EditSaintPage;

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
