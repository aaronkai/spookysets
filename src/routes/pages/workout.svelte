<script type="ts">
	import Exercise from '$lib/components/Exercise.svelte';
	import { exercises, title, id } from '$lib/stores/exerciseStore';
	import Toast from '$lib/components/Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { crossfade, scale, fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import Timer from '$lib/components/Timer.svelte';
	import { user } from '$lib/stores/sessionStore';
	import { supabase } from '$lib/supabaseClient';

	let loading: boolean = false;
	let boopTimer;

	function addExercise(): void {
		let newId: number = $exercises.at(-1).id + 1 || 0;
		$exercises.push({ id: newId, name: 'placeholder', sets: [false, false, false] });
		$exercises = $exercises;
		$alert = { text: 'Exercise Added to List', isActive: true };
	}

	async function saveWorkout(): Promise<void> {
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

	function exerciseDone(exerciseIndex: number): boolean {
		if (
			[...new Set($exercises[exerciseIndex].sets)][0] === true &&
			[...new Set($exercises[exerciseIndex].sets)].length === 1
		) {
			return true;
		} else {
			return false;
		}
	}

	const [send, receive] = crossfade({
		fallback: fly,
	});
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
			{#if $user}
				<button on:click={saveWorkout} title="Save" class="save" disabled={loading}>
					<img class="icon" src="/save.svg" alt="save icon" />
					Save
				</button>
			{:else}
				<a class="control__login" href="/signUp">Log In to Save</a>
			{/if}
		</div>
		<!-- Exercise List -->
		{#each $exercises.filter((_, index) => !exerciseDone(index)) as exercise (exercise.id)}
			<div
				class="exercise"
				animate:flip
				in:receive={{ key: exercise.id }}
				out:send={{ key: exercise.id }}
			>
				<Exercise {exercise} {boopTimer} />
			</div>
		{/each}
	</section>
	<!-- Finished Exercise List -->
	<section>
		{#each $exercises.filter((exercise, index) => exerciseDone(index)) as exercise (exercise.id)}
			<div
				animate:flip
				in:receive={{ key: exercise.id }}
				out:send={{ key: exercise.id }}
				class="exercise-complete"
			>
				<Exercise {exercise} {boopTimer} />
			</div>
		{/each}
	</section>
</main>

<style>
	h1 {
		color: var(--violet-3);
		background-color: var(--gray-9);
		font-family: bungee, sans-serif;
		font-size: var(--font-size-5);
		text-transform: capitalize;
		border: none;
		width: 100%;
	}

	main {
		display: grid;
		padding: var(--size-3);
		row-gap: var(--size-3);
	}

	section {
		margin-top: 0 var(--size-3);
		display: grid;
		row-gap: var(--size-3);
	}
	.controls {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
	}
	.controls img {
		width: 50%;
		height: 50%;
		color: var(--gray-9);
		cursor: pointer;
	}
	.save {
		font-size: var(--font-size-1);
	}
	.exercise-complete {
		opacity: 50%;
	}
	button {
		margin: 0 auto;
		background-color: var(--green-3);
		height: 100px;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border: 10px solid var(--gray-9);
		font-size: var(--font-size-5);
		color: var(--gray-9);
		cursor: pointer;
	}
	button:hover {
		opacity: 0.75;
	}
	button:disabled {
		background-color: var(--green-3);
	}
	@media only screen and (max-width: 450px) {
	}
	.control__login {
		margin: 0 auto;
		height: 100px;
		width: 100%;
		/* background-color: var(--green); */
		color: var(--violet-3);
		font-family: bungee;
		font-size: var(--font-size-3);
		border: 10px solid var(--gray-9);
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 10px;
		line-height: 1rem;
	}
</style>
