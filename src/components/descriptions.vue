<template>
	<div id="fog" v-if="SHOW_ELEMDECRIPTION" v-on:click="SHOW_ELEMDECRIPTION = false"></div>
	<div id="descriptions" v-if="SHOW_ELEMDECRIPTION" >
		<div class="close" v-on:click="SHOW_ELEMDECRIPTION = false">X</div>
		<div class="content">
			<h3>{{elementsDescription.name}}</h3>
			<div v-html="elementsDescription.description"></div>
			<div style="margin-top: 2em; font-size: .6em">
				<div v-for="(item, key) in info"><b>{{key}}:</b> {{item}}</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'descriptions', 
	props: {
		description: Object
	},
	data: function() {
		return {
			elementsDescription: this.$parent.elementsDescription,
			SHOW_ELEMDECRIPTION: this.$parent.SHOW_ELEMDECRIPTION
		}
	}
			
}
</script>