/* Batch 05: final staged Spain/Peru content. Do not load in the live application until every release gate passes. */
(() => {
  const rows = [
  {
    "id": "ES-GEO-012",
    "region": "ES",
    "category": "Geography",
    "difficulty": "medium",
    "correct": "a",
    "translations": {
      "en-IN": {
        "question": "Which river forms part of the Spain–Portugal border near its mouth?",
        "options": {
          "a": "Miño",
          "b": "Ebro",
          "c": "Júcar",
          "d": "Segura"
        },
        "explanation": "The Miño (Minho in Portuguese) reaches the Atlantic between Galicia and northern Portugal."
      },
      "en-US": {
        "question": "Which river forms part of the Spain–Portugal border near its mouth?",
        "options": {
          "a": "Miño",
          "b": "Ebro",
          "c": "Júcar",
          "d": "Segura"
        },
        "explanation": "The Miño (Minho in Portuguese) reaches the Atlantic between Galicia and northern Portugal."
      },
      "ru-RU": {
        "question": "Какая река образует часть границы Испании и Португалии у своего устья?",
        "options": {
          "a": "Миньо",
          "b": "Эбро",
          "c": "Хукар",
          "d": "Сегура"
        },
        "explanation": "Река Миньо (Минью по-португальски) впадает в Атлантический океан между Галисией и севером Португалии."
      },
      "es-ES": {
        "question": "¿Qué río forma parte de la frontera entre España y Portugal cerca de su desembocadura?",
        "options": {
          "a": "Miño",
          "b": "Ebro",
          "c": "Júcar",
          "d": "Segura"
        },
        "explanation": "El Miño llega al Atlántico entre Galicia y el norte de Portugal."
      },
      "es-PE": {
        "question": "¿Qué río forma parte de la frontera entre España y Portugal cerca de su desembocadura?",
        "options": {
          "a": "Miño",
          "b": "Ebro",
          "c": "Júcar",
          "d": "Segura"
        },
        "explanation": "El Miño desemboca en el Atlántico entre Galicia y el norte de Portugal."
      }
    }
  },
  {
    "id": "ES-GEO-013",
    "region": "ES",
    "category": "Geography",
    "difficulty": "easy",
    "correct": "b",
    "translations": {
      "en-IN": {
        "question": "What is the name of the sea bordering Spain's northern shoreline?",
        "options": {
          "a": "Mediterranean Sea",
          "b": "Cantabrian Sea",
          "c": "Alboran Sea",
          "d": "Black Sea"
        },
        "explanation": "The Cantabrian Sea borders Spain's northern coastline, adjoining the Bay of Biscay."
      },
      "en-US": {
        "question": "What is the name of the sea bordering Spain's northern shoreline?",
        "options": {
          "a": "Mediterranean Sea",
          "b": "Cantabrian Sea",
          "c": "Alboran Sea",
          "d": "Black Sea"
        },
        "explanation": "The Cantabrian Sea borders Spain's northern coastline, adjoining the Bay of Biscay."
      },
      "ru-RU": {
        "question": "Как называется море у северного побережья Испании?",
        "options": {
          "a": "Средиземное море",
          "b": "Кантабрийское море",
          "c": "Альборанское море",
          "d": "Чёрное море"
        },
        "explanation": "Кантабрийское море омывает северное побережье Испании и является частью Бискайского залива."
      },
      "es-ES": {
        "question": "¿Qué mar se extiende frente al litoral septentrional de España?",
        "options": {
          "a": "Mar Mediterráneo",
          "b": "Mar Cantábrico",
          "c": "Mar de Alborán",
          "d": "Mar Negro"
        },
        "explanation": "El mar Cantábrico baña la costa norte española y forma parte del golfo de Vizcaya."
      },
      "es-PE": {
        "question": "¿Qué mar se encuentra frente a la costa norte de España?",
        "options": {
          "a": "Mar Mediterráneo",
          "b": "Mar Cantábrico",
          "c": "Mar de Alborán",
          "d": "Mar Negro"
        },
        "explanation": "El mar Cantábrico bordea el litoral norte de España y se integra en el golfo de Vizcaya."
      }
    }
  },
  {
    "id": "ES-HIS-011",
    "region": "ES",
    "category": "History",
    "difficulty": "hard",
    "correct": "c",
    "translations": {
      "en-IN": {
        "question": "Which naval battle in 1571 saw a Holy League fleet defeat the Ottoman fleet?",
        "options": {
          "a": "Battle of Trafalgar",
          "b": "Battle of the Armada",
          "c": "Battle of Lepanto",
          "d": "Battle of Jutland"
        },
        "explanation": "The Battle of Lepanto took place in 1571; the Holy League fleet included forces from the Spanish Monarchy."
      },
      "en-US": {
        "question": "Which naval battle in 1571 saw a Holy League fleet defeat the Ottoman fleet?",
        "options": {
          "a": "Battle of Trafalgar",
          "b": "Battle of the Armada",
          "c": "Battle of Lepanto",
          "d": "Battle of Jutland"
        },
        "explanation": "The Battle of Lepanto took place in 1571; the Holy League fleet included forces from the Spanish Monarchy."
      },
      "ru-RU": {
        "question": "В какой морской битве 1571 года флот Священной лиги победил османский флот?",
        "options": {
          "a": "Битва при Трафальгаре",
          "b": "Битва Непобедимой армады",
          "c": "Битва при Лепанто",
          "d": "Ютландское сражение"
        },
        "explanation": "Битва при Лепанто состоялась в 1571 году; в состав флота Священной лиги входили силы испанской монархии."
      },
      "es-ES": {
        "question": "¿En qué batalla naval de 1571 derrotó la flota de la Liga Santa a la otomana?",
        "options": {
          "a": "Batalla de Trafalgar",
          "b": "Batalla de la Armada",
          "c": "Batalla de Lepanto",
          "d": "Batalla de Jutlandia"
        },
        "explanation": "La batalla de Lepanto tuvo lugar en 1571 y la flota de la Liga Santa incluía fuerzas de la Monarquía Hispánica."
      },
      "es-PE": {
        "question": "¿En qué batalla naval de 1571 derrotó la flota de la Liga Santa a la otomana?",
        "options": {
          "a": "Batalla de Trafalgar",
          "b": "Batalla de la Armada",
          "c": "Batalla de Lepanto",
          "d": "Batalla de Jutlandia"
        },
        "explanation": "La batalla de Lepanto ocurrió en 1571 y la Liga Santa contó con fuerzas de la Monarquía Hispánica."
      }
    }
  },
  {
    "id": "ES-HIS-012",
    "region": "ES",
    "category": "History",
    "difficulty": "medium",
    "correct": "a",
    "translations": {
      "en-IN": {
        "question": "The Revolt of the Comuneros (1520–1521) took place primarily in which historical crown?",
        "options": {
          "a": "Crown of Castile",
          "b": "Crown of Aragon",
          "c": "Kingdom of Navarre",
          "d": "Kingdom of Portugal"
        },
        "explanation": "The Comuneros uprising challenged Charles I's rule in towns of the Crown of Castile."
      },
      "en-US": {
        "question": "The Revolt of the Comuneros (1520–1521) took place primarily in which historical crown?",
        "options": {
          "a": "Crown of Castile",
          "b": "Crown of Aragon",
          "c": "Kingdom of Navarre",
          "d": "Kingdom of Portugal"
        },
        "explanation": "The Comuneros uprising challenged Charles I's rule in towns of the Crown of Castile."
      },
      "ru-RU": {
        "question": "В каком историческом королевстве главным образом произошло восстание комунерос (1520–1521)?",
        "options": {
          "a": "Кастильская корона",
          "b": "Арагонская корона",
          "c": "Королевство Наварра",
          "d": "Королевство Португалия"
        },
        "explanation": "Восстание комунерос выступило против правления Карла I в городах Кастильской короны."
      },
      "es-ES": {
        "question": "¿En qué corona histórica tuvo lugar principalmente la revuelta de los Comuneros (1520–1521)?",
        "options": {
          "a": "Corona de Castilla",
          "b": "Corona de Aragón",
          "c": "Reino de Navarra",
          "d": "Reino de Portugal"
        },
        "explanation": "La revuelta de los Comuneros cuestionó el gobierno de Carlos I en ciudades de la Corona de Castilla."
      },
      "es-PE": {
        "question": "¿En qué corona histórica ocurrió principalmente la revuelta de los Comuneros (1520–1521)?",
        "options": {
          "a": "Corona de Castilla",
          "b": "Corona de Aragón",
          "c": "Reino de Navarra",
          "d": "Reino de Portugal"
        },
        "explanation": "El levantamiento de los Comuneros desafió el poder de Carlos I en localidades de la Corona de Castilla."
      }
    }
  },
  {
    "id": "ES-SCI-010",
    "region": "ES",
    "category": "Science",
    "difficulty": "easy",
    "correct": "b",
    "translations": {
      "en-IN": {
        "question": "What is the main role of Spain's CSIC?",
        "options": {
          "a": "Running national elections",
          "b": "Conducting public scientific research",
          "c": "Issuing passports",
          "d": "Managing public hospitals"
        },
        "explanation": "The Spanish National Research Council (CSIC) is the country's largest public institution dedicated to scientific and technical research."
      },
      "en-US": {
        "question": "What is the main role of Spain's CSIC?",
        "options": {
          "a": "Running national elections",
          "b": "Conducting public scientific research",
          "c": "Issuing passports",
          "d": "Managing public hospitals"
        },
        "explanation": "The Spanish National Research Council (CSIC) is the country's largest public institution dedicated to scientific and technical research."
      },
      "ru-RU": {
        "question": "Какова основная роль испанского CSIC?",
        "options": {
          "a": "Проведение национальных выборов",
          "b": "Проведение государственных научных исследований",
          "c": "Выдача паспортов",
          "d": "Управление государственными больницами"
        },
        "explanation": "Высший совет по научным исследованиям (CSIC) — крупнейшее государственное учреждение Испании в области научных и технических исследований."
      },
      "es-ES": {
        "question": "¿Cuál es la función principal del CSIC de España?",
        "options": {
          "a": "Organizar elecciones nacionales",
          "b": "Realizar investigación científica pública",
          "c": "Expedir pasaportes",
          "d": "Gestionar hospitales públicos"
        },
        "explanation": "El CSIC es la mayor institución pública de España dedicada a la investigación científica y técnica."
      },
      "es-PE": {
        "question": "¿Cuál es la función principal del CSIC en España?",
        "options": {
          "a": "Organizar elecciones nacionales",
          "b": "Realizar investigación científica pública",
          "c": "Expedir pasaportes",
          "d": "Gestionar hospitales públicos"
        },
        "explanation": "El CSIC es la mayor institución pública española dedicada a la investigación científica y técnica."
      }
    }
  },
  {
    "id": "ES-SCI-011",
    "region": "ES",
    "category": "Science",
    "difficulty": "medium",
    "correct": "c",
    "translations": {
      "en-IN": {
        "question": "Where is the Instituto de Astrofísica de Canarias (IAC) based?",
        "options": {
          "a": "Valencia",
          "b": "Seville",
          "c": "The Canary Islands",
          "d": "Bilbao"
        },
        "explanation": "The IAC is a Spanish public research institute based in the Canary Islands, with facilities on Tenerife and La Palma."
      },
      "en-US": {
        "question": "Where is the Instituto de Astrofísica de Canarias (IAC) based?",
        "options": {
          "a": "Valencia",
          "b": "Seville",
          "c": "The Canary Islands",
          "d": "Bilbao"
        },
        "explanation": "The IAC is a Spanish public research institute based in the Canary Islands, with facilities on Tenerife and La Palma."
      },
      "ru-RU": {
        "question": "Где находится Институт астрофизики Канарских островов (IAC)?",
        "options": {
          "a": "Валенсия",
          "b": "Севилья",
          "c": "Канарские острова",
          "d": "Бильбао"
        },
        "explanation": "IAC — испанский государственный научный институт, расположенный на Канарских островах; его объекты находятся на Тенерифе и Ла-Пальме."
      },
      "es-ES": {
        "question": "¿Dónde tiene su sede el Instituto de Astrofísica de Canarias (IAC)?",
        "options": {
          "a": "Valencia",
          "b": "Sevilla",
          "c": "Islas Canarias",
          "d": "Bilbao"
        },
        "explanation": "El IAC es un instituto público español de investigación con instalaciones en Tenerife y La Palma."
      },
      "es-PE": {
        "question": "¿Dónde se encuentra el Instituto de Astrofísica de Canarias (IAC)?",
        "options": {
          "a": "Valencia",
          "b": "Sevilla",
          "c": "Islas Canarias",
          "d": "Bilbao"
        },
        "explanation": "El IAC es un centro público español de investigación con instalaciones en Tenerife y La Palma."
      }
    }
  },
  {
    "id": "ES-SCI-012",
    "region": "ES",
    "category": "Science",
    "difficulty": "hard",
    "correct": "d",
    "translations": {
      "en-IN": {
        "question": "Which Spanish public research body is specifically devoted to health research and biomedical science?",
        "options": {
          "a": "CIEMAT",
          "b": "Instituto Geográfico Nacional",
          "c": "Instituto de Astrofísica de Canarias",
          "d": "Instituto de Salud Carlos III"
        },
        "explanation": "The Instituto de Salud Carlos III is a public research body with a central role in health and biomedical research in Spain."
      },
      "en-US": {
        "question": "Which Spanish public research body is specifically devoted to health research and biomedical science?",
        "options": {
          "a": "CIEMAT",
          "b": "Instituto Geográfico Nacional",
          "c": "Instituto de Astrofísica de Canarias",
          "d": "Instituto de Salud Carlos III"
        },
        "explanation": "The Instituto de Salud Carlos III is a public research body with a central role in health and biomedical research in Spain."
      },
      "ru-RU": {
        "question": "Какое государственное научное учреждение Испании специализируется на исследованиях в области здравоохранения и биомедицины?",
        "options": {
          "a": "CIEMAT",
          "b": "Национальный географический институт",
          "c": "Институт астрофизики Канарских островов",
          "d": "Институт здоровья Карлоса III"
        },
        "explanation": "Институт здоровья Карлоса III — государственное научное учреждение, играющее важную роль в исследованиях здравоохранения и биомедицины в Испании."
      },
      "es-ES": {
        "question": "¿Qué organismo público español se dedica específicamente a la investigación sanitaria y biomédica?",
        "options": {
          "a": "CIEMAT",
          "b": "Instituto Geográfico Nacional",
          "c": "Instituto de Astrofísica de Canarias",
          "d": "Instituto de Salud Carlos III"
        },
        "explanation": "El Instituto de Salud Carlos III es un organismo público con un papel central en la investigación sanitaria y biomédica en España."
      },
      "es-PE": {
        "question": "¿Qué entidad pública española se dedica especialmente a la investigación en salud y biomedicina?",
        "options": {
          "a": "CIEMAT",
          "b": "Instituto Geográfico Nacional",
          "c": "Instituto de Astrofísica de Canarias",
          "d": "Instituto de Salud Carlos III"
        },
        "explanation": "El Instituto de Salud Carlos III desempeña un papel central en la investigación sanitaria y biomédica española."
      }
    }
  },
  {
    "id": "ES-CUL-011",
    "region": "ES",
    "category": "Culture",
    "difficulty": "easy",
    "correct": "a",
    "translations": {
      "en-IN": {
        "question": "Which traditional Spanish dance is especially associated with Aragon?",
        "options": {
          "a": "Jota",
          "b": "Sardana",
          "c": "Muñeira",
          "d": "Aurresku"
        },
        "explanation": "The jota is a traditional music and dance form found in several Spanish regions and strongly associated with Aragon."
      },
      "en-US": {
        "question": "Which traditional Spanish dance is especially associated with Aragon?",
        "options": {
          "a": "Jota",
          "b": "Sardana",
          "c": "Muñeira",
          "d": "Aurresku"
        },
        "explanation": "The jota is a traditional music and dance form found in several Spanish regions and strongly associated with Aragon."
      },
      "ru-RU": {
        "question": "Какой традиционный испанский танец особенно связан с Арагоном?",
        "options": {
          "a": "Хота",
          "b": "Сардана",
          "c": "Муньейра",
          "d": "Аурреску"
        },
        "explanation": "Хота — традиционная музыкально-танцевальная форма нескольких регионов Испании, особенно связанная с Арагоном."
      },
      "es-ES": {
        "question": "¿Qué baile tradicional español se asocia especialmente con Aragón?",
        "options": {
          "a": "Jota",
          "b": "Sardana",
          "c": "Muñeira",
          "d": "Aurresku"
        },
        "explanation": "La jota es una forma tradicional de música y baile presente en varias regiones españolas y muy vinculada a Aragón."
      },
      "es-PE": {
        "question": "¿Qué danza tradicional española está especialmente vinculada con Aragón?",
        "options": {
          "a": "Jota",
          "b": "Sardana",
          "c": "Muñeira",
          "d": "Aurresku"
        },
        "explanation": "La jota es una expresión tradicional de música y baile de varias regiones y está muy asociada con Aragón."
      }
    }
  },
  {
    "id": "ES-CUL-012",
    "region": "ES",
    "category": "Culture",
    "difficulty": "medium",
    "correct": "b",
    "translations": {
      "en-IN": {
        "question": "The sardana is a traditional circle dance most closely associated with which Spanish region?",
        "options": {
          "a": "Galicia",
          "b": "Catalonia",
          "c": "Andalusia",
          "d": "Asturias"
        },
        "explanation": "The sardana is a traditional Catalan circle dance, usually performed by people joining hands."
      },
      "en-US": {
        "question": "The sardana is a traditional circle dance most closely associated with which Spanish region?",
        "options": {
          "a": "Galicia",
          "b": "Catalonia",
          "c": "Andalusia",
          "d": "Asturias"
        },
        "explanation": "The sardana is a traditional Catalan circle dance, usually performed by people joining hands."
      },
      "ru-RU": {
        "question": "С каким регионом Испании теснее всего связан традиционный хороводный танец сардана?",
        "options": {
          "a": "Галисия",
          "b": "Каталония",
          "c": "Андалусия",
          "d": "Астурия"
        },
        "explanation": "Сардана — традиционный каталонский хороводный танец, который обычно исполняют, держась за руки."
      },
      "es-ES": {
        "question": "¿Con qué región española se relaciona principalmente la sardana, un baile tradicional en círculo?",
        "options": {
          "a": "Galicia",
          "b": "Cataluña",
          "c": "Andalucía",
          "d": "Asturias"
        },
        "explanation": "La sardana es un baile tradicional catalán en círculo, que suele ejecutarse con las personas cogidas de la mano."
      },
      "es-PE": {
        "question": "¿Con qué región de España se vincula sobre todo la sardana, una danza tradicional en círculo?",
        "options": {
          "a": "Galicia",
          "b": "Cataluña",
          "c": "Andalucía",
          "d": "Asturias"
        },
        "explanation": "La sardana es una danza tradicional catalana en círculo, normalmente bailada con las manos unidas."
      }
    }
  },
  {
    "id": "ES-CUL-013",
    "region": "ES",
    "category": "Culture",
    "difficulty": "hard",
    "correct": "c",
    "translations": {
      "en-IN": {
        "question": "The Romería del Rocío pilgrimage is centred on a shrine in which Spanish province?",
        "options": {
          "a": "Cádiz",
          "b": "Málaga",
          "c": "Huelva",
          "d": "Granada"
        },
        "explanation": "The pilgrimage is centred on the Hermitage of El Rocío in Almonte, in the province of Huelva, Andalusia."
      },
      "en-US": {
        "question": "The Romería del Rocío pilgrimage is centred on a shrine in which Spanish province?",
        "options": {
          "a": "Cádiz",
          "b": "Málaga",
          "c": "Huelva",
          "d": "Granada"
        },
        "explanation": "The pilgrimage is centred on the Hermitage of El Rocío in Almonte, in the province of Huelva, Andalusia."
      },
      "ru-RU": {
        "question": "В какой испанской провинции находится святилище, к которому направляется паломничество Ромерия-дель-Росио?",
        "options": {
          "a": "Кадис",
          "b": "Малага",
          "c": "Уэльва",
          "d": "Гранада"
        },
        "explanation": "Паломничество направляется к часовне Эль-Росио в Альмонте, провинция Уэльва, Андалусия."
      },
      "es-ES": {
        "question": "¿En qué provincia española se encuentra el santuario central de la romería del Rocío?",
        "options": {
          "a": "Cádiz",
          "b": "Málaga",
          "c": "Huelva",
          "d": "Granada"
        },
        "explanation": "La peregrinación se dirige a la ermita del Rocío, en Almonte, provincia de Huelva, Andalucía."
      },
      "es-PE": {
        "question": "¿En qué provincia de España se encuentra el santuario principal de la romería del Rocío?",
        "options": {
          "a": "Cádiz",
          "b": "Málaga",
          "c": "Huelva",
          "d": "Granada"
        },
        "explanation": "La romería tiene como destino la ermita del Rocío, situada en Almonte, provincia de Huelva."
      }
    }
  },
  {
    "id": "PE-GEO-012",
    "region": "PE",
    "category": "Geography",
    "difficulty": "easy",
    "correct": "c",
    "translations": {
      "en-IN": {
        "question": "Which mountain range in Peru is recognised as the world's most extensive tropical ice-covered range?",
        "options": {
          "a": "Cordillera Negra",
          "b": "Vilcanota Range",
          "c": "Cordillera Blanca",
          "d": "Huaytapallana Range"
        },
        "explanation": "The Cordillera Blanca is described by UNESCO and USGS as the world's highest or most extensive tropical mountain range with glaciers."
      },
      "en-US": {
        "question": "Which mountain range in Peru is recognised as the world's most extensive tropical ice-covered range?",
        "options": {
          "a": "Cordillera Negra",
          "b": "Vilcanota Range",
          "c": "Cordillera Blanca",
          "d": "Huaytapallana Range"
        },
        "explanation": "The Cordillera Blanca is described by UNESCO and USGS as the world's highest or most extensive tropical mountain range with glaciers."
      },
      "ru-RU": {
        "question": "Какой горный хребет Перу считается крупнейшим в мире тропическим горным массивом, покрытым льдом?",
        "options": {
          "a": "Кордильера-Негра",
          "b": "хребет Вильканота",
          "c": "Кордильера-Бланка",
          "d": "хребет Уайтапальяна"
        },
        "explanation": "Кордильера-Бланка описывается ЮНЕСКО и Геологической службой США как крупнейший или самый высокий тропический горный массив с ледниками."
      },
      "es-ES": {
        "question": "¿Qué cordillera del Perú es reconocida como la más extensa del mundo entre las cordilleras tropicales cubiertas de hielo?",
        "options": {
          "a": "Cordillera Negra",
          "b": "Cordillera Vilcanota",
          "c": "Cordillera Blanca",
          "d": "Cordillera Huaytapallana"
        },
        "explanation": "La Cordillera Blanca es descrita por la UNESCO y el USGS como la cordillera tropical con glaciares más extensa o más alta del mundo."
      },
      "es-PE": {
        "question": "¿Qué cadena montañosa del Perú se reconoce como la más extensa del mundo entre las cordilleras tropicales con hielo?",
        "options": {
          "a": "Cordillera Negra",
          "b": "Cordillera Vilcanota",
          "c": "Cordillera Blanca",
          "d": "Cordillera Huaytapallana"
        },
        "explanation": "La Cordillera Blanca es descrita por la UNESCO y el USGS como la cordillera tropical glaciar más extensa del mundo."
      }
    }
  },
  {
    "id": "PE-GEO-013",
    "region": "PE",
    "category": "Geography",
    "difficulty": "medium",
    "correct": "a",
    "translations": {
      "en-IN": {
        "question": "In which Peruvian department is Huascarán, the country's highest mountain, located?",
        "options": {
          "a": "Áncash",
          "b": "Cusco",
          "c": "Arequipa",
          "d": "Junín"
        },
        "explanation": "Mount Huascarán rises to 6,768 metres in the Cordillera Blanca, in the department of Áncash."
      },
      "en-US": {
        "question": "In which Peruvian department is Huascarán, the country's highest mountain, located?",
        "options": {
          "a": "Áncash",
          "b": "Cusco",
          "c": "Arequipa",
          "d": "Junín"
        },
        "explanation": "Mount Huascarán rises to 6,768 metres in the Cordillera Blanca, in the department of Áncash."
      },
      "ru-RU": {
        "question": "В каком департаменте Перу находится Уаскаран, высочайшая гора страны?",
        "options": {
          "a": "Анкаш",
          "b": "Куско",
          "c": "Арекипа",
          "d": "Хунин"
        },
        "explanation": "Гора Уаскаран высотой 6768 метров расположена в Кордильера-Бланка, в департаменте Анкаш."
      },
      "es-ES": {
        "question": "¿En qué departamento peruano se encuentra el Huascarán, la montaña más alta del país?",
        "options": {
          "a": "Áncash",
          "b": "Cusco",
          "c": "Arequipa",
          "d": "Junín"
        },
        "explanation": "El Huascarán alcanza los 6.768 metros en la Cordillera Blanca, dentro del departamento de Áncash."
      },
      "es-PE": {
        "question": "¿En qué departamento del Perú está el Huascarán, la montaña más alta del país?",
        "options": {
          "a": "Áncash",
          "b": "Cusco",
          "c": "Arequipa",
          "d": "Junín"
        },
        "explanation": "El Huascarán alcanza los 6.768 metros en la Cordillera Blanca, en el departamento de Áncash."
      }
    }
  },
  {
    "id": "PE-HIS-011",
    "region": "PE",
    "category": "History",
    "difficulty": "medium",
    "correct": "d",
    "translations": {
      "en-IN": {
        "question": "Which 1883 treaty formally ended the War of the Pacific between Peru and Chile?",
        "options": {
          "a": "Treaty of Lima",
          "b": "Treaty of Ancón",
          "c": "Treaty of Tordesillas",
          "d": "Treaty of Guayaquil"
        },
        "explanation": "The Treaty of Ancón was signed in 1883 and ended the state of war between Peru and Chile."
      },
      "en-US": {
        "question": "Which 1883 treaty formally ended the War of the Pacific between Peru and Chile?",
        "options": {
          "a": "Treaty of Lima",
          "b": "Treaty of Ancón",
          "c": "Treaty of Tordesillas",
          "d": "Treaty of Guayaquil"
        },
        "explanation": "The Treaty of Ancón was signed in 1883 and ended the state of war between Peru and Chile."
      },
      "ru-RU": {
        "question": "Какой договор 1883 года официально завершил войну на Тихом океане между Перу и Чили?",
        "options": {
          "a": "Лимский договор",
          "b": "Договор Анкона",
          "c": "Тордесильясский договор",
          "d": "Договор Гуаякиля"
        },
        "explanation": "Договор Анкона был подписан в 1883 году и завершил состояние войны между Перу и Чили."
      },
      "es-ES": {
        "question": "¿Qué tratado de 1883 puso fin formalmente a la Guerra del Pacífico entre Perú y Chile?",
        "options": {
          "a": "Tratado de Lima",
          "b": "Tratado de Ancón",
          "c": "Tratado de Tordesillas",
          "d": "Tratado de Guayaquil"
        },
        "explanation": "El Tratado de Ancón se firmó en 1883 y puso fin al estado de guerra entre Perú y Chile."
      },
      "es-PE": {
        "question": "¿Qué tratado de 1883 terminó formalmente la Guerra del Pacífico entre Perú y Chile?",
        "options": {
          "a": "Tratado de Lima",
          "b": "Tratado de Ancón",
          "c": "Tratado de Tordesillas",
          "d": "Tratado de Guayaquil"
        },
        "explanation": "El Tratado de Ancón se firmó en 1883 y puso fin al estado de guerra entre Perú y Chile."
      }
    }
  },
  {
    "id": "PE-HIS-012",
    "region": "PE",
    "category": "History",
    "difficulty": "hard",
    "correct": "b",
    "translations": {
      "en-IN": {
        "question": "Which battle in 1839 helped defeat the Peru–Bolivian Confederation?",
        "options": {
          "a": "Battle of Junín",
          "b": "Battle of Yungay",
          "c": "Battle of Ayacucho",
          "d": "Battle of Arica"
        },
        "explanation": "The Battle of Yungay in January 1839 was decisive in the defeat and dissolution of the Peru–Bolivian Confederation."
      },
      "en-US": {
        "question": "Which battle in 1839 helped defeat the Peru–Bolivian Confederation?",
        "options": {
          "a": "Battle of Junín",
          "b": "Battle of Yungay",
          "c": "Battle of Ayacucho",
          "d": "Battle of Arica"
        },
        "explanation": "The Battle of Yungay in January 1839 was decisive in the defeat and dissolution of the Peru–Bolivian Confederation."
      },
      "ru-RU": {
        "question": "Какое сражение 1839 года способствовало поражению Перу-Боливийской конфедерации?",
        "options": {
          "a": "Битва при Хунине",
          "b": "Битва при Юнгае",
          "c": "Битва при Аякучо",
          "d": "Битва при Арике"
        },
        "explanation": "Битва при Юнгае в январе 1839 года стала решающей для поражения и распада Перу-Боливийской конфедерации."
      },
      "es-ES": {
        "question": "¿Qué batalla de 1839 contribuyó a derrotar a la Confederación Perú-Boliviana?",
        "options": {
          "a": "Batalla de Junín",
          "b": "Batalla de Yungay",
          "c": "Batalla de Ayacucho",
          "d": "Batalla de Arica"
        },
        "explanation": "La batalla de Yungay, en enero de 1839, fue decisiva para la derrota y disolución de la Confederación Perú-Boliviana."
      },
      "es-PE": {
        "question": "¿Qué batalla de 1839 ayudó a derrotar a la Confederación Perú-Boliviana?",
        "options": {
          "a": "Batalla de Junín",
          "b": "Batalla de Yungay",
          "c": "Batalla de Ayacucho",
          "d": "Batalla de Arica"
        },
        "explanation": "La batalla de Yungay, en enero de 1839, resultó decisiva para la derrota y disolución de la Confederación."
      }
    }
  },
  {
    "id": "PE-SCI-010",
    "region": "PE",
    "category": "Science",
    "difficulty": "easy",
    "correct": "a",
    "translations": {
      "en-IN": {
        "question": "Which Peruvian agency provides national meteorological and hydrological services?",
        "options": {
          "a": "SENAMHI",
          "b": "SERNANP",
          "c": "SUNAT",
          "d": "RENIEC"
        },
        "explanation": "SENAMHI is Peru's National Service of Meteorology and Hydrology."
      },
      "en-US": {
        "question": "Which Peruvian agency provides national meteorological and hydrological services?",
        "options": {
          "a": "SENAMHI",
          "b": "SERNANP",
          "c": "SUNAT",
          "d": "RENIEC"
        },
        "explanation": "SENAMHI is Peru's National Service of Meteorology and Hydrology."
      },
      "ru-RU": {
        "question": "Какое перуанское ведомство предоставляет национальные метеорологические и гидрологические услуги?",
        "options": {
          "a": "SENAMHI",
          "b": "SERNANP",
          "c": "SUNAT",
          "d": "RENIEC"
        },
        "explanation": "SENAMHI — Национальная служба метеорологии и гидрологии Перу."
      },
      "es-ES": {
        "question": "¿Qué organismo peruano presta los servicios nacionales de meteorología e hidrología?",
        "options": {
          "a": "SENAMHI",
          "b": "SERNANP",
          "c": "SUNAT",
          "d": "RENIEC"
        },
        "explanation": "SENAMHI es el Servicio Nacional de Meteorología e Hidrología del Perú."
      },
      "es-PE": {
        "question": "¿Qué entidad peruana ofrece los servicios nacionales de meteorología e hidrología?",
        "options": {
          "a": "SENAMHI",
          "b": "SERNANP",
          "c": "SUNAT",
          "d": "RENIEC"
        },
        "explanation": "SENAMHI es el Servicio Nacional de Meteorología e Hidrología del Perú."
      }
    }
  },
  {
    "id": "PE-SCI-011",
    "region": "PE",
    "category": "Science",
    "difficulty": "medium",
    "correct": "c",
    "translations": {
      "en-IN": {
        "question": "Which Peruvian institute studies earthquakes, volcanoes and geophysical hazards?",
        "options": {
          "a": "Instituto del Mar del Perú",
          "b": "National Institute of Health",
          "c": "Instituto Geofísico del Perú",
          "d": "SENAMHI"
        },
        "explanation": "The Geophysical Institute of Peru (IGP) conducts research and monitoring related to geophysical phenomena, including seismic and volcanic activity."
      },
      "en-US": {
        "question": "Which Peruvian institute studies earthquakes, volcanoes and geophysical hazards?",
        "options": {
          "a": "Instituto del Mar del Perú",
          "b": "National Institute of Health",
          "c": "Instituto Geofísico del Perú",
          "d": "SENAMHI"
        },
        "explanation": "The Geophysical Institute of Peru (IGP) conducts research and monitoring related to geophysical phenomena, including seismic and volcanic activity."
      },
      "ru-RU": {
        "question": "Какой перуанский институт изучает землетрясения, вулканы и геофизические опасности?",
        "options": {
          "a": "Институт моря Перу",
          "b": "Национальный институт здравоохранения",
          "c": "Геофизический институт Перу",
          "d": "SENAMHI"
        },
        "explanation": "Геофизический институт Перу (IGP) исследует и отслеживает геофизические явления, включая сейсмическую и вулканическую активность."
      },
      "es-ES": {
        "question": "¿Qué instituto peruano estudia los terremotos, los volcanes y los peligros geofísicos?",
        "options": {
          "a": "Instituto del Mar del Perú",
          "b": "Instituto Nacional de Salud",
          "c": "Instituto Geofísico del Perú",
          "d": "SENAMHI"
        },
        "explanation": "El IGP investiga y vigila fenómenos geofísicos, entre ellos la actividad sísmica y volcánica."
      },
      "es-PE": {
        "question": "¿Qué institución peruana estudia los sismos, los volcanes y los riesgos geofísicos?",
        "options": {
          "a": "Instituto del Mar del Perú",
          "b": "Instituto Nacional de Salud",
          "c": "Instituto Geofísico del Perú",
          "d": "SENAMHI"
        },
        "explanation": "El IGP investiga y monitorea fenómenos geofísicos, incluida la actividad sísmica y volcánica."
      }
    }
  },
  {
    "id": "PE-SCI-012",
    "region": "PE",
    "category": "Science",
    "difficulty": "hard",
    "correct": "d",
    "translations": {
      "en-IN": {
        "question": "What is the name of Peru's scientific research station in Antarctica?",
        "options": {
          "a": "Huascarán Station",
          "b": "Túpac Amaru Station",
          "c": "Pachacútec Station",
          "d": "Machu Picchu Station"
        },
        "explanation": "Peru's Antarctic research programme operates the Machu Picchu Scientific Station on King George Island."
      },
      "en-US": {
        "question": "What is the name of Peru's scientific research station in Antarctica?",
        "options": {
          "a": "Huascarán Station",
          "b": "Túpac Amaru Station",
          "c": "Pachacútec Station",
          "d": "Machu Picchu Station"
        },
        "explanation": "Peru's Antarctic research programme operates the Machu Picchu Scientific Station on King George Island."
      },
      "ru-RU": {
        "question": "Как называется научно-исследовательская станция Перу в Антарктике?",
        "options": {
          "a": "Станция Уаскаран",
          "b": "Станция Тупак Амару",
          "c": "Станция Пачакутек",
          "d": "Станция Мачу-Пикчу"
        },
        "explanation": "Перуанская антарктическая исследовательская программа использует научную станцию Мачу-Пикчу на острове Кинг-Джордж."
      },
      "es-ES": {
        "question": "¿Cómo se llama la estación científica de investigación del Perú en la Antártida?",
        "options": {
          "a": "Estación Huascarán",
          "b": "Estación Túpac Amaru",
          "c": "Estación Pachacútec",
          "d": "Estación Machu Picchu"
        },
        "explanation": "El programa antártico peruano opera la Estación Científica Machu Picchu en la isla Rey Jorge."
      },
      "es-PE": {
        "question": "¿Cuál es el nombre de la estación científica peruana en la Antártida?",
        "options": {
          "a": "Estación Huascarán",
          "b": "Estación Túpac Amaru",
          "c": "Estación Pachacútec",
          "d": "Estación Machu Picchu"
        },
        "explanation": "El programa de investigación antártica del Perú opera la Estación Científica Machu Picchu en la isla Rey Jorge."
      }
    }
  },
  {
    "id": "PE-CUL-011",
    "region": "PE",
    "category": "Culture",
    "difficulty": "easy",
    "correct": "c",
    "translations": {
      "en-IN": {
        "question": "Which Peruvian traditional dance was inscribed by UNESCO in 2010 and features dancers striking metal rods like scissors?",
        "options": {
          "a": "Marinera",
          "b": "Huayno",
          "c": "Scissors dance (Danza de las Tijeras)",
          "d": "Wititi"
        },
        "explanation": "UNESCO inscribed the scissors dance in 2010; it is performed in Quechua communities of Peru's south-central Andes."
      },
      "en-US": {
        "question": "Which Peruvian traditional dance was inscribed by UNESCO in 2010 and features dancers striking metal rods like scissors?",
        "options": {
          "a": "Marinera",
          "b": "Huayno",
          "c": "Scissors dance (Danza de las Tijeras)",
          "d": "Wititi"
        },
        "explanation": "UNESCO inscribed the scissors dance in 2010; it is performed in Quechua communities of Peru's south-central Andes."
      },
      "ru-RU": {
        "question": "Какой традиционный перуанский танец был внесён ЮНЕСКО в список в 2010 году и включает удары металлическими стержнями, похожими на ножницы?",
        "options": {
          "a": "Маринера",
          "b": "Уайно",
          "c": "Танец ножниц (Danza de las Tijeras)",
          "d": "Уитити"
        },
        "explanation": "ЮНЕСКО внесла танец ножниц в список в 2010 году; его исполняют в кечуанских общинах южно-центральных Анд Перу."
      },
      "es-ES": {
        "question": "¿Qué danza tradicional peruana fue inscrita por la UNESCO en 2010 y presenta bailarines que golpean varillas metálicas como tijeras?",
        "options": {
          "a": "Marinera",
          "b": "Huayno",
          "c": "Danza de las Tijeras",
          "d": "Wititi"
        },
        "explanation": "La UNESCO inscribió la Danza de las Tijeras en 2010; se practica en comunidades quechuas de los Andes centro-sur del Perú."
      },
      "es-PE": {
        "question": "¿Qué baile tradicional peruano fue inscrito por la UNESCO en 2010 y utiliza varillas metálicas que se golpean como tijeras?",
        "options": {
          "a": "Marinera",
          "b": "Huayno",
          "c": "Danza de las Tijeras",
          "d": "Wititi"
        },
        "explanation": "La UNESCO inscribió la Danza de las Tijeras en 2010; se practica en comunidades quechuas de los Andes centro-sur del Perú."
      }
    }
  },
  {
    "id": "PE-CUL-012",
    "region": "PE",
    "category": "Culture",
    "difficulty": "medium",
    "correct": "a",
    "translations": {
      "en-IN": {
        "question": "Which Peruvian island in Lake Titicaca is internationally recognised for its living textile tradition?",
        "options": {
          "a": "Taquile",
          "b": "Amantaní",
          "c": "Suasi",
          "d": "Uros"
        },
        "explanation": "UNESCO inscribed Taquile and its textile art in 2008; weaving is practised by community members of different ages and genders."
      },
      "en-US": {
        "question": "Which Peruvian island in Lake Titicaca is internationally recognised for its living textile tradition?",
        "options": {
          "a": "Taquile",
          "b": "Amantaní",
          "c": "Suasi",
          "d": "Uros"
        },
        "explanation": "UNESCO inscribed Taquile and its textile art in 2008; weaving is practised by community members of different ages and genders."
      },
      "ru-RU": {
        "question": "Какой перуанский остров на озере Титикака известен живой традицией текстильного ремесла?",
        "options": {
          "a": "Такиле",
          "b": "Амантани",
          "c": "Суаси",
          "d": "Урос"
        },
        "explanation": "ЮНЕСКО внесла текстильное искусство Такиле в список в 2008 году; ткачеством занимаются жители разных возрастов и полов."
      },
      "es-ES": {
        "question": "¿Qué isla peruana del lago Titicaca es reconocida internacionalmente por su tradición textil viva?",
        "options": {
          "a": "Taquile",
          "b": "Amantaní",
          "c": "Suasi",
          "d": "Uros"
        },
        "explanation": "La UNESCO inscribió el arte textil de Taquile en 2008; la actividad la practican miembros de la comunidad de distintas edades y géneros."
      },
      "es-PE": {
        "question": "¿Qué isla peruana del lago Titicaca destaca internacionalmente por su tradición textil viva?",
        "options": {
          "a": "Taquile",
          "b": "Amantaní",
          "c": "Suasi",
          "d": "Uros"
        },
        "explanation": "La UNESCO inscribió el arte textil de Taquile en 2008; el tejido forma parte de la vida comunitaria de personas de distintas edades y géneros."
      }
    }
  },
  {
    "id": "PE-CUL-013",
    "region": "PE",
    "category": "Culture",
    "difficulty": "hard",
    "correct": "b",
    "translations": {
      "en-IN": {
        "question": "The annual renewal of the Q'eswachaka rope bridge is traditionally carried out by communities in which Peruvian region?",
        "options": {
          "a": "Piura",
          "b": "Cusco",
          "c": "Loreto",
          "d": "Tumbes"
        },
        "explanation": "The Q'eswachaka bridge spans the Apurímac River in the Canas province of Cusco; its annual renewal is a living Andean tradition."
      },
      "en-US": {
        "question": "The annual renewal of the Q'eswachaka rope bridge is traditionally carried out by communities in which Peruvian region?",
        "options": {
          "a": "Piura",
          "b": "Cusco",
          "c": "Loreto",
          "d": "Tumbes"
        },
        "explanation": "The Q'eswachaka bridge spans the Apurímac River in the Canas province of Cusco; its annual renewal is a living Andean tradition."
      },
      "ru-RU": {
        "question": "В каком регионе Перу общины традиционно ежегодно обновляют верёвочный мост Кесвачака?",
        "options": {
          "a": "Пьюра",
          "b": "Куско",
          "c": "Лорето",
          "d": "Тумбес"
        },
        "explanation": "Мост Кесвачака перекинут через реку Апуримак в провинции Канас региона Куско; его ежегодное обновление — живая андская традиция."
      },
      "es-ES": {
        "question": "¿En qué región peruana las comunidades realizan tradicionalmente la renovación anual del puente de cuerda Q'eswachaka?",
        "options": {
          "a": "Piura",
          "b": "Cusco",
          "c": "Loreto",
          "d": "Tumbes"
        },
        "explanation": "El puente Q'eswachaka cruza el río Apurímac en la provincia de Canas, Cusco; su renovación anual es una tradición andina viva."
      },
      "es-PE": {
        "question": "¿En qué región del Perú las comunidades renuevan tradicionalmente cada año el puente colgante de cuerda Q'eswachaka?",
        "options": {
          "a": "Piura",
          "b": "Cusco",
          "c": "Loreto",
          "d": "Tumbes"
        },
        "explanation": "El puente Q'eswachaka cruza el río Apurímac, en la provincia de Canas, Cusco; su renovación anual es una tradición andina viva."
      }
    }
  }
];
  window.MINDQUEST_STAGED_QUESTIONS = [...(window.MINDQUEST_STAGED_QUESTIONS || []), ...rows];
})();
