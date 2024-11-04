import { getTemplate, TemplateType } from "@/utils/templates";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "..";

type CreateGroqTeachingDTO = {
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

const postGroqTeachingText = async (
  body: CreateGroqTeachingDTO
): Promise<string> => {
  const template = getTemplate(TemplateType.TeachingGroq)
    .replace("{{book}}", body.book)
    .replace("{{chapter}}", body.chapter.toString())
    .replace("{{chapterText}}", body.chapterText);
  const postBody = {
    model: "gemma2-9b-it",
    messages: [
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

const usePostGroqTeachingText = () => {
  return useMutation({
    mutationFn: postGroqTeachingText,
  });
};

export default usePostGroqTeachingText;
