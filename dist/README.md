# freestyle-calc
# author: Denisova Elena
# date: 26.04.2022
# version 2.2

# Что нового?
# 2.1
• Добавлена сортировка спортсменов при добавлении в хит.
• Порядок добавления добавляет спортсмена в конец списка хита, позиции остальных пересчитываются
• В финале порядок зависит от набранных очков, порядок обратный количеству баллов.
• Заблокирован выбор элементов без выбора этапа, хита, !спортсмена, чтобы не было ситуаций, когда набрали элементов, но забыли выбрать спортсмена и при выборе таблица элементов очистилась.
• Расширен блок с распределением спортсменов в хиты - на узких экранах не все элементы управления влезают без горизонтальной прокрутки.
• Список спорсменов, участвующих в соревнованиях можно предварительно внести в файл kayakers.js, данные из которого подхватываются страницей и используются. Формат JSON необходимо сохранить имеющийся в файле. Обязательными являются поля ФИО и пол.
• Так же добавлять спортсменов можно по одному в разделе управления списком спорсменов, или несколько сразу в блоке ниже в формате с табуляцией или только ФИО. Пол и хит можно будет выбрать в основном списке спортсменов, после добавления.

# 2.2
• Добавлен тип заездов - session. 1 попытка, при переключении сохранённый результат восстанавливается и можно докатывать.

# 2.3
• запрос списка спортсменов, распределённых по хитам из отдельного файла JSON, в дальнейшем - запросом на сервер.
• смена хранилища с sessionStorage на localStorage для стабильной работы
• исправлена логика для clean и superClean бонусов, теперь они независимы друг от друга
• исправлен бонус huge для дорогих элементов на 50


# Что это вообще и для чего нужно?
Эта система разработана для упрощения подсчёта очков в соревнованиях по фристайлу на бурной воде.

• На вкладке Управления списком спорстменов можно добавить нового спортсмена, распределить спортсменов по хитам в этапе соревнований.
• На вкладке соревнования для каждого спортсмена в хите ведётся подсчёт очков и бонусов к выполненым элементам в каждой попытке в соответствии с Правилами по фристайлу на бурной воде.
• Результат записывается в сессионную переменную.
• На странице результатов выводится список спортсменов с результатами этапа, в зависимости от выбранного этапа и пола. Подсчёт результата в каждом этапе осуществляется по правилам, т.е. в квалификации и четверть-финале результатом будет сумма 2х лучших попыток, в полуфинале и финале - лучшая попытка.
• Со страницы результатов спортсменов можно распределить по хитам на следующий этап соревнований.

# Как можно использовать на смартфоне?

# Андройд
найти и поставить програмульку - простой сервер на апаче, например SimpleHttpServer.
в его настройках обычно указана папка /storage/emulated/0/, но там много разных папок, поэтому создаём ещё одну, в которую будет смотреть сервер, откуда он будет запускать index.html странички и куда надо будет положить все скачанные файлы.

# iOS
тут увы я не знаю какой программой можно воспользоваться, так что ищите сами и потом напишите мне, чтобы добавить в описание в этот файл.