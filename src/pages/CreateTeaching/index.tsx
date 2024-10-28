import MainPaper from "@/components/Containers/MainPaper";
import LongTextField from "@/components/Inputs/LongTextField";
import { ForwardSelect } from "@/components/Inputs/Select";
import Markdown from "@/components/Text/Markdown";
import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import useCreateTeaching from "./useCreateTeaching";

const CreateTeachingPage = () => {
  const {
    bibleBooks,
    register,
    handleSubmit,
    errors,
    onSubmit,
    text,
    templates,
    onCopyTemplateClick,
  } = useCreateTeaching();

  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Crear Enseñanza
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <StyledBox>
              <ForwardSelect
                options={bibleBooks.map((book) => ({
                  value: book.value,
                  label: book.label,
                }))}
                {...register("book", { required: "Este campo es requerido" })}
                error={!!errors.book}
                helperText={errors.book?.message}
              />

              <Grid
                container
                spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent={"center"}
                  alignItems={"center"}
                  spacing={3}
                >
                  <Grid item xs={3}>
                    <TextField
                      fullWidth
                      label="Capítulo"
                      type="number"
                      {...register("chapter", {
                        required: "Este campo es requerido",
                      })}
                      error={!!errors.chapter}
                      helperText={errors.chapter?.message}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <input {...register("image")} type="file" />
                  </Grid>
                </Grid>
              </Grid>
              <LongTextField
                {...register("text", { required: "Este campo es requerido" })}
                error={!!errors.text}
                helperText={errors.text?.message}
              />

              <Button fullWidth type="submit" variant="contained">
                Crear Enseñanza
              </Button>
            </StyledBox>
          </Grid>
          <Grid item xs={4}>
            <StyledBox>
              <Typography variant="h4">Templates</Typography>
              <div style={{ display: "flex", gap: 10 }}>
                <Typography variant="h5">Crear Enseñanza</Typography>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onCopyTemplateClick(templates.createTeaching)}
                >
                  Copiar
                </Button>
              </div>
              <Typography variant="body1">
                {templates.createTeaching}
              </Typography>
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

export default CreateTeachingPage;

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
