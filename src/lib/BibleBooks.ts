import { Segments } from "./Segments";

export const BibleBooks = [
  {
    label: "Génesis",
    value: "genesis",
    segment: Segments.Old,
    order: 1,
    chapters: 50,
  },
  {
    label: "Éxodo",
    value: "exodus",
    segment: Segments.Old,
    order: 2,
    chapters: 40,
  },
  {
    label: "Levítico",
    value: "leviticus",
    segment: Segments.Old,
    order: 3,
    chapters: 27,
  },
  {
    label: "Números",
    value: "numbers",
    segment: Segments.Old,
    order: 4,
    chapters: 36,
  },
  {
    label: "Deuteronomio",
    value: "deuteronomy",
    segment: Segments.Old,
    order: 5,
    chapters: 34,
  },

  {
    label: "Josué",
    value: "joshua",
    segment: Segments.Old,
    order: 6,
    chapters: 24,
  },
  {
    label: "Jueces",
    value: "judges",
    segment: Segments.Old,
    order: 7,
    chapters: 21,
  },
  { label: "Rut", value: "ruth", segment: Segments.Old, order: 8, chapters: 4 },
  {
    label: "Primer Libro de Samuel",
    value: "1-samuel",
    segment: Segments.Old,
    order: 9,
    chapters: 31,
  },

  {
    label: "Segundo Libro de Samuel",
    value: "2-samuel",
    segment: Segments.Old,
    order: 10,
    chapters: 24,
  },
  {
    label: "Primer Libro de Reyes",
    value: "1-kings",
    segment: Segments.Old,
    order: 11,
    chapters: 22,
  },
  {
    label: "Segundo Libro de Reyes",
    value: "2-kings",
    segment: Segments.Old,
    order: 12,
    chapters: 25,
  },
  {
    label: "Primer Libro de Crónicas",
    value: "1-chronicles",
    segment: Segments.Old,
    order: 13,
    chapters: 29,
  },
  {
    label: "Segundo Libro de Crónicas",
    value: "2-chronicles",
    segment: Segments.Old,
    order: 14,
    chapters: 36,
  },
  {
    label: "Esdras",
    value: "ezra",
    segment: Segments.Old,
    order: 15,
    chapters: 10,
  },
  {
    label: "Nehemías",
    value: "nehemiah",
    segment: Segments.Old,
    order: 16,
    chapters: 13,
  },
  {
    label: "Ester",
    value: "esther",
    segment: Segments.Old,
    order: 17,
    chapters: 10,
  },
  {
    label: "Job",
    value: "job",
    segment: Segments.Old,
    order: 18,
    chapters: 42,
  },
  {
    label: "Salmos",
    value: "psalms",
    segment: Segments.Old,
    order: 19,
    chapters: 150,
  },
  {
    label: "Proverbios",
    value: "proverbs",
    segment: Segments.Old,
    order: 20,
    chapters: 31,
  },
  {
    label: "Eclesiastés",
    value: "ecclesiastes",
    segment: Segments.Old,
    order: 21,
    chapters: 12,
  },
  {
    label: "Cantar de los Cantares",
    value: "song-of-solomon",
    segment: Segments.Old,
    order: 22,
    chapters: 8,
  },
  {
    label: "Isaías",
    value: "isaiah",
    segment: Segments.Old,
    order: 23,
    chapters: 66,
  },
  {
    label: "Jeremías",
    value: "jeremiah",
    segment: Segments.Old,
    order: 24,
    chapters: 52,
  },
  {
    label: "Lamentaciones",
    value: "lamentations",
    segment: Segments.Old,
    order: 25,
    chapters: 5,
  },
  {
    label: "Ezequiel",
    value: "ezekiel",
    segment: Segments.Old,
    order: 26,
    chapters: 48,
  },
  {
    label: "Daniel",
    value: "daniel",
    segment: Segments.Old,
    order: 27,
    chapters: 12,
  },
  {
    label: "Oseas",
    value: "hosea",
    segment: Segments.Old,
    order: 28,
    chapters: 14,
  },
  {
    label: "Joel",
    value: "joel",
    segment: Segments.Old,
    order: 29,
    chapters: 3,
  },
  {
    label: "Amós",
    value: "amos",
    segment: Segments.Old,
    order: 30,
    chapters: 9,
  },
  {
    label: "Abdías",
    value: "obadiah",
    segment: Segments.Old,
    order: 31,
    chapters: 1,
  },
  {
    label: "Jonás",
    value: "jonah",
    segment: Segments.Old,
    order: 32,
    chapters: 4,
  },
  {
    label: "Miqueas",
    value: "micah",
    segment: Segments.Old,
    order: 33,
    chapters: 7,
  },
  {
    label: "Nahúm",
    value: "nahum",
    segment: Segments.Old,
    order: 34,
    chapters: 3,
  },
  {
    label: "Habacuc",
    value: "habakkuk",
    segment: Segments.Old,
    order: 35,
    chapters: 3,
  },
  {
    label: "Sofonías",
    value: "zephaniah",
    segment: Segments.Old,
    order: 36,
    chapters: 3,
  },
  {
    label: "Hageo",
    value: "haggai",
    segment: Segments.Old,
    order: 37,
    chapters: 2,
  },
  {
    label: "Zacarías",
    value: "zechariah",
    segment: Segments.Old,
    order: 38,
    chapters: 14,
  },
  {
    label: "Malaquías",
    value: "malachi",
    segment: Segments.Old,
    order: 39,
    chapters: 4,
  },

  {
    label: "Evangelio según San Mateo",
    value: "matthew",
    segment: Segments.New,
    order: 1,
    chapters: 28,
  },
  {
    label: "Evangelio según San Marcos",
    value: "mark",
    segment: Segments.New,
    order: 2,
    chapters: 16,
  },

  {
    label: "Evangelio según San Lucas",
    value: "luke",
    segment: Segments.New,
    order: 3,
    chapters: 24,
  },
  {
    label: "Evangelio según San Juan",
    value: "john",
    segment: Segments.New,
    order: 4,
    chapters: 21,
  },
  {
    label: "Hechos de los Apóstoles",
    value: "acts",
    segment: Segments.New,
    order: 5,
    chapters: 28,
  },
  {
    label: "Carta a los Romanos",
    value: "romans",
    segment: Segments.New,
    order: 6,
    chapters: 16,
  },
  {
    label: "Primera Carta a los Corintios",
    value: "1-corinthians",
    segment: Segments.New,
    order: 7,
    chapters: 16,
  },
  {
    label: "Segunda Carta a los Corintios",
    value: "2-corinthians",
    segment: Segments.New,
    order: 8,
    chapters: 13,
  },
  {
    label: "Gálatas",
    value: "galatians",
    segment: Segments.New,
    order: 9,
    chapters: 6,
  },
  {
    label: "Efesios",
    value: "ephesians",
    segment: Segments.New,
    order: 10,
    chapters: 6,
  },
  {
    label: "Filipenses",
    value: "philippians",
    segment: Segments.New,
    order: 11,
    chapters: 4,
  },
  {
    label: "Colosenses",
    value: "colossians",
    segment: Segments.New,
    order: 12,
    chapters: 4,
  },
  {
    label: "Primera Carta a los Tesalonicenses",
    value: "1-thessalonians",
    segment: Segments.New,
    order: 13,
    chapters: 5,
  },
  {
    label: "Segunda Carta a los Tesalonicenses",
    value: "2-thessalonians",
    segment: Segments.New,
    order: 14,
    chapters: 3,
  },
  {
    label: "Primera Carta a Timoteo",
    value: "1-timothy",
    segment: Segments.New,
    order: 15,
    chapters: 6,
  },
  {
    label: "Segunda Carta a Timoteo",
    value: "2-timothy",
    segment: Segments.New,
    order: 16,
    chapters: 4,
  },
  {
    label: "Tito",
    value: "titus",
    segment: Segments.New,
    order: 17,
    chapters: 3,
  },
  {
    label: "Filemón",
    value: "philemon",
    segment: Segments.New,
    order: 18,
    chapters: 1,
  },
  {
    label: "Hebreos",
    value: "hebrews",
    segment: Segments.New,
    order: 19,
    chapters: 13,
  },
  {
    label: "Santiago",
    value: "james",
    segment: Segments.New,
    order: 20,
    chapters: 5,
  },
  {
    label: "Primera Carta de San Pedro",
    value: "1-peter",
    segment: Segments.New,
    order: 21,
    chapters: 5,
  },
  {
    label: "Segunda Carta de San Pedro",
    value: "2-peter",
    segment: Segments.New,
    order: 22,
    chapters: 3,
  },

  {
    label: "Primera Carta de San Juan",
    value: "1-john",
    segment: Segments.New,
    order: 23,
    chapters: 5,
  },
  {
    label: "Segunda Carta de San Juan",
    value: "2-john",
    segment: Segments.New,
    order: 24,
    chapters: 1,
  },
  {
    label: "Tercera Carta de San Juan",
    value: "3-john",
    segment: Segments.New,
    order: 25,
    chapters: 1,
  },
  {
    label: "Carta de San Judas",
    value: "jude",
    segment: Segments.New,
    order: 26,
    chapters: 1,
  },
  {
    label: "Apocalipsis",
    value: "revelation",
    segment: Segments.New,
    order: 27,
    chapters: 22,
  },
];
