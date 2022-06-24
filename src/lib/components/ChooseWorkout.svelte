<script>
	import { supabase } from '$lib/supabaseClient';
	import { exercises, id, title } from '$lib/stores/exerciseStore';

	let loading = false;
	let allWorkouts = [];

	//create a new workout
	async function createNewWorkout() {
		try {
			loading = true;
			const user = supabase.auth.user();

			const inserts = {
				user_id: user.id,
				name: 'example 1',
				exercises: ['pushup', 'situp'],
			};
			const { data, error } = await supabase.from('workouts').insert(inserts);
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}
	//Read existing workout/workouts
	async function getAllWorkouts() {
		try {
			loading = true;
			const user = supabase.auth.user();
			const { data, error } = await supabase.from('workouts').select();
			allWorkouts = data;
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	function setWorkout(workout) {
		$id = workout.id;
		$title = workout.name;
		$exercises = workout.exercises;
	}

	async function deleteWorkout(workout) {
		try {
			loading = true;
			const user = supabase.auth.user();
			const { data, error } = await supabase.from('workouts').delete().match({ id: workout.id });
			getAllWorkouts();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}
</script>

<section class="p-4" use:getAllWorkouts>
	<header>
		<img class="ghost" src="/ghost.svg" alt="ghost" />
		<h1>Your Workouts</h1>
	</header>
	<table>
		<caption>Choose a Workout</caption>
		<tr>
			<th scope="col">Workout Name</th>
			<th scope="col">Delete?</th>
		</tr>
		<tr>
			<td> <a class="workoutLink" href="/pages/workout">Recommended Routine</a> </td>
			<td>
				<p>n/a</p>
			</td>
		</tr>
		{#each allWorkouts as workout}
			<tr>
				<td>
					<a
						title="Go To Workout"
						class="workoutLink"
						href="/pages/workout"
						on:click={setWorkout(workout)}>{workout.name}</a
					>
				</td>

				<td>
					<button href="#">
						<img
							class="icon"
							src="/trash.svg"
							alt="trashcan icon"
							title="Delete Workout"
							on:click={deleteWorkout(workout)}
						/>
					</button>
				</td>
			</tr>
		{/each}
	</table>
</section>

<style>
	header {
		@apply mb-4 grid grid-cols-[auto_1fr];
	}
	header h1 {
		@apply text-center font-bungee text-5xl text-indigo-300;
	}
	caption {
		@apply text-3xl font-bungee text-gray-50 pb-4 text-center;
	}

	section {
		@apply grid gap-4;
	}
	table {
		@apply w-full mt-4 bg-slate-900 border-2 border-indigo-300 rounded  border-separate;
	}

	th,
	td {
		@apply border-t-2 border-l-2 py-4 px-2 text-center border-indigo-300;
	}
	th {
		@apply text-indigo-300 text-xl border-t-0 font-bungee;
	}
	table tr {
		@apply w-full;
	}

	td:first-child,
	th:first-child {
		@apply border-l-0;
	}

	p {
		@apply text-gray-50 font-bungee;
	}
	.icon {
		@apply w-6 h-6;
	}
	.workoutLink {
		@apply text-gray-50 font-bungee;
	}
	.ghost {
		@apply h-12 w-12 m-auto;
	}
	button {
		@apply bg-none w-full h-full border-none cursor-pointer flex justify-center;
	}
</style>
