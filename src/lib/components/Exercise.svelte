<script>
	import { exercises } from '$lib/stores/exerciseStore';
	import { alert } from '$lib/stores/alert';
	export let exercise;

	function removeSet(exerciseId) {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets.pop();
		$exercises = $exercises;
		$alert = { text: 'Set Removed', isActive: true };
	}
	function markSetDone(setIndex, exerciseId) {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets[setIndex] = !$exercises[index].sets[setIndex];
	}

	function addSet(exerciseId) {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets.push(false);
		$exercises = $exercises;
	}
	function removeExercise(singleExercise) {
		$exercises = $exercises.filter((exercise) => exercise.id !== singleExercise.id);
		$alert = { text: 'Exercise Removed', isActive: true };
	}
</script>

<div class="exerciseTitle">
	<input type="text" bind:value={exercise.name} />
</div>
<div class="exerciseControls">
	<button title="Remove Set" on:click={() => removeSet(exercise.id)}>&minus;</button>
	{#each exercise.sets as set, setIndex}
		<button
			title="Mark Set Done"
			on:click={() => markSetDone(setIndex, exercise.id)}
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
		background-image: var(--grad-orange-to-pink);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		font-family: bungee, sans-serif;
		font-size: var(--heading-six);
		text-transform: capitalize;
		border: none;
		width: 300px;
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
		background-color: var(--green);
	}
	button {
		border: 1px solid var(--blackTernary);
	}
	button:hover,
	input:hover {
		opacity: 0.75;
	}
</style>
