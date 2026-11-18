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
    },

    "IN-HIS-002": {
      "es-ES": {
        question: "¿En qué fecha adoptó la Asamblea Constituyente la Constitución de la India?",
        options: { a: "15 de agosto de 1947", b: "26 de noviembre de 1949", c: "26 de enero de 1950", d: "2 de octubre de 1950" },
        explanation: "La Asamblea Constituyente adoptó la Constitución el 26 de noviembre de 1949; entró en vigor el 26 de enero de 1950."
      },
      "es-PE": {
        question: "¿Qué día aprobó la Asamblea Constituyente la Constitución de la India?",
        options: { a: "15 de agosto de 1947", b: "26 de noviembre de 1949", c: "26 de enero de 1950", d: "2 de octubre de 1950" },
        explanation: "La Asamblea Constituyente aprobó la Constitución el 26 de noviembre de 1949 y esta empezó a regir el 26 de enero de 1950."
      }
    },
    "IN-CUL-002": {
      "es-ES": {
        question: "¿Qué fiesta de la cosecha, celebrada en abril, está especialmente vinculada al Punyab?",
        options: { a: "Onam", b: "Bihu", c: "Vaisakhi", d: "Pongal" },
        explanation: "Vaisakhi es una importante fiesta primaveral de la cosecha en el Punyab y conmemora también la fundación de la Khalsa por el gurú Gobind Singh en 1699."
      },
      "es-PE": {
        question: "¿Qué festividad de la cosecha se celebra en abril y está muy relacionada con el estado indio de Punyab?",
        options: { a: "Onam", b: "Bihu", c: "Vaisakhi", d: "Pongal" },
        explanation: "Vaisakhi es una celebración importante de la cosecha de primavera en Punyab. Para la comunidad sij, también recuerda la creación de la Khalsa por el gurú Gobind Singh en 1699."
      }
    },
    "RU-GEO-003": {
      "es-ES": {
        question: "¿Qué río se considera generalmente el más largo de Europa?",
        options: { a: "Volga", b: "Danubio", c: "Rin", d: "Don" },
        explanation: "El Volga, que atraviesa la Rusia occidental, suele considerarse el río más largo de Europa."
      },
      "es-PE": {
        question: "¿Cuál es el río que, por lo general, se reconoce como el más largo de Europa?",
        options: { a: "Volga", b: "Danubio", c: "Rin", d: "Don" },
        explanation: "El Volga recorre la parte occidental de Rusia y es considerado, por lo general, el río más largo de Europa."
      }
    },
    "RU-SCI-002": {
      "es-ES": {
        question: "¿Cómo se llamó el primer satélite artificial, lanzado por la Unión Soviética en 1957?",
        options: { a: "Luna 2", b: "Vostok 1", c: "Explorer 1", d: "Sputnik 1" },
        explanation: "El Sputnik 1 se convirtió en el primer satélite artificial de la Tierra cuando la Unión Soviética lo lanzó el 4 de octubre de 1957."
      },
      "es-PE": {
        question: "¿Cuál fue el nombre del primer satélite artificial, puesto en órbita por la Unión Soviética en 1957?",
        options: { a: "Luna 2", b: "Vostok 1", c: "Explorer 1", d: "Sputnik 1" },
        explanation: "El Sputnik 1 fue el primer satélite artificial de la Tierra; la Unión Soviética lo lanzó el 4 de octubre de 1957."
      }
    },
    "US-GEO-003": {
      "es-ES": {
        question: "¿Qué estado de Estados Unidos tiene la mayor superficie terrestre?",
        options: { a: "Texas", b: "Alaska", c: "California", d: "Montana" },
        explanation: "Alaska es el estado estadounidense de mayor superficie y supera en extensión a Texas, California y Montana."
      },
      "es-PE": {
        question: "¿Cuál es el estado más grande de Estados Unidos si se considera su superficie?",
        options: { a: "Texas", b: "Alaska", c: "California", d: "Montana" },
        explanation: "Alaska es el estado de mayor extensión de Estados Unidos; su superficie supera la de Texas, California y Montana."
      }
    },
    "IN-GEO-004": {
      "es-ES": {
        question: "¿En qué estado de la India se encuentra el lago Chilika, una de las mayores lagunas de agua salobre de Asia?",
        options: { a: "Bengala Occidental", b: "Andhra Pradesh", c: "Odisha", d: "Kerala" },
        explanation: "El lago Chilika es una laguna de agua salobre situada en la costa de Odisha y conectada con el golfo de Bengala."
      },
      "es-PE": {
        question: "¿En qué estado indio está ubicado el lago Chilika, una de las lagunas de agua salobre más extensas de Asia?",
        options: { a: "Bengala Occidental", b: "Andhra Pradesh", c: "Odisha", d: "Kerala" },
        explanation: "El lago Chilika se ubica en la costa de Odisha. Es una laguna de agua salobre que está conectada con el golfo de Bengala."
      }
    },
    "IN-HIS-003": {
      "es-ES": {
        question: "¿En qué sesión del Congreso Nacional Indio se aprobó en 1929 la resolución de Purna Swaraj?",
        options: { a: "Lahore", b: "Karachi", c: "Lucknow", d: "Surat" },
        explanation: "La sesión del Congreso Nacional Indio celebrada en Lahore en diciembre de 1929 aprobó la resolución de Purna Swaraj, que reclamaba la independencia completa."
      },
      "es-PE": {
        question: "¿En qué sesión del Congreso Nacional de la India se aprobó la resolución de Purna Swaraj en 1929?",
        options: { a: "Lahore", b: "Karachi", c: "Lucknow", d: "Surat" },
        explanation: "En diciembre de 1929, la sesión del Congreso Nacional de la India realizada en Lahore aprobó la resolución de Purna Swaraj, que exigía la independencia total."
      }
    },
    "RU-GEO-004": {
      "es-ES": {
        question: "¿Qué cordillera se utiliza habitualmente como parte de la frontera entre Europa y Asia en Rusia?",
        options: { a: "Montes Altái", b: "Montes Urales", c: "Montes del Cáucaso", d: "Montes Sayanes" },
        explanation: "Los montes Urales constituyen la frontera geográfica convencional entre Europa y Asia en buena parte de Rusia."
      },
      "es-PE": {
        question: "¿Qué cadena montañosa se considera parte del límite entre Europa y Asia en territorio ruso?",
        options: { a: "Montes Altái", b: "Montes Urales", c: "Montes del Cáucaso", d: "Montes Sayanes" },
        explanation: "Los montes Urales son la división geográfica convencional entre Europa y Asia en gran parte de Rusia."
      }
    },
    "RU-CUL-003": {
      "es-ES": {
        question: "¿Qué escritor ruso creó al personaje ficticio de Woland en la novela «El maestro y Margarita»?",
        options: { a: "Borís Pasternak", b: "Maksim Gorki", c: "Mijaíl Shólojov", d: "Mijaíl Bulgákov" },
        explanation: "Mijaíl Bulgákov escribió «El maestro y Margarita», novela en la que Woland es uno de los personajes sobrenaturales centrales."
      },
      "es-PE": {
        question: "¿Quién creó al personaje de Woland en la novela rusa «El maestro y Margarita»?",
        options: { a: "Borís Pasternak", b: "Máximo Gorki", c: "Mijaíl Shólojov", d: "Mijaíl Bulgákov" },
        explanation: "Mijaíl Bulgákov es el autor de «El maestro y Margarita», donde Woland aparece como un personaje sobrenatural central."
      }
    },
    "US-GEO-004": {
      "es-ES": {
        question: "¿Cuál de los cinco Grandes Lagos se encuentra íntegramente dentro de Estados Unidos?",
        options: { a: "Lago Superior", b: "Lago Erie", c: "Lago Michigan", d: "Lago Ontario" },
        explanation: "El lago Michigan es el único de los Grandes Lagos situado por completo en Estados Unidos; los otros cuatro se comparten con Canadá."
      },
      "es-PE": {
        question: "¿Qué lago de los cinco Grandes Lagos está totalmente dentro de Estados Unidos?",
        options: { a: "Lago Superior", b: "Lago Erie", c: "Lago Michigan", d: "Lago Ontario" },
        explanation: "El lago Michigan es el único de los Grandes Lagos que se encuentra por completo en Estados Unidos. Los otros cuatro son compartidos con Canadá."
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
