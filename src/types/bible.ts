import { Segments } from "@/lib/Segments";

export type BibleContextType = {
  bibleBooks: BibleBook[];
};

export type BibleBook = {
  label: string;
  chapters: number;
  order: number;
  segment: Segments;
  value: string;
};

export type Chapter = {
  id: number;
  book: string;
  chapter: number;
  text: string;
  createdAt: Date;
  version: string;
};

export type Teaching = {
  id: number;
  book: string;
  chapter: number;
  text: string;
  createdAt: Date;
  image?: string;
};

export type MissingChapters = {
  book: string;
  chapters: number[];
};
