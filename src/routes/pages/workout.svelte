<script type="ts">
	import Exercise from '$lib/components/Exercise.svelte';
	import { exercises, title, id } from '$lib/stores/exerciseStore';
	import Toast from '$lib/components/Toast.svelte';
	import { alert } from '$lib/stores/alert';
	import { crossfade, fly } from 'svelte/transition';
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
		<div class="controls grid gap-1 mb-4">
			<button on:click={addExercise} title="Add Exercise">
				<span class="addButtonText">Add Exercise</span> &plus;</button
			>
			<Timer bind:boopTimer />
			{#if $user}
				<button on:click={saveWorkout} title="Save" class="save" disabled={loading}>
					Save
					<img class="icon" src="/save.svg" alt="save icon" />
				</button>
			{:else}
				<a class="control__login" href="/pages/signUp">Log In to Save</a>
			{/if}
		</div>
		<!-- Exercise List -->
		{#each $exercises.filter((_, index) => !exerciseDone(index)) as exercise (exercise.id)}
			<div
				class="exercise"
				animate:flip
				in:receive={{ key: exercise.id }}
				out:send={{ key: exercise.id, duration: 2 }}
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
		@apply text-indigo-300 bg-slate-900 font-bungee text-3xl border-0 w-full text-center mt-8;
	}

	main {
		@apply grid px-4 gap-8;
	}

	section {
		@apply grid gap-4;
	}
	.controls {
		@apply grid grid-cols-3 justify-center;
	}
	.controls img {
		@apply w-1/2 h-1/2 text-slate-900 cursor-pointer font-bungee;
	}
	.save,
	.addButtonText {
		@apply text-xl;
	}
	.exercise-complete {
		@apply opacity-50;
	}
	button {
		@apply bg-emerald-400  flex justify-center items-center flex-col text-5xl text-slate-900 cursor-pointer  font-bungee;
	}
	button:hover {
		@apply opacity-75;
	}
	button:disabled {
		@apply bg-emerald-200;
	}
	.control__login {
		@apply mx-auto h-28 w-full text-slate-900 bg-emerald-400 font-bungee text-center flex justify-center items-center flex-col p-8;
	}
</style>
