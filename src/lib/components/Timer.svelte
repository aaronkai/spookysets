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
	<h1 class="label">Timer</h1>
	<p>{seconds}</p>
</div>

<style>
	.timer {
		background-color: var(--green);
		margin: 0 auto;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: none;
	}
	.timer p {
		font-size: var(--font-4xl);
		color: var(--black-dark);
		font-family: bungee;
	}
	.running {
		background-color: var(--red);
	}
	.timer:hover {
		opacity: 0.75;
	}
	.label {
		font-size: var(--font-sm);
		color: var(--black-dark);
	}
</style>
