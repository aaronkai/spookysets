<script>
	import { exercises, uid } from '$lib/stores/exerciseStore';

	function addExercise() {
		//Svelte does not play nice with array functions like push
		//So we are resorting to the spread operator instead
		$exercises = [
			...$exercises,
			{
				id: uid++,
				name: 'placeholder',
				sets: [false, false, false],
			},
		];
	}

	function removeExercise(singleExercise) {
		$exercises = $exercises.filter((exercise) => exercise.id !== singleExercise.id);
	}

	function markSetDone(setIndex, exerciseId) {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets[setIndex] = !$exercises[index].sets[setIndex];
	}

	function removeSet(exerciseId) {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets.pop();
		$exercises = $exercises;
	}

	function addSet(exerciseId) {
		let index = $exercises.findIndex((exercise) => exercise.id === exerciseId);
		$exercises[index].sets.push(false);
		$exercises = $exercises;
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
	<section>
		<button on:click={addExercise}>Add Exercise</button>
		{#each $exercises.filter((exercise, index) => !exerciseDone(index)) as exercise}
			<div class="exercise">
				<div class="exerciseTitle">
					<input type="text" bind:value={exercise.name} />
				</div>
				<div class="exerciseControls">
					<button on:click={() => removeSet(exercise.id)}>&minus;</button>
					{#each exercise.sets as set, setIndex}
						<button
							on:click={() => markSetDone(setIndex, exercise.id)}
							class={set ? 'complete' : 'incomplete'}>{setIndex + 1}</button
						>
					{/each}
					<button on:click={() => addSet(exercise.id)}>&plus;</button>

					<button on:click={() => removeExercise(exercise)}>Remove</button>
				</div>
			</div>
		{/each}
	</section>

	<section>
		<h2 style={exerciseDone ? 'display: none' : 'display:block'}>Complete</h2>
		{#each $exercises.filter((exercise, index) => exerciseDone(index)) as exercise}
			<div class="exercise-complete">
				<div class="exerciseTitle">
					<input type="text" bind:value={exercise.name} />
				</div>
				<div class="exerciseControls">
					<button on:click={() => removeSet(exercise.id)}>-</button>
					{#each exercise.sets as set, setIndex}
						<button
							on:click={() => markSetDone(setIndex, exercise.id)}
							class={set ? 'complete' : 'incomplete'}>{setIndex + 1}</button
						>
					{/each}
					<button on:click={() => addSet(exercise.id)}>&plus;</button>

					<button on:click={() => removeExercise(exercise)}>Remove</button>
				</div>
			</div>
		{/each}
	</section>
</main>

<style>
	.complete {
		background-color: var(--green);
	}
	main {
		display: grid;
		padding: 1rem;
		row-gap: 1rem;
		box-sizing: border-box;
		width: 100%;
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
		font-size: var(--heading-four);
	}

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
		height: 1.5rem;
	}
	button {
		background-color: var(--foreground);
		height: 1.5rem;
	}
</style>
