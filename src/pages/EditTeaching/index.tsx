import MainPaper from "@/components/Containers/MainPaper";
import LongTextField from "@/components/Inputs/LongTextField";
import { ForwardSelect } from "@/components/Inputs/Select";
import Markdown from "@/components/Text/Markdown";
import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import useEditTeaching from "./useEditTeaching";

const EditTeachingPage = () => {
  const { bibleBooks, register, handleSubmit, errors, onSubmit, text, image } =
    useEditTeaching();

  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Editar Enseñanza
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
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

export default EditTeachingPage;

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
