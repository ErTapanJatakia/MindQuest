/* Batch 03–04: staged regional content. Never load in app/index.html before all release gates pass. */
(() => {
  const locales = ["en-IN","en-US","ru-RU","es-ES","es-PE"];
  const make = (id, region, category, difficulty, correct, entries) => ({
    id, region, category, difficulty, correct,
    translations: Object.fromEntries(locales.map((locale, index) => {
      const [question, options, explanation] = entries[index];
      return [locale, { question, options: Object.fromEntries(["a","b","c","d"].map((key, i) => [key, options[i]])), explanation }];
    }))
  });
  const rows = [
    make("ES-GEO-007","ES","Geography","easy","a",[
      ["Which sea receives the Ebro River?",["Mediterranean Sea","Bay of Biscay","Atlantic Ocean","North Sea"],"The Ebro flows eastward across northeastern Spain and reaches the Mediterranean."],
      ["Which sea receives the Ebro River?",["Mediterranean Sea","Bay of Biscay","Atlantic Ocean","North Sea"],"The Ebro flows eastward across northeastern Spain and reaches the Mediterranean."],
      ["¿En qué mar desemboca el río Ebro?",["Mar Mediterráneo","Golfo de Vizcaya","Océano Atlántico","Mar del Norte"],"El Ebro atraviesa el noreste de España hacia el este y desemboca en el Mediterráneo."],
      ["¿En qué mar desemboca el río Ebro?",["Mar Mediterráneo","Golfo de Vizcaya","Océano Atlántico","Mar del Norte"],"El Ebro recorre el noreste de España hacia el este y llega al Mediterráneo."]
    ]),
    make("ES-GEO-008","ES","Geography","medium","b",[
      ["In which Spanish autonomous community is Doñana National Park located?",["Galicia","Andalusia","Catalonia","Aragon"],"UNESCO places Doñana National Park in Andalusia, across Huelva and Seville provinces."],
      ["In which Spanish autonomous community is Doñana National Park located?",["Galicia","Andalusia","Catalonia","Aragon"],"UNESCO places Doñana National Park in Andalusia, across Huelva and Seville provinces."],
      ["¿En qué comunidad autónoma española se encuentra el Parque Nacional de Doñana?",["Galicia","Andalucía","Cataluña","Aragón"],"La UNESCO sitúa Doñana en Andalucía, entre las provincias de Huelva y Sevilla."],
      ["¿En qué comunidad autónoma de España se ubica el Parque Nacional de Doñana?",["Galicia","Andalucía","Cataluña","Aragón"],"La UNESCO ubica Doñana en Andalucía, entre las provincias de Huelva y Sevilla."]
    ]),
    make("ES-GEO-009","ES","Geography","hard","c",[
      ["On which Canary Island is Mount Teide located?",["Gran Canaria","Lanzarote","Tenerife","Fuerteventura"],"Mount Teide is the volcanic summit on Tenerife in Spain's Canary Islands."],
      ["On which Canary Island is Mount Teide located?",["Gran Canaria","Lanzarote","Tenerife","Fuerteventura"],"Mount Teide is the volcanic summit on Tenerife in Spain's Canary Islands."],
      ["¿En qué isla canaria se encuentra el Teide?",["Gran Canaria","Lanzarote","Tenerife","Fuerteventura"],"El Teide es la cumbre volcánica situada en Tenerife, en las islas Canarias."],
      ["¿En cuál de las islas Canarias está ubicado el Teide?",["Gran Canaria","Lanzarote","Tenerife","Fuerteventura"],"El Teide es la cumbre volcánica de Tenerife, en el archipiélago canario."]
    ]),
    make("ES-GEO-010","ES","Geography","easy","d",[
      ["Which mountain range forms much of the natural boundary between Spain and France?",["Alps","Apennines","Carpathians","Pyrenees"],"The Pyrenees extend along the border region between Spain and France."],
      ["Which mountain range forms much of the natural boundary between Spain and France?",["Alps","Apennines","Carpathians","Pyrenees"],"The Pyrenees extend along the border region between Spain and France."],
      ["¿Qué cordillera forma gran parte de la frontera natural entre España y Francia?",["Alpes","Apeninos","Cárpatos","Pirineos"],"Los Pirineos se extienden por la zona fronteriza entre España y Francia."],
      ["¿Qué cadena montañosa marca buena parte del límite natural entre España y Francia?",["Alpes","Apeninos","Cárpatos","Pirineos"],"Los Pirineos se extienden a lo largo de la zona limítrofe entre España y Francia."]
    ]),
    make("ES-GEO-011","ES","Geography","medium","a",[
      ["Which river is known in English as the Tagus and in Spain as the Tajo?",["Tajo","Duero","Ebro","Miño"],"The Tagus is called the Tajo in Spain and continues west into Portugal."],
      ["Which river is known in English as the Tagus and in Spain as the Tajo?",["Tajo","Duero","Ebro","Miño"],"The Tagus is called the Tajo in Spain and continues west into Portugal."],
      ["¿Qué río se conoce como Tajo en España y Tagus en inglés?",["Tajo","Duero","Ebro","Miño"],"El Tajo atraviesa España y continúa hacia el oeste por Portugal."],
      ["¿Cuál es el río llamado Tajo en España y Tagus en inglés?",["Tajo","Duero","Ebro","Miño"],"El Tajo cruza España y sigue hacia el oeste por Portugal."]
    ]),
    make("ES-HIS-006","ES","History","easy","b",[
      ["On what date was the Spanish Constitution approved by referendum?",["6 December 1976","6 December 1978","29 December 1978","23 February 1981"],"The constitutional referendum took place on 6 December 1978; the Constitution entered into force later that month."],
      ["On what date was the Spanish Constitution approved by referendum?",["December 6, 1976","December 6, 1978","December 29, 1978","February 23, 1981"],"The constitutional referendum took place on December 6, 1978; the Constitution entered into force later that month."],
      ["¿En qué fecha se aprobó por referéndum la Constitución española?",["6 de diciembre de 1976","6 de diciembre de 1978","29 de diciembre de 1978","23 de febrero de 1981"],"El referéndum constitucional se celebró el 6 de diciembre de 1978; la Constitución entró en vigor más tarde ese mes."],
      ["¿Qué día se aprobó mediante referéndum la Constitución española?",["6 de diciembre de 1976","6 de diciembre de 1978","29 de diciembre de 1978","23 de febrero de 1981"],"El referéndum constitucional se realizó el 6 de diciembre de 1978 y la Constitución entró en vigor después, ese mismo mes."]
    ]),
    make("ES-HIS-007","ES","History","medium","a",[
      ["Where did the first voyage of Christopher Columbus reach land in 1492?",["The Caribbean","India","Japan","The Cape of Good Hope"],"The 1492 voyage reached islands in the Caribbean, beginning sustained contact between Europe and the Americas."],
      ["Where did Christopher Columbus's first voyage reach land in 1492?",["The Caribbean","India","Japan","The Cape of Good Hope"],"The 1492 voyage reached islands in the Caribbean, beginning sustained contact between Europe and the Americas."],
      ["¿En qué región llegó a tierra el primer viaje de Cristóbal Colón en 1492?",["El Caribe","India","Japón","El cabo de Buena Esperanza"],"El viaje de 1492 llegó a islas del Caribe e inició el contacto sostenido entre Europa y América."],
      ["¿En qué región desembarcó la expedición de Cristóbal Colón en 1492?",["El Caribe","India","Japón","El cabo de Buena Esperanza"],"La expedición de 1492 llegó a islas caribeñas e inició el contacto sostenido entre Europa y América."]
    ]),
    make("ES-HIS-008","ES","History","hard","c",[
      ["In which year was the Battle of Las Navas de Tolosa fought?",["1085","1147","1212","1492"],"The Battle of Las Navas de Tolosa was fought in 1212 during the medieval campaigns in Iberia."],
      ["In which year was the Battle of Las Navas de Tolosa fought?",["1085","1147","1212","1492"],"The Battle of Las Navas de Tolosa was fought in 1212 during the medieval campaigns in Iberia."],
      ["¿En qué año se libró la batalla de Las Navas de Tolosa?",["1085","1147","1212","1492"],"La batalla de Las Navas de Tolosa se libró en 1212 durante las campañas medievales en la península ibérica."],
      ["¿En qué año tuvo lugar la batalla de Las Navas de Tolosa?",["1085","1147","1212","1492"],"La batalla de Las Navas de Tolosa ocurrió en 1212, durante las campañas medievales en la península ibérica."]
    ]),
    make("ES-HIS-009","ES","History","easy","d",[
      ["In which year did the Spanish Civil War begin?",["1923","1931","1939","1936"],"The Spanish Civil War began in 1936 and ended in 1939."],
      ["In which year did the Spanish Civil War begin?",["1923","1931","1939","1936"],"The Spanish Civil War began in 1936 and ended in 1939."],
      ["¿En qué año comenzó la Guerra Civil española?",["1923","1931","1939","1936"],"La Guerra Civil española comenzó en 1936 y terminó en 1939."],
      ["¿En qué año se inició la Guerra Civil española?",["1923","1931","1939","1936"],"La Guerra Civil española empezó en 1936 y concluyó en 1939."]
    ]),
    make("ES-HIS-010","ES","History","medium","b",[
      ["In which year was the Treaty of Tordesillas signed by the crowns of Castile and Portugal?",["1479","1494","1502","1519"],"The Treaty of Tordesillas was signed in 1494 to establish a line of demarcation between the two crowns."],
      ["In which year was the Treaty of Tordesillas signed by the crowns of Castile and Portugal?",["1479","1494","1502","1519"],"The Treaty of Tordesillas was signed in 1494 to establish a line of demarcation between the two crowns."],
      ["¿En qué año firmaron las coronas de Castilla y Portugal el Tratado de Tordesillas?",["1479","1494","1502","1519"],"El Tratado de Tordesillas se firmó en 1494 para establecer una línea de demarcación entre ambas coronas."],
      ["¿En qué año suscribieron Castilla y Portugal el Tratado de Tordesillas?",["1479","1494","1502","1519"],"El Tratado de Tordesillas se firmó en 1494 para fijar una línea de demarcación entre las dos coronas."]
    ]),
    make("ES-SCI-006","ES","Science","easy","a",[
      ["Which Spanish scientist received the 1906 Nobel Prize in Physiology or Medicine?",["Santiago Ramón y Cajal","Severo Ochoa","Juan de la Cierva","Gregorio Marañón"],"Ramón y Cajal received the 1906 Nobel Prize for work on the structure of the nervous system."],
      ["Which Spanish scientist received the 1906 Nobel Prize in Physiology or Medicine?",["Santiago Ramón y Cajal","Severo Ochoa","Juan de la Cierva","Gregorio Marañón"],"Ramón y Cajal received the 1906 Nobel Prize for work on the structure of the nervous system."],
      ["¿Qué científico español recibió el Premio Nobel de Fisiología o Medicina de 1906?",["Santiago Ramón y Cajal","Severo Ochoa","Juan de la Cierva","Gregorio Marañón"],"Ramón y Cajal recibió el Nobel de 1906 por sus investigaciones sobre la estructura del sistema nervioso."],
      ["¿Qué científico español obtuvo el Nobel de Fisiología o Medicina en 1906?",["Santiago Ramón y Cajal","Severo Ochoa","Juan de la Cierva","Gregorio Marañón"],"Ramón y Cajal recibió el Nobel de 1906 por sus estudios sobre la estructura del sistema nervioso."]
    ]),
    make("ES-SCI-007","ES","Science","medium","c",[
      ["With whom did Severo Ochoa share the 1959 Nobel Prize in Physiology or Medicine?",["Francis Crick","James Watson","Arthur Kornberg","Maurice Wilkins"],"Severo Ochoa shared the 1959 award with Arthur Kornberg for discoveries concerning biological synthesis of RNA and DNA."],
      ["With whom did Severo Ochoa share the 1959 Nobel Prize in Physiology or Medicine?",["Francis Crick","James Watson","Arthur Kornberg","Maurice Wilkins"],"Severo Ochoa shared the 1959 award with Arthur Kornberg for discoveries concerning biological synthesis of RNA and DNA."],
      ["¿Con quién compartió Severo Ochoa el Nobel de Fisiología o Medicina de 1959?",["Francis Crick","James Watson","Arthur Kornberg","Maurice Wilkins"],"Severo Ochoa compartió el premio de 1959 con Arthur Kornberg por descubrimientos sobre la síntesis biológica de ARN y ADN."],
      ["¿Con qué científico compartió Severo Ochoa el Nobel de 1959?",["Francis Crick","James Watson","Arthur Kornberg","Maurice Wilkins"],"Severo Ochoa compartió el galardón de 1959 con Arthur Kornberg por descubrimientos sobre la síntesis biológica del ARN y el ADN."]
    ]),
    make("ES-SCI-008","ES","Science","hard","d",[
      ["Which field is most closely associated with Margarita Salas's scientific career?",["Seismology","Marine geology","Planetary astronomy","Molecular biology"],"Margarita Salas was a pioneering Spanish molecular biologist whose work advanced molecular genetics."],
      ["Which field is most closely associated with Margarita Salas's scientific career?",["Seismology","Marine geology","Planetary astronomy","Molecular biology"],"Margarita Salas was a pioneering Spanish molecular biologist whose work advanced molecular genetics."],
      ["¿Con qué campo científico se relaciona principalmente la trayectoria de Margarita Salas?",["Sismología","Geología marina","Astronomía planetaria","Biología molecular"],"Margarita Salas fue una destacada bióloga molecular española que impulsó la genética molecular."],
      ["¿En qué disciplina destacó principalmente la científica Margarita Salas?",["Sismología","Geología marina","Astronomía planetaria","Biología molecular"],"Margarita Salas fue una destacada científica española de la biología molecular y la genética."]
    ]),
    make("ES-SCI-009","ES","Science","medium","b",[
      ["In which Spanish province is the Calar Alto Observatory located?",["Granada","Almería","Málaga","Cádiz"],"Calar Alto Observatory is in the Sierra de los Filabres in Almería province."],
      ["In which Spanish province is the Calar Alto Observatory located?",["Granada","Almería","Málaga","Cádiz"],"Calar Alto Observatory is in the Sierra de los Filabres in Almería province."],
      ["¿En qué provincia española se encuentra el Observatorio de Calar Alto?",["Granada","Almería","Málaga","Cádiz"],"El Observatorio de Calar Alto está en la sierra de los Filabres, en la provincia de Almería."],
      ["¿En qué provincia de España está ubicado el Observatorio de Calar Alto?",["Granada","Almería","Málaga","Cádiz"],"El Observatorio de Calar Alto se encuentra en la sierra de los Filabres, provincia de Almería."]
    ]),
    make("ES-CUL-005","ES","Culture","easy","a",[
      ["In which Spanish city is the Alhambra palace complex located?",["Granada","Toledo","Córdoba","Seville"],"The Alhambra, Generalife and Albayzín heritage property is located in Granada."],
      ["In which Spanish city is the Alhambra palace complex located?",["Granada","Toledo","Córdoba","Seville"],"The Alhambra, Generalife and Albayzín heritage property is located in Granada."],
      ["¿En qué ciudad española se encuentra el conjunto monumental de la Alhambra?",["Granada","Toledo","Córdoba","Sevilla"],"El conjunto de la Alhambra, el Generalife y el Albaicín se encuentra en Granada."],
      ["¿En qué ciudad de España está el conjunto monumental de la Alhambra?",["Granada","Toledo","Córdoba","Sevilla"],"La Alhambra, el Generalife y el Albaicín forman un conjunto patrimonial situado en Granada."]
    ]),
    make("ES-CUL-006","ES","Culture","medium","c",[
      ["Which pilgrimage route network in Spain is associated with the shrine of Saint James?",["Via Francigena","Silk Road","Camino de Santiago","Appian Way"],"The Routes of Santiago de Compostela lead pilgrims toward the shrine of Saint James in Galicia."],
      ["Which pilgrimage route network in Spain is associated with the shrine of Saint James?",["Via Francigena","Silk Road","Camino de Santiago","Appian Way"],"The Routes of Santiago de Compostela lead pilgrims toward the shrine of Saint James in Galicia."],
      ["¿Qué red de rutas de peregrinación en España está vinculada al santuario del apóstol Santiago?",["Vía Francígena","Ruta de la Seda","Camino de Santiago","Vía Apia"],"Las rutas del Camino de Santiago conducen a los peregrinos hacia el santuario del apóstol en Galicia."],
      ["¿Qué conjunto de rutas de peregrinación en España conduce al santuario de Santiago?",["Vía Francígena","Ruta de la Seda","Camino de Santiago","Vía Apia"],"El Camino de Santiago reúne rutas que llevan a los peregrinos al santuario del apóstol en Galicia."]
    ]),
    make("ES-CUL-007","ES","Culture","hard","d",[
      ["In which Spanish city was artist Pablo Picasso born?",["Madrid","Barcelona","Bilbao","Málaga"],"Pablo Picasso was born in Málaga in 1881."],
      ["In which Spanish city was artist Pablo Picasso born?",["Madrid","Barcelona","Bilbao","Málaga"],"Pablo Picasso was born in Málaga in 1881."],
      ["¿En qué ciudad española nació el artista Pablo Picasso?",["Madrid","Barcelona","Bilbao","Málaga"],"Pablo Picasso nació en Málaga en 1881."],
      ["¿En qué ciudad de España nació el pintor Pablo Picasso?",["Madrid","Barcelona","Bilbao","Málaga"],"Pablo Picasso nació en Málaga en 1881."]
    ]),
    make("ES-CUL-008","ES","Culture","easy","b",[
      ["Which Spanish city is internationally associated with the Fallas festival?",["Alicante","Valencia","Zaragoza","Salamanca"],"The Fallas festival is an annual tradition associated with the city of Valencia."],
      ["Which Spanish city is internationally associated with the Fallas festival?",["Alicante","Valencia","Zaragoza","Salamanca"],"The Fallas festival is an annual tradition associated with the city of Valencia."],
      ["¿Qué ciudad española está vinculada internacionalmente con la fiesta de las Fallas?",["Alicante","Valencia","Zaragoza","Salamanca"],"Las Fallas son una celebración tradicional anual asociada a la ciudad de Valencia."],
      ["¿Con qué ciudad española se relaciona la fiesta de las Fallas?",["Alicante","Valencia","Zaragoza","Salamanca"],"Las Fallas son una celebración tradicional que se realiza en la ciudad de Valencia."]
    ]),
    make("ES-CUL-009","ES","Culture","medium","a",[
      ["Which language family does Spanish belong to?",["Romance","Germanic","Slavic","Celtic"],"Spanish is a Romance language that developed from spoken Latin."],
      ["Which language family does Spanish belong to?",["Romance","Germanic","Slavic","Celtic"],"Spanish is a Romance language that developed from spoken Latin."],
      ["¿A qué familia lingüística pertenece el español?",["Romance","Germánica","Eslava","Celta"],"El español es una lengua romance que evolucionó del latín hablado."],
      ["¿A qué familia de lenguas pertenece el idioma español?",["Romance","Germánica","Eslava","Celta"],"El español es una lengua romance que se desarrolló a partir del latín hablado."]
    ]),
    make("ES-CUL-010","ES","Culture","hard","c",[
      ["In which Spanish region is the Cave of Altamira, famous for Paleolithic art?",["Andalusia","Catalonia","Cantabria","Navarre"],"The Cave of Altamira is in Cantabria and is renowned for its Paleolithic cave paintings."],
      ["In which Spanish region is the Cave of Altamira, famous for Paleolithic art?",["Andalusia","Catalonia","Cantabria","Navarre"],"The Cave of Altamira is in Cantabria and is renowned for its Paleolithic cave paintings."],
      ["¿En qué comunidad española se encuentra la cueva de Altamira, famosa por su arte paleolítico?",["Andalucía","Cataluña","Cantabria","Navarra"],"La cueva de Altamira está en Cantabria y es célebre por sus pinturas rupestres paleolíticas."],
      ["¿En qué región de España se ubica la cueva de Altamira, conocida por su arte paleolítico?",["Andalucía","Cataluña","Cantabria","Navarra"],"La cueva de Altamira se encuentra en Cantabria y destaca por sus pinturas rupestres paleolíticas."]
    ]),
    make("PE-GEO-007","PE","Geography","easy","a",[
      ["The Amazon River system has important headwaters in which South American country?",["Peru","Chile","Uruguay","Paraguay"],"Major headwater streams of the Amazon rise in the Peruvian Andes."],
      ["The Amazon River system has important headwaters in which South American country?",["Peru","Chile","Uruguay","Paraguay"],"Major headwater streams of the Amazon rise in the Peruvian Andes."],
      ["¿En qué país sudamericano nacen importantes afluentes de cabecera del sistema del Amazonas?",["Perú","Chile","Uruguay","Paraguay"],"Varios ríos de cabecera importantes del Amazonas nacen en los Andes peruanos."],
      ["¿En qué país de Sudamérica se originan importantes ríos de cabecera del sistema amazónico?",["Perú","Chile","Uruguay","Paraguay"],"Varios afluentes importantes del Amazonas tienen sus nacientes en los Andes del Perú."]
    ]),
    make("PE-GEO-008","PE","Geography","medium","b",[
      ["What is the highest mountain in Peru?",["Alpamayo","Huascarán","Ausangate","Coropuna"],"Mount Huascarán reaches 6,768 metres and is Peru's highest peak."],
      ["What is the highest mountain in Peru?",["Alpamayo","Huascarán","Ausangate","Coropuna"],"Mount Huascarán reaches 6,768 meters and is Peru's highest peak."],
      ["¿Cuál es la montaña más alta del Perú?",["Alpamayo","Huascarán","Ausangate","Coropuna"],"El nevado Huascarán alcanza los 6.768 metros y es la cumbre más alta del Perú."],
      ["¿Cuál es el nevado de mayor altitud del Perú?",["Alpamayo","Huascarán","Ausangate","Coropuna"],"El Huascarán llega a los 6.768 metros y constituye la montaña más alta del Perú."]
    ]),
    make("PE-GEO-009","PE","Geography","hard","c",[
      ["Which Peruvian national park protects a large transition between Andean and Amazonian ecosystems?",["Huascarán","Paracas","Manu","Cutervo"],"Manu National Park extends from Andean mountain environments into Amazonian lowlands."],
      ["Which Peruvian national park protects a large transition between Andean and Amazonian ecosystems?",["Huascarán","Paracas","Manu","Cutervo"],"Manu National Park extends from Andean mountain environments into Amazonian lowlands."],
      ["¿Qué parque nacional peruano protege una amplia transición entre ecosistemas andinos y amazónicos?",["Huascarán","Paracas","Manu","Cutervo"],"El Parque Nacional del Manu se extiende desde ambientes andinos hasta las tierras bajas amazónicas."],
      ["¿Qué parque nacional del Perú conserva una extensa transición de ecosistemas andinos a amazónicos?",["Huascarán","Paracas","Manu","Cutervo"],"El Parque Nacional del Manu abarca desde zonas andinas hasta las tierras bajas de la Amazonía."]
    ]),
    make("PE-GEO-010","PE","Geography","easy","d",[
      ["On which ocean coast is Peru's Paracas National Reserve located?",["Atlantic","Arctic","Indian","Pacific"],"Paracas National Reserve is on Peru's Pacific coast in the Ica region."],
      ["On which ocean coast is Peru's Paracas National Reserve located?",["Atlantic","Arctic","Indian","Pacific"],"Paracas National Reserve is on Peru's Pacific coast in the Ica region."],
      ["¿En la costa de qué océano se encuentra la Reserva Nacional de Paracas?",["Atlántico","Ártico","Índico","Pacífico"],"La Reserva Nacional de Paracas está en la costa del Pacífico, en la región Ica."],
      ["¿En el litoral de qué océano se ubica la Reserva Nacional de Paracas?",["Atlántico","Ártico","Índico","Pacífico"],"La Reserva Nacional de Paracas se encuentra en la costa del Pacífico, en Ica."]
    ]),
    make("PE-GEO-011","PE","Geography","medium","a",[
      ["The Cordillera Blanca mountain range is part of which larger mountain system?",["The Andes","The Alps","The Rockies","The Himalayas"],"The Cordillera Blanca is a high mountain range within the Peruvian Andes in Ancash."],
      ["The Cordillera Blanca mountain range is part of which larger mountain system?",["The Andes","The Alps","The Rockies","The Himalayas"],"The Cordillera Blanca is a high mountain range within the Peruvian Andes in Ancash."],
      ["¿De qué gran sistema montañoso forma parte la Cordillera Blanca?",["Los Andes","Los Alpes","Las Rocosas","El Himalaya"],"La Cordillera Blanca es una cadena de alta montaña de los Andes peruanos, en Áncash."],
      ["¿A qué gran sistema montañoso pertenece la Cordillera Blanca?",["Los Andes","Los Alpes","Las Rocosas","El Himalaya"],"La Cordillera Blanca es una cadena de montañas elevadas de los Andes del Perú, en Áncash."]
    ]),
    make("PE-HIS-006","PE","History","easy","b",[
      ["In which year did José de San Martín proclaim Peru's independence?",["1810","1821","1824","1830"],"José de San Martín proclaimed Peru's independence in Lima on 28 July 1821."],
      ["In which year did José de San Martín proclaim Peru's independence?",["1810","1821","1824","1830"],"José de San Martín proclaimed Peru's independence in Lima on July 28, 1821."],
      ["¿En qué año proclamó José de San Martín la independencia del Perú?",["1810","1821","1824","1830"],"José de San Martín proclamó la independencia del Perú en Lima el 28 de julio de 1821."],
      ["¿En qué año declaró José de San Martín la independencia del Perú?",["1810","1821","1824","1830"],"José de San Martín proclamó la independencia peruana en Lima el 28 de julio de 1821."]
    ]),
    make("PE-HIS-007","PE","History","medium","c",[
      ["Which ancient Peruvian site is recognised by UNESCO as the Sacred City of Caral-Supe?",["Chan Chan","Pachacamac","Caral","Kuelap"],"UNESCO identifies Caral-Supe as an exceptionally early centre of civilisation in the Americas."],
      ["Which ancient Peruvian site is recognised by UNESCO as the Sacred City of Caral-Supe?",["Chan Chan","Pachacamac","Caral","Kuelap"],"UNESCO identifies Caral-Supe as an exceptionally early centre of civilisation in the Americas."],
      ["¿Qué antiguo sitio peruano está reconocido por la UNESCO como Ciudad Sagrada de Caral-Supe?",["Chan Chan","Pachacámac","Caral","Kuélap"],"La UNESCO reconoce Caral-Supe como un centro de civilización excepcionalmente antiguo en América."],
      ["¿Qué antiguo complejo del Perú está inscrito por la UNESCO como Ciudad Sagrada de Caral-Supe?",["Chan Chan","Pachacámac","Caral","Kuélap"],"La UNESCO reconoce a Caral-Supe como uno de los centros de civilización más antiguos de América."]
    ]),
    make("PE-HIS-008","PE","History","hard","a",[
      ["The Moche culture developed primarily along which part of Peru?",["The north coast","The southern highlands","The Amazon basin","The eastern rainforest"],"The Moche culture flourished in valleys along Peru's northern Pacific coast."],
      ["The Moche culture developed primarily along which part of Peru?",["The north coast","The southern highlands","The Amazon basin","The eastern rainforest"],"The Moche culture flourished in valleys along Peru's northern Pacific coast."],
      ["¿En qué zona del Perú se desarrolló principalmente la cultura mochica?",["La costa norte","La sierra sur","La cuenca amazónica","La selva oriental"],"La cultura mochica floreció en valles de la costa norte del Perú, junto al Pacífico."],
      ["¿En qué región peruana se desarrolló principalmente la cultura Moche?",["La costa norte","La sierra sur","La cuenca amazónica","La selva oriental"],"La cultura Moche prosperó en los valles de la costa norte del Perú, junto al Pacífico."]
    ]),
    make("PE-HIS-009","PE","History","easy","d",[
      ["In which year was the Battle of Junín fought during the Peruvian independence campaigns?",["1819","1821","1825","1824"],"The Battle of Junín took place on 6 August 1824 during the campaign that secured independence."],
      ["In which year was the Battle of Junín fought during the Peruvian independence campaigns?",["1819","1821","1825","1824"],"The Battle of Junín took place on August 6, 1824 during the campaign that secured independence."],
      ["¿En qué año se libró la batalla de Junín durante las campañas de independencia del Perú?",["1819","1821","1825","1824"],"La batalla de Junín tuvo lugar el 6 de agosto de 1824, durante la campaña que aseguró la independencia."],
      ["¿En qué año ocurrió la batalla de Junín durante las campañas por la independencia peruana?",["1819","1821","1825","1824"],"La batalla de Junín se libró el 6 de agosto de 1824, en la campaña que consolidó la independencia."]
    ]),
    make("PE-HIS-010","PE","History","medium","b",[
      ["On what date was Lima founded by Francisco Pizarro?",["18 January 1532","18 January 1535","28 July 1821","6 August 1824"],"The founding ceremony of Lima took place on 18 January 1535."],
      ["On what date was Lima founded by Francisco Pizarro?",["January 18, 1532","January 18, 1535","July 28, 1821","August 6, 1824"],"The founding ceremony of Lima took place on January 18, 1535."],
      ["¿En qué fecha fundó Francisco Pizarro la ciudad de Lima?",["18 de enero de 1532","18 de enero de 1535","28 de julio de 1821","6 de agosto de 1824"],"La ceremonia de fundación de Lima se realizó el 18 de enero de 1535."],
      ["¿Qué fecha corresponde a la fundación de Lima por Francisco Pizarro?",["18 de enero de 1532","18 de enero de 1535","28 de julio de 1821","6 de agosto de 1824"],"La ceremonia fundacional de Lima tuvo lugar el 18 de enero de 1535."]
    ]),
    make("PE-SCI-006","PE","Science","easy","c",[
      ["Which Peruvian mountain range is monitored by INAIGEM for glacier and snow changes in Junín?",["Vilcanota","Huaytapallana","Vilcabamba","Raura"],"INAIGEM monitors the Huaytapallana range to study glacier conditions, snow and climate-related impacts."],
      ["Which Peruvian mountain range is monitored by INAIGEM for glacier and snow changes in Junín?",["Vilcanota","Huaytapallana","Vilcabamba","Raura"],"INAIGEM monitors the Huaytapallana range to study glacier conditions, snow and climate-related impacts."],
      ["¿Qué cordillera peruana monitorea el INAIGEM para estudiar cambios en la nieve y los glaciares de Junín?",["Vilcanota","Vilcabamba","Huaytapallana","Raura"],"El INAIGEM monitorea Huaytapallana para estudiar el estado glaciar, la nieve y los efectos del clima."],
      ["¿Qué cordillera del Perú monitorea el INAIGEM para investigar cambios de nieve y glaciares en Junín?",["Vilcanota","Vilcabamba","Huaytapallana","Raura"],"El INAIGEM realiza seguimiento a Huaytapallana para estudiar sus glaciares, la nieve y los impactos climáticos."]
    ]),
    make("PE-SCI-007","PE","Science","medium","a",[
      ["Which natural ocean process helps bring cold, nutrient-rich water toward the surface off Peru?",["Coastal upwelling","Thermohaline sinking","Tidal locking","Coral bleaching"],"Upwelling brings deeper, nutrient-rich water to the surface and supports productive fisheries off Peru."],
      ["Which natural ocean process helps bring cold, nutrient-rich water toward the surface off Peru?",["Coastal upwelling","Thermohaline sinking","Tidal locking","Coral bleaching"],"Upwelling brings deeper, nutrient-rich water to the surface and supports productive fisheries off Peru."],
      ["¿Qué proceso oceánico lleva agua fría y rica en nutrientes hacia la superficie frente al Perú?",["Afloramiento costero","Hundimiento termohalino","Acoplamiento de mareas","Blanqueamiento coralino"],"El afloramiento lleva agua profunda y rica en nutrientes a la superficie y favorece la pesca peruana."],
      ["¿Qué proceso marino hace ascender agua fría y cargada de nutrientes frente a la costa peruana?",["Afloramiento costero","Hundimiento termohalino","Acoplamiento de mareas","Blanqueamiento coralino"],"El afloramiento lleva agua profunda con nutrientes hacia la superficie y sostiene pesquerías productivas en el Perú."]
    ]),
    make("PE-SCI-008","PE","Science","hard","b",[
      ["What is the main public-health role of Peru's Instituto Nacional de Salud?",["Operating seaports","Conducting health research and reference laboratory work","Managing national parks","Regulating civil aviation"],"Peru's National Institute of Health supports public health through research, surveillance and specialised laboratory services."],
      ["What is the main public-health role of Peru's Instituto Nacional de Salud?",["Operating seaports","Conducting health research and reference laboratory work","Managing national parks","Regulating civil aviation"],"Peru's National Institute of Health supports public health through research, surveillance and specialised laboratory services."],
      ["¿Cuál es una función central del Instituto Nacional de Salud del Perú?",["Administrar puertos marítimos","Realizar investigación sanitaria y labores de laboratorio de referencia","Gestionar parques nacionales","Regular la aviación civil"],"El Instituto Nacional de Salud contribuye a la salud pública mediante investigación, vigilancia y servicios especializados de laboratorio."],
      ["¿Cuál es una función principal del Instituto Nacional de Salud del Perú?",["Operar puertos marítimos","Desarrollar investigación en salud y servicios de laboratorio de referencia","Administrar parques nacionales","Regular la aviación civil"],"El Instituto Nacional de Salud apoya la salud pública con investigación, vigilancia y servicios especializados de laboratorio."]
    ]),
    make("PE-SCI-009","PE","Science","medium","d",[
      ["Which scientific method was used in Peru's glacier inventory to map glacier surfaces and mountain lakes?",["Deep-sea sonar","Dendrochronology only","Radio astronomy","Remote sensing and geographic information systems"],"INAIGEM's national inventory uses remote sensing and geographic information systems to map glaciers and glacial lakes."],
      ["Which scientific method was used in Peru's glacier inventory to map glacier surfaces and mountain lakes?",["Deep-sea sonar","Dendrochronology only","Radio astronomy","Remote sensing and geographic information systems"],"INAIGEM's national inventory uses remote sensing and geographic information systems to map glaciers and glacial lakes."],
      ["¿Qué métodos se emplearon en el inventario peruano para cartografiar glaciares y lagunas de origen glaciar?",["Sonar de aguas profundas","Solo dendrocronología","Radioastronomía","Teledetección y sistemas de información geográfica"],"El inventario nacional del INAIGEM utiliza teledetección y sistemas de información geográfica para cartografiar glaciares y lagunas."],
      ["¿Qué tecnologías se usaron en el inventario peruano para elaborar mapas de glaciares y lagunas glaciares?",["Sonar de aguas profundas","Solo dendrocronología","Radioastronomía","Teledetección y sistemas de información geográfica"],"El inventario nacional del INAIGEM emplea teledetección y sistemas de información geográfica para mapear glaciares y lagunas."]
    ]),
    make("PE-CUL-005","PE","Culture","easy","a",[
      ["Which Indigenous language family has official recognition in parts of Peru where it predominates?",["Quechua","Basque","Sámi","Welsh"],"Quechua languages are Indigenous to the Andes and have official status in areas where they predominate."],
      ["Which Indigenous language family has official recognition in parts of Peru where it predominates?",["Quechua","Basque","Sámi","Welsh"],"Quechua languages are Indigenous to the Andes and have official status in areas where they predominate."],
      ["¿Qué familia de lenguas indígenas tiene reconocimiento oficial en las zonas del Perú donde predomina?",["Quechua","Euskera","Sami","Galés"],"Las lenguas quechuas son originarias de los Andes y tienen carácter oficial en las zonas donde predominan."],
      ["¿Qué familia lingüística indígena tiene carácter oficial en las zonas peruanas donde predomina?",["Quechua","Euskera","Sami","Galés"],"Las lenguas quechuas son propias de los Andes y son oficiales en los lugares donde predominan."]
    ]),
    make("PE-CUL-006","PE","Culture","medium","c",[
      ["Which city did UNESCO describe as the capital of the Inca Empire?",["Arequipa","Lima","Cuzco","Iquitos"],"UNESCO describes Cuzco as the historic capital of the Tawantinsuyu Inca Empire."],
      ["Which city did UNESCO describe as the capital of the Inca Empire?",["Arequipa","Lima","Cuzco","Iquitos"],"UNESCO describes Cuzco as the historic capital of the Tawantinsuyu Inca Empire."],
      ["¿Qué ciudad describe la UNESCO como capital del Imperio inca?",["Arequipa","Lima","Cusco","Iquitos"],"La UNESCO describe Cusco como la antigua capital del Imperio inca o Tawantinsuyu."],
      ["¿Qué ciudad reconoce la UNESCO como la capital histórica del Imperio inca?",["Arequipa","Lima","Cusco","Iquitos"],"La UNESCO identifica a Cusco como la capital histórica del Imperio inca, conocido como Tawantinsuyu."]
    ]),
    make("PE-CUL-007","PE","Culture","hard","d",[
      ["In which year was the Peruvian tradition of ceviche inscribed on UNESCO's Representative List of Intangible Cultural Heritage?",["2010","2015","2020","2023"],"UNESCO inscribed the practices and meanings associated with Peruvian ceviche in 2023."],
      ["In which year was the Peruvian tradition of ceviche inscribed on UNESCO's Representative List of Intangible Cultural Heritage?",["2010","2015","2020","2023"],"UNESCO inscribed the practices and meanings associated with Peruvian ceviche in 2023."],
      ["¿En qué año se inscribieron en la lista de patrimonio cultural inmaterial de la UNESCO las prácticas y significados del ceviche peruano?",["2010","2015","2020","2023"],"La UNESCO inscribió en 2023 las prácticas y significados asociados al ceviche peruano."],
      ["¿En qué año ingresaron a la lista de patrimonio cultural inmaterial de la UNESCO las prácticas y significados del ceviche peruano?",["2010","2015","2020","2023"],"La UNESCO incorporó en 2023 las prácticas y los significados vinculados al ceviche peruano."]
    ]),
    make("PE-CUL-008","PE","Culture","easy","b",[
      ["In which Peruvian city is the Festivity of Virgen de la Candelaria celebrated?",["Cusco","Puno","Trujillo","Piura"],"The Festivity of Virgen de la Candelaria is associated with the city of Puno."],
      ["In which Peruvian city is the Festivity of Virgen de la Candelaria celebrated?",["Cusco","Puno","Trujillo","Piura"],"The Festivity of Virgen de la Candelaria is associated with the city of Puno."],
      ["¿En qué ciudad peruana se celebra la Festividad de la Virgen de la Candelaria?",["Cusco","Puno","Trujillo","Piura"],"La Festividad de la Virgen de la Candelaria está vinculada a la ciudad de Puno."],
      ["¿En qué ciudad del Perú se realiza la Festividad de la Virgen de la Candelaria?",["Cusco","Puno","Trujillo","Piura"],"La Festividad de la Virgen de la Candelaria es una celebración emblemática de Puno."]
    ]),
    make("PE-CUL-009","PE","Culture","medium","a",[
      ["Which traditional Peruvian dance is known for its courtship style and pañuelo handkerchief?",["Marinera","Huayno","Tondero"," festejo"],"Marinera is a Peruvian partnered dance featuring elegant courtship movements and handkerchiefs."],
      ["Which traditional Peruvian dance is known for its courtship style and pañuelo handkerchief?",["Marinera","Huayno","Tondero","Festejo"],"Marinera is a Peruvian partnered dance featuring elegant courtship movements and handkerchiefs."],
      ["¿Qué danza tradicional peruana se caracteriza por el cortejo y el uso del pañuelo?",["Marinera","Huayno","Tondero","Festejo"],"La marinera es una danza de pareja peruana que representa el cortejo y utiliza pañuelos."],
      ["¿Qué baile tradicional del Perú destaca por su representación del cortejo y el uso del pañuelo?",["Marinera","Huayno","Tondero","Festejo"],"La marinera es una danza peruana de pareja que representa el cortejo mediante movimientos y pañuelos."]
    ]),
    make("PE-CUL-010","PE","Culture","hard","c",[
      ["What does the term Qhapaq Ñan refer to?",["A ceremonial lake","A royal textile","The Andean road system","A coastal irrigation canal"],"Qhapaq Ñan is the extensive road network built and used across the Andean region."],
      ["What does the term Qhapaq Ñan refer to?",["A ceremonial lake","A royal textile","The Andean road system","A coastal irrigation canal"],"Qhapaq Ñan is the extensive road network built and used across the Andean region."],
      ["¿A qué se refiere el término Qhapaq Ñan?",["Un lago ceremonial","Un tejido real","El sistema vial andino","Un canal de riego costero"],"El Qhapaq Ñan es la extensa red de caminos construida y utilizada en la región andina."],
      ["¿Qué designa el nombre Qhapaq Ñan?",["Un lago ceremonial","Un tejido real","El sistema de caminos andinos","Un canal de riego de la costa"],"El Qhapaq Ñan es una amplia red de caminos que conectó territorios de la región andina."]
    ])
  ];
  // Batch-specific quotas are validated independently by the repository validator.
  window.MINDQUEST_STAGED_QUESTIONS = [...(window.MINDQUEST_STAGED_QUESTIONS || []), ...rows];
})();
