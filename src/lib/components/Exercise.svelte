<script type="ts">
	import { exercises } from '$lib/stores/exerciseStore';
	import { alert } from '$lib/stores/alert';
	export let exercise;
	export let boopTimer;
	let counter = 0;

	function removeSet(exerciseId): void {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets.pop();
		$exercises = $exercises;
		$alert = { text: 'Set Removed', isActive: true };
	}
	function toggleSet(set, setIndex, exerciseId): void {
		if (set) {
			counter += 1;
		} else {
			counter = 0;
		}
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets[setIndex] = !$exercises[index].sets[setIndex];
		//boopTimer;
	}

	function addSet(exerciseId): void {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets.push(false);
		$exercises = $exercises;
	}
	function removeExercise(singleExercise): void {
		$exercises = $exercises.filter((exercise) => exercise.id !== singleExercise.id);
		$alert = { text: 'Exercise Removed', isActive: true };
	}

	function handleTimer(set) {
		if (!set) {
			boopTimer(true);
		} else {
			if (counter === 0) {
				boopTimer();
			} else {
			}
		}
	}
</script>

<!-- Exercise Title -->
<div class="exerciseTitle">
	<input type="text" bind:value={exercise.name} />
</div>
<!-- Exercise Controls: add set, markSetDone, remove set, remove exercise -->
<div class="exerciseControls">
	<button title="Remove Set" on:click={() => removeSet(exercise.id)}>&minus;</button>
	{#each exercise.sets as set, setIndex}
		<!-- Set buttons -->
		<button
			title="Mark Set Done"
			on:click={() => handleTimer(set)}
			on:click={() => toggleSet(set, setIndex, exercise.id)}
			class={set ? 'complete' : 'incomplete'}>{setIndex + 1}</button
		>
	{/each}
	<button title="Add Set" on:click={() => addSet(exercise.id)}>&plus;</button>

	<button title="Remove Exercise from List" on:click={() => removeExercise(exercise)}>Remove</button
	>
</div>

<style>
	.exerciseTitle {
		display: flex;
		margin-bottom: 8px;
	}
	.exerciseTitle input {
		color: var(--violet-3);
		background: none;
		font-family: bungee, sans-serif;
		font-size: var(--font-size-3);
		text-transform: capitalize;
		border: none;
		width: 100%;
		padding-left: 0;
	}
	.exerciseControls {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}
	.exerciseControls button {
		flex: 1;
		height: 2rem;
	}
	.complete {
		background-color: var(--green-3);
	}
	button {
		color: var(--gray-9);
		border: 1px solid var(--gray-9);
	}
	button:hover,
	input:hover {
		opacity: 0.75;
	}
</style>
