/* Staged, offline question-bank content. Not loaded by the application until both regional banks pass every gate. */
(() => {
  const t = (question, options, explanation) => ({
    question,
    options: Object.fromEntries(["a", "b", "c", "d"].map((key, index) => [key, options[index]])),
    explanation
  });
  const q = (id, region, category, difficulty, correct, translations) => ({
    id, region, category, difficulty, correct, translations
  });

  const batchQuestions = [
    q("ES-GEO-001","ES","Geography","easy","b",{
      "en-IN":t("Which mountain is the highest point on Spanish soil?",["Mulhacén","Mount Teide","Aneto","Moncayo"],"Mount Teide on Tenerife reaches 3,718 metres and is the highest point on Spanish soil."),
      "en-US":t("What is the highest point in Spain?",["Mulhacén","Mount Teide","Aneto","Moncayo"],"Mount Teide on Tenerife reaches 3,718 meters and is the highest point on Spanish soil."),
      "ru-RU":t("Какая гора является высшей точкой территории Испании?",["Муласен","Тейде","Ането","Монкайо"],"Гора Тейде на острове Тенерифе достигает 3 718 метров и является высшей точкой территории Испании."),
      "es-ES":t("¿Qué montaña es el punto más alto del territorio español?",["Mulhacén","Teide","Aneto","Moncayo"],"El Teide, en Tenerife, alcanza los 3.718 metros y es el punto más alto del territorio español."),
      "es-PE":t("¿Cuál es la montaña más alta del territorio de España?",["Mulhacén","Teide","Aneto","Moncayo"],"El Teide, ubicado en Tenerife, llega a los 3.718 metros y constituye el punto más alto del territorio español.")
    }),
    q("ES-GEO-002","ES","Geography","medium","c",{
      "en-IN":t("Into which sea does the Ebro River flow?",["Cantabrian Sea","Atlantic Ocean","Mediterranean Sea","Black Sea"],"The Ebro crosses north-eastern Spain and reaches the Mediterranean through its delta in Catalonia."),
      "en-US":t("Which sea receives the Ebro River?",["Cantabrian Sea","Atlantic Ocean","Mediterranean Sea","Black Sea"],"The Ebro crosses northeastern Spain and reaches the Mediterranean through its delta in Catalonia."),
      "ru-RU":t("В какое море впадает река Эбро?",["Кантабрийское море","Атлантический океан","Средиземное море","Чёрное море"],"Эбро протекает по северо-востоку Испании и впадает в Средиземное море через дельту в Каталонии."),
      "es-ES":t("¿En qué mar desemboca el río Ebro?",["Mar Cantábrico","Océano Atlántico","Mar Mediterráneo","Mar Negro"],"El Ebro atraviesa el noreste de España y desemboca en el Mediterráneo mediante su delta en Cataluña."),
      "es-PE":t("¿A qué mar llega el río Ebro?",["Mar Cantábrico","Océano Atlántico","Mar Mediterráneo","Mar Negro"],"El Ebro recorre el noreste de España y desemboca en el mar Mediterráneo a través de su delta en Cataluña.")
    }),
    q("ES-GEO-003","ES","Geography","hard","a",{
      "en-IN":t("Which mountain range forms much of the natural border between Spain and France?",["The Pyrenees","The Alps","The Apennines","The Carpathians"],"The Pyrenees extend along the border between Spain and France, separating the Iberian Peninsula from the rest of continental Europe."),
      "en-US":t("Which mountain range forms much of the natural boundary between Spain and France?",["The Pyrenees","The Alps","The Apennines","The Carpathians"],"The Pyrenees run along the border between Spain and France, separating the Iberian Peninsula from the rest of continental Europe."),
      "ru-RU":t("Какой горный хребет образует значительную часть естественной границы Испании и Франции?",["Пиренеи","Альпы","Апеннины","Карпаты"],"Пиренеи протянулись вдоль границы Испании и Франции, отделяя Пиренейский полуостров от остальной континентальной Европы."),
      "es-ES":t("¿Qué cordillera forma buena parte de la frontera natural entre España y Francia?",["Los Pirineos","Los Alpes","Los Apeninos","Los Cárpatos"],"Los Pirineos se extienden a lo largo de la frontera entre España y Francia y separan la península ibérica del resto de la Europa continental."),
      "es-PE":t("¿Qué cadena montañosa constituye gran parte del límite natural entre España y Francia?",["Los Pirineos","Los Alpes","Los Apeninos","Los Cárpatos"],"Los Pirineos recorren la frontera entre España y Francia y separan la península ibérica del resto de Europa continental.")
    }),
    q("ES-HIS-001","ES","History","easy","d",{
      "en-IN":t("On which date did Spanish voters ratify the 1978 Constitution in a referendum?",["31 October 1978","27 December 1978","29 December 1978","6 December 1978"],"The Spanish people ratified the Constitution in a referendum on 6 December 1978."),
      "en-US":t("When did Spanish voters approve the 1978 Constitution in a referendum?",["October 31, 1978","December 27, 1978","December 29, 1978","December 6, 1978"],"Spanish voters ratified the Constitution in a referendum on December 6, 1978."),
      "ru-RU":t("Когда граждане Испании одобрили Конституцию 1978 года на референдуме?",["31 октября 1978 года","27 декабря 1978 года","29 декабря 1978 года","6 декабря 1978 года"],"Граждане Испании ратифицировали Конституцию на референдуме 6 декабря 1978 года."),
      "es-ES":t("¿En qué fecha ratificó el pueblo español la Constitución de 1978 mediante referéndum?",["31 de octubre de 1978","27 de diciembre de 1978","29 de diciembre de 1978","6 de diciembre de 1978"],"El pueblo español ratificó la Constitución en un referéndum celebrado el 6 de diciembre de 1978."),
      "es-PE":t("¿Qué día aprobó la ciudadanía española la Constitución de 1978 en un referéndum?",["31 de octubre de 1978","27 de diciembre de 1978","29 de diciembre de 1978","6 de diciembre de 1978"],"La población española ratificó la Constitución mediante un referéndum realizado el 6 de diciembre de 1978.")
    }),
    q("ES-HIS-002","ES","History","medium","b",{
      "en-IN":t("In which Spanish city is the Alhambra palace complex located?",["Seville","Granada","Toledo","Córdoba"],"The Alhambra, Generalife and Albayzín form the historic medieval landscape of Granada in Andalusia."),
      "en-US":t("Which Spanish city is home to the Alhambra palace complex?",["Seville","Granada","Toledo","Córdoba"],"The Alhambra, Generalife, and Albayzín form the historic medieval landscape of Granada in Andalusia."),
      "ru-RU":t("В каком испанском городе расположен дворцовый комплекс Альгамбра?",["Севилья","Гранада","Толедо","Кордова"],"Альгамбра, Хенералифе и Альбайсин входят в исторический средневековый ансамбль Гранады в Андалусии."),
      "es-ES":t("¿En qué ciudad española se encuentra el conjunto palaciego de la Alhambra?",["Sevilla","Granada","Toledo","Córdoba"],"La Alhambra, el Generalife y el Albaicín forman parte del paisaje histórico medieval de Granada, en Andalucía."),
      "es-PE":t("¿En qué ciudad de España está ubicado el conjunto monumental de la Alhambra?",["Sevilla","Granada","Toledo","Córdoba"],"La Alhambra, el Generalife y el Albaicín integran el paisaje histórico medieval de Granada, en Andalucía.")
    }),
    q("ES-HIS-003","ES","History","hard","c",{
      "en-IN":t("The Roman city of Tarraco is associated with which modern Spanish city?",["Valencia","Zaragoza","Tarragona","Málaga"],"The Roman archaeological ensemble of Tarraco is located in modern Tarragona, Catalonia."),
      "en-US":t("Which present-day Spanish city contains the Roman archaeological site of Tarraco?",["Valencia","Zaragoza","Tarragona","Málaga"],"The Roman archaeological ensemble of Tarraco is located in modern Tarragona, Catalonia."),
      "ru-RU":t("С каким современным испанским городом связан римский город Таррако?",["Валенсия","Сарагоса","Таррагона","Малага"],"Археологический комплекс римского Таррако расположен на территории современной Таррагоны в Каталонии."),
      "es-ES":t("¿Con qué ciudad española actual se identifica la antigua ciudad romana de Tarraco?",["Valencia","Zaragoza","Tarragona","Málaga"],"El conjunto arqueológico de la antigua Tarraco romana se encuentra en la actual Tarragona, en Cataluña."),
      "es-PE":t("¿A qué ciudad española de hoy corresponde la antigua ciudad romana de Tarraco?",["Valencia","Zaragoza","Tarragona","Málaga"],"El conjunto arqueológico de Tarraco se ubica en la actual ciudad de Tarragona, en Cataluña.")
    }),
    q("ES-SCI-001","ES","Science","medium","a",{
      "en-IN":t("Which Spanish-born scientist shared the 1959 Nobel Prize in Physiology or Medicine for work on the synthesis of RNA and DNA?",["Severo Ochoa","Santiago Ramón y Cajal","Margarita Salas","Juan de la Cierva"],"Severo Ochoa shared the 1959 Nobel Prize in Physiology or Medicine for discoveries concerning the biological synthesis of RNA and DNA."),
      "en-US":t("Which Spanish-born scientist shared the 1959 Nobel Prize in Physiology or Medicine for discoveries about RNA and DNA synthesis?",["Severo Ochoa","Santiago Ramón y Cajal","Margarita Salas","Juan de la Cierva"],"Severo Ochoa shared the 1959 Nobel Prize in Physiology or Medicine for discoveries concerning the biological synthesis of RNA and DNA."),
      "ru-RU":t("Какой учёный испанского происхождения получил Нобелевскую премию по физиологии и медицине в 1959 году за исследования синтеза РНК и ДНК?",["Северо Очоа","Сантьяго Рамон-и-Кахаль","Маргарита Салас","Хуан де ла Сьерва"],"Северо Очоа разделил Нобелевскую премию по физиологии и медицине 1959 года за открытия, касающиеся биологического синтеза РНК и ДНК."),
      "es-ES":t("¿Qué científico español compartió el Nobel de Fisiología o Medicina de 1959 por sus descubrimientos sobre la síntesis del ARN y el ADN?",["Severo Ochoa","Santiago Ramón y Cajal","Margarita Salas","Juan de la Cierva"],"Severo Ochoa compartió el Nobel de Fisiología o Medicina de 1959 por sus descubrimientos sobre la síntesis biológica del ARN y del ADN."),
      "es-PE":t("¿Qué científico nacido en España obtuvo el Nobel de Fisiología o Medicina de 1959 por sus hallazgos sobre la síntesis de ARN y ADN?",["Severo Ochoa","Santiago Ramón y Cajal","Margarita Salas","Juan de la Cierva"],"Severo Ochoa compartió el Premio Nobel de Fisiología o Medicina de 1959 por sus descubrimientos relacionados con la síntesis biológica del ARN y el ADN.")
    }),
    q("ES-SCI-002","ES","Science","hard","d",{
      "en-IN":t("For which field did Santiago Ramón y Cajal receive the 1906 Nobel Prize?",["Chemistry","Physics","Literature","Physiology or Medicine"],"Ramón y Cajal shared the 1906 Nobel Prize in Physiology or Medicine for work on the structure of the nervous system."),
      "en-US":t("In which category did Santiago Ramón y Cajal receive the 1906 Nobel Prize?",["Chemistry","Physics","Literature","Physiology or Medicine"],"Ramón y Cajal shared the 1906 Nobel Prize in Physiology or Medicine for work on the structure of the nervous system."),
      "ru-RU":t("В какой области Сантьяго Рамон-и-Кахаль получил Нобелевскую премию 1906 года?",["Химия","Физика","Литература","Физиология и медицина"],"Рамон-и-Кахаль разделил Нобелевскую премию по физиологии и медицине 1906 года за исследования строения нервной системы."),
      "es-ES":t("¿En qué categoría recibió Santiago Ramón y Cajal el Premio Nobel de 1906?",["Química","Física","Literatura","Fisiología o Medicina"],"Ramón y Cajal compartió el Nobel de Fisiología o Medicina de 1906 por sus investigaciones sobre la estructura del sistema nervioso."),
      "es-PE":t("¿En qué área obtuvo Santiago Ramón y Cajal el Premio Nobel en 1906?",["Química","Física","Literatura","Fisiología o Medicina"],"Ramón y Cajal compartió el Nobel de Fisiología o Medicina de 1906 por sus estudios sobre la estructura del sistema nervioso.")
    }),
    q("ES-CUL-001","ES","Culture","easy","c",{
      "en-IN":t("Who wrote the novel Don Quixote?",["Federico García Lorca","Lope de Vega","Miguel de Cervantes","Benito Pérez Galdós"],"Miguel de Cervantes wrote Don Quixote, first published in two parts in 1605 and 1615."),
      "en-US":t("Who is the author of Don Quixote?",["Federico García Lorca","Lope de Vega","Miguel de Cervantes","Benito Pérez Galdós"],"Miguel de Cervantes wrote Don Quixote, first published in two parts in 1605 and 1615."),
      "ru-RU":t("Кто написал роман «Дон Кихот»?",["Федерико Гарсиа Лорка","Лопе де Вега","Мигель де Сервантес","Бенито Перес Гальдос"],"Мигель де Сервантес написал «Дон Кихота», опубликованного в двух частях в 1605 и 1615 годах."),
      "es-ES":t("¿Quién escribió la novela Don Quijote?",["Federico García Lorca","Lope de Vega","Miguel de Cervantes","Benito Pérez Galdós"],"Miguel de Cervantes escribió Don Quijote, publicado en dos partes en 1605 y 1615."),
      "es-PE":t("¿Quién es el autor de la novela Don Quijote?",["Federico García Lorca","Lope de Vega","Miguel de Cervantes","Benito Pérez Galdós"],"Miguel de Cervantes escribió Don Quijote, cuya publicación en dos partes tuvo lugar en 1605 y 1615.")
    }),
    q("ES-CUL-002","ES","Culture","medium","b",{
      "en-IN":t("Who painted the large anti-war mural Guernica?",["Salvador Dalí","Pablo Picasso","Joan Miró","Francisco Goya"],"Pablo Picasso painted Guernica in 1937 in response to the bombing of the Basque town during the Spanish Civil War."),
      "en-US":t("Which artist painted the anti-war work Guernica?",["Salvador Dalí","Pablo Picasso","Joan Miró","Francisco Goya"],"Pablo Picasso painted Guernica in 1937 in response to the bombing of the Basque town during the Spanish Civil War."),
      "ru-RU":t("Кто написал антивоенную картину «Герника»?",["Сальвадор Дали","Пабло Пикассо","Жоан Миро","Франсиско Гойя"],"Пабло Пикассо создал «Гернику» в 1937 году в ответ на бомбардировку баскского города во время гражданской войны в Испании."),
      "es-ES":t("¿Quién pintó el gran mural antibelicista Guernica?",["Salvador Dalí","Pablo Picasso","Joan Miró","Francisco de Goya"],"Pablo Picasso pintó Guernica en 1937 como respuesta al bombardeo de la localidad vasca durante la guerra civil española."),
      "es-PE":t("¿Qué artista pintó la obra antibélica Guernica?",["Salvador Dalí","Pablo Picasso","Joan Miró","Francisco de Goya"],"Pablo Picasso pintó Guernica en 1937, como respuesta al bombardeo de la localidad vasca durante la guerra civil española.")
    }),

    q("PE-GEO-001","PE","Geography","easy","a",{
      "en-IN":t("What is the highest mountain in Peru?",["Mount Huascarán","Mount Ausangate","Coropuna","Alpamayo"],"Mount Huascarán, in the Cordillera Blanca, is Peru's highest peak at 6,768 metres."),
      "en-US":t("Which is the highest mountain in Peru?",["Mount Huascarán","Mount Ausangate","Coropuna","Alpamayo"],"Mount Huascarán, in the Cordillera Blanca, is Peru's highest peak at 6,768 meters."),
      "ru-RU":t("Какая гора является самой высокой в Перу?",["Уаскаран","Аусангате","Коропуна","Альпамайо"],"Гора Уаскаран в Кордильере-Бланка является высшей точкой Перу; её высота составляет 6 768 метров."),
      "es-ES":t("¿Cuál es la montaña más alta del Perú?",["Huascarán","Ausangate","Coropuna","Alpamayo"],"El Huascarán, situado en la Cordillera Blanca, es la cumbre más alta del Perú, con 6.768 metros."),
      "es-PE":t("¿Qué montaña alcanza la mayor altitud en el Perú?",["Huascarán","Ausangate","Coropuna","Alpamayo"],"El Huascarán, en la Cordillera Blanca, es el pico más alto del Perú y llega a los 6.768 metros.")
    }),
    q("PE-GEO-002","PE","Geography","medium","c",{
      "en-IN":t("In which mountain range is Peru's Huascarán National Park located?",["Cordillera Real","Andes of Patagonia","Cordillera Blanca","Sierra Nevada"],"Huascarán National Park protects a large part of the Cordillera Blanca in the Peruvian Andes."),
      "en-US":t("Which mountain range contains Peru's Huascarán National Park?",["Cordillera Real","Andes of Patagonia","Cordillera Blanca","Sierra Nevada"],"Huascarán National Park protects a large part of the Cordillera Blanca in the Peruvian Andes."),
      "ru-RU":t("В каком горном хребте расположен национальный парк Уаскаран в Перу?",["Кордельера-Реаль","Патагонские Анды","Кордильера-Бланка","Сьерра-Невада"],"Национальный парк Уаскаран охраняет значительную часть Кордильеры-Бланка в перуанских Андах."),
      "es-ES":t("¿En qué cordillera se encuentra el Parque Nacional Huascarán, en el Perú?",["Cordillera Real","Andes patagónicos","Cordillera Blanca","Sierra Nevada"],"El Parque Nacional Huascarán protege una extensa parte de la Cordillera Blanca, en los Andes peruanos."),
      "es-PE":t("¿En qué cadena montañosa está ubicado el Parque Nacional Huascarán?",["Cordillera Real","Andes patagónicos","Cordillera Blanca","Sierra Nevada"],"El Parque Nacional Huascarán protege gran parte de la Cordillera Blanca, que forma parte de los Andes peruanos.")
    }),
    q("PE-GEO-003","PE","Geography","hard","d",{
      "en-IN":t("At approximately what elevation above sea level does the archaeological citadel of Machu Picchu stand?",["1,430 metres","3,430 metres","4,300 metres","2,430 metres"],"UNESCO describes the Historic Sanctuary of Machu Picchu as standing about 2,430 metres above sea level."),
      "en-US":t("At approximately what elevation is the archaeological citadel of Machu Picchu?",["1,430 meters","3,430 meters","4,300 meters","2,430 meters"],"UNESCO describes the Historic Sanctuary of Machu Picchu as standing about 2,430 meters above sea level."),
      "ru-RU":t("На какой приблизительной высоте над уровнем моря расположена археологическая цитадель Мачу-Пикчу?",["1 430 метров","3 430 метров","4 300 метров","2 430 метров"],"По данным ЮНЕСКО, исторический заповедник Мачу-Пикчу расположен примерно на высоте 2 430 метров над уровнем моря."),
      "es-ES":t("¿A qué altitud aproximada sobre el nivel del mar se encuentra la ciudadela arqueológica de Machu Picchu?",["1.430 metros","3.430 metros","4.300 metros","2.430 metros"],"La UNESCO sitúa el Santuario Histórico de Machu Picchu a unos 2.430 metros sobre el nivel del mar."),
      "es-PE":t("¿A cuántos metros sobre el nivel del mar se ubica aproximadamente la ciudadela arqueológica de Machu Picchu?",["1.430 metros","3.430 metros","4.300 metros","2.430 metros"],"Según la UNESCO, el Santuario Histórico de Machu Picchu se encuentra a unos 2.430 metros sobre el nivel del mar.")
    }),
    q("PE-HIS-001","PE","History","easy","b",{
      "en-IN":t("In which year did José de San Martín proclaim Peru's independence?",["1810","1821","1824","1830"],"Peru's independence was proclaimed by José de San Martín in 1821."),
      "en-US":t("What year did José de San Martín proclaim Peru's independence?",["1810","1821","1824","1830"],"José de San Martín proclaimed Peru's independence in 1821."),
      "ru-RU":t("В каком году Хосе де Сан-Мартин провозгласил независимость Перу?",["1810","1821","1824","1830"],"Хосе де Сан-Мартин провозгласил независимость Перу в 1821 году."),
      "es-ES":t("¿En qué año proclamó José de San Martín la independencia del Perú?",["1810","1821","1824","1830"],"José de San Martín proclamó la independencia del Perú en 1821."),
      "es-PE":t("¿En qué año declaró José de San Martín la independencia del Perú?",["1810","1821","1824","1830"],"José de San Martín proclamó la independencia peruana en 1821.")
    }),
    q("PE-HIS-002","PE","History","medium","a",{
      "en-IN":t("Which ancient Peruvian site is identified by UNESCO as the oldest centre of civilisation in the Americas?",["Caral-Supe","Chan Chan","Pachacamac","Kuélap"],"UNESCO identifies the Sacred City of Caral-Supe as the oldest centre of civilisation in the Americas, dating to about 5,000 years ago."),
      "en-US":t("Which ancient Peruvian site does UNESCO describe as the oldest center of civilization in the Americas?",["Caral-Supe","Chan Chan","Pachacamac","Kuélap"],"UNESCO identifies the Sacred City of Caral-Supe as the oldest center of civilization in the Americas, dating to about 5,000 years ago."),
      "ru-RU":t("Какой древний памятник Перу ЮНЕСКО называет древнейшим центром цивилизации в Америке?",["Караль-Супе","Чан-Чан","Пачакамак","Куэлап"],"ЮНЕСКО называет Священный город Караль-Супе древнейшим центром цивилизации в Америке; его возраст составляет около 5 000 лет."),
      "es-ES":t("¿Qué antiguo yacimiento peruano identifica la UNESCO como el centro de civilización más antiguo de América?",["Caral-Supe","Chan Chan","Pachacámac","Kuélap"],"La UNESCO identifica la Ciudad Sagrada de Caral-Supe como el centro de civilización más antiguo de América, con unos 5.000 años de antigüedad."),
      "es-PE":t("¿Qué sitio arqueológico del Perú es reconocido por la UNESCO como el centro de civilización más antiguo de América?",["Caral-Supe","Chan Chan","Pachacámac","Kuélap"],"La UNESCO reconoce a la Ciudad Sagrada de Caral-Supe como el centro de civilización más antiguo de América; tiene alrededor de 5.000 años.")
    }),
    q("PE-HIS-003","PE","History","hard","c",{
      "en-IN":t("In which year was the Sacred City of Caral-Supe inscribed on the UNESCO World Heritage List?",["1983","1994","2009","2021"],"The Sacred City of Caral-Supe was inscribed on the UNESCO World Heritage List in 2009."),
      "en-US":t("When was the Sacred City of Caral-Supe added to the UNESCO World Heritage List?",["1983","1994","2009","2021"],"The Sacred City of Caral-Supe was inscribed on the UNESCO World Heritage List in 2009."),
      "ru-RU":t("В каком году Священный город Караль-Супе был включён в Список всемирного наследия ЮНЕСКО?",["1983","1994","2009","2021"],"Священный город Караль-Супе был включён в Список всемирного наследия ЮНЕСКО в 2009 году."),
      "es-ES":t("¿En qué año se inscribió la Ciudad Sagrada de Caral-Supe en la Lista del Patrimonio Mundial de la UNESCO?",["1983","1994","2009","2021"],"La Ciudad Sagrada de Caral-Supe fue inscrita en la Lista del Patrimonio Mundial de la UNESCO en 2009."),
      "es-PE":t("¿En qué año ingresó la Ciudad Sagrada de Caral-Supe a la Lista del Patrimonio Mundial de la UNESCO?",["1983","1994","2009","2021"],"La Ciudad Sagrada de Caral-Supe fue incorporada a la Lista del Patrimonio Mundial de la UNESCO en 2009.")
    }),
    q("PE-SCI-001","PE","Science","medium","d",{
      "en-IN":t("How many towers form the famous solar-marker line at Peru's Chankillo archaeological complex?",["Seven","Ten","Twelve","Thirteen"],"Chankillo's line of thirteen towers functioned as a solar calendar, marking the sun's annual movement."),
      "en-US":t("How many towers make up the famous solar-marker line at Peru's Chankillo complex?",["Seven","Ten","Twelve","Thirteen"],"Chankillo's line of thirteen towers functioned as a solar calendar, marking the sun's annual movement."),
      "ru-RU":t("Сколько башен образуют знаменитую линию солнечных маркеров археологического комплекса Чанкильо в Перу?",["Семь","Десять","Двенадцать","Тринадцать"],"Линия из тринадцати башен Чанкильо служила солнечным календарём и позволяла отслеживать годовое движение Солнца."),
      "es-ES":t("¿Cuántas torres forman la famosa línea de marcadores solares del complejo arqueológico de Chankillo, en el Perú?",["Siete","Diez","Doce","Trece"],"La línea de trece torres de Chankillo funcionaba como un calendario solar y permitía seguir el movimiento anual del Sol."),
      "es-PE":t("¿Cuántas torres tiene la conocida línea de marcadores solares del complejo arqueológico de Chankillo?",["Siete","Diez","Doce","Trece"],"La fila de trece torres de Chankillo funcionaba como un calendario solar para observar el recorrido anual del Sol.")
    }),
    q("PE-SCI-002","PE","Science","hard","b",{
      "en-IN":t("What ancient Andean recording device, made from knotted cords, has also been found at the Caral-Supe site?",["Astrolabe","Quipu","Abacus","Sundial"],"UNESCO notes that a quipu found at Caral-Supe provides evidence of the society's use of this knotted-cord recording system."),
      "en-US":t("Which ancient Andean record-keeping device made of knotted cords has also been found at Caral-Supe?",["Astrolabe","Quipu","Abacus","Sundial"],"UNESCO notes that a quipu found at Caral-Supe provides evidence of the society's use of this knotted-cord recording system."),
      "ru-RU":t("Какое древнее андское устройство для записи информации из узелковых шнуров было найдено в Караль-Супе?",["Астролябия","Кипу","Абак","Солнечные часы"],"ЮНЕСКО отмечает, что найденное в Караль-Супе кипу свидетельствует об использовании этой системы записи с помощью узелковых шнуров."),
      "es-ES":t("¿Qué antiguo sistema andino para registrar información, elaborado con cuerdas y nudos, también se ha hallado en Caral-Supe?",["Astrolabio","Quipu","Ábaco","Reloj solar"],"La UNESCO señala que el hallazgo de un quipu en Caral-Supe demuestra el uso de este sistema de registro mediante cuerdas anudadas."),
      "es-PE":t("¿Qué antiguo instrumento andino para llevar registros, hecho con cuerdas anudadas, también fue encontrado en Caral-Supe?",["Astrolabio","Quipu","Ábaco","Reloj de sol"],"La UNESCO indica que el quipu hallado en Caral-Supe evidencia el uso de este sistema de registro elaborado con cuerdas y nudos.")
    }),
    q("PE-CUL-001","PE","Culture","easy","a",{
      "en-IN":t("Which civilisation is most closely associated with the historic sanctuary of Machu Picchu?",["The Inca civilisation","The Moche civilisation","The Wari civilisation","The Chavín civilisation"],"UNESCO describes Machu Picchu as a significant tangible legacy of the Inca civilisation."),
      "en-US":t("Which civilization is most closely associated with the Historic Sanctuary of Machu Picchu?",["The Inca civilization","The Moche civilization","The Wari civilization","The Chavín civilization"],"UNESCO describes Machu Picchu as a significant tangible legacy of the Inca civilization."),
      "ru-RU":t("С какой цивилизацией прежде всего связан исторический заповедник Мачу-Пикчу?",["Цивилизация инков","Цивилизация моче","Цивилизация вари","Цивилизация чавин"],"ЮНЕСКО характеризует Мачу-Пикчу как важнейшее материальное наследие цивилизации инков."),
      "es-ES":t("¿Con qué civilización se relaciona principalmente el Santuario Histórico de Machu Picchu?",["La civilización inca","La civilización moche","La civilización wari","La civilización chavín"],"La UNESCO describe Machu Picchu como uno de los legados materiales más importantes de la civilización inca."),
      "es-PE":t("¿Qué civilización está más vinculada con el Santuario Histórico de Machu Picchu?",["La civilización inca","La civilización moche","La civilización wari","La civilización chavín"],"La UNESCO considera a Machu Picchu uno de los legados materiales más importantes de la civilización inca.")
    }),
    q("PE-CUL-002","PE","Culture","medium","c",{
      "en-IN":t("Which Peruvian city was the historic centre of the Inca Empire and is recognised by UNESCO as a World Heritage property?",["Arequipa","Trujillo","Cusco","Iquitos"],"The City of Cusco was inscribed on the UNESCO World Heritage List in 1983 and preserves the historic capital of the Inca Empire."),
      "en-US":t("Which Peruvian city was the historic capital of the Inca Empire and is recognized by UNESCO as a World Heritage property?",["Arequipa","Trujillo","Cusco","Iquitos"],"The City of Cusco was inscribed on the UNESCO World Heritage List in 1983 and preserves the historic capital of the Inca Empire."),
      "ru-RU":t("Какой город Перу был историческим центром империи инков и включён ЮНЕСКО в список всемирного наследия?",["Арекипа","Трухильо","Куско","Икитос"],"Город Куско включён в Список всемирного наследия ЮНЕСКО в 1983 году и сохраняет наследие исторической столицы империи инков."),
      "es-ES":t("¿Qué ciudad peruana fue el centro histórico del Imperio inca y está reconocida por la UNESCO como Patrimonio Mundial?",["Arequipa","Trujillo","Cusco","Iquitos"],"La ciudad de Cusco fue inscrita en la Lista del Patrimonio Mundial de la UNESCO en 1983 y conserva el legado de la antigua capital inca."),
      "es-PE":t("¿Qué ciudad del Perú fue el centro histórico del Imperio inca y cuenta con reconocimiento de la UNESCO como Patrimonio Mundial?",["Arequipa","Trujillo","Cusco","Iquitos"],"La ciudad del Cusco ingresó a la Lista del Patrimonio Mundial de la UNESCO en 1983 y conserva el legado de la antigua capital inca.")
    })
  ];
  window.MINDQUEST_STAGED_QUESTIONS = [...(window.MINDQUEST_STAGED_QUESTIONS || []), ...batchQuestions];
})();
