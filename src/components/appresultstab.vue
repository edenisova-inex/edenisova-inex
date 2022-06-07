<template>
	<div id="results_old" style="margin: 20px 20px 40px;">
		<h3>Результаты попыток</h3>
		<select v-model="thisRESULT.part" v-on:change="updateThisRESULTs()">
			<option v-for="(p, i) in part" v-bind:value="i">{{i}}</option>
		</select>
		&nbsp;
		<select v-model="thisRESULT.sex" v-on:change="updateThisRESULTs()">
			<option v-for="(s, i) in sex" v-bind:value="i">{{s}}</option>
		</select>
		<!-- <div style="padding: 20px; font-size: 2rem;">
			<span v-html="thisRESULT.part"></span>
			&#160;
			<span v-html="sex[thisRESULT.sex]"></span>
		</div> -->

		<table class="result">
			<tr>
				<th colspan="6" style="text-align: right;">
					<div v-if="!is_final">
						Следующий этап >>>
						<select v-model="next_part">
							<option v-for="(p,key) in part" v-bind:value="key" v-bind:class="{'checked': key == thisRESULT.part}">
								<span v-if="key == thisRESULT.part">>> </span>
								{{key}}
							</option>
						</select>
					</div>
					<div v-else>
						Финальные результаты
					</div>
				</th>
			</tr>
			<tr>
				<th style="width: .2em;"></th>
				<th style="width: .2em;">#bib</th>
				<th>Участник</th>
				<th>Runs</th>
				<th>Scores</th>
				<th><span v-if="!is_final">>>></span></th>
			</tr>
			<tr v-for="(k, j) in thisRESULT.totalRESULT" v-bind:class="{'best3': j + 1 <= part[thisRESULT.part].best[0], 'best5': j + 1 <= part[thisRESULT.part].best[1], 'best10': j + 1 <= part[thisRESULT.part].best[2], 'best20': j + 1 <= part[thisRESULT.part].best[3]}">
				<td v-text="j + 1"></td>
				<td v-text="k.bib"></td>
				<td v-text="k.name"></td>
				<td v-text="k.countRuns"></td>
				<td>
					<button type="button" class="showResults" v-on:click="show">{{ k.bestScoresInPart }}</button>
					<div class="t-results">
						<div v-for="(run, i) in k.RunElements">
							<table>
								<tr>
									<th colspan="3">Попытка {{i}}
										<span style="font-weight: normal; font-size: .8rem;">[в попытке набрано: {{run.totalScores}} ]</span>
									</th>
								</tr>
								<tr v-for="(e, key) in run" v-if="key != 'scores' && key != 'totalScores'">
									<td>{{key}} ({{e.score}})</td>
									<td>
										<span v-for="(b, k) in e.bonuses"> {{k}} ({{b}})</span>
									</td>
								</tr>	
							</table>
						</div>
					</div>
				</td>
				<td style="white-space: nowrap;">
					<span v-if="!is_final">
						<input type="number" placeholder="хит" v-model="k.next_hit" v-on:change="k.saved = false"/>
						<button type="button" v-bind:disabled="!(next_part && k.next_hit) || k.saved" v-on:click="moveToNext(k)">>>></button>
						<!-- <span v-if="k.hit_part == next_part ">[{{k.hit_position}}]</span> -->
					</span>
				</td>
			</tr>
		</table>
	</div>
</template>

<script type="text/javascript">
export default {
	name: 'appresultstab',
	components: {},
	data: function() {
		return {
			thisRESULT: this.$parent.thisRESULT,
			part: this.$parent.part,
			sex: this.$parent.sex,
			kayakers: this.$parent.kayakers,
			RESULT: this.$parent.RESULT,
			next_part: null,
			hits: this.$parent.hits,
			FINALs: this.$parent.FINALs
		}
	},
	mounted: function() {
		this.updateThisRESULTs();
	},
	computed: {
		is_final: function() {
			return this.thisRESULT.part == 'финал'
		}
	},
	methods: {
		show: function(evt) {
			if (!evt.target.classList.contains('show')) {
				for (var div of document.getElementsByClassName('showResults')) {
					if (div.classList.contains('show')) {
						div.classList.remove('show');
					}
				}
				// document.getElementsByClassName('showResults').classList.remove('show');
				evt.target.classList.add('show')
			} else {
				evt.target.classList.remove('show')
			}
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
					// kayaker.saved = false;
					if (self.RESULT[kayaker.bib] && self.RESULT[kayaker.bib].resultScores[self.thisRESULT.part]) {
						var bestScoresInPart = self.part[self.thisRESULT.part].bestScores(self.RESULT[kayaker.bib].resultScores[self.thisRESULT.part]),
							countRuns = self.RESULT[kayaker.bib].runs[self.thisRESULT.part].countRun || Object.keys(self.RESULT[kayaker.bib].runs[self.thisRESULT.part].results).length;
						totalRESULT.push({
							name: kayaker.name,
							bib: kayaker.bib,
							part: self.thisRESULT.part,
							countRuns: countRuns,
							bestScoresInPart: bestScoresInPart,
							RunElements: Object.assign({}, self.RESULT[kayaker.bib].runs[self.thisRESULT.part].results),
							saved: false
						})
					}
				}
			}
			if (totalRESULT.length) {
				totalRESULT.sort(function(a, b) { return b.bestScoresInPart - a.bestScoresInPart }); // сортировка по количеству набранных очков
			}
		},
		moveToNext: function(k) {
			// console.log('moveToNext', this.next_part);
			var comp_part = this.next_part,
				sex = this.thisRESULT.sex,
				hit = k.next_hit,
				bib = k.bib,
				name = k.name,
				bib_name= '#' + bib +' '+ name;
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
					//this.hits[sex][comp_part].splice(i,1)
				}
			}
			// this.hits[sex][comp_part][hit] = this.hits[sex][comp_part][hit] || {};
			// this.hits[sex][comp_part][hit][String(bib)] = name;

			this.hits[sex][comp_part][hit] = this.hits[sex][comp_part][hit] || [];
			// поменяем немного структуру в хите, чтобы можно было сортировать. position: bib + name
			this.hits[sex][comp_part][hit].push(bib_name);

			this.FINALs[sex][bib] = k.bestScoresInPart; // возможно не пригодится, но на всякий случай
			window.localStorage['prelimscores'] = JSON.stringify(this.FINALs);

			k.saved = true;
			window.localStorage['hits'] = JSON.stringify(this.hits);

			this.hits[sex][comp_part][hit].forEach((kayaker, pos) => {
				var name = kayaker.split(' ').slice(1).join(' ');
				this.kayakers.forEach(k => {
					if (k.name == name) {
						k.hit_position = pos + 1;
						k.hit = hit;
						k.hit_part = comp_part;
					}
				})
			})
			window.localStorage['kayakers'] = JSON.stringify(this.kayakers);
		}
	}
}
</script>