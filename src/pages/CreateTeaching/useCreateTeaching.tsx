import useGetChapterDetailsByBookChapter from "@/api/Chapters/useGetChapterDetailsByBookChapter";
import usePostGroqTeachingImage from "@/api/Teachings/usePostGroqTeachingImage";
import usePostGroqTeachingText from "@/api/Teachings/usePostGroqTeachingText";
import usePostTeaching from "@/api/Teachings/usePostTeaching";
import { BibleVersions } from "@/api/types";
import { BibleContext } from "@/context/custom/bible";
import useNav from "@/hooks/useNav";
import useRouteParams from "@/hooks/useRouteParams";
import { getTemplate, TemplateType } from "@/utils/templates";
import { formatGroqTeaching } from "@/utils/textFormatter";
import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const useCreateTeaching = () => {
  const { book, chapter } = useRouteParams({
    book: undefined,
    chapter: undefined,
  });
  const { bibleBooks } = useContext(BibleContext);
  const { refresh } = useNav();
  const { mutateAsync: postTeaching } = usePostTeaching();
  const { mutateAsync: postGroqTeachingText } = usePostGroqTeachingText();
  const { mutateAsync: postGroqTeachingImage } = usePostGroqTeachingImage();

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
    image?: FileList;
  }>({
    defaultValues: {
      book: book || "",
      chapter: Number(chapter) || 1,
      text: "",
      image: undefined,
    },
  });

  const { data } = useGetChapterDetailsByBookChapter(
    watch("book"),
    watch("chapter").toString(),
    BibleVersions.nvi
  );

  const [imagePrompt, setImagePrompt] = useState<string>("");

  const onSubmit = async (data: {
    book: string;
    chapter: number;
    text: string;
    image?: FileList;
  }) => {
    const response = await postTeaching(data);
    if (response) {
      refresh();
    }
  };

  const templates = useMemo(() => {
    const bookName = bibleBooks.find((b) => b.value === watch("book"))?.label;
    return {
      createTeaching: getTemplate(TemplateType.CreateTeaching)
        .replace("{{book}}", bookName || "")
        .replace("{{chapter}}", watch("chapter").toString()),
      image: getTemplate(TemplateType.TeachingImage),
    };
  }, [watch("book"), watch("chapter")]);

  const onCopyTemplateClick = (template: string) => {
    navigator.clipboard.writeText(template);
  };

  const onFormatTextClick = () => {
    setValue("text", formatGroqTeaching(watch("text")));
  };

  const onGroqTeachingSubmit = async () => {
    const bookName = bibleBooks.find((b) => b.value === watch("book"))?.label;
    if (!bookName || !data || !watch("chapter")) return;
    const response = await postGroqTeachingText({
      book: bookName,
      chapter: watch("chapter"),
      chapterText: data.text,
    });
    if (response) {
      setValue("text", formatGroqTeaching(response));
    }
  };

  const onPostGroqSaintImage = async () => {
    const bookName = bibleBooks.find((b) => b.value === watch("book"))?.label;
    if (!bookName || !watch("text")) return;
    const response = await postGroqTeachingImage({
      book: bookName,
      chapter: watch("chapter"),
      chapterText: watch("text"),
    });
    if (response) {
      setImagePrompt(response);
    }
  };

  return {
    bibleBooks,
    register,
    handleSubmit,
    errors,
    onSubmit,
    text: watch("text"),
    templates,
    onCopyTemplateClick,
    onFormatTextClick,
    onGroqTeachingSubmit,
    imagePrompt,
    onPostGroqSaintImage,
  };
};

export default useCreateTeaching;
