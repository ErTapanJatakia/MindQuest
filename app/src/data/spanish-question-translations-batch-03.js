/* Spanish question translations — editorial batch 03.
 * Loaded after the first two overlays and before application startup.
 * Spanish question locales remain unavailable until full-bank editorial gates pass.
 */
(() => {
  const questions = window.MINDQUEST_QUESTIONS;
  if (!Array.isArray(questions)) return;

  const translations = {
    "IN-SCI-002": {
      "es-ES": {
        question: "¿En qué año se lanzó Aryabhata, el primer satélite de la India?",
        options: { a: "1975", b: "1972", c: "1980", d: "1984" },
        explanation: "Aryabhata, el primer satélite de la India, fue lanzado el 19 de abril de 1975 mediante un vehículo de lanzamiento soviético."
      },
      "es-PE": {
        question: "¿En qué año fue puesto en órbita Aryabhata, el primer satélite indio?",
        options: { a: "1975", b: "1972", c: "1980", d: "1984" },
        explanation: "Aryabhata fue lanzado el 19 de abril de 1975 con ayuda de un cohete soviético."
      }
    },
    "RU-SCI-001": {
      "es-ES": {
        question: "¿Qué físico soviético recibió el Premio Nobel de Física de 1962 por sus teorías sobre la materia condensada?",
        options: { a: "Lev Landáu", b: "Ígor Tamm", c: "Piotr Kapitsa", d: "Andréi Sájarov" },
        explanation: "Lev Landáu recibió el Nobel de Física de 1962 por sus aportaciones pioneras a la teoría de la materia condensada, en especial del helio líquido."
      },
      "es-PE": {
        question: "¿Qué físico de la Unión Soviética obtuvo el Nobel de Física en 1962 por sus teorías sobre la materia condensada?",
        options: { a: "Lev Landáu", b: "Ígor Tamm", c: "Piotr Kapitsa", d: "Andréi Sájarov" },
        explanation: "Lev Landáu fue galardonado en 1962 por sus teorías fundamentales sobre la materia condensada, particularmente el helio líquido."
      }
    },
    "RU-HIS-001": {
      "es-ES": {
        question: "¿En qué año se firmó el Tratado de Brest-Litovsk?",
        options: { a: "1914", b: "1918", c: "1921", d: "1905" },
        explanation: "La Rusia soviética y las Potencias Centrales firmaron el Tratado de Brest-Litovsk el 3 de marzo de 1918."
      },
      "es-PE": {
        question: "¿En qué año fue firmado el Tratado de Brest-Litovsk?",
        options: { a: "1914", b: "1918", c: "1921", d: "1905" },
        explanation: "El acuerdo entre la Rusia soviética y las Potencias Centrales se suscribió el 3 de marzo de 1918."
      }
    },
    "US-GEO-002": {
      "es-ES": {
        question: "¿Qué río excavó gran parte del Gran Cañón?",
        options: { a: "Río Colorado", b: "Río Misisipi", c: "Río Bravo", d: "Río Columbia" },
        explanation: "El río Colorado y sus afluentes excavaron el Gran Cañón a lo largo de millones de años."
      },
      "es-PE": {
        question: "¿Qué río formó gran parte del Gran Cañón?",
        options: { a: "Río Colorado", b: "Río Misisipi", c: "Río Grande", d: "Río Columbia" },
        explanation: "La acción del río Colorado y de sus afluentes dio forma al Gran Cañón durante millones de años."
      }
    },
    "US-HIS-002": {
      "es-ES": {
        question: "¿En qué año se completó la Compra de Luisiana por parte de Estados Unidos?",
        options: { a: "1776", b: "1789", c: "1803", d: "1812" },
        explanation: "Estados Unidos adquirió de Francia el territorio de Luisiana en 1803."
      },
      "es-PE": {
        question: "¿En qué año Estados Unidos realizó la compra del territorio de Luisiana?",
        options: { a: "1776", b: "1789", c: "1803", d: "1812" },
        explanation: "La adquisición del territorio de Luisiana a Francia por parte de Estados Unidos ocurrió en 1803."
      }
    },
    "IN-CUL-001": {
      "es-ES": {
        question: "¿Con qué estado de la India se asocia tradicionalmente la danza clásica bharatanatyam?",
        options: { a: "Kerala", b: "Tamil Nadu", c: "Punyab", d: "Assam" },
        explanation: "El bharatanatyam se desarrolló en Tamil Nadu y es una de las principales tradiciones de danza clásica de la India."
      },
      "es-PE": {
        question: "¿Qué estado indio está tradicionalmente vinculado con la danza clásica bharatanatyam?",
        options: { a: "Kerala", b: "Tamil Nadu", c: "Punyab", d: "Assam" },
        explanation: "El bharatanatyam tiene sus raíces en Tamil Nadu y forma parte de las grandes tradiciones de danza clásica de la India."
      }
    },
    "IN-GEO-003": {
      "es-ES": {
        question: "¿Qué estado de la India tiene la mayor superficie?",
        options: { a: "Madhya Pradesh", b: "Maharashtra", c: "Uttar Pradesh", d: "Rajastán" },
        explanation: "Rajastán es el estado más extenso de la India."
      },
      "es-PE": {
        question: "¿Cuál es el estado más grande de la India por extensión territorial?",
        options: { a: "Madhya Pradesh", b: "Maharashtra", c: "Uttar Pradesh", d: "Rajastán" },
        explanation: "Rajastán ocupa el primer lugar entre los estados de la India por su superficie."
      }
    },
    "RU-HIS-002": {
      "es-ES": {
        question: "¿Quién fue la primera persona en viajar al espacio, en 1961?",
        options: { a: "Yuri Gagarin", b: "Alexéi Leónov", c: "Guerman Titov", d: "Valentina Tereshkova" },
        explanation: "El cosmonauta soviético Yuri Gagarin realizó el primer vuelo espacial tripulado el 12 de abril de 1961."
      },
      "es-PE": {
        question: "¿Quién se convirtió en el primer ser humano en viajar al espacio en 1961?",
        options: { a: "Yuri Gagarin", b: "Alexéi Leónov", c: "Guerman Titov", d: "Valentina Tereshkova" },
        explanation: "Yuri Gagarin, cosmonauta soviético, completó el primer viaje espacial de una persona el 12 de abril de 1961."
      }
    },
    "RU-CUL-002": {
      "es-ES": {
        question: "¿Qué compositor ruso escribió la música del ballet «El lago de los cisnes»?",
        options: { a: "Serguéi Rajmáninov", b: "Ígor Stravinski", c: "Piotr Ilich Chaikovski", d: "Modest Músorgski" },
        explanation: "Piotr Ilich Chaikovski compuso la música de «El lago de los cisnes», estrenado en 1877."
      },
      "es-PE": {
        question: "¿Quién compuso la música del ballet «El lago de los cisnes»?",
        options: { a: "Serguéi Rajmáninov", b: "Ígor Stravinski", c: "Piotr Ilich Chaikovski", d: "Modest Músorgski" },
        explanation: "La partitura de «El lago de los cisnes», presentado por primera vez en 1877, fue compuesta por Piotr Ilich Chaikovski."
      }
    },
    "US-CUL-002": {
      "es-ES": {
        question: "¿Qué arquitecto estadounidense diseñó la casa Fallingwater, situada en Pensilvania?",
        options: { a: "Frank Lloyd Wright", b: "Louis Sullivan", c: "Philip Johnson", d: "I. M. Pei" },
        explanation: "Frank Lloyd Wright diseñó Fallingwater, una vivienda construida sobre una cascada en Pensilvania y terminada en la década de 1930."
      },
      "es-PE": {
        question: "¿Quién diseñó Fallingwater, la famosa casa construida sobre una cascada en Pensilvania?",
        options: { a: "Frank Lloyd Wright", b: "Louis Sullivan", c: "Philip Johnson", d: "I. M. Pei" },
        explanation: "Frank Lloyd Wright fue el arquitecto de Fallingwater, una casa levantada sobre una cascada en Pensilvania y concluida en los años treinta."
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
