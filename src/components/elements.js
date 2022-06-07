/*
		ЭЛЕМЕНТЫ
		{
			name: "Картвил", - отображаемое название
			score: 30, - очки за элемент
			description: '', - описание (пока не выводится)
			double: true, - true - есть правый и левый или носовой кормовой. false - элемент в единственном исполнении или может быть выполнен только один раз
			clean: true, - есть бонус clean
			superClean: true, - есть бонус superClean
			air: true, - есть бонус air
			huge: false, - есть бонус huge
			link: true, - есть бонус link
			link_elements: {}, - список элементов, с которыми возможны связки (в проекте)
			artistic: true, - есть бонус artistic
			playSpots: ['hole', 'wave'] - тип плейспота, на котором может быть выполнен данный элемент
		}
		БОНУСЫ
		clean: 
			{
				name: 'Клин', - название
				title:'Cl', - сокращение для отображения на чекбоксе
				code:'clean', - кодовое название
		TODO:	[class:'switch|depend'] - класс зависимости поведения для бонусов одного класса переключение [только один из] или включение [при выборе родительского]
				[clear:'superClean',] - при выборе данного бонуса сбрасывает связанный бонус
				[manage:'huge',] - при выборе этого бонуса разблокирует связанный бонус, при снятии выбора - снимает отметку и со связанного бонуса
				[depend:'air',] - зависит от связанного бонуса
				scores: [
					{from: 0,to: 30,score: 10}, - в зависимости от очков выбранного элемента значение очков бонуса разное
					{from: 30,to: 90,score: 30},
					{from: 90,to: 1000,score: 50}
				]
			}
		*/
	window.g_elements = [
		
		{
			name: "Entry #1",
			score: 30,
			description_en: '',
			description: 'Заходной элемент начального уровня',
			class: 'entry',
			clearCls: 'entry',
			double: false, clean: false, superClean: false, air: false, huge: false, link: false,
			link_elements: {},
			artistic: false, playSpots: ['hole', 'wave']},
		{
			name: "Entry #2",
			score: 50,
			description_en: '',
			description: 'Заходной элемент высокого уровня',
			class: 'entry',
			clearCls: 'entry',
			double: false, clean: false, superClean: false, air: false, huge: false, link: false,
			link_elements: {},
			artistic: false, playSpots: ['hole', 'wave']},
		{
			name: "Entry #3",
			score: 80,
			description_en: '',
			description: 'Заходной элемент очень высокого уровня',
			class: 'entry',
			clearCls: 'entry',
			double: false, clean: false, superClean: false, air: false, huge: false, link: false,
			link_elements: {},
			artistic: false, playSpots: ['hole', 'wave']},

		{
			name: "Шавит",
			score: 5,
			description_en: '',
			description: '2 последовательных горизонтальных вращения лодки на 180° с вертикальным углом 0 - 45° (начинается с носового серфа, переход на кормовой серф, затем снова на носовой серф), выполненные без паузы. Второе вращение должно быть в направлении, противоположном первому и на все время выполнения элемента одна лопаткой весла остается в воде.',
			double: true,
			clean: false,
			superClean: false,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: false,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Спин",
			score: 10,
			description_en: '',
			description: 'Горизонтальное (с вертикальным углом 0 - 45°) вращение на 360°',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: false,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Раундхаус",
			score: 15,
			description_en: '',
			description: 'Смена носового серфа на кормовой, выполненная вне пены с вертикальным углом 0- 45°, во время которого лодка вращается вокруг носа.',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: false,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Кормовой (Бэк) Раундхаус",
			score: 20,
			description_en: '',
			description: 'Смена кормового серфа на носовой, выполненная вне пены с вертикальным углом 0-45°, во время которого лодка вращается вокруг кормы.',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: false,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Блант",
			score: 50,
			description_en: '',
			description: 'Смена носового серфа на кормовой, выполненная вне пены с вертикальным углом более 45°, во время которого лодка вращается вокруг носа',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Кормовой (Бэк) Блант",
			score: 70,
			description_en: '',
			description: 'Смена кормового серфа на носовой, выполненная вне пены с вертикальным углом более 45°, во время которого лодка вращается вокруг кормы.',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Пан Ам",
			score: 110,
			description_en: '',
			description: 'Воздушное (в какой-то момент лодка полностью не в воде) вращение на «зеленой» воде с вертикальным углом более 90°, вне пены, во время которого атлет поворачивается вокруг носа лодки',
			double: true,
			clean: true,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Кормовой (Бэк) Пан Ам",
			score: 130,
			description_en: '',
			description: 'Воздушное вращение на «зеленой» воде с вертикальным углом более 90°, вне пены, во время которого атлет поворачивается вокруг кормы лодки.',
			double: true,
			clean: true,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		
		{
			name: "Картвил",
			score: 30,
			description_en: '',
			description: 'Две последовательные свечки в одном направлении, вертикальный угол каждой свечи 45-100°',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: false,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Сплитвил",
			score: 40,
			description_en: 'Two consecutive ends at a vertical angle of between 45° and 100° linked together by at least a 160° horizontal rotation near the vertical point of the first end on the long axis.',
			description: 'Две последовательные свечки со сменой направления вращения между ними, вертикальный угол каждой свечи 45-100° с горизонтальным вращением 160° на первой свече',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "ТрикиВу",
			score: 140,
			description_en: '',
			description: '3 последовательных вращения на 180°. Начинается элемент сплитвилом, за которым следует вращение на корме с вертикальным углом более 60° том же направлении, что и первое вращение сплитвила. Выполняется с использованием только одной лопатки весла.',
			double: true,
			clean: false,
			superClean: false,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		/*{
			name: "ВуТрики",
			score: 160,
			description_en: '',
			description: '',
			double: true,
			clean: true,
			superClean: false,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},*/
		{
			name: "Луп",
			score: 60,
			description_en: '',
			description: 'Сальто вперед, инициированное и законченное в горизонтальных углах +/-20°. Приземление – в бочке или на волне.',
			double: false,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Кормовой луп",
			score: 90,
			description_en: '',
			description: 'Сальто назад, инициированное и законченное в горизонтальных углах +/-20°. Приземление – в бочке или на волне.',
			double: false,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		/*-------------------*/
		{
			name: "Спейс Годзилла",
			score: 90,
			description_en: '',
			description: 'Воздушный луп с поворотом на 90° или более в середине сальто.',
			double: true,
			clean: true,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Лунар Орбит",
			score: 150,
			description_en: '',
			description: 'Вращение по горизонтали на как минимум 180°, начинающееся с носового серфа, переходящее затем в кормовой луп или кормовой картвил.',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Мак Насти / Пистл Флип",
			score: 120,
			description_en: '',
			description: 'Вращение по горизонтали на как минимум 150° или половина вращения вокруг оси лодки, переходящее в носовой воздушный луп или спейс-годзиллу.',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		
		{
			name: "Пируэт",
			score: 25,
			description_en: '',
			description: 'Горизонтальное вращение на 360° на носу с вертикальным углом более 45°',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: false,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Фоникс Манки",
			score: 140,
			description_en: '',
			description: 'Пируэт, инициируемый с гребка через нос в положении носового серфа, за которым (пируэтом) следует луп. Выполняется одним слитным движением.',
			double: true,
			clean: true,
			superClean: false,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Флип Терн",
			score: 90,
			description_en: '',
			description: 'Вращение более 90° по горизонтали, за которым следует вращение на корме с вертикальным углом более 45° – одним слитным движением. В какой-то момент лодка должна находиться в воздухе.',
			double: true,
			clean: true,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Эйр Скрю",
			score: 140,
			description_en: '',
			description: 'Вращение лодки вокруг своей оси, начинающееся с носового серфа, во время которого как минимум 180° лодка должна быть в воздухе.',
			double: true,
			clean: true,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Донки Флип",
			score: 90,
			description_en: '',
			description: 'Вращение лодки вокруг своей длинной оси на 360°, начинающееся с носового серфа, во время которого как минимум 180° лодка должна быть в воздухе; Приземление – в бочке или на волне.',
			double: true,
			clean: true,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},

		{
			name: "Феликс",
			score: 40,
			description_en: '',
			description: 'Горизонтальное вращение на 360°, как минимум 180° из которого лодка в перевернутом состоянии.',
			double: true,
			clean: false,
			superClean: true,
			air: false,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Хеликс",
			score: 150,
			description_en: '',
			description: 'Воздушный элемент. Горизонтальное вращение на 360°, как минимум 180° из которого лодка в перевернутом состоянии.',
			double: true,
			clean: false,
			superClean: true,
			air: false,
			huge: true,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Обратный Фоникс Манки",
			score: 160,
			description_en: '',
			description: 'Пируэт на корме, за которым следует кормовой луп. Выполняется одним слитным движением.',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},

		{
			name: "Трофи мув 1",
			score: 100,
			description_en: '',
			description: 'Элемент, не имеющий определения в данной таблице',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Трофи мув 2",
			score: 170,
			description_en: '',
			description: 'Элемент, не имеющий определения в данной таблице и основанный на умении высокого уровня',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave']
		},
		{
			name: "Трофи мув 3",
			score: 240,
			description_en: '',
			description: 'Элемент, не имеющий определения в данной таблице и основанный на умениях очень высокого уровня',
			double: true,
			clean: true,
			superClean: true,
			air: true,
			huge: false,
			link: true,
			link_elements: {},
			artistic: true,
			playSpots: ['hole', 'wave'
			]}
	]
	window.g_bonuses = {
	// clean:		{name: 'Клин',				title:'Cl',		class:'switch',	code:'clean',		clear:'superClean',	scores: [{from: 0,to: 30,score: 10},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 50}]},
		clean:		{name: 'Клин',				title:'Cl',		class:'switch',	code:'clean',							scores: [{from: 0,to: 30,score: 10},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 50}]},
		superClean: {name: 'Супер клин',		title:'SCl',	class:'switch',	code:'superClean',						scores: [{from: 0,to: 30,score: 20},{from: 30,to: 90,score: 40},{from: 90,to: 1000,score: 60}]},
		air:		{name: 'Воздушный (Эйр)',	title:'A',		class:'depend',	code:'air',			manage:'huge',		scores: [{from: 0,to: 30,score: 10},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 50}]},
		huge:		{name: 'Хьюдж',				title:'H',		class:'depend',	code:'huge',		depend:'air',		scores: [{from: 0,to: 30,score: 20},{from: 30,to: 90,score: 40},{from: 90,to: 1000,score: 50}]},
		link:		{name: 'Связки',			title:'Li',		class:'',		code:'link',							scores: [{from: 0,to: 30,score: 10},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 40}]},
		artistic:	{name: 'Трофи',				title:'Trp',	class:'',		code:'artistic',						scores: [{from: 0,to: 30,score:  0},{from: 30,to: 90,score: 10},{from: 90,to: 1000,score: 10}]}
	}
	window.g_elements_pool = [
		// {name: "Шавит", score: 5, description: '', double: true, clean: false, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Спин", score: 5, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Вертушка", score: 15, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: false, link_elements: {}, artistic: true, playSpots: ['pool']},

		// {name: "Раундхаус", score: 15, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		// {name: "Кормовой (Бэк) Раундхаус", score: 20, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		
		{name: "Эскимосский переворот", score: 5, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: false, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Феликс", score: 15, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "БекДекРолл (Кик Флип)", score: 20, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Фишер Кинг", score: 30, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Стойка", score: 15, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: false, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Смена вращения", score: 10, description: '', double: true, clean: true, superClean: true, air: false, huge: false, link: false, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Пируэт", score: 30, description: '', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Картвил", score: 40, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Сплитвил", score: 50, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "ТрикиВу", score: 140, description: '', double: true, clean: true, superClean: true, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Ву Трики", score: 160, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Лунар Орбит", score: 80, description: 'Кормовой (Бэк) Мак Насти', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Лунар Флип", score: 60, description: 'Кормовой (Бэк) Мак Насти', double: true, clean: false, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Луп", score: 90, description: '', double: false, clean: true, superClean: true, air: false, huge: true, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Спейс Годзилла", score: 120, description: '', double: true, clean: true, superClean: true, air: false, huge: true, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Фоникс Манки", score: 170, description: '', double: true, clean: true, superClean: false, air: false, huge: true, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Мак Насти", score: 110, description: '', double: true, clean: true, superClean: false, air: false, huge: true, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Мак Насти ПРО", score: 190, description: '', double: true, clean: true, superClean: false, air: false, huge: true, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Блант", score: 20, description: '', double: true, clean: true, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Кормовой (Бэк) Блант", score: 25, description: '', double: true, clean: true, superClean: false, air: false, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Кормовой Луп", score: 210, description: '', double: false, clean: true, superClean: false, air: false, huge: true, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		/*-------------------*/
		{name: "Трофи мув 1", score: 60, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Трофи мув 2", score: 100, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']},
		{name: "Трофи мув 3", score: 160, description: '', double: true, clean: true, superClean: true, air: true, huge: false, link: true, link_elements: {}, artistic: true, playSpots: ['pool']}
	]
	window.g_bonuses_pool = {
		clean: {name: 'Клин',title:'Cl',code:'clean',clear:'superClean',scores: [{from: 0,to: 30,score: 5},{from: 30,to: 90,score: 10},{from: 90,to: 1000,score: 30}]},
		superClean: {name: 'Супер клин',title:'SCl',code:'superClean',clear:'clean',scores: [{from: 0,to: 30,score: 5},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 40}]},
		air: {name: 'Воздушный (Эйр)',title:'A',code:'air',manage:'huge',scores: [{from: 0,to: 30,score: 10},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 50}]},
		huge: {name: 'Хьюдж',title:'H',code:'huge',depend:'air',scores: [{from: 0,to: 30,score: 20},{from: 30,to: 90,score: 40},{from: 90,to: 1000,score: 40}]},
		link: {name: 'Связки',title:'Li',code:'link',scores: [{from: 0,to: 30,score: 10},{from: 30,to: 90,score: 30},{from: 90,to: 1000,score: 40}]},
		artistic: {name: 'Трофи',title:'Trp',code:'artistic',scores: [{from: 0,to: 30,score: 0},{from: 30,to: 90,score: 10},{from: 90,to: 1000,score: 20}]}
	};
export default {
	name: 'elements',
	data: function() {
		return {
			g_elements: window.g_elements,
			g_bonuses: window.g_bonuses,
			g_elements_pool: window.g_elements_pool,
			g_bonuses_pool: window.g_bonuses_pool
		}
	}
}
