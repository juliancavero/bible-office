import { styled } from "@mui/material";
import ReactMarkdown from "react-markdown";
import supersub from "remark-supersub";

const StyledMarkdown = styled(ReactMarkdown)({
  textIndent: "1.5em",
});

type MarkdownProps = {
  children: string;
};

const Markdown = ({ children }: MarkdownProps) => {
  return <StyledMarkdown children={children} remarkPlugins={[supersub]} />;
};

export default Markdown;
