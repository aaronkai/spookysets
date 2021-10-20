<script>
	import { trusted } from 'svelte/internal';

	let seconds = 0;
	let start = false;
	let timerRunning = false;
	let timer;

	function handleClick() {
		if (!timerRunning) {
			seconds = 0;
			timerRunning = true;
			timer = setInterval(() => {
				seconds = seconds + 1;
			}, 1000);
		} else {
			timerRunning = false;
			seconds = 0;
			clearInterval(timer);
		}
	}
</script>

<div on:click={handleClick} class={timerRunning ? 'running timer' : 'stopped timer'}>
	<h1>{seconds}</h1>
</div>

<style>
	.timer {
		background-color: var(--green);
		height: 125px;
		width: 125px;
		border-radius: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: 2px solid var(--foreground);
	}
	.timer h1 {
		color: var(--foreground);
	}
	.running {
		background-color: var(--red);
	}
</style>
