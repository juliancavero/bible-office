import usePostTeaching from "@/api/Teachings/usePostTeaching";
import { BibleContext } from "@/context/custom/bible";
import useNav from "@/hooks/useNav";
import useRouteParams from "@/hooks/useRouteParams";
import { getTemplate, TemplateType } from "@/utils/templates";
import { useContext, useMemo } from "react";
import { useForm } from "react-hook-form";

const useCreateTeaching = () => {
  const { book, chapter } = useRouteParams({
    book: undefined,
    chapter: undefined,
  });
  const { bibleBooks } = useContext(BibleContext);
  const { refresh } = useNav();
  const { mutateAsync } = usePostTeaching();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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

  const onSubmit = async (data: {
    book: string;
    chapter: number;
    text: string;
    image?: FileList;
  }) => {
    const response = await mutateAsync(data);
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

  return {
    bibleBooks,
    register,
    handleSubmit,
    errors,
    onSubmit,
    text: watch("text"),
    templates,
    onCopyTemplateClick,
  };
};

export default useCreateTeaching;
