<script type="ts">
	type Timer = ReturnType<typeof setInterval>;

	let seconds: number = 0;
	let timerRunning: boolean = false;
	let timer: Timer;

	export function boopTimer(resetTimer: boolean = false): Timer {
		if (!timerRunning) {
			seconds = 0;
			timerRunning = true;
			timer = setInterval(() => {
				seconds = seconds + 1;
			}, 1000);
		} else {
			// if timer function call comes from a rep button, reset timer, don't stop it.
			if (resetTimer) {
				seconds = 0;
				clearInterval(timer);
				timer = setInterval(() => {
					seconds = seconds + 1;
				}, 1000);
			} else {
				timerRunning = false;
				seconds = 0;
				clearInterval(timer);
			}
		}
		return timer;
	}
</script>

<button
	title="Start/Stop Timer"
	on:click={() => boopTimer(false)}
	class={timerRunning ? 'running timer' : 'stopped timer'}
>
	<h1 class="label">Timer</h1>
	<p>{seconds}</p>
</button>

<style>
	button {
		@apply cursor-pointer;
	}
	.timer {
		@apply bg-emerald-400 mx-auto w-full flex justify-center items-center flex-col 
		/* background-color: var(--green-3);
		margin: 0 auto;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: none; */;
	}
	.timer p {
		@apply text-5xl text-slate-900 font-bungee;
	}
	.running {
		@apply bg-red-400;
	}
	.timer:hover {
		@apply opacity-75;
	}
	.label {
		@apply text-2xl text-slate-900 font-bungee;
	}
</style>
