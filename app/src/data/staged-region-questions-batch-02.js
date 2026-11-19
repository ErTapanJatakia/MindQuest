/* Batch 02: staged, offline content. Not loaded by the live application. */
(() => {
  const t = (question, options, explanation) => ({
    question,
    options: Object.fromEntries(["a","b","c","d"].map((key, index) => [key, options[index]])),
    explanation
  });
  const q = (id, region, category, difficulty, correct, translations) => ({id,region,category,difficulty,correct,translations});
  const batchQuestions = [
    q("ES-GEO-004","ES","Geography","easy","a",{
      "en-IN":t("Into which ocean does the Guadalquivir River flow?",["Atlantic Ocean","Mediterranean Sea","Indian Ocean","Arctic Ocean"],"The Guadalquivir flows through Andalusia and reaches the Atlantic near the Gulf of Cádiz."),
      "en-US":t("Which ocean receives the Guadalquivir River?",["Atlantic Ocean","Mediterranean Sea","Indian Ocean","Arctic Ocean"],"The Guadalquivir flows through Andalusia and reaches the Atlantic near the Gulf of Cádiz."),
      "ru-RU":t("В какой океан впадает река Гвадалквивир?",["Атлантический океан","Средиземное море","Индийский океан","Северный Ледовитый океан"],"Гвадалквивир протекает через Андалусию и впадает в Атлантический океан у Кадисского залива."),
      "es-ES":t("¿En qué océano desemboca el río Guadalquivir?",["Océano Atlántico","Mar Mediterráneo","Océano Índico","Océano Ártico"],"El Guadalquivir atraviesa Andalucía y desemboca en el Atlántico, cerca del golfo de Cádiz."),
      "es-PE":t("¿A qué océano llega el río Guadalquivir?",["Océano Atlántico","Mar Mediterráneo","Océano Índico","Océano Ártico"],"El Guadalquivir recorre Andalucía y desemboca en el Atlántico, cerca del golfo de Cádiz.")
    }),
    q("ES-GEO-005","ES","Geography","medium","c",{
      "en-IN":t("What is the name of the large plateau occupying much of central Spain?",["Ebro Basin","Sierra Morena","Meseta Central","Pyrenean Foothills"],"The Meseta Central is the extensive high plateau at the centre of the Iberian Peninsula."),
      "en-US":t("Which large plateau occupies much of central Spain?",["Ebro Basin","Sierra Morena","Meseta Central","Pyrenean Foothills"],"The Meseta Central is the extensive high plateau at the centre of the Iberian Peninsula."),
      "ru-RU":t("Как называется обширное плоскогорье, занимающее значительную часть центральной Испании?",["Долина Эбро","Сьерра-Морена","Центральная Месета","Предгорья Пиренеев"],"Центральная Месета — обширное высокое плоскогорье в центре Пиренейского полуострова."),
      "es-ES":t("¿Cómo se llama la extensa meseta que ocupa buena parte del centro de España?",["Depresión del Ebro","Sierra Morena","Meseta Central","Piedemonte pirenaico"],"La Meseta Central es la extensa altiplanicie situada en el centro de la península ibérica."),
      "es-PE":t("¿Cuál es el nombre de la gran meseta que ocupa gran parte del centro de España?",["Depresión del Ebro","Sierra Morena","Meseta Central","Zona baja de los Pirineos"],"La Meseta Central es una amplia altiplanicie ubicada en el centro de la península ibérica.")
    }),
    q("ES-GEO-006","ES","Geography","hard","b",{
      "en-IN":t("In which body of water are Spain's Balearic Islands located?",["Atlantic Ocean","Mediterranean Sea","Bay of Biscay","Alboran Sea"],"The Balearic Islands lie in the Mediterranean, off Spain's eastern mainland coast."),
      "en-US":t("Which body of water contains Spain's Balearic Islands?",["Atlantic Ocean","Mediterranean Sea","Bay of Biscay","Alboran Sea"],"The Balearic Islands lie in the Mediterranean, off Spain's eastern mainland coast."),
      "ru-RU":t("В каком водоёме расположены испанские Балеарские острова?",["Атлантический океан","Средиземное море","Бискайский залив","Альборанское море"],"Балеарские острова находятся в Средиземном море у восточного побережья материковой Испании."),
      "es-ES":t("¿En qué mar se encuentran las islas Baleares españolas?",["Océano Atlántico","Mar Mediterráneo","Golfo de Vizcaya","Mar de Alborán"],"Las islas Baleares se encuentran en el Mediterráneo, frente a la costa oriental de la España peninsular."),
      "es-PE":t("¿En qué cuerpo de agua están ubicadas las islas Baleares de España?",["Océano Atlántico","Mar Mediterráneo","Golfo de Vizcaya","Mar de Alborán"],"Las islas Baleares están en el mar Mediterráneo, frente a la costa este de la España continental.")
    }),
    q("ES-HIS-004","ES","History","easy","d",{
      "en-IN":t("In which year did the Nasrid Kingdom of Granada surrender to the Catholic Monarchs?",["711","1212","1498","1492"],"The surrender of Granada on 2 January 1492 ended the last Muslim-ruled kingdom on the Iberian Peninsula."),
      "en-US":t("When did the Nasrid Kingdom of Granada surrender to the Catholic Monarchs?",["711","1212","1498","1492"],"Granada surrendered on January 2, 1492, ending the last Muslim-ruled kingdom on the Iberian Peninsula."),
      "ru-RU":t("В каком году Насридское королевство Гранада капитулировало перед католическими монархами?",["711","1212","1498","1492"],"Гранада капитулировала 2 января 1492 года, завершив существование последнего мусульманского государства на Пиренейском полуострове."),
      "es-ES":t("¿En qué año se rindió el reino nazarí de Granada ante los Reyes Católicos?",["711","1212","1498","1492"],"Granada se rindió el 2 de enero de 1492, poniendo fin al último reino musulmán de la península ibérica."),
      "es-PE":t("¿En qué año capituló el reino nazarí de Granada ante los Reyes Católicos?",["711","1212","1498","1492"],"Granada capituló el 2 de enero de 1492 y así terminó el último reino musulmán de la península ibérica.")
    }),
    q("ES-HIS-005","ES","History","medium","a",{
      "en-IN":t("From which Spanish city did Magellan's fleet begin its river journey toward Sanlúcar de Barrameda in August 1519?",["Seville","Madrid","Barcelona","Valencia"],"The expedition departed Seville before sailing downriver to Sanlúcar de Barrameda and beginning its ocean voyage in 1519."),
      "en-US":t("From which Spanish city did Magellan's fleet begin its river journey toward Sanlúcar de Barrameda in August 1519?",["Seville","Madrid","Barcelona","Valencia"],"The expedition departed Seville before sailing downriver to Sanlúcar de Barrameda and beginning its ocean voyage in 1519."),
      "ru-RU":t("Из какого испанского города флот Магеллана начал в августе 1519 года путь по реке к Санлукар-де-Баррамеда?",["Севилья","Мадрид","Барселона","Валенсия"],"Экспедиция отправилась из Севильи, затем спустилась по реке к Санлукар-де-Баррамеда и в 1519 году вышла в океан."),
      "es-ES":t("¿Desde qué ciudad española inició la flota de Magallanes en agosto de 1519 su recorrido fluvial hacia Sanlúcar de Barrameda?",["Sevilla","Madrid","Barcelona","Valencia"],"La expedición salió de Sevilla, bajó por el río hasta Sanlúcar de Barrameda y comenzó allí su travesía oceánica en 1519."),
      "es-PE":t("¿De qué ciudad española partió la flota de Magallanes en agosto de 1519 rumbo a Sanlúcar de Barrameda por el río Guadalquivir?",["Sevilla","Madrid","Barcelona","Valencia"],"La expedición salió de Sevilla, continuó río abajo hasta Sanlúcar de Barrameda y desde allí inició su travesía por el océano en 1519.")
    }),
    q("ES-SCI-003","ES","Science","easy","c",{
      "en-IN":t("Which Spanish engineer invented the autogyro, a rotorcraft precursor to the helicopter?",["Isaac Peral","Narcís Monturiol","Juan de la Cierva","Leonardo Torres Quevedo"],"Juan de la Cierva developed the autogyro; its first successful flight took place in Spain in 1923."),
      "en-US":t("Which Spanish engineer invented the autogyro, a precursor to the helicopter?",["Isaac Peral","Narcís Monturiol","Juan de la Cierva","Leonardo Torres Quevedo"],"Juan de la Cierva developed the autogyro; its first successful flight took place in Spain in 1923."),
      "ru-RU":t("Какой испанский инженер изобрёл автожир — предшественник вертолёта?",["Исаак Пераль","Нарсис Монтуриоль","Хуан де ла Сьерва","Леонардо Торрес Кеведо"],"Хуан де ла Сьерва разработал автожир; первый успешный полёт состоялся в Испании в 1923 году."),
      "es-ES":t("¿Qué ingeniero español inventó el autogiro, precursor del helicóptero?",["Isaac Peral","Narcís Monturiol","Juan de la Cierva","Leonardo Torres Quevedo"],"Juan de la Cierva desarrolló el autogiro, cuyo primer vuelo exitoso tuvo lugar en España en 1923."),
      "es-PE":t("¿Qué ingeniero de España inventó el autogiro, considerado precursor del helicóptero?",["Isaac Peral","Narcís Monturiol","Juan de la Cierva","Leonardo Torres Quevedo"],"Juan de la Cierva desarrolló el autogiro; su primer vuelo exitoso se realizó en España en 1923.")
    }),
    q("ES-SCI-004","ES","Science","medium","b",{
      "en-IN":t("In which year did Isaac Peral launch his pioneering submarine in Cádiz Bay?",["1878","1888","1898","1908"],"Isaac Peral's submarine was launched in Cádiz Bay on 8 September 1888."),
      "en-US":t("When did Isaac Peral launch his pioneering submarine in the Bay of Cádiz?",["1878","1888","1898","1908"],"Isaac Peral's submarine was launched in the Bay of Cádiz on September 8, 1888."),
      "ru-RU":t("В каком году Исаак Пераль спустил на воду свою новаторскую подводную лодку в Кадисском заливе?",["1878","1888","1898","1908"],"Подводная лодка Исаака Пераля была спущена на воду в Кадисском заливе 8 сентября 1888 года."),
      "es-ES":t("¿En qué año botó Isaac Peral su innovador submarino en la bahía de Cádiz?",["1878","1888","1898","1908"],"El submarino de Isaac Peral fue botado en la bahía de Cádiz el 8 de septiembre de 1888."),
      "es-PE":t("¿En qué año Isaac Peral lanzó al agua su submarino pionero en la bahía de Cádiz?",["1878","1888","1898","1908"],"El submarino de Isaac Peral fue botado en la bahía de Cádiz el 8 de septiembre de 1888.")
    }),
    q("ES-SCI-005","ES","Science","hard","d",{
      "en-IN":t("Which enzyme did Spanish biochemist Margarita Salas help characterise for highly accurate DNA amplification?",["RNA ligase","Reverse transcriptase","Restriction endonuclease","Phi29 DNA polymerase"],"Margarita Salas and her colleagues characterised phi29 DNA polymerase, an enzyme valued for highly accurate DNA amplification."),
      "en-US":t("Which enzyme did Spanish biochemist Margarita Salas help characterize for high-fidelity DNA amplification?",["RNA ligase","Reverse transcriptase","Restriction endonuclease","Phi29 DNA polymerase"],"Margarita Salas and her colleagues characterized phi29 DNA polymerase, an enzyme valued for highly accurate DNA amplification."),
      "ru-RU":t("Какой фермент испанский биохимик Маргарита Салас помогла охарактеризовать для точной амплификации ДНК?",["РНК-лигаза","Обратная транскриптаза","Рестрикционная эндонуклеаза","ДНК-полимераза фага φ29"],"Маргарита Салас и её коллеги охарактеризовали ДНК-полимеразу фага φ29, известную высокой точностью амплификации ДНК."),
      "es-ES":t("¿Qué enzima ayudó a caracterizar la bioquímica española Margarita Salas para amplificar ADN con gran precisión?",["Ligasa de ARN","Transcriptasa inversa","Endonucleasa de restricción","ADN polimerasa del fago phi29"],"Margarita Salas y sus colaboradores caracterizaron la ADN polimerasa del fago phi29, una enzima destacada por la gran precisión de la amplificación del ADN."),
      "es-PE":t("¿Qué enzima contribuyó a caracterizar la bioquímica española Margarita Salas para lograr una amplificación precisa del ADN?",["Ligasa de ARN","Transcriptasa inversa","Endonucleasa de restricción","ADN polimerasa del fago phi29"],"Margarita Salas y su equipo caracterizaron la ADN polimerasa del fago phi29, reconocida por su alta precisión al amplificar ADN.")
    }),
    q("ES-CUL-003","ES","Culture","medium","a",{
      "en-IN":t("Which architect designed Barcelona's famous Sagrada Família basilica?",["Antoni Gaudí","Santiago Calatrava","Rafael Moneo","Lluís Domènech i Montaner"],"Antoni Gaudí designed the Sagrada Família; UNESCO recognises parts of the basilica within its Works of Antoni Gaudí property."),
      "en-US":t("Who designed Barcelona's famous Sagrada Família basilica?",["Antoni Gaudí","Santiago Calatrava","Rafael Moneo","Lluís Domènech i Montaner"],"Antoni Gaudí designed the Sagrada Família; UNESCO recognizes parts of the basilica within its Works of Antoni Gaudí property."),
      "ru-RU":t("Какой архитектор спроектировал знаменитую базилику Саграда Фамилия в Барселоне?",["Антонио Гауди","Сантьяго Калатрава","Рафаэль Монео","Льюис Доменек-и-Монтанер"],"Антонио Гауди спроектировал Саграда Фамилия; части базилики входят в объект всемирного наследия «Творения Антонио Гауди»."),
      "es-ES":t("¿Qué arquitecto diseñó la famosa basílica de la Sagrada Familia de Barcelona?",["Antoni Gaudí","Santiago Calatrava","Rafael Moneo","Lluís Domènech i Montaner"],"Antoni Gaudí diseñó la Sagrada Familia; algunas partes de la basílica forman parte del bien Patrimonio Mundial «Obras de Antoni Gaudí»."),
      "es-PE":t("¿Quién diseñó la conocida basílica de la Sagrada Familia en Barcelona?",["Antoni Gaudí","Santiago Calatrava","Rafael Moneo","Lluís Domènech i Montaner"],"Antoni Gaudí estuvo a cargo del diseño de la Sagrada Familia; partes de la basílica integran el sitio Patrimonio Mundial dedicado a sus obras.")
    }),
    q("ES-CUL-004","ES","Culture","hard","c",{
      "en-IN":t("Which region of Spain is described by UNESCO as the heartland of flamenco?",["Galicia","Catalonia","Andalusia","Asturias"],"UNESCO describes Andalusia in southern Spain as the heartland of flamenco, an art combining song, dance and music."),
      "en-US":t("Which Spanish region does UNESCO identify as the heartland of flamenco?",["Galicia","Catalonia","Andalusia","Asturias"],"UNESCO describes Andalusia in southern Spain as the heartland of flamenco, an art combining song, dance and music."),
      "ru-RU":t("Какой регион Испании ЮНЕСКО называет центром фламенко?",["Галисия","Каталония","Андалусия","Астурия"],"ЮНЕСКО называет Андалусию на юге Испании сердцем фламенко — искусства, объединяющего пение, танец и музыку."),
      "es-ES":t("¿Qué región de España considera la UNESCO el corazón del flamenco?",["Galicia","Cataluña","Andalucía","Asturias"],"La UNESCO considera Andalucía, en el sur de España, el corazón del flamenco, una expresión que combina cante, baile y música."),
      "es-PE":t("¿Qué región española señala la UNESCO como el principal núcleo del flamenco?",["Galicia","Cataluña","Andalucía","Asturias"],"La UNESCO identifica a Andalucía, al sur de España, como el corazón del flamenco, expresión que reúne canto, baile y música.")
    }),
    q("PE-GEO-004","PE","Geography","easy","b",{
      "en-IN":t("Which large lake lies on the border between Peru and Bolivia?",["Lake Junín","Lake Titicaca","Lake Argentino","Lake Maracaibo"],"Lake Titicaca is shared by Peru and Bolivia in the high Andes."),
      "en-US":t("Which major lake is shared by Peru and Bolivia?",["Lake Junín","Lake Titicaca","Lake Argentino","Lake Maracaibo"],"Lake Titicaca is shared by Peru and Bolivia in the high Andes."),
      "ru-RU":t("Какое крупное озеро расположено на границе Перу и Боливии?",["Озеро Хунин","Озеро Титикака","Озеро Архентино","Озеро Маракайбо"],"Озеро Титикака находится в высокогорных Андах и разделяется Перу и Боливией."),
      "es-ES":t("¿Qué gran lago comparten Perú y Bolivia?",["Lago Junín","Lago Titicaca","Lago Argentino","Lago de Maracaibo"],"El lago Titicaca se encuentra en los Andes y está compartido por Perú y Bolivia."),
      "es-PE":t("¿Cuál es el gran lago que comparten el Perú y Bolivia?",["Lago Junín","Lago Titicaca","Lago Argentino","Lago de Maracaibo"],"El lago Titicaca está ubicado en los Andes y su territorio se comparte entre el Perú y Bolivia.")
    }),
    q("PE-GEO-005","PE","Geography","medium","a",{
      "en-IN":t("In which Peruvian region is the famous Colca Canyon located?",["Arequipa","Cusco","Loreto","Piura"],"Colca Canyon is a major natural attraction in the Arequipa region of southern Peru."),
      "en-US":t("Which Peruvian region is home to Colca Canyon?",["Arequipa","Cusco","Loreto","Piura"],"Colca Canyon is a major natural attraction in the Arequipa region of southern Peru."),
      "ru-RU":t("В каком регионе Перу находится знаменитый каньон Колка?",["Арекипа","Куско","Лорето","Пьюра"],"Каньон Колка — известная природная достопримечательность региона Арекипа на юге Перу."),
      "es-ES":t("¿En qué región peruana se encuentra el famoso cañón del Colca?",["Arequipa","Cusco","Loreto","Piura"],"El cañón del Colca es uno de los principales atractivos naturales de la región de Arequipa, en el sur del Perú."),
      "es-PE":t("¿En qué región del Perú está ubicado el conocido cañón del Colca?",["Arequipa","Cusco","Loreto","Piura"],"El cañón del Colca es un importante atractivo natural de la región Arequipa, en el sur peruano.")
    }),
    q("PE-GEO-006","PE","Geography","hard","d",{
      "en-IN":t("Which ocean borders Peru along its western coastline?",["Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"],"Peru's western coastline faces the Pacific Ocean."),
      "en-US":t("Which ocean forms Peru's western maritime boundary?",["Atlantic Ocean","Indian Ocean","Arctic Ocean","Pacific Ocean"],"Peru's western coastline faces the Pacific Ocean."),
      "ru-RU":t("Какой океан омывает западное побережье Перу?",["Атлантический океан","Индийский океан","Северный Ледовитый океан","Тихий океан"],"Западное побережье Перу выходит к Тихому океану."),
      "es-ES":t("¿Qué océano baña la costa occidental del Perú?",["Océano Atlántico","Océano Índico","Océano Ártico","Océano Pacífico"],"La costa occidental del Perú está bañada por el océano Pacífico."),
      "es-PE":t("¿Con qué océano limita el Perú por el oeste?",["Océano Atlántico","Océano Índico","Océano Ártico","Océano Pacífico"],"El litoral occidental del Perú se encuentra frente al océano Pacífico.")
    }),
    q("PE-HIS-004","PE","History","easy","c",{
      "en-IN":t("On what date did the Battle of Ayacucho take place in 1824?",["6 August","28 July","9 December","24 June"],"The Battle of Ayacucho took place on 9 December 1824 and decisively consolidated Peruvian independence."),
      "en-US":t("When was the Battle of Ayacucho fought in 1824?",["August 6","July 28","December 9","June 24"],"The Battle of Ayacucho took place on December 9, 1824, and decisively consolidated Peruvian independence."),
      "ru-RU":t("Когда в 1824 году состоялась битва при Аякучо?",["6 августа","28 июля","9 декабря","24 июня"],"Битва при Аякучо состоялась 9 декабря 1824 года и окончательно укрепила независимость Перу."),
      "es-ES":t("¿En qué fecha tuvo lugar la batalla de Ayacucho en 1824?",["6 de agosto","28 de julio","9 de diciembre","24 de junio"],"La batalla de Ayacucho tuvo lugar el 9 de diciembre de 1824 y consolidó decisivamente la independencia del Perú."),
      "es-PE":t("¿Qué día se libró la batalla de Ayacucho en 1824?",["6 de agosto","28 de julio","9 de diciembre","24 de junio"],"La batalla de Ayacucho se libró el 9 de diciembre de 1824 y consolidó de manera decisiva la independencia peruana.")
    }),
    q("PE-HIS-005","PE","History","medium","a",{
      "en-IN":t("In which year did the major uprising led by Túpac Amaru II begin in Peru?",["1780","1810","1821","1879"],"The uprising led by José Gabriel Condorcanqui, known as Túpac Amaru II, began in 1780."),
      "en-US":t("When did the major uprising led by Túpac Amaru II begin in Peru?",["1780","1810","1821","1879"],"The uprising led by José Gabriel Condorcanqui, known as Túpac Amaru II, began in 1780."),
      "ru-RU":t("В каком году в Перу началось крупное восстание под руководством Тупака Амару II?",["1780","1810","1821","1879"],"Восстание под руководством Хосе Габриэля Кондорканки, известного как Тупак Амару II, началось в 1780 году."),
      "es-ES":t("¿En qué año comenzó en el Perú la gran rebelión encabezada por Túpac Amaru II?",["1780","1810","1821","1879"],"La rebelión encabezada por José Gabriel Condorcanqui, conocido como Túpac Amaru II, comenzó en 1780."),
      "es-PE":t("¿En qué año se inició en el Perú el gran levantamiento liderado por Túpac Amaru II?",["1780","1810","1821","1879"],"El levantamiento de José Gabriel Condorcanqui, llamado Túpac Amaru II, comenzó en 1780.")
    }),
    q("PE-SCI-003","PE","Science","easy","b",{
      "en-IN":t("Which Peruvian medical student conducted a famous self-inoculation experiment in 1885 while studying Peruvian wart disease and Oroya fever?",["Pedro Paulet","Daniel Alcides Carrión","Hipólito Unanue","Carlos Monge"],"Daniel Alcides Carrión inoculated himself in 1885 while investigating Peruvian wart and Oroya fever; his observations became a landmark in Peruvian medicine."),
      "en-US":t("Which Peruvian medical student conducted a famous self-inoculation experiment in 1885 while studying Peruvian wart disease and Oroya fever?",["Pedro Paulet","Daniel Alcides Carrión","Hipólito Unanue","Carlos Monge"],"Daniel Alcides Carrión inoculated himself in 1885 while investigating Peruvian wart and Oroya fever; his observations became a landmark in Peruvian medicine."),
      "ru-RU":t("Какой перуанский студент-медик в 1885 году провёл известный опыт самоинокуляции, изучая перуанскую бородавку и лихорадку Оройя?",["Педро Паулет","Даниэль Альсидес Каррион","Иполито Унануэ","Карлос Монхе"],"Даниэль Альсидес Каррион провёл самоинокуляцию в 1885 году, исследуя перуанскую бородавку и лихорадку Оройя; его наблюдения стали важной вехой перуанской медицины."),
      "es-ES":t("¿Qué estudiante peruano de medicina realizó en 1885 un famoso experimento de autoinoculación mientras estudiaba la verruga peruana y la fiebre de La Oroya?",["Pedro Paulet","Daniel Alcides Carrión","Hipólito Unanue","Carlos Monge"],"Daniel Alcides Carrión se inoculó en 1885 mientras investigaba la verruga peruana y la fiebre de La Oroya; sus observaciones marcaron un hito en la medicina peruana."),
      "es-PE":t("¿Qué estudiante de medicina del Perú realizó en 1885 un conocido experimento de autoinoculación mientras estudiaba la verruga peruana y la fiebre de La Oroya?",["Pedro Paulet","Daniel Alcides Carrión","Hipólito Unanue","Carlos Monge"],"Daniel Alcides Carrión realizó la inoculación en 1885 durante sus estudios sobre la verruga peruana y la fiebre de La Oroya; sus apuntes fueron un hito para la medicina nacional.")
    }),
    q("PE-SCI-004","PE","Science","medium","d",{
      "en-IN":t("Which Peruvian ice cap has been studied through ice cores that preserve evidence of past climate conditions?",["Pastoruri","Coropuna","Huascarán","Quelccaya"],"Scientists have drilled ice cores at Quelccaya in the southern Peruvian Andes; the layers preserve climate signals including El Niño and La Niña cycles."),
      "en-US":t("Which ice cap in Peru has yielded ice cores preserving evidence of past climate conditions?",["Pastoruri","Coropuna","Huascarán","Quelccaya"],"Scientists have drilled ice cores at Quelccaya in the southern Peruvian Andes; the layers preserve climate signals including El Niño and La Niña cycles."),
      "ru-RU":t("На каком ледниковом массиве Перу исследователи брали ледяные керны, сохраняющие сведения о климате прошлого?",["Пасторури","Коропуна","Уаскаран","Келькая"],"Учёные бурили ледяные керны на Келькае в южных Перуанских Андах; слои льда сохраняют климатические сигналы, включая циклы Эль-Ниньо и Ла-Нинья."),
      "es-ES":t("¿En qué casquete glaciar del Perú se han extraído testigos de hielo que conservan señales del clima del pasado?",["Pastoruri","Coropuna","Huascarán","Quelccaya"],"Los científicos han extraído testigos de hielo en Quelccaya, en los Andes del sur del Perú; sus capas conservan señales climáticas, incluidos los ciclos de El Niño y La Niña."),
      "es-PE":t("¿Qué masa glaciar peruana ha sido estudiada mediante núcleos de hielo que guardan registros del clima antiguo?",["Pastoruri","Coropuna","Huascarán","Quelccaya"],"En Quelccaya, en los Andes del sur peruano, se han perforado núcleos de hielo cuyas capas conservan señales del clima, como los ciclos de El Niño y La Niña.")
    }),
    q("PE-SCI-005","PE","Science","hard","a",{
      "en-IN":t("What ocean process brings cold, nutrient-rich deep water toward Peru's coast in the Humboldt Current system?",["Coastal upwelling","Thermal expansion","Tidal locking","Coral bleaching"],"Wind-driven coastal upwelling brings nutrient-rich water toward the surface and helps make the Humboldt Current ecosystem highly productive."),
      "en-US":t("Which ocean process brings cold, nutrient-rich deep water toward Peru's coast in the Humboldt Current system?",["Coastal upwelling","Thermal expansion","Tidal locking","Coral bleaching"],"Wind-driven coastal upwelling brings nutrient-rich water toward the surface and helps make the Humboldt Current ecosystem highly productive."),
      "ru-RU":t("Какой океанический процесс поднимает холодную воду, богатую питательными веществами, к побережью Перу в системе течения Гумбольдта?",["Прибрежный апвеллинг","Тепловое расширение","Приливная синхронизация","Обесцвечивание кораллов"],"Вызванный ветром прибрежный апвеллинг поднимает к поверхности воду, богатую питательными веществами, и обеспечивает высокую продуктивность экосистемы течения Гумбольдта."),
      "es-ES":t("¿Qué proceso oceánico lleva hacia la costa peruana aguas profundas, frías y ricas en nutrientes en el sistema de la corriente de Humboldt?",["Afloramiento costero","Expansión térmica","Acoplamiento de mareas","Blanqueamiento de corales"],"El afloramiento costero impulsado por el viento acerca a la superficie aguas ricas en nutrientes y favorece la gran productividad del ecosistema de la corriente de Humboldt."),
      "es-PE":t("¿Qué proceso del océano hace subir aguas profundas, frías y con nutrientes hacia la costa peruana en el sistema de la corriente de Humboldt?",["Afloramiento costero","Expansión térmica","Acoplamiento de mareas","Blanqueamiento de corales"],"El afloramiento costero, impulsado por los vientos, lleva nutrientes hacia la superficie y contribuye a la alta productividad del ecosistema de la corriente de Humboldt.")
    }),
    q("PE-CUL-003","PE","Culture","medium","c",{
      "en-IN":t("What are the enormous designs etched into the desert near Nasca in southern Peru commonly called?",["Moche murals","Inca terraces","Nasca Lines","Chimú friezes"],"The Nasca Lines are large geoglyphs etched into the arid coastal plain of southern Peru."),
      "en-US":t("What is the common name for the enormous designs etched into the desert near Nasca, Peru?",["Moche murals","Inca terraces","Nasca Lines","Chimú friezes"],"The Nasca Lines are large geoglyphs etched into the arid coastal plain of southern Peru."),
      "ru-RU":t("Как обычно называют огромные изображения, нанесённые на пустынную поверхность возле Наски на юге Перу?",["Росписи моче","Террасы инков","Линии Наска","Рельефы чиму"],"Линии Наска — это крупные геоглифы, нанесённые на поверхность засушливой прибрежной равнины на юге Перу."),
      "es-ES":t("¿Cómo se conocen habitualmente los enormes dibujos trazados en el desierto cerca de Nasca, en el sur del Perú?",["Murales mochicas","Andenes incas","Líneas de Nasca","Frisos chimúes"],"Las Líneas de Nasca son grandes geoglifos trazados sobre la árida llanura costera del sur del Perú."),
      "es-PE":t("¿Cómo se llaman los enormes diseños trazados sobre el desierto cerca de Nasca, al sur del Perú?",["Murales mochicas","Andenes incas","Líneas de Nasca","Frisos chimúes"],"Las Líneas de Nasca son grandes geoglifos dibujados sobre la árida planicie costera del sur peruano.")
    }),
    q("PE-CUL-004","PE","Culture","hard","b",{
      "en-IN":t("Which pre-Columbian kingdom had Chan Chan as its capital?",["Wari","Chimú","Moche","Chavín"],"Chan Chan was the capital of the Chimú Kingdom and became the largest earthen-architecture city in pre-Columbian America."),
      "en-US":t("Which pre-Columbian kingdom made Chan Chan its capital?",["Wari","Chimú","Moche","Chavín"],"Chan Chan was the capital of the Chimú Kingdom and became the largest earthen-architecture city in pre-Columbian America."),
      "ru-RU":t("Какое доколумбово государство имело столицу в городе Чан-Чан?",["Уари","Чиму","Моче","Чавин"],"Чан-Чан был столицей государства чиму и стал крупнейшим городом из земляной архитектуры в доколумбовой Америке."),
      "es-ES":t("¿Qué reino precolombino tuvo su capital en Chan Chan?",["Wari","Chimú","Moche","Chavín"],"Chan Chan fue la capital del reino chimú y llegó a ser la mayor ciudad de arquitectura de tierra de la América precolombina."),
      "es-PE":t("¿Qué reino de la época precolombina estableció su capital en Chan Chan?",["Wari","Chimú","Moche","Chavín"],"Chan Chan fue la capital del reino chimú y se convirtió en la ciudad de arquitectura de tierra más grande de la América precolombina.")
    })
  ];
  window.MINDQUEST_STAGED_QUESTIONS = [...(window.MINDQUEST_STAGED_QUESTIONS || []), ...batchQuestions];
})();
