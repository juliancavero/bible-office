import usePostGroqSaintImage from "@/api/Saints/usePostGroqSaintImage";
import usePostGroqSaintText from "@/api/Saints/usePostGroqSaintText";
import usePostSaint from "@/api/Saints/usePostSaint";
import useNav from "@/hooks/useNav";
import useRouteParams from "@/hooks/useRouteParams";
import { months } from "@/utils/calendar";
import { getTemplate, TemplateType } from "@/utils/templates";
import {
  formatGroqSaintText,
  replaceNextLineForTwoSpaces,
  replaceNumbersForSuperscript,
} from "@/utils/textFormatter";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

const useCreateSaint = () => {
  const { day, month } = useRouteParams({ day: undefined, month: undefined });
  const { refresh } = useNav();
  const { mutateAsync } = usePostSaint();
  const { mutateAsync: postGroqSaintText } = usePostGroqSaintText();
  const { mutateAsync: postGroqSaintImage } = usePostGroqSaintImage();
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

  const [imagePrompt, setImagePrompt] = useState<string>("");

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

  const onPostGroqSaintText = async () => {
    const monthName = months.find(
      (m) => m.value === watch("month").toString()
    )?.label;
    if (!monthName) return;
    const response = await postGroqSaintText({
      day: watch("day"),
      month: monthName,
      saintName: watch("name"),
    });
    if (response) {
      setValue("text", formatGroqSaintText(response));
    }
  };

  const onPostGroqSaintImage = async () => {
    const monthName = months.find(
      (m) => m.value === watch("month").toString()
    )?.label;
    if (!monthName) return;
    const response = await postGroqSaintImage({
      day: watch("day"),
      month: monthName,
      saintName: watch("name"),
      saintText: watch("text"),
    });
    if (response) {
      setImagePrompt(response);
    }
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
    onPostGroqSaintText,
    onPostGroqSaintImage,
    imagePrompt,
  };
};

export default useCreateSaint;
