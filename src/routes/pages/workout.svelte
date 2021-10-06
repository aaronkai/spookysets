<script>
	import AuthForm from '$lib/components/AuthForm.svelte';

	let uid = 0;
	let exercises = [
		{
			id: uid++,
			name: 'pullup',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'squat',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'ring dip',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'nordic curl',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'inverted row',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'pushup',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'abdominal rollout',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'banded pallof press',
			sets: [false, false, false],
		},
		{
			id: uid++,
			name: 'reverse hyperextension',
			sets: [true, true, true],
		},
	];

	function addExercise() {
		//Svelte does not play nice with array functions like push
		//So we are resorting to the spread operator instead
		exercises = [
			...exercises,
			{
				id: uid++,
				name: 'placeholder',
				sets: [false, false, false],
			},
		];
		console.log(exercises);
	}

	function removeExercise(singleExercise) {
		exercises = exercises.filter((exercise) => exercise.id !== singleExercise.id);
	}

	function markSetDone(setIndex, exerciseId) {
		let index = exercises.findIndex((exercise) => exercise.id === exerciseId);
		exercises[index].sets[setIndex] = !exercises[index].sets[setIndex];
	}

	function removeSet(exerciseId) {
		let index = exercises.findIndex((exercise) => exercise.id === exerciseId);
		exercises[index].sets.pop();
		exercises = exercises;
	}

	function addSet(exerciseId) {
		let index = exercises.findIndex((exercise) => exercise.id === exerciseId);
		exercises[index].sets.push(false);
		exercises = exercises;
	}
	function exerciseDone(exerciseIndex) {
		if (
			[...new Set(exercises[exerciseIndex].sets)][0] === true &&
			[...new Set(exercises[exerciseIndex].sets)].length === 1
		) {
			return true;
		} else {
			return false;
		}
	}
</script>

<main>
	<h2>In Progress</h2>
	<button on:click={addExercise}>Add Exercise</button>
	{#each exercises.filter((exercise, index) => !exerciseDone(index)) as exercise}
		<div class="exercise">
			<input type="text" bind:value={exercise.name} />
			<button on:click={() => removeSet(exercise.id)}>-</button>
			{#each exercise.sets as set, setIndex}
				<button
					on:click={() => markSetDone(setIndex, exercise.id)}
					class={set ? 'complete' : 'incomplete'}>{setIndex + 1}</button
				>
			{/each}
			<button on:click={() => addSet(exercise.id)}>+</button>

			<button on:click={() => removeExercise(exercise)}>Remove</button>
		</div>
	{/each}

	<h2>Complete</h2>
	{#each exercises.filter((exercise, index) => exerciseDone(index)) as exercise}
		<div class="exercise">
			<input type="text" bind:value={exercise.name} />
			<button on:click={() => removeSet(exercise.id)}>-</button>
			{#each exercise.sets as set, setIndex}
				<button
					on:click={() => markSetDone(setIndex, exercise.id)}
					class={set ? 'complete' : 'incomplete'}>{setIndex + 1}</button
				>
			{/each}
			<button on:click={() => addSet(exercise.id)}>+</button>

			<button on:click={() => removeExercise(exercise)}>Remove</button>
		</div>
	{/each}
</main>

<style>
	.complete {
		background-color: red;
	}
	main {
		display: grid;
		row-gap: 1rem;
	}
	.exercise {
		width: 100vw;
		display: flex;
	}
</style>
