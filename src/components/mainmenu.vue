<template>
	<div>
		<div class="icon-menu" v-bind:class="{'active': menu.show}" v-on:click="menu.show = !menu.show"><div v-bind:class="{'close': menu.show}"></div></div>
		<div id="menu" v-if="menu.show" class="menu" v-on:click="menu.show = false">
			<ul>
				<li class="margin"></li>
				<!-- <li v-bind:class="{'active': menu.pool}"><div v-on:click="menu.pool = true">Гладкая вода</div></li> -->
				<li v-bind:class="{'active': menu.full}"><div v-on:click="menu.full = true">Соревнования</div></li>
				<li v-bind:class="{'active': menu.competitors}"><div v-on:click="menu.competitors = true">Список каякеров</div></li>
				<li v-bind:class="{'active': menu.results}"><div v-on:click="menu.results = true">Результаты</div></li>
				<li><div></div></li>
				<li><div v-on:click="menu.clear = true">Очистить кэш (выбор)</div></li>
				<!-- <li><div></div></li>
				<li v-bind:class="{'active': menu.timer}"><div v-on:click="menu.timer = true">Timer</div></li> -->
				<li v-if="!hasNotAbout"><div></div></li>
				<li v-if="!hasNotAbout"><div v-on:click="menu.about = true">О программе</div></li>
				<!-- <li><a href="#clear">Очистить хиты</a></li>
				<li><a href="#clearKayakers">Очистить список каякеров</a></li> -->
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mainmenu', 
	props: {
		menu: Object,
		hasNotAbout: Boolean
	}
}
</script>