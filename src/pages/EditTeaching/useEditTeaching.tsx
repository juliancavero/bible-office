import useGetTeachingDetails from "@/api/Teachings/useGetTeachingDetails";
import usePutTeaching from "@/api/Teachings/usePutTeaching";
import { BibleContext } from "@/context/custom/bible";
import useNav from "@/hooks/useNav";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const useEditTeaching = () => {
  const { id } = useParams<{ id: string }>();
  const { bibleBooks } = useContext(BibleContext);
  const { refresh } = useNav();
  const { data } = useGetTeachingDetails(id || "");
  const { mutateAsync } = usePutTeaching();
  const [image, setImage] = useState<string>("");
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
    image?: FileList;
  }>({
    defaultValues: {
      book: "",
      chapter: 1,
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
    const response = await mutateAsync({
      id: Number(id),
      ...data,
    });
    if (response) {
      refresh();
    }
  };

  useEffect(() => {
    if (data?.data) {
      setValue("book", data.data.book);
      setValue("chapter", data.data.chapter);
      setValue("text", data.data.text);
      data.data.image && setImage(data.data.image);
    }
  }, [data]);

  return {
    bibleBooks,
    register,
    handleSubmit,
    errors,
    onSubmit,
    text: watch("text"),
    image,
  };
};

export default useEditTeaching;
