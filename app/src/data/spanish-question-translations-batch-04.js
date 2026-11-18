/* Spanish question translations — editorial batch 04.
 * Loaded after batches 01–03 and before application startup.
 * Spanish question locales remain unavailable until full-bank editorial gates pass.
 */
(() => {
  const questions = window.MINDQUEST_QUESTIONS;
  if (!Array.isArray(questions)) return;

  const translations = {
    "IN-HIS-005": {
      "es-ES": {
        question: "¿Desde qué lugar inició Mahatma Gandhi la Marcha de la Sal de 1930?",
        options: { a: "Wardha", b: "Áshram de Sabarmati", c: "Sevagram", d: "Porbandar" },
        explanation: "Gandhi inició la Marcha de la Sal el 12 de marzo de 1930 desde el áshram de Sabarmati, cerca de Ahmedabad, y caminó hasta Dandi para protestar contra el impuesto británico sobre la sal."
      },
      "es-PE": {
        question: "¿De dónde partió Mahatma Gandhi para comenzar la Marcha de la Sal en 1930?",
        options: { a: "Wardha", b: "Ashram de Sabarmati", c: "Sevagram", d: "Porbandar" },
        explanation: "El 12 de marzo de 1930, Gandhi salió del ashram de Sabarmati, cerca de Ahmedabad, rumbo a Dandi para desafiar el impuesto británico a la sal."
      }
    },
    "IN-SCI-004": {
      "es-ES": {
        question: "¿Qué matemático indio está asociado al número 1729, conocido como el número de Hardy-Ramanujan?",
        options: { a: "Bhaskara II", b: "Srinivasa Ramanujan", c: "Aryabhata", d: "D. R. Kaprekar" },
        explanation: "El número 1729 recibe el nombre de Hardy-Ramanujan por una conocida anécdota sobre la conversación entre Srinivasa Ramanujan y G. H. Hardy."
      },
      "es-PE": {
        question: "¿A qué matemático de la India se vincula el 1729, llamado número de Hardy-Ramanujan?",
        options: { a: "Bhaskara II", b: "Srinivasa Ramanujan", c: "Aryabhata", d: "D. R. Kaprekar" },
        explanation: "El 1729 es conocido como número de Hardy-Ramanujan por una célebre anécdota relacionada con Srinivasa Ramanujan y G. H. Hardy."
      }
    },
    "IN-SCI-005": {
      "es-ES": {
        question: "¿Qué misión india logró aterrizar suavemente cerca de la región del polo sur lunar en agosto de 2023?",
        options: { a: "Chandrayaan-3", b: "Mangalyaan", c: "Chandrayaan-1", d: "AstroSat" },
        explanation: "La misión india Chandrayaan-3 logró un alunizaje controlado el 23 de agosto de 2023. El módulo Vikram desplegó el vehículo explorador Pragyan."
      },
      "es-PE": {
        question: "¿Qué misión de la India consiguió un alunizaje suave cerca del polo sur de la Luna en agosto de 2023?",
        options: { a: "Chandrayaan-3", b: "Mangalyaan", c: "Chandrayaan-1", d: "AstroSat" },
        explanation: "Chandrayaan-3 realizó con éxito un alunizaje el 23 de agosto de 2023; desde el módulo Vikram se desplegó el explorador Pragyan."
      }
    },
    "IN-CUL-004": {
      "es-ES": {
        question: "¿En qué estado de la India se originó el kathakali, una tradición clásica de danza y teatro?",
        options: { a: "Odisha", b: "Tamil Nadu", c: "Kerala", d: "Manipur" },
        explanation: "El kathakali se desarrolló en Kerala y destaca por sus elaborados vestuarios, gestos expresivos y característico maquillaje facial."
      },
      "es-PE": {
        question: "¿En qué estado indio nació el kathakali, una forma clásica de danza y teatro?",
        options: { a: "Odisha", b: "Tamil Nadu", c: "Kerala", d: "Manipur" },
        explanation: "El kathakali surgió en Kerala. Se reconoce por sus vestuarios detallados, gestos expresivos y maquillaje facial distintivo."
      }
    },
    "IN-CUL-005": {
      "es-ES": {
        question: "¿Qué antiguo tratado indio sobre las artes escénicas se atribuye tradicionalmente a Bharata Muni?",
        options: { a: "Arthashastra", b: "Natya Shastra", c: "Ashtadhyayi", d: "Charaka Samhita" },
        explanation: "El Natya Shastra es un tratado fundamental en sánscrito sobre teatro, danza y música, atribuido tradicionalmente al sabio Bharata Muni."
      },
      "es-PE": {
        question: "¿Qué antiguo texto de la India sobre las artes escénicas se atribuye tradicionalmente a Bharata Muni?",
        options: { a: "Arthashastra", b: "Natya Shastra", c: "Ashtadhyayi", d: "Charaka Samhita" },
        explanation: "El Natya Shastra es una obra esencial en sánscrito dedicada al teatro, la danza y la música; la tradición la atribuye al sabio Bharata Muni."
      }
    },
    "RU-HIS-005": {
      "es-ES": {
        question: "¿Quién se convirtió en la primera mujer en viajar al espacio en 1963?",
        options: { a: "Svetlana Savítskaya", b: "Valentina Ponomariova", c: "Valentina Tereshkova", d: "Yelena Serova" },
        explanation: "La cosmonauta soviética Valentina Tereshkova voló a bordo de la Vostok 6 el 16 de junio de 1963 y se convirtió en la primera mujer en el espacio."
      },
      "es-PE": {
        question: "¿Qué cosmonauta soviética fue la primera mujer en viajar al espacio, en 1963?",
        options: { a: "Svetlana Savítskaya", b: "Valentina Ponomariova", c: "Valentina Tereshkova", d: "Yelena Serova" },
        explanation: "Valentina Tereshkova viajó en la nave Vostok 6 el 16 de junio de 1963 y pasó a ser la primera mujer que llegó al espacio."
      }
    },
    "RU-SCI-004": {
      "es-ES": {
        question: "¿Qué químico ruso formuló la ley periódica y organizó la tabla periódica de los elementos?",
        options: { a: "Dmitri Mendeléyev", b: "Aleksandr Bútlerov", c: "Mijaíl Lomonósov", d: "Nikolái Semiónov" },
        explanation: "Dmitri Mendeléyev publicó su tabla periódica en 1869 y formuló la ley periódica, que organiza los elementos según la repetición de sus propiedades."
      },
      "es-PE": {
        question: "¿Qué químico ruso propuso la ley periódica y desarrolló una influyente tabla de los elementos?",
        options: { a: "Dmitri Mendeléyev", b: "Aleksandr Bútlerov", c: "Mijaíl Lomonósov", d: "Nikolái Semiónov" },
        explanation: "Dmitri Mendeléyev publicó su tabla en 1869 y formuló la ley periódica, que ordena los elementos de acuerdo con la recurrencia de sus propiedades."
      }
    },
    "RU-SCI-005": {
      "es-ES": {
        question: "¿Qué nave espacial soviética logró por primera vez un aterrizaje lunar del que pudo sobrevivir, en 1966?",
        options: { a: "Luna 2", b: "Luna 3", c: "Vostok 1", d: "Luna 9" },
        explanation: "Luna 9 se convirtió el 3 de febrero de 1966 en la primera nave que sobrevivió a un alunizaje y transmitió fotografías desde la superficie lunar."
      },
      "es-PE": {
        question: "¿Qué sonda soviética fue la primera en realizar un aterrizaje exitoso y sobrevivir en la Luna, en 1966?",
        options: { a: "Luna 2", b: "Luna 3", c: "Vostok 1", d: "Luna 9" },
        explanation: "El 3 de febrero de 1966, Luna 9 logró posarse en la superficie lunar, sobrevivir al descenso y enviar fotografías desde allí."
      }
    },
    "RU-CUL-004": {
      "es-ES": {
        question: "¿Qué novelista ruso escribió la obra Padres e hijos?",
        options: { a: "León Tolstói", b: "Fiódor Dostoyevski", c: "Iván Turguénev", d: "Antón Chéjov" },
        explanation: "Iván Turguénev escribió Padres e hijos, novela publicada por primera vez en 1862."
      },
      "es-PE": {
        question: "¿Quién escribió la novela rusa Padres e hijos?",
        options: { a: "León Tolstói", b: "Fiódor Dostoyevski", c: "Iván Turguénev", d: "Antón Chéjov" },
        explanation: "La novela Padres e hijos fue escrita por Iván Turguénev y apareció por primera vez en 1862."
      }
    },
    "RU-CUL-005": {
      "es-ES": {
        question: "¿Qué compositor ruso escribió el ballet El pájaro de fuego?",
        options: { a: "Piotr Chaikovski", b: "Serguéi Rajmáninov", c: "Ígor Stravinski", d: "Modest Músorgski" },
        explanation: "Ígor Stravinski compuso El pájaro de fuego para los Ballets Rusos de Serguéi Diáguilev; se estrenó en París en 1910."
      },
      "es-PE": {
        question: "¿Quién compuso el ballet El pájaro de fuego, estrenado en París en 1910?",
        options: { a: "Piotr Chaikovski", b: "Serguéi Rajmáninov", c: "Ígor Stravinski", d: "Modest Músorgski" },
        explanation: "Ígor Stravinski creó la música de El pájaro de fuego para la compañía Ballets Rusos de Serguéi Diáguilev. La obra se estrenó en París en 1910."
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
