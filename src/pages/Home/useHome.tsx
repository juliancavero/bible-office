import useGetMissingChapterDates from "@/api/Chapters/useGetMissingChapterDates";
import useGetMissingSaintDates from "@/api/Saints/useGetMissingSaintDates";
import useGetStats from "@/api/Stats/useGetStats";
import useGetMissingTeachingDates from "@/api/Teachings/useGetMissingTeachingDates";
import { BibleContext } from "@/context/custom/bible";
import useNav from "@/hooks/useNav";
import { daysPerMonth, months } from "@/utils/calendar";
import { useContext, useMemo, useState } from "react";

const useHome = () => {
  const { navigate } = useNav();
  const { bibleBooks } = useContext(BibleContext);
  const { data: saintDates } = useGetMissingSaintDates();
  const { data: chapterDatesNVI } = useGetMissingChapterDates("nvi");
  const { data: chapterDatesTorresAmat } =
    useGetMissingChapterDates("torresAmat");
  const { data: chapterDatesRV1909 } = useGetMissingChapterDates("rv1909");
  const { data: chapterDatesFreeWorld } =
    useGetMissingChapterDates("freeWorld");
  const { data: teachingDates } = useGetMissingTeachingDates();
  const { data: stats } = useGetStats();
  const todaysMonth = new Date().getMonth() + 1;
  const [renderMonth, setRenderMonth] = useState(todaysMonth);
  const [renderBook, setRenderBook] = useState(bibleBooks[0].value);
  const [renderTeachingsBook, setRenderTeachingsBook] = useState(
    bibleBooks[0].value
  );

  const handlePreviousMonth = () => {
    setRenderMonth((prev) => (prev === 1 ? 12 : prev - 1));
  };

  const handleNextMonth = () => {
    setRenderMonth((prev) => (prev === 12 ? 1 : prev + 1));
  };

  const handlePreviousBook = () => {
    const index = bibleBooks.findIndex((book) => book.value === renderBook);
    if (index <= 0) {
      setRenderBook(bibleBooks[bibleBooks.length - 1].value);
    } else {
      setRenderBook(bibleBooks[index - 1].value);
    }
  };

  const handleNextBook = () => {
    const index = bibleBooks.findIndex((book) => book.value === renderBook);
    if (index >= bibleBooks.length - 1) {
      setRenderBook(bibleBooks[0].value);
    } else {
      setRenderBook(bibleBooks[index + 1].value);
    }
  };

  const handlePreviousTeachingsBook = () => {
    const index = bibleBooks.findIndex(
      (book) => book.value === renderTeachingsBook
    );
    if (index <= 0) {
      setRenderTeachingsBook(bibleBooks[bibleBooks.length - 1].value);
    } else {
      setRenderTeachingsBook(bibleBooks[index - 1].value);
    }
  };

  const handleNextTeachingsBook = () => {
    const index = bibleBooks.findIndex(
      (book) => book.value === renderTeachingsBook
    );
    if (index >= bibleBooks.length - 1) {
      setRenderTeachingsBook(bibleBooks[0].value);
    } else {
      setRenderTeachingsBook(bibleBooks[index + 1].value);
    }
  };

  const onSaintsDayClick = (day: number) => {
    navigate(`/create-saint?day=${day}&month=${renderMonth}`);
  };

  const onCalendarChapterClick = (numb: number, version: string) => {
    navigate(
      `/create-chapter?book=${renderBook}&chapter=${numb}&version=${version}`
    );
  };

  const onCalendarTeachingClick = (numb: number) => {
    navigate(`/create-teaching?book=${renderTeachingsBook}&chapter=${numb}`);
  };

  const monthDays = useMemo(() => {
    return (
      daysPerMonth.find((month) => Number(month.month) === renderMonth)?.days ||
      1
    );
  }, [renderMonth]);

  const bookChapters = useMemo(() => {
    return bibleBooks.find((book) => book.value === renderBook)?.chapters || 1;
  }, [renderBook]);

  const teachingsBookChapters = useMemo(() => {
    return (
      bibleBooks.find((book) => book.value === renderTeachingsBook)?.chapters ||
      1
    );
  }, [renderTeachingsBook]);

  const missingDates = useMemo(() => {
    if (!saintDates) return [];
    return saintDates
      .filter((date) => date.month === renderMonth)
      .map((date) => date.day);
  }, [renderMonth, saintDates]);

  const missingChaptersNVI = useMemo(() => {
    if (!chapterDatesNVI) return [];
    return (
      chapterDatesNVI.find((date) => date.book === renderBook)?.chapters || []
    );
  }, [renderBook, chapterDatesNVI]);

  const missingChaptersTorresAmat = useMemo(() => {
    if (!chapterDatesTorresAmat) return [];
    return (
      chapterDatesTorresAmat.find((date) => date.book === renderBook)
        ?.chapters || []
    );
  }, [renderBook, chapterDatesTorresAmat]);

  const missingChaptersRV1909 = useMemo(() => {
    if (!chapterDatesRV1909) return [];
    return (
      chapterDatesRV1909.find((date) => date.book === renderBook)?.chapters ||
      []
    );
  }, [renderBook, chapterDatesRV1909]);

  const missingChaptersFreeWorld = useMemo(() => {
    if (!chapterDatesFreeWorld) return [];
    return (
      chapterDatesFreeWorld.find((date) => date.book === renderBook)
        ?.chapters || []
    );
  }, [renderBook, chapterDatesFreeWorld]);

  const missingTeachings = useMemo(() => {
    if (!teachingDates) return [];
    return (
      teachingDates.find((date) => date.book === renderTeachingsBook)
        ?.chapters || []
    );
  }, [renderTeachingsBook, teachingDates]);

  const todaysMonthName = useMemo(() => {
    return months.find((month) => Number(month.value) === renderMonth)?.label;
  }, [renderMonth]);

  const bookName = useMemo(() => {
    return bibleBooks.find((book) => book.value === renderBook)?.label;
  }, [renderBook]);

  const teachingsBookName = useMemo(() => {
    return bibleBooks.find((book) => book.value === renderTeachingsBook)?.label;
  }, [renderTeachingsBook]);

  return {
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
  };
};

export default useHome;
