<script>
	import Exercise from '$lib/components/Exercise.svelte';
	import { exercises, title } from '$lib/stores/exerciseStore';
	import Toast from '$lib/components/Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { scale, fly } from 'svelte/transition';
	import Timer from '$lib/components/Timer.svelte';

	function addExercise() {
		let newId = $exercises.at(-1).id + 1 || 0;
		$exercises.push({ id: newId, name: 'placeholder', sets: [false, false, false] });
		$exercises = $exercises;
		$alert = { text: 'Exercise Added to List', isActive: true };
	}

	function exerciseDone(exerciseIndex) {
		if (
			[...new Set($exercises[exerciseIndex].sets)][0] === true &&
			[...new Set($exercises[exerciseIndex].sets)].length === 1
		) {
			return true;
		} else {
			return false;
		}
	}
	function handleSave() {
		console.log('save');
	}
</script>

<svelte:head>
	<title>Spooky Sets: Workout</title>
</svelte:head>

<main>
	<Toast />
	<h2>{$title}</h2>
	<section>
		<div class="controls">
			<button on:click={addExercise}>&plus;</button>
			<Timer />
			<button on:click={handleSave}>Save</button>
		</div>
		{#each $exercises.filter((_, index) => !exerciseDone(index)) as exercise (exercise.id)}
			<div class="exercise" in:scale out:fly={{ x: 400 }}>
				<Exercise {exercise} />
			</div>
		{/each}
	</section>

	<section>
		{#each $exercises.filter((exercise, index) => exerciseDone(index)) as exercise}
			<div class="exercise-complete">
				<Exercise {exercise} />
			</div>
		{/each}
	</section>
</main>

<style>
	main {
		display: grid;
		padding: 1rem;
		row-gap: 1rem;
	}

	section {
		margin-top: 0 1rem;
		display: grid;
		row-gap: 1rem;
	}
	.controls {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
	}
	.exercise-complete {
		opacity: 50%;
	}
	h2 {
		font-size: var(--heading-three);
		margin-bottom: 1rem;
	}

	button {
		margin: 0 auto;
		background-color: var(--green);
		height: 100px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: 10px solid var(--black);
		font-size: var(--font-2xl);
		color: var(--black-dark);
	}
	button:hover {
		opacity: 0.75;
	}
	@media only screen and (max-width: 450px) {
	}
</style>
