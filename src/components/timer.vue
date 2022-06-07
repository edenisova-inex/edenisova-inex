<template>
	<div class="timer" v-bind:class="{'green': className == 'green', 'black': className == 'black', 'yellow': className == 'yellow', 'red': className == 'red'}" v-on:click="go">
		<div class="time">{{time}}</div>
	</div>
</template>

<script>
export default {
	name: 'timer', 
	props: {},
	data: function() {
		return {
			time: 45,
			default_time: 45,
			yellow_time: 35,
			className: 'green',
			status: 'ready', // ready process stop
			timerId: null
		}
	},
	methods: {
		go: function() {
			if (this.status == 'ready') {
				this.className = 'black';
				this.timerId = setInterval(() => {
					if (this.time == 11) {
						this.className = 'yellow';
					}
					if (this.time == 1) {
						this.className = 'red';
					}
					if (this.time) this.time--;
					this.status = 'process';
				}, 1000);
				setTimeout(() => { clearInterval(this.timerId); }, 45000);
			}
			if (this.status == 'process') {
				setTimeout(() => {
					clearInterval(this.timerId);
					this.status = 'stop';
				}, 10);
			}
			if (this.status == 'stop') {
				this.time = this.default_time;
				this.status = 'ready';
				this.className = 'green';
			}
		}
	}
}
</script>