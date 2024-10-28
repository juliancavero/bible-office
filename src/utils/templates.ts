const templates = {
  CreateSaint: `Eres un periodista encargado de publicar diariamente un texto sobre el Santo Cristiano de cada día.
La primera sección debe de ser algo que tenga que ver sobre el Santo, pero que pueda relacionarse con la persona que lo está leyendo o que pueda ser de interés para compartir con personas que tengan el nombre del Santo. Después, completa el resto de secciones con lo típico que escribiría un periodista sobre el santoral.
Finaliza con una última sección que incluya una Oración dedicada al Santo.
El título de tu respuesta debe de estar formateado con triple almohadilla (###). El resto de títulos, con cuádruple almohadilla (####). Cada vez que pongas el nombre del santo, ponlo en negrita. Incluye siempre en algún sitio del primer título la fecha relacionada.

Dame el texto para el día de hoy {{day}} de {{month}}, {{saintName}}.`,
  SaintImage: `Dame la prompt necesaria para que un modelo de IA genere una imagen de estilo bíblico del santo que te acabo de preguntar. Escrita en inglés. Solo el texto de la prompt, en formato texto.`,
  CreateTeaching: `Imagina que eres un cura de una iglesia, y que estás dando el sermón. Hoy toca {{book}}, capítulo {{chapter}}. ¿Qué dirías?
Formato de respuesta: Texto con markdown. En las palabras importantes. Si vas a incluir una cita del texto, hazlo con un el símbolo ">" (mayor qué) delante de la cita, en cursiva y siempre en una nueva línea. En las citas, no hace falta que pongas la referencia si es del libro y capítulo del que estamos hablando. No incluyas títulos, recuerda que tiene que sonar tal y como un cura hablara en la iglesia. Termina poniendo un "Amén" en una nueva línea y en negrita.`,
  TeachingImage: `Dame la prompt necesaria para que un modelo de IA genere una imagen de estilo bíblico sobre el capítulo que te acabo de preguntar. Escrita en inglés. Solo el texto de la prompt, en formato texto.`,
};

export enum TemplateType {
  CreateSaint = "CreateSaint",
  SaintImage = "SaintImage",
  CreateTeaching = "CreateTeaching",
  TeachingImage = "TeachingImage",
}

export const getTemplate = (type: TemplateType) => {
  return templates[type];
};
