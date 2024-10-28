import usePostChapter from "@/api/Chapters/usePostChapter";
import { BibleContext } from "@/context/custom/bible";
import useNav from "@/hooks/useNav";
import useRouteParams from "@/hooks/useRouteParams";
import { BibleBooks } from "@/lib/BibleBooks";
import {
  insertBeginingTitle,
  insertSpaceBeforeNumbers,
  insertTitles,
  replaceNextLineForTwoSpaces,
  replaceNumbersForSuperscript,
} from "@/utils/textFormatter";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

const bibleVersions = [
  { value: "torresAmat", label: "Torres Amat" },
  { value: "nvi", label: "NVI" },
  { value: "rv1909", label: "Reina Valera 1909" },
  { value: "freeWorld", label: "Santa Biblia Libre para el Mundo" },
];

const useCreateChapter = () => {
  const { book, chapter, version } = useRouteParams({
    book: undefined,
    chapter: undefined,
    version: undefined,
  });
  const { bibleBooks } = useContext(BibleContext);
  const { navigate } = useNav();
  const { mutateAsync } = usePostChapter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<{
    book: string;
    chapter: number;
    text: string;
    version: string;
  }>({
    defaultValues: {
      book: book || "",
      chapter: Number(chapter) || 1,
      text: "",
      version: version || "torresAmat",
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const [numOfTitles, setNumOfTitles] = useState(0);

  const onSubmit = async (data: {
    book: string;
    chapter: number;
    text: string;
    version: string;
  }) => {
    const response = await mutateAsync(data);
    if (response) {
      const nextBook = calculateNextChapter(data.book, data.chapter);
      navigate(
        `/create-chapter?book=${nextBook.book}&chapter=${nextBook.chapter}&version=${data.version}`
      );
    }
  };

  const bibleVersion = watch("version");

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

  const removeBeginningTitle = () => {
    const text = watch("text");
    const newText = text.slice(4, text.length);
    setValue("text", newText);
    setNumOfTitles((newText.match(/###/g) || []).length);
  };

  const removeFirstLine = (text: string) => {
    return text.replace(/^[^\n]*\n/, "");
  };

  const onPaste = async () => {
    switch (bibleVersion) {
      case "freeWorld": {
        const text = await navigator.clipboard.readText();

        const first = insertSpaceBeforeNumbers(text);
        const second = replaceNumbersForSuperscript(first);
        const fourth = removeFirstLine(second);

        setValue("text", fourth);
        setNumOfTitles((fourth.match(/###/g) || []).length);
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
        break;
      }
      default: {
        const text = await navigator.clipboard.readText();

        const first = replaceNumbersForSuperscript(text);
        const second = replaceNextLineForTwoSpaces(first);
        const third = insertTitles(second);
        const fourth = insertBeginingTitle(third);

        setValue("text", fourth);
        setNumOfTitles((fourth.match(/###/g) || []).length);
        break;
      }
    }
  };

  useEffect(() => {
    if (book && chapter) {
      setValue("book", book);
      setValue("chapter", Number(chapter));
    }
    if (version) {
      setValue("version", version);
    }
  }, [book, chapter, version]);

  return {
    formRef,
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
    onPaste,
    numOfTitles,
    removeBeginningTitle,
  };
};

export default useCreateChapter;

const calculateNextChapter = (book: string, chapter: number) => {
  const foundIndex = BibleBooks.findIndex((b) => b.value === book);

  const hasChapters = BibleBooks[foundIndex].chapters;

  if (chapter === hasChapters) {
    return { book: BibleBooks[foundIndex + 1].value, chapter: 1 };
  }

  return { book, chapter: chapter + 1 };
};
