/* Spanish question translations — editorial batch 01.
 * Runtime overlay only: the enabled question-bank validator remains unchanged.
 * These records are intentionally not selectable until the full five-locale bank
 * and native-speaker/editorial review gates are complete.
 */
(() => {
  const questions = window.MINDQUEST_QUESTIONS;
  if (!Array.isArray(questions)) return;

  const translations = {
    "IN-GEO-001": {
      "es-ES": {
        question: "¿Qué ciudad india es conocida como la Ciudad Rosa?",
        options: { a: "Delhi", b: "Jaipur", c: "Jodhpur", d: "Udaipur" },
        explanation: "Jaipur es conocida popularmente como la Ciudad Rosa."
      },
      "es-PE": {
        question: "¿Qué ciudad de la India es conocida como la Ciudad Rosa?",
        options: { a: "Delhi", b: "Jaipur", c: "Jodhpur", d: "Udaipur" },
        explanation: "A Jaipur se la conoce popularmente como la Ciudad Rosa."
      }
    },
    "IN-HIS-001": {
      "es-ES": {
        question: "¿Quién fue el primer ministro de la India independiente?",
        options: { a: "Sardar Patel", b: "Dr. Rajendra Prasad", c: "Jawaharlal Nehru", d: "Lal Bahadur Shastri" },
        explanation: "Jawaharlal Nehru asumió el cargo de primer ministro de la India en 1947."
      },
      "es-PE": {
        question: "¿Quién fue el primer ministro de la India después de su independencia?",
        options: { a: "Sardar Patel", b: "Dr. Rajendra Prasad", c: "Jawaharlal Nehru", d: "Lal Bahadur Shastri" },
        explanation: "Jawaharlal Nehru asumió el cargo de primer ministro de la India en 1947."
      }
    },
    "IN-SCI-001": {
      "es-ES": {
        question: "¿Qué organismo espacial de la India lanzó las misiones Chandrayaan?",
        options: { a: "ISRO", b: "DRDO", c: "BARC", d: "CSIR" },
        explanation: "ISRO son las siglas de la Organización de Investigación Espacial de la India."
      },
      "es-PE": {
        question: "¿Qué organismo espacial de la India lanzó las misiones Chandrayaan?",
        options: { a: "ISRO", b: "DRDO", c: "BARC", d: "CSIR" },
        explanation: "ISRO significa Organización de Investigación Espacial de la India."
      }
    },
    "RU-GEO-001": {
      "es-ES": {
        question: "¿Cuál es la capital de Rusia?",
        options: { a: "Kazán", b: "Moscú", c: "Sochi", d: "Vladivostok" },
        explanation: "Moscú es la capital de la Federación de Rusia."
      },
      "es-PE": {
        question: "¿Qué ciudad es la capital de Rusia?",
        options: { a: "Kazán", b: "Moscú", c: "Sochi", d: "Vladivostok" },
        explanation: "Moscú es la capital de la Federación de Rusia."
      }
    },
    "RU-GEO-002": {
      "es-ES": {
        question: "¿Qué lago de Rusia es el lago de agua dulce más profundo del mundo?",
        options: { a: "Ládoga", b: "Onega", c: "Ilmen", d: "Baikal" },
        explanation: "El lago Baikal es el lago de agua dulce más profundo del mundo."
      },
      "es-PE": {
        question: "¿Cuál es el lago ruso de agua dulce más profundo del mundo?",
        options: { a: "Ládoga", b: "Onega", c: "Ilmen", d: "Baikal" },
        explanation: "El lago Baikal es el lago de agua dulce más profundo del mundo."
      }
    },
    "RU-CUL-001": {
      "es-ES": {
        question: "¿Qué autor ruso escribió la novela «Guerra y paz»?",
        options: { a: "León Tolstói", b: "Antón Chéjov", c: "Fiódor Dostoyevski", d: "Iván Turguénev" },
        explanation: "León Tolstói es el autor de la novela épica «Guerra y paz»."
      },
      "es-PE": {
        question: "¿Quién escribió la novela rusa «Guerra y paz»?",
        options: { a: "León Tolstói", b: "Antón Chéjov", c: "Fiódor Dostoyevski", d: "Iván Turguénev" },
        explanation: "León Tolstói escribió la novela épica «Guerra y paz»."
      }
    },
    "US-GEO-001": {
      "es-ES": {
        question: "¿Cuál es la capital de Estados Unidos?",
        options: { a: "Nueva York", b: "Los Ángeles", c: "Washington D. C.", d: "Chicago" },
        explanation: "Washington D. C. es la capital nacional de Estados Unidos."
      },
      "es-PE": {
        question: "¿Qué ciudad es la capital de Estados Unidos?",
        options: { a: "Nueva York", b: "Los Ángeles", c: "Washington D. C.", d: "Chicago" },
        explanation: "Washington D. C. es la capital de Estados Unidos."
      }
    },
    "US-HIS-001": {
      "es-ES": {
        question: "¿En qué año se aprobó la Declaración de Independencia de Estados Unidos?",
        options: { a: "1776", b: "1783", c: "1787", d: "1812" },
        explanation: "La Declaración de Independencia se aprobó el 4 de julio de 1776."
      },
      "es-PE": {
        question: "¿En qué año se aprobó la Declaración de Independencia de los Estados Unidos?",
        options: { a: "1776", b: "1783", c: "1787", d: "1812" },
        explanation: "La Declaración de Independencia se aprobó el 4 de julio de 1776."
      }
    },
    "US-SCI-001": {
      "es-ES": {
        question: "¿Qué organismo estadounidense dirige el programa espacial civil?",
        options: { a: "NOAA", b: "FBI", c: "EPA", d: "NASA" },
        explanation: "La NASA dirige el programa espacial civil de Estados Unidos."
      },
      "es-PE": {
        question: "¿Qué entidad de Estados Unidos está a cargo del programa espacial civil?",
        options: { a: "NOAA", b: "FBI", c: "EPA", d: "NASA" },
        explanation: "La NASA dirige el programa espacial civil de Estados Unidos."
      }
    },
    "IN-GEO-002": {
      "es-ES": {
        question: "¿Por cuántos estados de la India pasa el trópico de Cáncer?",
        options: { a: "6", b: "7", c: "8", d: "9" },
        explanation: "Cruza ocho estados, desde Guyarat, al oeste, hasta Mizoram, al este."
      },
      "es-PE": {
        question: "¿A través de cuántos estados de la India pasa el trópico de Cáncer?",
        options: { a: "6", b: "7", c: "8", d: "9" },
        explanation: "Atraviesa ocho estados, desde Guyarat, en el oeste, hasta Mizoram, en el este."
      }
    }
  };

  const byId = new Map(questions.map((question) => [question.id, question]));
  for (const [id, localized] of Object.entries(translations)) {
    const question = byId.get(id);
    if (!question) continue;
    for (const [locale, translation] of Object.entries(localized)) {
      if (!Object.hasOwn(question.translations, locale)) {
        question.translations[locale] = translation;
      }
    }
  }
})();
