import MainPaper from "@/components/Containers/MainPaper";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import CustomCalendar from "./components/CustomCalendar";
import useHome from "./useHome";

const HomePage = () => {
  const {
    handlePreviousMonth,
    handleNextMonth,
    onSaintsDayClick,
    monthDays,
    missingDates,
    todaysMonthName,
    bookChapters,
    bookName,
    stats,
    missingChaptersNVI,
    missingChaptersTorresAmat,
    missingChaptersRV1909,
    missingChaptersFreeWorld,
    missingTeachings,
    handlePreviousBook,
    handleNextBook,
    onCalendarChapterClick,
    teachingsBookChapters,
    teachingsBookName,
    handlePreviousTeachingsBook,
    handleNextTeachingsBook,
    onCalendarTeachingClick,
  } = useHome();
  return (
    <MainPaper>
      <Typography variant="h4">Bienvenido</Typography>
      <Card>
        <CardHeader title={"Santos"} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} container spacing={1}>
              <Grid item xs={12} container>
                <HorizontalFlexBox>
                  <Button variant="outlined" onClick={handlePreviousMonth}>
                    <ArrowLeft />
                  </Button>
                  <Typography variant="h6">{todaysMonthName}</Typography>
                  <Button variant="outlined" onClick={handleNextMonth}>
                    <ArrowRight />
                  </Button>
                </HorizontalFlexBox>
              </Grid>
              <Grid item xs={12}>
                <CustomCalendar
                  totalDays={monthDays}
                  completedDays={missingDates}
                  onDayClick={onSaintsDayClick}
                />
              </Grid>
            </Grid>

            <Grid item md={4} xs={12} container spacing={3}>
              <Grid item xs={12}>
                <CenteredCard>
                  <CardContent>
                    <VerticalFlexBox>
                      <Typography variant="h5">
                        {stats?.saints.total}
                      </Typography>
                      <Typography variant="body1">
                        Total de Santos Registrados
                      </Typography>
                    </VerticalFlexBox>
                  </CardContent>
                </CenteredCard>
              </Grid>
              <Grid item xs={12}>
                <CenteredCard>
                  <CardContent>
                    <VerticalFlexBox>
                      <Typography variant="h5">
                        {stats?.saints.completedDays.toFixed(2)}%
                      </Typography>
                      <Typography variant="body1">
                        Porcentaje del año completo
                      </Typography>
                    </VerticalFlexBox>
                  </CardContent>
                </CenteredCard>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} container spacing={3}>
              <Grid item xs={12}>
                <CenteredCard>
                  <CardContent>
                    <VerticalFlexBox>
                      <Typography variant="h5">
                        {stats?.saints.withImage}
                      </Typography>
                      <Typography variant="body1">Santos con imágen</Typography>
                    </VerticalFlexBox>
                  </CardContent>
                </CenteredCard>
              </Grid>
              <Grid item xs={12}>
                <CenteredCard>
                  <CardContent>
                    <VerticalFlexBox>
                      <Typography variant="h5">
                        {(
                          ((stats?.saints.withImage || 1) /
                            (stats?.saints.total || 1)) *
                          100
                        ).toFixed(2)}
                        %
                      </Typography>
                      <Typography variant="body1">
                        Porcentaje de santos con imagen
                      </Typography>
                    </VerticalFlexBox>
                  </CardContent>
                </CenteredCard>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={"Capítulos"} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} container spacing={1}>
              <Grid item xs={12} container justifyContent={"center"}>
                <Typography variant="h6">NVI</Typography>
              </Grid>
              <Grid item xs={12} container>
                <HorizontalFlexBox>
                  <Button variant="outlined" onClick={handlePreviousBook}>
                    <ArrowLeft />
                  </Button>
                  <Typography variant="h6">{bookName}</Typography>
                  <Button variant="outlined" onClick={handleNextBook}>
                    <ArrowRight />
                  </Button>
                </HorizontalFlexBox>
              </Grid>
              <Grid item xs={12}>
                <CustomCalendar
                  totalDays={bookChapters}
                  completedDays={missingChaptersNVI}
                  onDayClick={(day) => onCalendarChapterClick(day, "nvi")}
                />
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} container spacing={1}>
              <Grid item xs={12} container justifyContent={"center"}>
                <Typography variant="h6">TORRES AMAT</Typography>
              </Grid>
              <Grid item xs={12} container>
                <HorizontalFlexBox>
                  <Button variant="outlined" onClick={handlePreviousBook}>
                    <ArrowLeft />
                  </Button>
                  <Typography variant="h6">{bookName}</Typography>
                  <Button variant="outlined" onClick={handleNextBook}>
                    <ArrowRight />
                  </Button>
                </HorizontalFlexBox>
              </Grid>
              <Grid item xs={12}>
                <CustomCalendar
                  totalDays={bookChapters}
                  completedDays={missingChaptersTorresAmat}
                  onDayClick={(day) =>
                    onCalendarChapterClick(day, "torresAmat")
                  }
                />
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} container spacing={1}>
              <Grid item xs={12} container justifyContent={"center"}>
                <Typography variant="h6">REINA VALERA 1909</Typography>
              </Grid>
              <Grid item xs={12} container>
                <HorizontalFlexBox>
                  <Button variant="outlined" onClick={handlePreviousBook}>
                    <ArrowLeft />
                  </Button>
                  <Typography variant="h6">{bookName}</Typography>
                  <Button variant="outlined" onClick={handleNextBook}>
                    <ArrowRight />
                  </Button>
                </HorizontalFlexBox>
              </Grid>
              <Grid item xs={12}>
                <CustomCalendar
                  totalDays={bookChapters}
                  completedDays={missingChaptersRV1909}
                  onDayClick={(day) => onCalendarChapterClick(day, "rv1909")}
                />
              </Grid>
            </Grid>
            <Grid item md={4} xs={12} container spacing={1}>
              <Grid item xs={12} container justifyContent={"center"}>
                <Typography variant="h6">FREE WORLD</Typography>
              </Grid>
              <Grid item xs={12} container>
                <HorizontalFlexBox>
                  <Button variant="outlined" onClick={handlePreviousBook}>
                    <ArrowLeft />
                  </Button>
                  <Typography variant="h6">{bookName}</Typography>
                  <Button variant="outlined" onClick={handleNextBook}>
                    <ArrowRight />
                  </Button>
                </HorizontalFlexBox>
              </Grid>
              <Grid item xs={12}>
                <CustomCalendar
                  totalDays={bookChapters}
                  completedDays={missingChaptersFreeWorld}
                  onDayClick={(day) => onCalendarChapterClick(day, "freeWorld")}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title={"Enseñanzas"} />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={4} xs={12} container spacing={1}>
              <Grid item xs={12} container>
                <HorizontalFlexBox>
                  <Button
                    variant="outlined"
                    onClick={handlePreviousTeachingsBook}
                  >
                    <ArrowLeft />
                  </Button>
                  <Typography variant="h6">{teachingsBookName}</Typography>
                  <Button variant="outlined" onClick={handleNextTeachingsBook}>
                    <ArrowRight />
                  </Button>
                </HorizontalFlexBox>
              </Grid>
              <Grid item xs={12}>
                <CustomCalendar
                  totalDays={teachingsBookChapters}
                  completedDays={missingTeachings}
                  onDayClick={onCalendarTeachingClick}
                />
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </MainPaper>
  );
};

export default HomePage;

const CenteredCard = styled(Card)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const VerticalFlexBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

const HorizontalFlexBox = styled(Box)({
  display: "flex",
  flexDirection: "row",
  gap: "0.8rem",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  marginRight: "5px",
});
