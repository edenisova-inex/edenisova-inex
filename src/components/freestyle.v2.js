import appresultstab from '@/components/appresultstab.vue';
import elements from '@/components/elements.js';
import mainmenu from '@/components/mainmenu.vue';
import editlist from '@/components/edit-list.vue';
import timer from '@/components/timer.vue';

// import kayakers from '@/components/kayakers.js';

var vm,
	g_judges = [
		{name: 'Судья #1',show: true, default: true},
		{name: 'Судья #2',show: false, default: false},
		{name: 'Судья #3',show: false, default: false},
		{name: 'Судья #4',show: false, default: false},
		{name: 'Судья #5',show: false, default: false}
	],
	g_kayakers = [ // sex М[0] / Ж[1]
		// { name: 'Тестовый', sex: 'М' , bib: '1', hit: '1', birthdate: '', place: 'Москва', club: 'АБВ', coach: '', rank: ''},
		// { name: 'Тестовый2', sex: 'М' , bib: '2', hit: '1', birthdate: '', place: 'Москва', club: 'АБВ', coach: '', rank: ''},
		/*
		{ name: 'name', sex: 1, bib: '', hit: '', birthdate: '', place: '', club: '', coach: '', rank: '' },
		*/
	],
	g_part = {
		"квалификация": {
			runCount: 4, // 2/4 - возвратный/невозвратный плейспот, сумма 2-х лучших
			best: [3, 5, 10, 20],
			bestScores: function(arr) {
				arr.sort(function(a, b) { return b - a; });
				// console.log('квалификация, bestScores', arr);
				return arr[1] ? arr[0] + arr[1] : arr[0];
			},
			runs: [],
			default: true,
			hits: function(hit) {
				let obj = [];
				hit.forEach(kayaker => {
					let name = kayaker.split(' ').slice(1).join(' ');
					let bib = kayaker.split(' ')[0].split('#')[1];
					obj.push({ name, bib });
				})
				return obj;
			}
		},
		"четверть-финал": {
			runCount: 3, // сумма 2-х лучших
			best: [3, 5, 10],
			bestScores: function(arr) {
				arr.sort(function(a, b) { return b - a; });
				// console.log('четверть-полуфинал, bestScores', arr);
				return arr[1] ? arr[0] + arr[1] : arr[0];
			},
			runs: [],
			hits: function(hit) {
				let obj = [];
				hit.forEach(kayaker => {
					let name = kayaker.split(' ').slice(1).join(' ');
					let bib = kayaker.split(' ')[0].split('#')[1];
					obj.push({ name, bib });
				})
				return obj;
			}
		},
		"полуфинал": {
			runCount: 2, // 1 лучший
			best: [3, 5], // , 10
			bestScores: function(arr) {
				arr.sort(function(a, b) { return b - a; });
				// console.log('полуфинал, bestScores', arr);
				return arr[0];
			},
			runs: [],
			hits: function(hit) {
				let obj = [];
				hit.forEach(kayaker => {
					let name = kayaker.split(' ').slice(1).join(' ');
					let bib = kayaker.split(' ')[0].split('#')[1];
					obj.push({ name, bib });
				})
				return obj;
			}
		},
		"финал": {
			runCount: 3, // 1 лучший
			best: [3],
			bestScores: function(arr) {
				arr.sort(function(a, b) { return b - a; });
				// console.log('финал, bestScores', arr);
				return arr[0];
			},
			runs: [],
			hits: function(hit, scores) {
				// console.log('финал, старт по набранным очкам', hit, scores);
				var ks = [], obj = [];
				hit.forEach(kayaker => {
					let name = kayaker.split(' ').slice(1).join(' ');
					let bib = kayaker.split(' ')[0].split('#')[1];
					ks.push({ name, bib });
				});
				ks.forEach(k => {
					let name = k.name;
					let bib = k.bib;
					let score = scores[bib];
					console.log(name, bib, scores[bib]);
					obj.push({ name, score, bib });
				})
				obj.sort(function(a,b) { return a.score - b.score });
				// console.log('obj', obj);
				return obj;
			}
		},
		"*session": {
			runCount: 1, // 1 лучший
			best: [1, 3],
			bestScores: function(arr) {
				arr.sort(function(a, b) { return b - a; });
				// console.log('финал, bestScores', arr);
				return arr[0];
			},
			runs: [],
			hits: function(hit, scores) {
				// console.log('финал, старт по набранным очкам', hit, scores);
				var ks = [], obj = [];
				hit.forEach(kayaker => {
					let name = kayaker.split(' ').slice(1).join(' ');
					let bib = kayaker.split(' ')[0].split('#')[1];
					ks.push({ name, bib });
				});
				ks.forEach(k => {
					let name = k.name;
					let bib = k.bib;
					let score = scores[bib];
					// console.log(name, bib, scores[bib]);
					obj.push({ name, score, bib });
				})
				obj.sort(function(a,b) { return a.score - b.score });
				// console.log('obj', obj);
				return obj;
			}
		}
	};

export default {
	name: 'freestyle',
	data: function() {
		return {
			blankElements: {
				name: '',
				score: 0,
				bonuses: {}
			},
			blank_kayaker: {
				name: '',
				bib: '',
				hit: '',
				hit_position: 0,
				hit_part: 'квалификация',
				sex: 0, // М[0] / Ж[1]
				saved: true,
				place: '',
				club: '',
				coach: '',
				birthdate: '',
				rank: ''
			},
			sex: ['М', 'Ж'],
			elements: {},
			elementsDescription: {},
			SHOW_ELEMDECRIPTION: false,
			bonuses: {},
			judges: {},
			part: {},
			run: [],
			hits: {},
			kayakers: [],
			thisRun: [],
			SHOW_KAYAKERS_LIST: true,
			ADD_LIST: '', // добавление сразу списка в формате [Ф И О][tab][sex 0|1][tab][bib][tab][hit]
			RESULT: {},
			INFORUN: {
				judge: '',
				hit: 1,
				part: 'квалификация',
				sex: 0,
				run: 1,
				kayaker_name: '',
				kayaker_bib: 0,
				kayaker_bestScores: 0,
				saved: false
			},
			thisRESULT: {
				part: 'квалификация',
				sex: 0,
				totalRESULT: []
			},
			menu: {
				// TODO: Привести в порядок. краткая версия без блокировки элементов, чтобы просто посчитать без сохранения, но с очисткой всего.
				show: false, // показать меню
				showTop: true, // показать верхнее меню
				showBottom: true, // показать нижнее меню
				pool: false, // бассейн
				full: true, // краткая версия полного скрайблиста без судей и привязок к попыткам и хитам
				elements: true, // полная версия скрайблиста
				competitors: false, // управление участниками
				results: false, // результаты
				updated: true,
				clear: false,
				about: false,
				timer: false // блок таймера. зелёный, старт 45 сек - на чёрном фоне, 35 сек - жёлтый фон/звук, 45 сек - красный фон/звук
			},
			thisRun_scores: 0,
			FINALs: {
				0: {},
				1: {}
			},
			clear: {
				'kayakers': [false, 'Список какеров'],
				'prelimscores': [false, ''],
				'hits': [false, 'Список хитов'],
				'result': [false, 'Результаты всех этапов', 'prelimscores']
			},
			info: window.screen,
			maxHeight: 500,
			about: '',
			hasNotAbout: false
		}
	},
	components: {
		appresultstab,
		elements,
		mainmenu,
		editlist,
		timer
		// descriptions
	},
	computed: {
		competitor_name: function() {
			return this.INFORUN.kayaker_bib ? this.getNameByBib(this.INFORUN.kayaker_bib) : null;
		},
		SAVERUN_DISABLED: function() {
			return !this.INFORUN.judge || !this.INFORUN.part || !this.INFORUN.hit || !this.INFORUN.run || !this.INFORUN.kayaker_bib;
		},
		used_part: function() {
			return this.INFORUN.part;
		},
		fillHitsMSG: function() {
			if (!this.hits[this.INFORUN.sex]) return true;
			if (!this.hits[this.INFORUN.sex][this.INFORUN.part]) return true;
			return !Object.keys(this.hits[this.INFORUN.sex][this.INFORUN.part]).length
		},
		saved: function() {
			return this.checkSavedRun();
		},
		HITS: function() {
			if (!this.part[this.INFORUN.part].hits) return null;
			return this.part[this.INFORUN.part].hits(this.hits[this.INFORUN.sex][this.INFORUN.part][this.INFORUN.hit], this.FINALs[this.INFORUN.sex]);
		}
	},
	filters: {},
	mounted: function() {
		var self = this, i, j;
		self.elements = g_elements;
		self.bonuses = g_bonuses;
		self.judges = g_judges;
		self.part = g_part;
		self.kayakers = g_kayakers; // window.kayakers ? window.kayakers : 
		self.kayakers.forEach(kayaker => {
			if (isNaN(kayaker.sex)) {
				kayaker.sex = kayaker.sex == 'М' ? 0 : 1;
			}
		})
		if (window.localStorage['result']) {
			self.RESULT = JSON.parse(window.localStorage['result']);
		}
		for (i in self.part) {
			var part = self.part[i];
				part.runs = [];
			for (j = 1; j <= part.runCount; j++) {
				part.runs.push(j);
			}
		}
		//console.log(self.part);
		if (window.localStorage['kayakers']) {
			self.kayakers = JSON.parse(window.localStorage['kayakers']) || self.kayakers;
			for (i = 0; i < self.kayakers.length; i++) {
				//self.kayakers[i].saved = true; // для отслеживания изменений с необходимостью сохранить изменения
				self.$set(self.kayakers[i], 'saved', true); // для обновления хитов
			}
			self.SHOW_KAYAKERS_LIST = Object.keys(self.kayakers).length > 0;
			self.kayakers.sort(function(a,b) { return a.hit - b.hit });
		}

		self.hits = self.hits || {};
		if (window.localStorage['hits']) {
			self.hits = JSON.parse(window.localStorage['hits']);
		} else {
			for (var s in this.sex) {
				self.hits[s] = self.hits[s] || {};
				for (var key in this.part) {
					if (this.part[key].default) {
						self.hits[s][key] = self.hits[s][key] || {};
					}
				}
			}	
		}
		if (window.localStorage['prelimscores']) {
			self.FINALs = JSON.parse(window.localStorage['prelimscores']);
		}
		self.updateElements();
		self.maxHeight = window.screen.height < 800 ? window.screen.height : 400;
		// self.info = info();
		// function info() {
		// 	var res = {}, k;

		// 	for (k in window.screen) {
		// 		if (typeof window.screen[k] != 'object') {
		// 			res[k] = window.screen[k];
		// 		} else {
		// 			// res.orientation = res.orientation || {};
		// 			res.angle = window.screen[k].angle;
		// 			res.type = window.screen[k].type;
		// 		}
		// 	}
		// 	self.maxHeight = res.height < 800 ? res.height : 400;
		// 	return res;
		// }
	},
	watch: {
		'menu.pool': function(newVal, oldVal, evt) {
			if (newVal && newVal != oldVal) {
				this.clearMenu();
				this.menu.pool = true;
				this.menu.elements = true;
				this.$set(this, 'elements', g_elements_pool);
				this.$set(this, 'bonuses', g_bonuses_pool);
				this.updateElements();
			}
		},
		'menu.full': function(newVal, oldVal) {
			if (newVal && newVal != oldVal) {
				this.clearMenu();
				this.menu.elements = true;
				this.menu.full = true;
				this.$set(this, 'elements', g_elements);
				this.$set(this, 'bonuses', g_bonuses);
				this.updateElements();
			}
		},
		'menu.competitors': function(newVal, oldVal) {
			if (newVal && newVal != oldVal) {
				this.clearMenu();
				this.menu.showTop = false;
				this.menu.competitors = true;
			}
		},
		'menu.results': function(newVal, oldVal) {
			if (newVal && newVal != oldVal) {
				this.updateThisRESULTs(); // пересчёт результатов
				this.clearMenu();
				this.menu.showTop = false;
				this.menu.results = true;
			}
		},
		'menu.about': function(val) {
			if (val && !this.about) {
				var self = this,
					request = new XMLHttpRequest();
				request.open('GET', 'README.md');
				request.responseType = 'text';
				request.onload = function() {
					if (request.response.includes('author: Denisova Elena') && request.response.includes('version 2.1')) {
						self.about = request.response;
					} else {
						self.hasNotAbout = true; // скрываем вообще блок о программе из меню
					}
				};
				request.onerror = function(error) {
					self.hasNotAbout = true; // скрываем вообще блок о программе из меню
				}
				request.send();
			}
		},
		'menu.timer': function(newVal, oldVal) {
			console.log('timer', newVal);
			if (newVal && newVal != oldVal) {
				this.clearMenu();
				this.menu.showTop = false;
				this.menu.timer = true;
			}
		},
		kayakers: function(newVal, oldVal) {
			if (newVal && newVal != oldVal) {
				self.SHOW_KAYAKERS_LIST = Object.keys(this.kayakers).length > 0;
			}
		},
		'INFORUN.hit': function(val) {},
		'INFORUN.part': function(val) {},
		'INFORUN.kayaker_bib': function(val) {},
	},
	methods: {
		checkSavedRun() {
			let k = this.INFORUN;
			if (!this.RESULT[k.kayaker_bib]) return false;
			let isSaved = !!(this.RESULT[k.kayaker_bib]
					&& this.RESULT[k.kayaker_bib].runs
					&& this.RESULT[k.kayaker_bib].runs[k.part]
					&& this.RESULT[k.kayaker_bib].runs[k.part].results[k.run]);
			// console.log('result was saved:', isSaved);
			if (!isSaved) return false;
			let sameScores = this.RESULT[k.kayaker_bib].runs[k.part].results[k.run].totalScores == this.thisRun_scores;
			// console.log('scores was saved:', isSaved, sameScores);
			return sameScores;
		},
		clearMenu() {
			for (var key in this.menu) {
				this.menu[key] = false;
			}
			this.menu.showTop = true;
			this.menu.showBottom = true;
		},
		updateElements() {
			var self = this,
				i,
				thisRunArr = [];
			this.thisRun = []; // обнуляем значение.
			for (i = 0; i < self.elements.length; i++) {
				var forRun = {},
					el = self.elements[i];
				Object.assign(forRun, {
					'name': el.name,
					'description': el.description,
					'score': el.score,
					'double': el.double
				})
				if (el.description_en) {
					forRun.description_en = el.description_en;
				}
				if (el.clearCls) {
					forRun.clearCls = el.clearCls;
					forRun.class = el.class;
				}
				forRun = _addElement(el, forRun, 'left');
				forRun = _addElement(el, forRun, 'right');
				thisRunArr.push(forRun);
				//$.extend(thisRunArr, forRun);
			}
			self.$set(self, 'thisRun', thisRunArr);
			self.thisRun_scores = 0;
			self.INFORUN.judge = self.judges[0].name;
			self.INFORUN.part = 'квалификация';
			//console.log(self.thisRun);
			function _addElement(el, act, dir) {
				act[dir] = {};
				act[dir].checked = false;
				if (!el.double && forRun.right) {
					act.right.disable = true;
				}
				act[dir].bonuses = _addBonuses(el);
				return act;
			}
			function _addBonuses(el) {
				var bonuses = self.bonuses,
					thisBon = {},
					elBonuses = {}, j, bon;
				for (j in bonuses) {
					bon = bonuses[j];
					thisBon = {};
					thisBon.code = bon.code;
					thisBon.title = bon.title;
					thisBon.checked = false;
					thisBon.manage = bon.manage || false;
					thisBon.clear = bon.clear || false;
					thisBon.disable = !el[j];
					thisBon.score = _getScore(el.score, bon.scores);
					elBonuses[bon.code] = thisBon;
				}
				return elBonuses;
			}
			function _getScore(score, src) {
				for (var i = 0; i < src.length; i++) {
					if (score > src[i].from && score <= src[i].to) {
						return src[i].score;
					}
				}
			}
		},
		selectElement(el, thisEl) {
			var isCheck = !el.checked, i;
			this.$set(el, 'checked', isCheck);
			if (thisEl.clearCls) {
				for (i = 0; i < this.thisRun.length; i++) { // todo: может можно как-то оптимизировать, чтоб не весь список шерстить..
					if (this.thisRun[i].class == thisEl.clearCls) {
						this.$set(this.thisRun[i].left, 'checked', false);
						this.$set(this.thisRun[i].right, 'checked', false);
					}
				}
				this.$set(el, 'checked', isCheck);
			}
			if (!el.checked) {
				this.clearBonuses(el);
			}
			this.reCalcScores();
		},
		clearBonuses(el) {
			var bonus, i;
			for (i in el.bonuses) {
				bonus = el.bonuses[i];
				this.$set(bonus, 'checked', false);
				if (bonus.manage || bonus.clear) {
					this.toggleBonus(el, bonus);
				}
			}
		},
		selectBonus(el, bonus) {
			if (!el.checked || bonus.disable) {
				return;
			}
			this.$set(bonus, 'checked', !bonus.checked);
			if (bonus.manage || bonus.clear) {
				this.toggleBonus(el, bonus);
			}
			this.reCalcScores();
		},
		toggleBonus(el, bonus, isCheck) {
			for (let i in el.bonuses) {
				if (el.bonuses[i].code == bonus.manage || el.bonuses[i].code == bonus.clear) { // если бонус зависит от другого разблокирует или переключается
					el.bonuses[i].checked = false;
					if (el.bonuses[i].code == bonus.manage && !bonus.disable) {
						el.bonuses[i].disable = !bonus.checked; // изменяемый параметр
					}
					
				}
			}
		},
		reCalcScores: function(returnElements) { // returnElements = undefined - просто посчитать очки за весь заезд, true - вернуть сделанные элементы с бонусами
			var thisRun = this.thisRun,
				totalScores = 0,
				bonuseScores = 0,
				elComplete = [], // посчитано, отправляем в данные пользователю
				_EL = [], i;
			for (i = 0; i < thisRun.length; i++) { // по элементам
				var element = thisRun[i];
				if (element.left.checked) {
					bonuseScores = _calcBonuses(element.left.bonuses);
					totalScores += element.score + bonuseScores;

					var sufix = element.double ? ' левый' : '';
					elComplete[element.name + sufix] = {};
					elComplete[element.name + sufix]['name'] = element.name;
					elComplete[element.name + sufix]['score'] = element.score;
					elComplete[element.name + sufix]['bScore'] = bonuseScores;
					Object.assign(elComplete[element.name + sufix], _calcBonuses(element.left.bonuses, true));
				}
				if (element.right.checked) {
					bonuseScores = _calcBonuses(element.right.bonuses);
					totalScores += element.score + bonuseScores;

					var sufix = element.double ? ' правый' : '';
					elComplete[element.name + sufix] = {};
					elComplete[element.name + sufix]['name'] = element.name;
					elComplete[element.name + sufix]['score'] = element.score;
					elComplete[element.name + sufix]['bScore'] = bonuseScores;
					Object.assign(elComplete[element.name + sufix], _calcBonuses(element.right.bonuses, true));
				}
			}
			this.thisRun_scores = totalScores;
			if (returnElements) {
				elComplete.scores = totalScores; // результат текущего судьи
				elComplete.totalScores = totalScores; // общий результат попытки
				return elComplete;
			}
			function _calcBonuses(bonuses, returnBonuses) {
				var scores = 0,
					kBonuses = {}, j;
				for (j in bonuses) {
					var bonus = bonuses[j];
					if (!bonus.disable && bonus.checked) {
						kBonuses[bonus.code] = bonus.score;
						scores += bonus.score;
					}
				}
				return returnBonuses ? {'bScore': scores, bonuses: kBonuses} : scores;
			}
		},
		updateINFORUN: function(saved) { // сменился каякер, надо обнулить объект попытки
			var self = this,
				kayaker,
				_RESULT = self.RESULT,
				bib = self.INFORUN.kayaker_bib,
				part = self.INFORUN.part;
				self.INFORUN.kayaker_bestScores = 0;
				self.INFORUN.saved = saved || false;
			if (_RESULT[bib]) {
				kayaker = _RESULT[bib] ? _RESULT[bib] : {};
				self.INFORUN.kayaker_name = kayaker.name;
				self.INFORUN.kayaker_bestScores = kayaker.resultScores[part] ? self.part[part].bestScores(kayaker.resultScores[part]) : 0;
			}
		},
		clearThisRun: function() {
			var self = this,
				thisRun = this.thisRun,
				i;
			self.updateINFORUN();
			for (i = 0; i < thisRun.length; i++) { // по элементам
				var element = thisRun[i];
				element.left.checked = false;
				element.right.checked = false;
				self.$set(element.left, 'checked', false);
				self.clearBonuses(element.left);
				self.$set(element.right, 'checked', false);
				self.clearBonuses(element.right);
			}
			// console.log(this.INFORUN.part);
			if (this.INFORUN.part == '*session') {
				this.restoreRun();
			}
			self.reCalcScores();
		},
		restoreRun: function() {
			let self = this;
			if (!self.RESULT[self.INFORUN.kayaker_bib]) return;
			let result = self.RESULT[self.INFORUN.kayaker_bib].runs[self.INFORUN.part].results['1'];
			// console.log(self.INFORUN.kayaker_bib, self.INFORUN.kayaker_name, result);
			self.thisRun.forEach(element => { // проходим каждый элемент, ищем его в записанных результатах
				// console.log(element.name);
				for (var rel in result) {
					if (result[rel].name && result[rel].name == element.name) {
						// console.log(element.name, result[rel]);
						var thisElement = {};
						if (element.double) {
							thisElement = rel.split(' ').pop() == 'левый' ? element.left : element.right;
						} else {
							thisElement = element.left;
						}
						thisElement.checked = true;
						for (var bon in result[rel].bonuses) {
							self.selectBonus(thisElement, thisElement.bonuses[bon])
						}
					}
				}
				// все элементы таблицы
			})
		},
		addKayaker: function() { // добавление каякера в список и в хит, сохранение
			var kayakers = this.kayakers;
			var hit = +this.blank_kayaker.hit,
				bib = +this.blank_kayaker.bib,
				sex = +this.blank_kayaker.sex,
				name = $.trim(this.blank_kayaker.name),
				birthdate = $.trim(this.blank_kayaker.birthdate),
				place = $.trim(this.blank_kayaker.place),
				club = $.trim(this.blank_kayaker.club),
				coach = $.trim(this.blank_kayaker.coach),
				rank = $.trim(this.blank_kayaker.rank),
				inList = false,
				i, j;
			var newKayaker = Object.assign({}, {name: name, bib: bib, hit: hit, sex: sex, saved: true, birthdate: birthdate, place: place, club: club, coach: coach, rank: rank});
			for (i = 0; i < kayakers.length; i++) {
				if (kayakers[i].name == name) { // если каякера нет добавляем нового, если есть - перезаписываем данные
					inList = true;
					Object.assign(kayakers[i], newKayaker);
				}
			}
			if (!inList) { // если каякера нет добавляем нового
				kayakers.push(newKayaker);
			}
			this.kayakers.sort(function(a, b) { return b.sex + b.name < a.sex + a.name; });
			window.localStorage['kayakers'] = JSON.stringify(this.kayakers);
			if (hit) {
				// если каякер есть, то надо перезаписать хиты
				for (i in this.hits[sex]) {
					var h = this.hits[sex][i]; // hit с гендерным признаком
					for (j in h) {
						if (h[j] == name && i != hit) {
							delete h[j];
						}
					}
					if (Object.keys(h).length == 0) { // удаляем пустые хиты, если остались после удаления каякера
						delete this.hits[sex][i];
					}
				}
				this.hits[sex] = this.hits[sex] || {};
				this.hits[sex][hit] = this.hits[sex][hit] || {};
				this.hits[sex][hit][bib] = name;
				window.localStorage['hits'] = JSON.stringify(this.hits);
			}
			this.blank_kayaker.bib = '';
			this.blank_kayaker.name = '';
			this.blank_kayaker.hit = '';
			this.blank_kayaker.birthdate = '';
			this.blank_kayaker.place = '';
			this.blank_kayaker.club = '';
			this.blank_kayaker.coach = '';
			this.blank_kayaker.rank = '';
		},
		renderList: function() { // формат [Ф И О][tab][sex 0|1][tab][#bib][tab][hit][tab][birthdate][tab][place][tab][club][tab][coach][tab][rank]
			var self = this,
				i, newK = [],
				list = self.ADD_LIST.split('\n');
			for (i = 0; i < list.length; i++) {
				newK = list[i].split('\t');
				self.blank_kayaker.name = newK[0];
				self.blank_kayaker.sex = newK[1] ? newK[1] : 0;
				self.blank_kayaker.bib = newK[2] ? newK[2] : '';
				self.blank_kayaker.hit = newK[3] ? newK[3] : 1;
				self.blank_kayaker.birthdate = newK[4] ? newK[4] : '';
				self.blank_kayaker.place = newK[5] ? newK[5] : '';
				self.blank_kayaker.club = newK[6] ? newK[6] : '';
				self.blank_kayaker.coach = newK[7] ? newK[7] : '';
				self.blank_kayaker.rank = newK[8] ? newK[8] : '';
				self.addKayaker();
			}
			self.ADD_LIST = '';
		},
		saveKayaker: function(me) {
			var self = this,
				kayakers = this.kayakers;
			me.saved = true;
			Object.assign(self.blank_kayaker, me);
			self.addKayaker();
		},
		delKayaker: function() { // не используется, удаление каякера из хита
			var hit = +this.INFORUN.hit,
				sex = +this.INFORUN.sex,
				bib = +this.INFORUN.kayaker_bib,
				name = this.blank_kayaker.name;
			delete this.hits[sex][hit][bib];
			window.localStorage['hits'] = JSON.stringify(this.hits);
		},
		getNameByBib: function(bib) {
			var kayakers = this.kayakers,
				i;
			for (i = 0; i < kayakers.length; i++) {
				if (kayakers[i].bib == bib) {
					return kayakers[i].name;
				}
			}
		},
		saveRun: function() {
			var self = this,
				i,
				kayaker,
				_RESULT = self.RESULT,
				bib = self.INFORUN.kayaker_bib,
				part = self.INFORUN.part,
				run = self.INFORUN.run;
			self.INFORUN.saved = true;
			kayaker = _RESULT[bib] ? _RESULT[bib] : this.$set(_RESULT, bib, {});
			kayaker.bib = bib;
			kayaker.name = self.getNameByBib(bib);
			kayaker.runs = kayaker.runs ? kayaker.runs : {};
			kayaker.runs[part] = kayaker.runs[part] ? kayaker.runs[part] : {};
			kayaker.runs[part].hit = self.INFORUN.hit;

			kayaker.runs[part].results = kayaker.runs[part].results ? kayaker.runs[part].results : this.$set(kayaker.runs[part], 'results', {});
			kayaker.runs[part].results[run] = kayaker.runs[part].results[run] ? kayaker.runs[part].results[run] : this.$set(kayaker.runs[part].results, run, {});
			var res = self.reCalcScores(true);
			kayaker.runs[part].results[run] = Object.assign({}, res); // перезаписываем обсчитанный массив результатов попытки
			// возвращается массив .. тут выбираются только элементы, отмеченные как выполненные и считаются очки и бонусы.
			kayaker.resultScores = kayaker.resultScores ? kayaker.resultScores : {}; // для квалификации сумма 2-х лучших, для четверть-финала - сумма 2-х лучших из 3-х, для остальных - лучший результат
			kayaker.resultScores[part] = kayaker.resultScores[part] ? kayaker.resultScores[part] : [];
			for (i in kayaker.runs[part].results) {
				kayaker.resultScores[part][i - 1] = kayaker.runs[part].results[i].totalScores;
			}
			kayaker.bestScores = self.part[part].bestScores(kayaker.resultScores[part]); // расчёт лучшего результата в этапе
			kayaker.runs[part].countRun = Object.keys(kayaker.runs[part].results).length;
			console.log(part, ': ', kayaker.name, 'bestScores', kayaker.bestScores, kayaker);
			_RESULT[bib] = kayaker;
			self.updateINFORUN(true);
			//console.log(_RESULT); // общие результаты всех заездов
			window.localStorage['result'] = JSON.stringify(_RESULT);
			// console.log(this.saved);
		},
		updateThisRESULTs: function() {
			var self = this, i,
				totalRESULT = self.thisRESULT.totalRESULT = [];
			// формирование списка каякеров из self.RESULT по полу[ThisRESULT.sex], катавших в ThisRESULT.part[квалификация,финал и т.п.],
			// сортированных по максимальному количеству набранных очков
			for (i in self.kayakers) {
				if (self.kayakers[i].sex == self.thisRESULT.sex) {
					var kayaker = self.kayakers[i];
					// подходит по полу, смотрим результирующий заезд
					if (self.RESULT[kayaker.bib] && self.RESULT[kayaker.bib].resultScores[self.thisRESULT.part]) {
						var bestScoresInPart = self.part[self.thisRESULT.part].bestScores(self.RESULT[kayaker.bib].resultScores[self.thisRESULT.part]);
						totalRESULT.push({
							name: kayaker.name,
							bib: kayaker.bib,
							part: self.thisRESULT.part,
							bestScoresInPart: bestScoresInPart,
							countRuns: Object.keys(self.RESULT[kayaker.bib].runs[self.thisRESULT.part].results).length,
							RunElements: Object.assign({}, self.RESULT[kayaker.bib].runs[self.thisRESULT.part].results)
						})
					}
				}
			}
			if (totalRESULT.length) {
				totalRESULT.sort(function(a, b) { return b.bestScoresInPart - a.bestScoresInPart }); // сортировка по количеству набранных очков
			}
		},
		showDesc: function(el) {
			if (!el.description) {
				return;
			}
			this.elementsDescription.name = el.name;
			this.elementsDescription.description = el.description;
			if (el.description_en) {
				this.elementsDescription.description += '<br/></br>' + el.description_en;
			}
			this.SHOW_ELEMDECRIPTION = true;
		},
		clearCash: function() {
			for (var c in this.clear) {
				// console.log(c, this.clear[c]);
				var delObj = this.clear[c];
				if (delObj[0]) {
					// console.log('store for delete', c);
					delete window.localStorage[c];
					if (delObj[2]) {
						// console.log('store for delete', delObj[2]);
						delete window.localStorage[delObj[2]];
					}
				}
			}
			window.location.reload();
		}
	}
};

/*
formData: { // шаблон сохранения итоговых данных
		bib: {
			name: '', // имя каякера
			bib: 0,
			bestScores: 0, // результат во всех попытках текущего этапа. высчитывается в соответствии с правилом для каждого свой.
			runs: {
				'квалификация': {
					hit: 1,
					results: [
						['thisRun'],
						['thisRun'],
						['thisRun'],
						['thisRun']
					],
					scores: 0 // sum of the best 2 runs
				},
				'полуфинал': {
					hit: 2,
					results: [
						['thisRun'],
						['thisRun']
					],
					scores: 0 // best run
				},
				'финал': {
					hit: 1,
					results: [
						['thisRun'],
						['thisRun'],
						['thisRun']
					],
					scores: 0 // best run
				}
			},
			place: null,
			sort: 0
		}
	},
*/