import MainPaper from "@/components/Containers/MainPaper";
import LongTextField from "@/components/Inputs/LongTextField";
import { ForwardSelect } from "@/components/Inputs/Select";
import Markdown from "@/components/Text/Markdown";
import { months } from "@/utils/calendar";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import useCreateSaint from "./useCreateSaint";

const CreateSaintPage = () => {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    text,
    templates,
    onCopyTemplateClick,
  } = useCreateSaint();
  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Crear Santo
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <StyledBox>
              <TextField
                fullWidth
                label="Nombre"
                {...register("name", { required: "Este campo es requerido" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
              <LongTextField
                {...register("text", { required: "Este campo es requerido" })}
                error={!!errors.text}
                helperText={errors.text?.message}
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
                    {...register("day", {
                      required: "Este campo es requerido",
                    })}
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
                control={<Checkbox {...register("isMain")} />}
                label="Principal"
              />
              <Button fullWidth type="submit" variant="contained">
                Crear Santo
              </Button>
            </StyledBox>
          </Grid>
          <Grid item xs={4}>
            <StyledBox>
              <Typography variant="h4">Templates</Typography>
              <div style={{ display: "flex", gap: 10 }}>
                <Typography variant="h5">Crear Santo</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onCopyTemplateClick(templates.createSaint)}
                >
                  Copiar
                </Button>
              </div>
              <Typography variant="body1">{templates.createSaint}</Typography>
              <div style={{ display: "flex", gap: 10 }}>
                <Typography variant="h5">Imagen</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onCopyTemplateClick(templates.image)}
                >
                  Copiar
                </Button>
              </div>
              <Typography variant="body1">{templates.image}</Typography>
            </StyledBox>
          </Grid>
        </Grid>
      </form>
      <Markdown children={text} />
    </MainPaper>
  );
};

export default CreateSaintPage;

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
