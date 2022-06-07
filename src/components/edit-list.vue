<template>
	<div id="competitors" style="margin: 20px 20px 40px;">
		<h3>Редактирование</h3>
		<div style="padding: 10px 0;">
			Выберите этап соревнований<br/>
			<select v-model="use_part">
				<option v-for="(obj,p) in part" v-bind:value="p">{{p}}</option>
			</select>
			<select v-model="sex_default">
				<option v-for="(s, i) in sex" v-bind:value="i">{{s}}</option>
			</select>
			<button type="button" v-on:click="request()" v-bind:disabled="!this.use_part">запросить >>></button>
		</div>
		<div style="width: calc(100% + 40px); overflow: hidden; margin: 0px -20px;">
			<div style="overflow-x: overlay; margin-bottom: -20px;">
				<table style="width: auto; margin: 0 20px 30px;">
					<tr>
						<!-- <th></th> -->
						<th>№</th>
						<th>ФИО</th>
						<th>пол</th>
						<th v-on:click="sortByHit">ХИТ &darr;</th>
						<th></th>
					</tr>
					<tr v-for="(k,i) in kayakers" v-if="k.sex == sex_default">
						<!-- <td><button v-bind:disabled="!use_part" type="button" v-on:click="delKayaker(k)">X</button></td> -->
						<td><input type="number" v-model="k.bib" v-on:change="k.saved = false; hasDuplicateBib(k)" v-bind:class="{'error': k.duplicate}"placeholder="№"/></td>
						<td><input type="text" v-model="k.name"/></td>
						<td>
							<select v-model="k.sex" v-on:change="k.saved = false">
								<option v-for="(s, i) in sex" v-bind:value="i">{{s}}</option>
							</select>
						</td>
						<td><input type="number" v-model="k.hit" placeholder="хит" v-on:change="k.saved = false"/></td>
						<td style="white-space: nowrap;">
							<input v-bind:disabled="k.saved || !use_part || !k.bib || !k.hit || k.duplicate" type="button" value="save" v-on:click="saveKayaker(k)"/>
							<span v-if="k.hit_part == use_part ">[{{k.hit_position}}]</span>
						</td>
					</tr>
					<tr>
						<td colspan="6"><br/>Добавить ещё</td>
					</tr>
					<tr>
						<!-- <td></td> -->
						<td><input placeholder="№" type="number" v-model="blank_kayaker.bib" v-bind:class="{'error': blank_kayaker.duplicate}"/></td>
						<td><input placeholder="Введите имя" type="text" v-model="blank_kayaker.name"/></td>
						<td>
							<select v-model="blank_kayaker.sex">
								<option v-for="(s, i) in sex" v-bind:value="i">{{s}}</option>
							</select>
						</td>
						<td><input placeholder="хит" type="number" v-model="blank_kayaker.hit"/></td>
						<td>
							<input v-bind:disabled="!blank_kayaker.name" type="button" value="add" v-on:click="addKayaker()">
						</td>
					</tr>
				</table>
			</div>
		</div>
		<!-- <div v-for="k in kayakers">{ name: '{{k.name}}', sex: {{k.sex}} , bib: {{k.bib}}, hit: {{k.hit}}, birthdate: '{{k.birthdate}}', place: '{{k.place}}', club: '{{k.club}}', coach: '{{k.coach}}', rank: '{{k.rank}}'}</div> -->
		<hr/>
		<h5>Можно внести список в формате данных с разделением табуляцией, каждый спортсмен на одной строке.</h5>
		<h6>[ФИО]	[пол (М/Ж)]	[№]	[ХИТ]	[дата рождения]	[город/регион]	[клуб]	[тренер]</h6>
		<textarea style="width: 100%; height: 15em;" v-model="ADD_LIST"></textarea><br/><br/>
		<button v-bind:disabled="ADD_LIST.length == 0" type="button" v-on:click="renderList">Записать</button>
	</div>
</template>

<script>
export default {
	name: 'editlist', 
	props: {
		menu: Object,
		blank_kayaker: Object,
		kayakers: Array,
		hits: Object,
		sex: Array,
		part: Object
	},
	data: function() {
		return {
			ADD_LIST: '',
			use_part: '',
			sex_default: 0
		}
	},
	computed: {
		comp_part: function() {
			if (this.use_part) {
				return this.use_part;
			}
			for (var key in this.part) {
				if (this.part[key].default) {
					return key;
				}
			}
		}
	},
	watch: {
		use_part: function() {
			this.checkSaved();
		},
		'blank_kayaker.bib': function() {
			this.hasDuplicateBib(this.blank_kayaker);
		},
		sex_default: function(val) {
			this.blank_kayaker.sex = val;
		}
	},
	mounted: function() {
		this.sortByHit();
	},
	methods: {
		saveKayaker: function(me) {
			if (me.saved || !this.use_part || !me.bib || !me.hit || me.duplicate) return;
			var self = this,
				kayakers = this.kayakers;
			me.saved = true;
			Object.assign(self.blank_kayaker, me);
			self.addKayaker();
		},
		checkSaved: function() {
			var self = this;
			this.kayakers.forEach(kayaker => {
				kayaker.saved = self.hasMeInHits(kayaker);
			})
		},
		hasMeInHits: function(kayaker) {
			return this.hits[kayaker.sex][this.use_part] && this.hits[kayaker.sex][this.use_part][kayaker.hit] && this.hits[kayaker.sex][this.use_part][kayaker.hit][kayaker.bib] == kayaker.name;
		},
		hasDuplicateBib: function(mate) {
			this.$set(mate, 'duplicate', false);
			if (!mate.bib) return;
			this.kayakers.forEach(kayaker => {
				if (kayaker.bib == mate.bib && kayaker.name != mate.name) {
					mate.duplicate = true;
				}
			})
		},
		sortByHit: function() {
			this.kayakers.sort(function(a,b) { return (a.hit + a.hit_position) - (b.hit + b.hit_position) });
		},
		delKayaker: function(mate) { // не используется, удаление каякера из списка
			var self = this,
				hit = +mate.hit,
				sex = +mate.sex,
				bib = +mate.bib,
				name = mate.name;
			if (this.hits[sex] && this.hits[sex][this.use_part] && this.hits[sex][this.use_part][hit]) {
				// delete this.hits[sex][this.use_part][hit][bib]; // из хита
				// this.hits[sex][this.use_part][hit].splice(position, 1);
				console.log('TODO: delete competitor from hit by position and bib_name');
			}
			window.localStorage['hits'] = JSON.stringify(this.hits);
			this.kayakers.forEach((kayaker, ind) => {
				if (kayaker.bib == mate.bib && kayaker.name == mate.name) {
					self.kayakers.splice(ind,1);
				}
			});
			window.localStorage['kayakers'] = JSON.stringify(this.kayakers);

		},
		renderList: function() { // формат [ФИО]\t[пол]\t[№]\t[ХИТ]\t[дата рождения]\t[город/регион]\t[клуб]\t[тренер]
			var self = this,
				i, newK = [],
				list = self.ADD_LIST.split('\n');

			for (i = 0; i < list.length; i++) {
				var [ name, sex, bib, hit, birthdate, place, club, coach ] = list[i].trim().split('\t');
				sex = sex == 'М' ? 0 : 1;
				Object.assign(self.blank_kayaker, {
					name: name.trim(),
					sex: +sex || 0,
					bib: +bib,
					hit: +hit,
					birthdate: birthdate,
					place: place,
					club: club,
					coach: coach
				});
				console.log(self.blank_kayaker);
				self.addKayaker();
			}
			self.ADD_LIST = '';
		},
		addKayaker: function() { // добавление каякера в список и в хит, сохранение
			var kayakers = this.kayakers,
				self = this, i;
			var comp_part = this.comp_part,
				hit = +this.blank_kayaker.hit || 1,
				bib = +this.blank_kayaker.bib,
				sex = +this.blank_kayaker.sex,
				bib_name= '#' + bib +' '+ self.blank_kayaker.name,
				inList = false,
				position = 0;
			if (!hit || !bib || Number(sex) != sex) return; // not enough data
			if (hit) {
				// если каякер есть, то надо перезаписать хиты
				this.hits = this.hits || {};
				this.hits[sex] = this.hits[sex] || {};
				this.hits[sex][comp_part] = this.hits[sex][comp_part] || {};

				for (var i in this.hits[sex][comp_part]) {
					var h = this.hits[sex][comp_part][i]; // hit с гендерным признаком и этапом соревнования
					for (var j in h) {
						if (h[j] == bib_name) {
							h.splice(j,1);
						}
					}
					if (Object.keys(h).length == 0) { // удаляем пустые хиты, если остались после удаления каякера
						delete this.hits[sex][comp_part][i];
						// this.hits[sex][comp_part].splice(i,1)
					}
				}
				this.hits[sex][comp_part][hit] = this.hits[sex][comp_part][hit] || [];
				// this.hits[sex][comp_part][hit][bib] = self.blank_kayaker.name;
				// поменяем немного структуру в хите, чтобы можно было сортировать. position: bib + name
				position = this.hits[sex][comp_part][hit].push(bib_name);
				window.localStorage['hits'] = JSON.stringify(this.hits);
			}

			var newKayaker = Object.assign({}, self.blank_kayaker, {hit_position: position, hit_part: comp_part, saved: true});
			for (i = 0; i < kayakers.length; i++) {
				if (kayakers[i].name == self.blank_kayaker.name) { // если каякера нет добавляем нового, если есть - перезаписываем данные
					inList = true;
					Object.assign(kayakers[i], newKayaker);
				}
			}
			if (!inList) { // если каякера нет добавляем нового
				kayakers.push(newKayaker);
			}
			this.hits[sex][comp_part][hit].forEach((kayaker, pos) => {
				var name = kayaker.split(' ').slice(1).join(' ');
				this.kayakers.forEach(k => {
					if (k.name == name) {
						k.hit_position = pos + 1;
					}
				})
			})
			this.kayakers.sort(function(a, b) { return b.sex + b.name < a.sex + a.name; });
			window.localStorage['kayakers'] = JSON.stringify(this.kayakers);
			
			this.blank_kayaker.bib = '';
			this.blank_kayaker.name = '';
			this.blank_kayaker.hit = '';
			this.blank_kayaker.birthdate = '';
			this.blank_kayaker.place = '';
			this.blank_kayaker.club = '';
			this.blank_kayaker.coach = '';
			this.blank_kayaker.rank = '';
		},
		request: function() {
			if (!this.use_part) return;
			let url = 'kayakers.json?part='+this.use_part+'&sex='+this.sex_default;
			
			fetch(url)
				.then(response => response.json())
				.then(data => {
					console.log(data);
					data.forEach((k) => {
						this.blank_kayaker.bib = k.bib ? k.bib : '';
						this.blank_kayaker.name = k.name ? k.name : '';
						this.blank_kayaker.hit = k.hit ? k.hit : '';
						this.blank_kayaker.sex = k.sex ? (k.sex == 'М' ? 0 : 1) : '';
						
						this.addKayaker();
					})
				});

		}
	}
}
</script>