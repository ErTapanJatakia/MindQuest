/* Spanish question translations — editorial batch 14 (5 stable IDs × 2 locales). */
(() => {
  const byId = new Map((window.MINDQUEST_QUESTIONS || []).map((question) => [question.id, question]));
  const data = {
    "RU-CUL-007": {
      "es-ES": {question:"¿Qué artista ruso pintó en 1915 la obra «Cuadrado negro»?",options:{a:"Wassily Kandinsky",b:"Marc Chagall",c:"Kazimir Malévich",d:"Iliá Repin"},explanation:"Kazimir Malévich presentó su influyente «Cuadrado negro» en 1915, una obra fundamental del suprematismo."},
      "es-PE": {question:"¿Qué artista ruso realizó la pintura «Cuadrado negro» en 1915?",options:{a:"Wassily Kandinsky",b:"Marc Chagall",c:"Kazimir Malévich",d:"Iliá Repin"},explanation:"Kazimir Malévich presentó «Cuadrado negro» en 1915; la obra se convirtió en un referente del suprematismo."}
    },
    "US-HIS-007": {
      "es-ES": {question:"¿Qué enmienda de la Constitución de Estados Unidos, ratificada en 1870, prohibió negar el derecho al voto por motivos de raza, color o condición previa de servidumbre?",options:{a:"Decimoquinta Enmienda",b:"Decimocuarta Enmienda",c:"Decimotercera Enmienda",d:"Decimonovena Enmienda"},explanation:"La Decimoquinta Enmienda fue ratificada el 3 de febrero de 1870 y prohibió negar o limitar el derecho al voto por motivos de raza, color o condición previa de servidumbre. La discriminación electoral continuó pese a esta garantía."},
      "es-PE": {question:"¿Qué enmienda de la Constitución estadounidense, ratificada en 1870, prohibió negar o restringir el derecho al voto por motivos de raza, color o condición previa de servidumbre?",options:{a:"Decimoquinta Enmienda",b:"Decimocuarta Enmienda",c:"Decimotercera Enmienda",d:"Decimonovena Enmienda"},explanation:"La Decimoquinta Enmienda se ratificó el 3 de febrero de 1870. Prohibió que el gobierno federal o los estados negaran o restringieran el voto por motivos de raza, color o condición previa de servidumbre, aunque persistieron prácticas discriminatorias."}
    },
    "US-SCI-007": {
      "es-ES": {question:"¿Qué investigador médico estadounidense desarrolló la primera vacuna contra la poliomielitis de uso generalizado?",options:{a:"Alexander Fleming",b:"Robert Koch",c:"Jonas Salk",d:"Louis Pasteur"},explanation:"Jonas Salk desarrolló una vacuna antipoliomielítica inactivada. Los resultados de los ensayos se anunciaron en 1955 y la vacuna fue autorizada ese mismo año."},
      "es-PE": {question:"¿Qué investigador médico de Estados Unidos desarrolló la primera vacuna contra la polio que se utilizó ampliamente?",options:{a:"Alexander Fleming",b:"Robert Koch",c:"Jonas Salk",d:"Louis Pasteur"},explanation:"Jonas Salk creó una vacuna inactivada contra la poliomielitis. Los resultados de las pruebas se anunciaron en 1955 y la vacuna fue autorizada ese año."}
    },
    "US-CUL-007": {
      "es-ES": {question:"¿Con qué movimiento artístico se asocian principalmente las pinturas de goteo de Jackson Pollock?",options:{a:"Arte pop",b:"Expresionismo abstracto",c:"Cubismo",d:"Regionalismo"},explanation:"Jackson Pollock fue una figura destacada del expresionismo abstracto. Sus pinturas de goteo se realizaban dejando caer, salpicar o verter pintura sobre lienzos colocados en el suelo."},
      "es-PE": {question:"¿A qué movimiento artístico pertenecen principalmente las pinturas de goteo de Jackson Pollock?",options:{a:"Arte pop",b:"Expresionismo abstracto",c:"Cubismo",d:"Regionalismo"},explanation:"Jackson Pollock destacó dentro del expresionismo abstracto. En sus conocidas pinturas de goteo, aplicaba pintura salpicándola o dejándola caer sobre el lienzo extendido en el suelo."}
    },
    "US-CUL-008": {
      "es-ES": {question:"¿Qué escritor estadounidense escribió «Las aventuras de Tom Sawyer»?",options:{a:"Herman Melville",b:"Jack London",c:"Ernest Hemingway",d:"Mark Twain"},explanation:"Mark Twain publicó «Las aventuras de Tom Sawyer» en 1876, novela ambientada en una localidad del río Misisipi."},
      "es-PE": {question:"¿Qué autor de Estados Unidos escribió «Las aventuras de Tom Sawyer»?",options:{a:"Herman Melville",b:"Jack London",c:"Ernest Hemingway",d:"Mark Twain"},explanation:"Mark Twain publicó «Las aventuras de Tom Sawyer» en 1876. La novela retrata la vida de un niño en una comunidad junto al río Misisipi."}
    }
  };
  for (const [id, locales] of Object.entries(data)) {
    const question = byId.get(id);
    if (!question) continue;
    for (const [locale, translation] of Object.entries(locales)) {
      if (!Object.hasOwn(question.translations, locale)) question.translations[locale] = translation;
    }
  }
})();
