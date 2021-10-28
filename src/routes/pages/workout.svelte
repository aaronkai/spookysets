<script type="ts">
	import Exercise from '$lib/components/Exercise.svelte';
	import { exercises, title, id } from '$lib/stores/exerciseStore';
	import Toast from '$lib/components/Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { scale, fly } from 'svelte/transition';
	import Timer from '$lib/components/Timer.svelte';
	import { user } from '$lib/stores/sessionStore';

	import { supabase } from '$lib/supabaseClient';
	let loading: boolean = false;
	let boopTimer: Timer;

	function addExercise(): void {
		let newId: number = $exercises.at(-1).id + 1 || 0;
		$exercises.push({ id: newId, name: 'placeholder', sets: [false, false, false] });
		$exercises = $exercises;
		$alert = { text: 'Exercise Added to List', isActive: true };
	}

	async function saveWorkout(): void {
		try {
			loading = true;
			const user = supabase.auth.user();

			const upserts = {
				id: $id,
				user_id: user.id,
				name: $title,
				exercises: $exercises,
			};
			const { data, error } = await supabase.from('workouts').insert(upserts);
			if (error) {
				throw error;
			} else {
				$alert = { text: 'Workout Saved', isActive: true };
			}
		} catch (error) {
			console.log(error);
			$alert = { text: 'Something went wrong!', isActive: true };
		} finally {
			loading = false;
		}
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
	<!-- Workout Title -->
	<h1 contenteditable="true" bind:innerHTML={$title} type="text" />
	<!-- Control Panel -->
	<section>
		<div class="controls">
			<button on:click={addExercise} title="Add Exercise">&plus;</button>
			<Timer bind:boopTimer />
			<button on:click={saveWorkout} title="Save" disabled={$user ? false : true}
				><img class="icon" src="/save.svg" alt="save icon" /></button
			>
		</div>
		<!-- Exercise List -->
		{#each $exercises.filter((_, index) => !exerciseDone(index)) as exercise (exercise.id)}
			<div class="exercise" in:scale out:fly={{ x: 400 }}>
				<Exercise {exercise} {boopTimer} />
			</div>
		{/each}
	</section>
	<!-- Finished Exercise List -->
	<section>
		{#each $exercises.filter((exercise, index) => exerciseDone(index)) as exercise}
			<div class="exercise-complete">
				<Exercise {exercise} />
			</div>
		{/each}
	</section>
</main>

<style>
	h1 {
		color: var(--purple);
		background-color: var(--black);
		font-family: bungee, sans-serif;
		font-size: var(--font-3xl);
		text-transform: capitalize;
		border: none;
		width: 100%;
	}

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
	.controls img {
		width: 50%;
		height: 50%;
		color: var(--black-dark);
		cursor: pointer;
	}
	.exercise-complete {
		opacity: 50%;
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
		cursor: pointer;
	}
	button:hover {
		opacity: 0.75;
	}
	button:disabled {
		background-color: var(--green-300);
	}
	@media only screen and (max-width: 450px) {
	}
</style>
