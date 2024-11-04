const replaceNumbersForSuperscript = (text: string) => {
  return text.replace(/(\d+)/g, "^$1^");
};

const replaceNextLineForTwoSpaces = (text: string) => {
  return text.replace(/\n/g, "\n\n");
};

const insertSpaceBeforeNumbers = (text: string) => {
  const temp = text.replace(/\n/g, "xdxdxd");
  const temp2 = temp.replace(/(\d+)/g, "\n$1");
  return temp2.replace(/xdxdxd/g, "\n");
};

const insertTitles = (text: string) => {
  return text.replace(/(?<=\n\n)(?!(\^(\d+)\^))(.*)(?=\n\^\d+\^)/gm, "### $&");
};

const insertBeginingTitle = (text: string) => {
  return text.replace(/^(.*)/, "### $1");
};

const formatGroqTeaching = (text: string) => {
  return text
    .replace(/\\n\\n\\n/g, "\n\n")
    .replace(/\\n\\n/g, "\n\n")
    .replace(/\\\"/g, '"')
    .replace(/_/g, "")
    .replace(/\\n/g, "\n\n")
    .replace(/\n\n\n"/g, "\n")
    .trim();
};

const formatGroqSaintText = (text: string) => {
  return text
    .replace(/^> *(\S)/gm, "> $1")
    .replace(/^(> .+?)(?<!\s\s)$/gm, "$1  ")
    .replace(/\n{2,}(?=> )/g, "\n")
    .trim();
};

export {
  formatGroqSaintText,
  formatGroqTeaching,
  insertBeginingTitle,
  insertSpaceBeforeNumbers,
  insertTitles,
  replaceNextLineForTwoSpaces,
  replaceNumbersForSuperscript,
};
