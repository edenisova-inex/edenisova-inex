<template>
	<div>
		<!-- меню по правой кнопке -->
		<mainmenu :menu="menu" :hasNotAbout="hasNotAbout"/>

		<!-- весь список каякеров, можно добавить или записать в определённый хит -->
		<editlist
				v-if="menu.competitors"
				:menu="menu"
				:blank_kayaker="blank_kayaker"
				:kayakers="kayakers"
				:hits="hits"
				:sex="sex"
				:part="part"/>

		<div class="clear" v-if="menu.clear" style="margin: 20px 20px 40px;">
			<h3>Выберите данные для очистки</h3>
			<table style="width: auto; margin: 10px 0 20px; min-width: 20rem;">
				<tr v-for="c in clear" v-if="c[1]">
					<td style="width: 1.5rem"><input type="checkbox" name="" v-model="c[0]"></td>
					<td style="white-space: nowrap; text-align: left; padding: 0 0 0 10px;">{{c[1]}}</td>
				</tr>
				<tr>
					<td colspan="2" style="text-align: right;">
						<button type="button" v-on:click="clearCash">Очистить выбранное</button>
					</td>
				</tr>
			</table>
		</div>

		<!-- шапка соревнований: этап, хит, попытка, спортсмен -->

		<div class="fixedTop" v-if="menu.showTop">
			<div class="header" v-if="menu.full">
				<div>
					Судья: 
					<select v-model="INFORUN.judge">
						<option v-for="j in judges" v-if="j.show" v-bind:value="j.name">{{j.name}}</option>
					</select>
					<select v-model="INFORUN.sex">
						<option v-for="(s, i) in sex" v-bind:value="i">{{s}}</option>
					</select>
					<select v-model="INFORUN.part">
						<option v-for="(p, i) in part" v-bind:value="i">{{i}}</option>
					</select>
				</div>
				<div v-if="fillHitsMSG">
					Распределите спортсменов по хитам<br/>в разделе Список каякеров
				</div>
				<div v-else>
					<select v-model="INFORUN.hit" v-if="hits[INFORUN.sex] && hits[INFORUN.sex][INFORUN.part]">
						<option v-for="(h, i) in hits[INFORUN.sex][INFORUN.part]" v-bind:value="i">Хит {{i}}</option>
					</select>
					<!-- <div>[<span v-html="part[INFORUN.part]"></span>]</div> -->
					<select v-if="INFORUN.part && part[INFORUN.part]" v-model="INFORUN.run" v-on:change="clearThisRun()">
						<option v-for="(run, i) in part[INFORUN.part].runs" v-if="run > 0" v-bind:value="run">Попытка {{run}}</option>
					</select>
					<select v-if="SHOW_KAYAKERS_LIST && hits && hits[INFORUN.sex] && hits[INFORUN.sex][INFORUN.part]" v-model="INFORUN.kayaker_bib" v-on:change="clearThisRun()" style="font-weight: bold;">
						<option v-for="(k, bib) in HITS" v-bind:value="k.bib">#{{k.bib}} {{k.name}}</option>
					</select>
				</div>
			</div>
		</div>

		<div id="elements" v-if="menu.elements" v-bind:class="menu.full ? 'fullMenu' : 'halfMenu' "><!--  -->
			<table>
				<thead class="fixedTop">
					<tr>
						<th colspan="2">Элементы</th>
						<th class="brdLeft" colspan="7">Левый / Фронт</th>
						<th class="brdLeft" colspan="7">Правый / Бэк</th>
					</tr>
					<tr>
						<th colspan="2"></th>
						<!--  -->
						<th class="brdLeft"></th>
						<th>Cl</th>
						<th>SCl</th>
						<th>A</th>
						<th>H</th>
						<th>Li</th>
						<th>Trp</th>
						<!--  -->
						<th class="brdLeft"></th>
						<th>Cl</th>
						<th>SCl</th>
						<th>A</th>
						<th>H</th>
						<th>Li</th>
						<th>Trp</th>
					</tr>
				</thead>
				<tbody>
					<!-- <tr class="margin">
						<td colspan="2"></td>
						<td class="brdLeft" colspan="7"></td>
						<td class="brdLeft" colspan="7"></td>
					</tr> -->
						<tr v-for="(el, i) in thisRun" v-model="thisRun" v-bind:class="el.class">
							<td v-on:click="showDesc(el)">
								{{el.name}}
							</td>
							<td>{{el.score}}</td>
							<td class="inp brdLeft">
								<input type="checkbox" v-bind:disabled="SAVERUN_DISABLED" v-model="el.left.checked" v-on:click="selectElement(el.left, el)"/>
							</td>
							<td class="inp" v-for="(bn, j) in el.left.bonuses" v-bind:class="{'gray': (j == 'air' || j == 'clean' || j == 'link'), 'disable': (!el.left.checked || bn.disable)}">
								<span v-if="!bn.disable" class="hint" v-text="bn.title" v-on:click="selectBonus(el.left, bn)"></span>
								<span v-if="bn.disable" class="hint disable">X</span>
								<input type="checkbox" v-bind:checked="bn.checked" v-bind:disabled="!el.left.checked || bn.disable" v-on:click="selectBonus(el.left, bn)"/>
							</td>
							<td class="inp brdLeft" v-bind:class="{'disable': el.right.disable}">
								<input type="checkbox" v-bind:disabled="el.right.disable || SAVERUN_DISABLED" v-model="el.right.checked" v-on:click="selectElement(el.right, el)"/>
							</td>
							<td class="inp" v-for="(bn, j) in el.right.bonuses" v-bind:class="{'gray': (j == 'air' || j == 'clean' || j == 'link'), 'disable': (!el.right.checked || bn.disable)}">
								<span v-if="!bn.disable" class="hint" v-text="bn.title" v-on:click="selectBonus(el.right, bn)"></span>
								<span v-if="bn.disable" class="hint disable">X</span>
								<input type="checkbox" v-bind:checked="bn.checked" v-bind:disabled="!el.right.checked || bn.disable" v-on:click="selectBonus(el.right, bn)"/>
							</td>
						</tr>
					<!-- <tr class="margin">
						<td colspan="2"></td>
						<td class="brdLeft" colspan="7"></td>
						<td class="brdLeft" colspan="7"></td>
					</tr> -->
				</tbody>
				<tfoot class="fixedBottom">
					<tr>
						<th colspan="2" rowspan="2">Итого</th>
						<!--  -->
						<th class="brdLeft"></th>
						<th>Cl</th>
						<th>SCl</th>
						<th>A</th>
						<th>H</th>
						<th>Li</th>
						<th>Trp</th>
						<!--  -->
						<th class="brdLeft"></th>
						<th>Cl</th>
						<th>SCl</th>
						<th>A</th>
						<th>H</th>
						<th>Li</th>
						<th>Trp</th>
					</tr>
					<!-- <tr>
						<th colspan="2" class="brdLeft" v-html="thisRun.scores">цифорки</th>
						<th colspan="9" v-if="menu.full" style="white-space: nowrap; text-align: left;"><span v-html="INFORUN.part"></span>: [<span v-html="INFORUN.kayaker_bestScores"></span>]</th>
						<th colspan="3" style="text-align: right;">
							<input v-if="menu.full" v-bind:disabled="!INFORUN.judge || !INFORUN.part || !INFORUN.hit || !INFORUN.run || !INFORUN.kayaker_bib" type="button" value="save ride" v-on:click="saveRun()">
						</th>
					</tr> -->
				</tfoot>
			</table>
			<div class="scores">
				<table style="width: 100%; height: 40px;">
					<tbody style="height: 40px;">
						<tr>
							<th style="font-size: 1rem; padding: 0 10px; white-space: nowrap;">
								<span v-if="competitor_name">{{competitor_name}}: {{thisRun_scores}}</span>
							</th>
							<th style="font-size: .8rem; white-space: nowrap;">
								<!-- <span v-html="INFORUN.part"></span><br/> -->
								[ <span v-html="INFORUN.kayaker_bestScores"></span> ]
							</th>
							<th style="text-align: right; padding: 5px 10px 5px 10px;">
								<input v-if="menu.full" v-bind:disabled="SAVERUN_DISABLED || INFORUN.saved" type="button" value="save ride" v-on:click="saveRun()">
							</th>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- ELEMENTS -->
		<!-- <descriptions
				v-if="SHOW_ELEMDECRIPTION"
				v-bind:description="elementsDescription"></descriptions> -->
		
		<div id="fog" v-if="SHOW_ELEMDECRIPTION || menu.about" v-on:click="SHOW_ELEMDECRIPTION = false; menu.about = false"></div>
		<div id="descriptions" v-if="SHOW_ELEMDECRIPTION" >
			<div class="content" v-bind:style="{'max-height': maxHeight + 'px'}">
				<h3>{{elementsDescription.name}}</h3>
				<div v-html="elementsDescription.description"></div>
				<!-- <div style="margin-top: 2em; font-size: .6em">
					<div v-for="(item, key) in info"><b>{{key}}:</b> {{item}}</div>
				</div> -->
			</div>
		</div>

		<div id="about" v-if="menu.about" >
			<div class="content">
				<h3>О программе</h3>
				<div v-if="hasNotAbout">Ошибка: Не могу получить файл README.md</div>
				<div v-html="about"></div>
			</div>
		</div>

		<appresultstab v-if="menu.results"/>

		<timer v-if="menu.timer"/>
	</div>
</template>

<script src="./elements.js"></script>
<script src="./freestyle.v2.js"></script>