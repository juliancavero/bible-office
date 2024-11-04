const templates: Record<TemplateType, string> = {
  CreateSaint: `Eres un periodista experto encargado de publicar diariamente un texto sobre el Santo Cristiano de cada día. Tienes información extensa de cada Santo.

  Contenido de tu respuesta:
  1. La primera sección debe de ser algo que tenga que ver sobre el **Santo**, pero que pueda relacionarse con la persona que lo está leyendo o que pueda ser de interés para compartir con personas que tengan el nombre del Santo.
  2. Después, completa el resto de secciones con lo típico que escribiría un periodista sobre el santoral. Máximo 4 secciones para completar.
  3. Finaliza con una última sección que incluya una Oración dedicada al **Santo**.

  Formato de respuesta: Texto con markdown.
  1. El título de tu respuesta debe de estar formateado con triple almohadilla (###).
  2. El resto de títulos, con cuádruple almohadilla (####).
  3. Cada vez que pongas el nombre del santo, ponlo en negrita.
  4. El título debe de ser siempre "{fecha} : {santo}, {breve título}". Ejemplo: "4 de noviembre: San Carlos Borromeo, un modelo de liderazgo y entrega".
  5. No pongas emojis.
  6. La oración final, escribe cada línea dentro de un bloque de cita con > al principio de la línea.

  ### Importante: Tu respuesta debe tener más de 700 palabras, de las cuales la oración tendrá más 50 palabras. 

  Dame el texto para el día de hoy {{day}} de {{month}}, {{saintName}}.`,
  SaintImage: `Dame la prompt necesaria para que un modelo de IA genere una imagen de estilo bíblico del santo que te acabo de preguntar. Escrita en inglés. Solo el texto de la prompt, en formato texto.`,
  GroqSaintImage: `Eres un experto en prompt engineering y creas prompts para crear imágenes de manera profesional. Dame la prompt, de al menos 90 palabras, necesaria para que un modelo de IA genere una imagen a color de estilo bíblico del santo que te acabo de preguntar. Escrita en inglés. Solo el texto de la prompt, en formato texto.`,
  CreateTeaching: `Eres el cura de una iglesia, y estás dando el sermón. Hoy toca {{book}}, capítulo {{chapter}}. ¿Qué dirías?
Formato de respuesta: Texto con markdown. Pon en negrita ** las palabras importantes. Si vas a incluir una cita del texto, hazlo con un el símbolo ">" (mayor qué) delante de la cita, en cursiva y siempre en una nueva línea. En las citas, no hace falta que pongas la referencia si es del libro y capítulo del que estamos hablando. No incluyas títulos, recuerda que tiene que sonar tal y como un cura hablara en la iglesia. Termina poniendo un "Amén" en una nueva línea y en negrita.`,
  TeachingImage: `Dame la prompt necesaria para que un modelo de IA genere una imagen de estilo bíblico sobre el capítulo que te acabo de preguntar. Escrita en inglés. Solo el texto de la prompt, en formato texto.`,
  GroqTeachingImage: `Eres un experto en prompt engineering y creas prompts para crear imágenes de manera profesional. Dame la prompt, de al menos 90 palabras, necesaria para que un modelo de IA genere una imagen de estilo bíblico de este capítulo. Escrita en inglés. Solo el texto de la prompt, en formato texto.`,
  TeachingGroq: `Eres el cura de una iglesia, y estás dando el sermón. Hoy toca {{book}}, capítulo {{chapter}}. ¿Qué dirías?
  
  Aquí tienes el texto bíblico como referencia. Básate únicamente en él para citar versículos. No cites todo el texto, solo lo que necesites.
  
  {{chapterText}}
  
  ### Formato de respuesta: Texto con markdown.
  1. Resalta en negrita ** las palabras importantes.
  2. Si vas a incluir una cita del texto: Hazlo siempre en una nueva línea, y pon otra nueva línea al terminar la cita. Incluye siempre el símbolo > (mayor qué) delante de la cita. Hazlo siempre en cursiva (con un *). No incluyas comillas.

  Ejemplo de texto con citas:

  > *Yo te pongo por Dios ante el faraón. Tu hermano Aarón será tu profeta.*
  > (Éxodo 7:1).

 Dios les da un propósito. Él es el  **Señor,** el Dios que controla la historia, el Dios que no abandona a su pueblo, a pesar de las pruebas.

  La primera prueba que enfrentan Moisés y Aarón es el **desprecio** del faraón. La resistencia a escuchar, la dureza del corazón ante la voluntad de Dios.

  > *Yo endureceré el corazón del faraón y, aunque haré muchas señales milagrosas y prodigios en Egipto, él no les hará caso.*
  > (Éxodo 7:3)

  Dios sabe que las señales serán necesarias para demostrar su poder, su soberanía. Pero también es claro que el **corazón humano** puede resistirse a la verdad, incluso ante las pruebas más contundentes.

  Fin del ejemplo.
  3. No incluyas títulos, recuerda que tiene que sonar tal y como un cura hablara en la iglesia.
  4. Termina poniendo un Amén en una nueva línea y en negrita.

  Tu respuesta debe de tener entre 400 y 600 palabras, y empezar con "Hermanas y Hermanos".`,
};

export enum TemplateType {
  CreateSaint = "CreateSaint",
  SaintImage = "SaintImage",
  GroqSaintImage = "GroqSaintImage",
  CreateTeaching = "CreateTeaching",
  TeachingImage = "TeachingImage",
  GroqTeachingImage = "GroqTeachingImage",
  TeachingGroq = "TeachingGroq",
}

export const getTemplate = (type: TemplateType) => {
  return templates[type];
};
