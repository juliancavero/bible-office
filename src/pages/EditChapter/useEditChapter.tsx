import useGetChapterDetails from "@/api/Chapters/useGetChapterDetails";
import usePutChapter from "@/api/Chapters/usePutChapter";
import { BibleContext } from "@/context/custom/bible";
import useNav from "@/hooks/useNav";
import {
  insertBeginingTitle,
  insertTitles,
  replaceNextLineForTwoSpaces,
  replaceNumbersForSuperscript,
} from "@/utils/textFormatter";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const bibleVersions = [
  { value: "torresAmat", label: "Torres Amat" },
  { value: "nvi", label: "NVI" },
  { value: "rv1909", label: "Reina Valera 1909" },
  { value: "freeWorld", label: "Santa Biblia Libre para el Mundo" },
];

const useEditChapter = () => {
  const { id } = useParams<{ id: string }>();
  const { bibleBooks } = useContext(BibleContext);
  const { navigate } = useNav();
  const { data } = useGetChapterDetails(id || "");
  const { mutateAsync } = usePutChapter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<{
    book: string;
    chapter: number;
    text: string;
    version: string;
  }>({
    defaultValues: {
      book: "",
      chapter: 1,
      text: "",
      version: "",
    },
  });

  const onSubmit = async (data: {
    book: string;
    chapter: number;
    text: string;
    version: string;
  }) => {
    const response = await mutateAsync({
      id: Number(id),
      ...data,
    });
    if (response) {
      navigate("/chapters");
    }
  };

  const onReplaceAllNumbersClick = () => {
    setValue("text", replaceNumbersForSuperscript(watch("text")));
  };

  const onReplaceAllNextLineClick = () => {
    setValue("text", replaceNextLineForTwoSpaces(watch("text")));
  };

  const onInsertTitlesClick = () => {
    setValue("text", insertTitles(watch("text")));
  };

  const onInsertBeginingTitleClick = () => {
    setValue("text", insertBeginingTitle(watch("text")));
  };

  const allTextModifiersAtOnce = () => {
    const text = watch("text");

    const first = replaceNumbersForSuperscript(text);
    const second = replaceNextLineForTwoSpaces(first);
    const third = insertTitles(second);
    const fourth = insertBeginingTitle(third);

    setValue("text", fourth);
  };

  useEffect(() => {
    if (data) {
      setValue("book", data.book);
      setValue("chapter", data.chapter);
      setValue("text", data.text);
      setValue("version", data.version);
    }
  }, [data]);

  return {
    bibleBooks,
    bibleVersions,
    register,
    handleSubmit,
    errors,
    onSubmit,
    text: watch("text"),
    onInsertTitlesClick,
    onReplaceAllNumbersClick,
    onReplaceAllNextLineClick,
    onInsertBeginingTitleClick,
    allTextModifiersAtOnce,
  };
};

export default useEditChapter;
