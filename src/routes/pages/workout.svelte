<script>
	import Exercise from '$lib/components/Exercise.svelte';
	import { exercises, title } from '$lib/stores/exerciseStore';
	import Toast from '$lib/components/Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { scale, fly } from 'svelte/transition';

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
</script>

<svelte:head>
	<title>Spooky Sets: Workout</title>
</svelte:head>

<main>
	<Toast />
	<h2>{$title}</h2>
	<section>
		<button on:click={addExercise}>Add Exercise</button>
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
	.exercise-complete {
		opacity: 50%;
	}
	h2 {
		font-size: var(--heading-three);
		background-image: var(--grad-orange-to-pink);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		margin-bottom: 1rem;
	}

	button {
		background-color: var(--foreground);
		height: 1.5rem;
		border: none;
	}
</style>
