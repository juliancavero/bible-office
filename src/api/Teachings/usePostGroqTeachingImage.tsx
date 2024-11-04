import { getTemplate, TemplateType } from "@/utils/templates";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "..";

type CreateGroqTeachingImageDTO = {
  book: string;
  chapter: number;
  chapterText: string;
};

type GroqResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      logprobs: null;
      finish_reason: string;
    }
  ];
  usage: {
    queue_time: number;
    prompt_tokens: number;
    prompt_time: number;
    completion_tokens: number;
    completion_time: number;
    total_tokens: number;
    total_time: number;
  };
  system_fingerprint: string;
  x_groq: {
    id: string;
  };
};

const postGroqTeachingImage = async (
  body: CreateGroqTeachingImageDTO
): Promise<string> => {
  const template = getTemplate(TemplateType.GroqTeachingImage);

  const firstTemplate = getTemplate(TemplateType.CreateTeaching)
    .replace("{{book}}", body.book || "")
    .replace("{{chapter}}", body.chapter.toString());

  const postBody = {
    model: "gemma2-9b-it",
    messages: [
      {
        role: "user",
        content: firstTemplate,
      },
      {
        role: "assistant",
        content: body.chapterText,
      },
      {
        role: "user",
        content: template,
      },
    ],
  };
  const response = await axiosInstance.post<GroqResponse>(
    "https://api.groq.com/openai/v1/chat/completions",
    postBody,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
      },
    }
  );
  return response.data.choices[0].message.content;
};

const usePostGroqTeachingImage = () => {
  return useMutation({
    mutationFn: postGroqTeachingImage,
  });
};

export default usePostGroqTeachingImage;
