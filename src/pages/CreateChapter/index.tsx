import MainPaper from "@/components/Containers/MainPaper";
import LongTextField from "@/components/Inputs/LongTextField";
import { ForwardSelect } from "@/components/Inputs/Select";
import Markdown from "@/components/Text/Markdown";
import { Button, Grid, styled, TextField, Typography } from "@mui/material";
import useCreateChapter from "./useCreateChapter";

const CreateChapterPage = () => {
  const {
    bibleBooks,
    bibleVersions,
    register,
    handleSubmit,
    errors,
    onSubmit,
    text,
    onInsertTitlesClick,
    onReplaceAllNumbersClick,
    onReplaceAllNextLineClick,
    onInsertBeginingTitleClick,
    allTextModifiersAtOnce,
    onPaste,
    numOfTitles,
    removeBeginningTitle,
    formRef,
  } = useCreateChapter();

  return (
    <MainPaper>
      <Typography variant="h3" marginBottom={3}>
        Crear Capítulo
      </Typography>

      <div
        style={{
          position: "absolute",
          top: 80,
          right: 16,
          zIndex: 999999,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "whitesmoke",
          padding: 8,
          borderRadius: 8,
          border: "1px solid lightgray",
        }}
      >
        <Button style={{ fontSize: 24 }} variant="contained" onClick={onPaste}>
          Pegar
        </Button>
        <Button
          style={{ fontSize: 12 }}
          variant="contained"
          onClick={removeBeginningTitle}
        >
          Quitar ### Inicial
        </Button>
        <Typography variant="h5">{numOfTitles} títulos</Typography>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <StyledBox>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ForwardSelect
                options={bibleBooks.map((book) => ({
                  value: book.value,
                  label: book.label,
                }))}
                {...register("book", { required: "Este campo es requerido" })}
                error={!!errors.book}
                helperText={errors.book?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <ForwardSelect
                options={bibleVersions.map((version) => ({
                  value: version.value,
                  label: version.label,
                }))}
                {...register("version", {
                  required: "Este campo es requerido",
                })}
                error={!!errors.version}
                helperText={errors.version?.message}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent={"space-around"}
            alignItems={"center"}
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
            <Grid item xs={3}>
              <Button
                id="formatall"
                style={{ width: "50%" }}
                variant="contained"
                color="primary"
                onClick={allTextModifiersAtOnce}
              >
                TODO
              </Button>
            </Grid>
            <Grid item xs={6}>
              <div style={{ display: "flex", gap: 8 }}>
                <Button variant="outlined" onClick={onReplaceAllNumbersClick}>
                  SUPERÍNDICES
                </Button>
                <Button variant="outlined" onClick={onReplaceAllNextLineClick}>
                  DOS ESPACIOS
                </Button>
                <Button variant="outlined" onClick={onInsertTitlesClick}>
                  TÍTULOS
                </Button>
                <Button variant="outlined" onClick={onInsertBeginingTitleClick}>
                  TÍTULO
                </Button>
              </div>
            </Grid>
          </Grid>
          <LongTextField
            id="longtextfield"
            {...register("text", { required: "Este campo es requerido" })}
            error={!!errors.text}
            helperText={errors.text?.message}
          />

          <Button fullWidth type="submit" variant="contained">
            Crear Capítulo
          </Button>
        </StyledBox>
      </form>
      <Markdown children={text} />
    </MainPaper>
  );
};

export default CreateChapterPage;

const StyledBox = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));
