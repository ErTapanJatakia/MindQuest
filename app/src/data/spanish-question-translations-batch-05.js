/* Spanish question translations — editorial batch 05.
 * Loaded after batches 01–04 and before application startup.
 * Spanish question locales remain unavailable until full-bank editorial gates pass.
 */
(() => {
  const questions = window.MINDQUEST_QUESTIONS;
  if (!Array.isArray(questions)) return;

  const translations = {
    "US-HIS-004": {
      "es-ES": {
        question: "¿Qué discurso pronunció Abraham Lincoln en 1863 durante la inauguración del cementerio nacional de soldados en Gettysburg?",
        options: { a: "Discurso de Gettysburg", b: "Proclamación de Emancipación", c: "Segundo discurso inaugural", d: "Discurso de la casa dividida" },
        explanation: "Lincoln pronunció el Discurso de Gettysburg el 19 de noviembre de 1863, durante la ceremonia de inauguración del cementerio dedicado a los soldados de la Unión."
      },
      "es-PE": {
        question: "¿Cómo se llamó el discurso que Abraham Lincoln dio en 1863 al inaugurarse el cementerio nacional de soldados de Gettysburg?",
        options: { a: "Discurso de Gettysburg", b: "Proclamación de Emancipación", c: "Segundo mensaje inaugural", d: "Discurso de la casa dividida" },
        explanation: "El 19 de noviembre de 1863, Lincoln pronunció el Discurso de Gettysburg en la ceremonia de inauguración del cementerio para los soldados de la Unión."
      }
    },
    "US-HIS-005": {
      "es-ES": {
        question: "¿Qué enmienda de la Constitución de Estados Unidos abolió formalmente la esclavitud en todo el país?",
        options: { a: "Duodécima Enmienda", b: "Decimocuarta Enmienda", c: "Decimoquinta Enmienda", d: "Decimotercera Enmienda" },
        explanation: "La Decimotercera Enmienda, ratificada en 1865, abolió la esclavitud y el trabajo forzoso, salvo como castigo por un delito tras una condena."
      },
      "es-PE": {
        question: "¿Cuál fue la enmienda constitucional que puso fin legalmente a la esclavitud en todo Estados Unidos?",
        options: { a: "Enmienda 12", b: "Enmienda 14", c: "Enmienda 15", d: "Enmienda 13" },
        explanation: "Ratificada en 1865, la Decimotercera Enmienda prohibió la esclavitud y la servidumbre involuntaria, excepto como pena por un delito después de una condena."
      }
    },
    "US-SCI-005": {
      "es-ES": {
        question: "¿Qué telescopio espacial de la NASA, lanzado en 1990, lleva el nombre del astrónomo Edwin Hubble?",
        options: { a: "Telescopio espacial James Webb", b: "Telescopio espacial Hubble", c: "Telescopio espacial Spitzer", d: "Telescopio espacial Kepler" },
        explanation: "El telescopio espacial Hubble fue puesto en órbita el 24 de abril de 1990 a bordo del transbordador Discovery y recibió el nombre del astrónomo Edwin Hubble."
      },
      "es-PE": {
        question: "¿Qué telescopio espacial de la NASA fue lanzado en 1990 y homenajea con su nombre al astrónomo estadounidense Edwin Hubble?",
        options: { a: "Telescopio espacial James Webb", b: "Telescopio espacial Hubble", c: "Telescopio espacial Spitzer", d: "Telescopio espacial Kepler" },
        explanation: "El Hubble viajó al espacio en el transbordador Discovery el 24 de abril de 1990. Su nombre honra al astrónomo Edwin Hubble."
      }
    },
    "US-CUL-004": {
      "es-ES": {
        question: "¿Qué calle de Nueva York está especialmente vinculada al famoso distrito teatral de Broadway?",
        options: { a: "Quinta Avenida", b: "Avenida Madison", c: "Broadway", d: "Park Avenue" },
        explanation: "Broadway es la gran vía asociada al distrito de los teatros de Manhattan y a sus producciones comerciales."
      },
      "es-PE": {
        question: "¿Qué avenida de la ciudad de Nueva York se asocia de manera emblemática con el circuito teatral de Broadway?",
        options: { a: "Quinta Avenida", b: "Avenida Madison", c: "Broadway", d: "Park Avenue" },
        explanation: "Broadway es la arteria más conocida del distrito teatral de Manhattan, donde se presentan numerosas producciones comerciales."
      }
    },
    "US-CUL-005": {
      "es-ES": {
        question: "¿Qué arquitecto diseñó el Arco Gateway de San Luis, en el estado de Misuri?",
        options: { a: "Eero Saarinen", b: "Frank Lloyd Wright", c: "Louis Sullivan", d: "I. M. Pei" },
        explanation: "El arquitecto finlandés-estadounidense Eero Saarinen diseñó el Arco Gateway, cuya construcción concluyó en 1965."
      },
      "es-PE": {
        question: "¿Quién fue el arquitecto responsable del diseño del Arco Gateway, en la ciudad de San Luis, Misuri?",
        options: { a: "Eero Saarinen", b: "Frank Lloyd Wright", c: "Louis Sullivan", d: "I. M. Pei" },
        explanation: "Eero Saarinen, arquitecto de origen finlandés establecido en Estados Unidos, diseñó el Arco Gateway, terminado en 1965."
      }
    },
    "IN-GEO-006": {
      "es-ES": {
        question: "¿En qué estado indio se encuentra la parte de los Sundarbans que alberga el mayor bosque de manglares del mundo?",
        options: { a: "Odisha", b: "Assam", c: "Bengala Occidental", d: "Andhra Pradesh" },
        explanation: "La parte india de los Sundarbans se encuentra en Bengala Occidental, dentro del delta del Ganges y el Brahmaputra; el ecosistema también se extiende por Bangladés."
      },
      "es-PE": {
        question: "¿Qué estado de la India contiene la zona de los Sundarbans, reconocida por su extensa selva de manglares?",
        options: { a: "Odisha", b: "Assam", c: "Bengala Occidental", d: "Andhra Pradesh" },
        explanation: "Los Sundarbans indios están en Bengala Occidental, en el delta formado por los ríos Ganges y Brahmaputra. El bosque de manglares continúa hacia Bangladés."
      }
    },
    "IN-GEO-007": {
      "es-ES": {
        question: "¿Qué cordillera se extiende paralela a buena parte de la costa occidental de la India?",
        options: { a: "Ghats occidentales", b: "Cordillera Aravalli", c: "Cordillera Vindhya", d: "Colinas Shivalik" },
        explanation: "Los Ghats occidentales discurren aproximadamente en paralelo a la costa occidental india y constituyen un importante punto caliente de biodiversidad."
      },
      "es-PE": {
        question: "¿Qué sistema montañoso acompaña gran parte del litoral occidental de la India?",
        options: { a: "Ghats occidentales", b: "Cordillera Aravalli", c: "Cordillera Vindhya", d: "Colinas Shivalik" },
        explanation: "La cadena de los Ghats occidentales corre cerca y paralela a la costa oeste de la India, y destaca por su gran biodiversidad."
      }
    },
    "IN-HIS-006": {
      "es-ES": {
        question: "¿Qué emperador mogol ordenó desarrollar Fatehpur Sikri como capital imperial?",
        options: { a: "Babur", b: "Humayun", c: "Jahangir", d: "Akbar" },
        explanation: "El emperador Akbar convirtió Fatehpur Sikri en su capital imperial durante la segunda mitad del siglo XVI."
      },
      "es-PE": {
        question: "¿Bajo el mandato de qué emperador mogol se estableció Fatehpur Sikri como capital del imperio?",
        options: { a: "Babur", b: "Humayun", c: "Jahangir", d: "Akbar" },
        explanation: "Akbar impulsó la construcción y el desarrollo de Fatehpur Sikri como sede imperial en el siglo XVI."
      }
    },
    "IN-SCI-006": {
      "es-ES": {
        question: "¿En qué ciudad india se encuentra la sede de la Organización de Investigación Espacial de la India (ISRO)?",
        options: { a: "Hyderabad", b: "Bengaluru", c: "Nueva Delhi", d: "Thiruvananthapuram" },
        explanation: "La sede de ISRO está en Bengaluru, capital del estado de Karnataka."
      },
      "es-PE": {
        question: "¿En qué ciudad de la India está ubicada la oficina central de la Organización de Investigación Espacial (ISRO)?",
        options: { a: "Hyderabad", b: "Bengaluru", c: "Nueva Delhi", d: "Thiruvananthapuram" },
        explanation: "La sede principal de ISRO se encuentra en Bengaluru, ciudad del estado indio de Karnataka."
      }
    },
    "IN-CUL-006": {
      "es-ES": {
        question: "¿Por qué manifestación artística son especialmente conocidas las cuevas de Ajanta, en Maharashtra?",
        options: { a: "Escultura en bronce", b: "Mosaicos de vidrio", c: "Pinturas budistas", d: "Miniaturas mogolas" },
        explanation: "Las cuevas de Ajanta destacan por sus antiguas pinturas murales y esculturas budistas, realizadas a lo largo de varios siglos."
      },
      "es-PE": {
        question: "¿Qué expresión artística distingue especialmente a las cuevas de Ajanta, ubicadas en Maharashtra?",
        options: { a: "Esculturas de bronce", b: "Trabajos en mosaico de vidrio", c: "Pinturas budistas", d: "Pintura en miniatura mogola" },
        explanation: "Ajanta es célebre por sus murales budistas y esculturas antiguas, elaborados durante distintos periodos a lo largo de varios siglos."
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
