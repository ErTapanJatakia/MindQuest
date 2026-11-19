/* Spanish question translations — editorial batch 10. */
(() => {
  const questions = window.MINDQUEST_QUESTIONS;
  if (!Array.isArray(questions)) return;
  const translations = {
    "IN-GEO-009": {
      "es-ES": { question:"¿En qué estado de la India se encuentra el Parque Nacional del Valle de las Flores?", options:{a:"Himachal Pradesh",b:"Sikkim",c:"Uttarakhand",d:"Arunachal Pradesh"}, explanation:"El Parque Nacional del Valle de las Flores está situado en Uttarakhand, en la parte occidental del Himalaya." },
      "es-PE": { question:"¿En cuál de los estados de la India está ubicado el Parque Nacional del Valle de las Flores?", options:{a:"Himachal Pradesh",b:"Sikkim",c:"Uttarakhand",d:"Arunachal Pradesh"}, explanation:"El Parque Nacional del Valle de las Flores se ubica en Uttarakhand, en el Himalaya occidental." }
    },
    "IN-HIS-009": {
      "es-ES": { question:"¿Qué antiguo centro de estudios se encontraba en el actual estado indio de Bihar?", options:{a:"Nalanda",b:"Taxila",c:"Vallabhi",d:"Kanchipuram"}, explanation:"Nalanda Mahavihara, en el actual Bihar, fue uno de los grandes centros de aprendizaje de la India antigua." },
      "es-PE": { question:"¿Cuál de estos antiguos centros de enseñanza estaba ubicado en lo que hoy es Bihar, en la India?", options:{a:"Nalanda",b:"Taxila",c:"Vallabhi",d:"Kanchipuram"}, explanation:"Nalanda Mahavihara, en el actual estado de Bihar, fue un importante centro de estudios de la India antigua." }
    },
    "IN-SCI-009": {
      "es-ES": { question:"¿Qué vehículo de lanzamiento puso en órbita el satélite Rohini RS-1 en 1980?", options:{a:"PSLV",b:"ASLV",c:"SLV-3",d:"GSLV"}, explanation:"El vehículo indio SLV-3 colocó el satélite Rohini RS-1 en órbita el 18 de julio de 1980, en el primer lanzamiento orbital exitoso con un cohete indio." },
      "es-PE": { question:"¿Qué cohete colocó en órbita al satélite Rohini RS-1 en 1980?", options:{a:"PSLV",b:"ASLV",c:"SLV-3",d:"GSLV"}, explanation:"El SLV-3 de la India puso en órbita el satélite Rohini RS-1 el 18 de julio de 1980; fue el primer lanzamiento satelital exitoso realizado con un vehículo indio." }
    },
    "RU-GEO-009": {
      "es-ES": { question:"¿Qué ciudad rusa está situada a orillas del río Nevá?", options:{a:"San Petersburgo",b:"Ekaterimburgo",c:"Novosibirsk",d:"Krasnoyarsk"}, explanation:"San Petersburgo se desarrolló junto al río Nevá, que fluye desde el lago Ladoga hasta el golfo de Finlandia." },
      "es-PE": { question:"¿Cuál de estas ciudades de Rusia se encuentra junto al río Nevá?", options:{a:"San Petersburgo",b:"Ekaterimburgo",c:"Novosibirsk",d:"Krasnoyarsk"}, explanation:"San Petersburgo está asentada a orillas del Nevá, río que conecta el lago Ládoga con el golfo de Finlandia." }
    },
    "RU-HIS-009": {
      "es-ES": { question:"¿En qué año se disolvió formalmente la Unión Soviética?", options:{a:"1985",b:"1989",c:"1990",d:"1991"}, explanation:"La Unión Soviética dejó de existir formalmente en diciembre de 1991." },
      "es-PE": { question:"¿En qué año dejó de existir oficialmente la Unión Soviética?", options:{a:"1985",b:"1989",c:"1990",d:"1991"}, explanation:"La disolución formal de la Unión Soviética se produjo en diciembre de 1991." }
    },
    "RU-SCI-009": {
      "es-ES": { question:"¿Qué nave espacial soviética obtuvo las primeras fotografías de la cara oculta de la Luna en 1959?", options:{a:"Luna 1",b:"Luna 2",c:"Luna 3",d:"Luna 9"}, explanation:"La sonda Luna 3 fotografió la cara oculta de la Luna en octubre de 1959 y transmitió las primeras imágenes de esa región." },
      "es-PE": { question:"¿Qué sonda espacial soviética tomó las primeras imágenes de la cara oculta de la Luna en 1959?", options:{a:"Luna 1",b:"Luna 2",c:"Luna 3",d:"Luna 9"}, explanation:"En octubre de 1959, la misión Luna 3 fotografió la cara oculta de la Luna y envió las primeras imágenes de esa zona hasta entonces desconocida." }
    },
    "US-GEO-009": {
      "es-ES": { question:"¿Qué estado de Estados Unidos es conocido oficialmente como el «Estado Aloha»?", options:{a:"Florida",b:"Alaska",c:"California",d:"Hawái"}, explanation:"Hawái utiliza oficialmente el sobrenombre «Estado Aloha»." },
      "es-PE": { question:"¿A qué estado de Estados Unidos se le conoce como el «Estado Aloha»?", options:{a:"Florida",b:"Alaska",c:"California",d:"Hawái"}, explanation:"El sobrenombre oficial del estado de Hawái es «Estado Aloha»." }
    },
    "US-HIS-009": {
      "es-ES": { question:"¿Qué documento, redactado en 1787, estableció la estructura del gobierno federal de Estados Unidos?", options:{a:"Declaración de Independencia",b:"Declaración de Derechos",c:"Constitución de Estados Unidos",d:"Proclamación de Emancipación"}, explanation:"La Constitución de Estados Unidos se redactó en 1787 y estableció el marco institucional del gobierno federal." },
      "es-PE": { question:"¿Qué documento elaborado en 1787 definió la organización del gobierno federal estadounidense?", options:{a:"Declaración de Independencia",b:"Declaración de Derechos",c:"Constitución de Estados Unidos",d:"Proclamación de Emancipación"}, explanation:"La Constitución de Estados Unidos fue redactada en 1787 y fijó las bases del gobierno federal." }
    },
    "US-SCI-008": {
      "es-ES": { question:"¿Qué físico estadounidense dirigió el Laboratorio de Los Álamos durante el Proyecto Manhattan?", options:{a:"Enrico Fermi",b:"Richard Feynman",c:"Ernest Lawrence",d:"J. Robert Oppenheimer"}, explanation:"J. Robert Oppenheimer fue el director científico del Laboratorio de Los Álamos, donde el Proyecto Manhattan desarrolló las primeras armas nucleares." },
      "es-PE": { question:"¿Quién estuvo a cargo de la dirección del Laboratorio de Los Álamos durante el Proyecto Manhattan?", options:{a:"Enrico Fermi",b:"Richard Feynman",c:"Ernest Lawrence",d:"J. Robert Oppenheimer"}, explanation:"J. Robert Oppenheimer ejerció como director científico del Laboratorio de Los Álamos, donde se desarrollaron las primeras armas nucleares del Proyecto Manhattan." }
    },
    "US-SCI-009": {
      "es-ES": { question:"¿Qué sonda de la NASA realizó el primer sobrevuelo cercano de Plutón en julio de 2015?", options:{a:"Voyager 2",b:"Juno",c:"New Horizons",d:"Cassini"}, explanation:"La sonda New Horizons pasó cerca de Plutón el 14 de julio de 2015 y obtuvo las primeras observaciones detalladas del planeta enano." },
      "es-PE": { question:"¿Qué nave espacial de la NASA hizo el primer sobrevuelo cercano de Plutón en julio de 2015?", options:{a:"Voyager 2",b:"Juno",c:"New Horizons",d:"Cassini"}, explanation:"New Horizons sobrevoló Plutón el 14 de julio de 2015 y envió las primeras observaciones de cerca de este planeta enano." }
    }
  };
  const byId = new Map(questions.map((question) => [question.id, question]));
  for (const [id, localized] of Object.entries(translations)) {
    const question = byId.get(id);
    if (!question) continue;
    for (const [locale, translation] of Object.entries(localized)) {
      if (!Object.hasOwn(question.translations, locale)) question.translations[locale] = translation;
    }
  }
})();
