import usePostSaint from "@/api/Saints/usePostSaint";
import useNav from "@/hooks/useNav";
import useRouteParams from "@/hooks/useRouteParams";
import { months } from "@/utils/calendar";
import { getTemplate, TemplateType } from "@/utils/templates";
import {
  replaceNextLineForTwoSpaces,
  replaceNumbersForSuperscript,
} from "@/utils/textFormatter";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const useCreateSaint = () => {
  const { day, month } = useRouteParams({ day: undefined, month: undefined });
  const { refresh } = useNav();
  const { mutateAsync } = usePostSaint();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<{
    name: string;
    text: string;
    day: number;
    month: number;
    isMain: boolean;
    image?: FileList;
  }>({
    defaultValues: {
      name: "",
      text: "",
      day: Number(day) || 1,
      month: Number(month) || 1,
      isMain: false,
      image: undefined,
    },
  });

  const onSubmit = async (data: {
    name: string;
    text: string;
    day: number;
    month: number;
    isMain: boolean;
    image?: FileList;
  }) => {
    const response = await mutateAsync(data);
    if (response) {
      refresh();
    }
  };

  const templates = useMemo(() => {
    const monthName = months.find(
      (m) => m.value === watch("month").toString()
    )?.label;
    return {
      createSaint: getTemplate(TemplateType.CreateSaint)
        .replace("{{day}}", watch("day").toString())
        .replace("{{month}}", monthName || "")
        .replace("{{saintName}}", watch("name")),
      image: getTemplate(TemplateType.SaintImage),
    };
  }, [watch("day"), watch("month"), watch("name")]);

  const onReplaceAllNumbersClick = () => {
    setValue("text", replaceNumbersForSuperscript(watch("text")));
  };

  const onReplaceAllNextLineClick = () => {
    setValue("text", replaceNextLineForTwoSpaces(watch("text")));
  };

  const onCopyTemplateClick = (template: string) => {
    navigator.clipboard.writeText(template);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    text: watch("text"),
    onReplaceAllNumbersClick,
    onReplaceAllNextLineClick,
    templates,
    onCopyTemplateClick,
  };
};

export default useCreateSaint;
