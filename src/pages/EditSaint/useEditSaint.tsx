import useGetSaintDetails from "@/api/Saints/useGetSaintDetails";
import usePutSaint from "@/api/Saints/usePutSaint";
import useNav from "@/hooks/useNav";
import {
  replaceNextLineForTwoSpaces,
  replaceNumbersForSuperscript,
} from "@/utils/textFormatter";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const useEditSaint = () => {
  const { refresh } = useNav();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetSaintDetails(id || "");
  const { mutateAsync } = usePutSaint();
  const [image, setImage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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
      day: 1,
      month: 1,
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
    const response = await mutateAsync({
      id: Number(id),
      ...data,
    });
    if (response) {
      refresh();
    }
  };

  const onReplaceAllNumbersClick = () => {
    setValue("text", replaceNumbersForSuperscript(watch("text")));
  };

  const onReplaceAllNextLineClick = () => {
    setValue("text", replaceNextLineForTwoSpaces(watch("text")));
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("text", data.text);
      setValue("day", data.day);
      setValue("month", data.month);
      setValue("isMain", data.isMain);
      data.image && setImage(data.image);
    }
  }, [data]);

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    text: watch("text"),
    onReplaceAllNumbersClick,
    onReplaceAllNextLineClick,
    image,
  };
};

export default useEditSaint;
