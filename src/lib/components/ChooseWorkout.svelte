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

<section use:getAllWorkouts>
	<img class="ghost" src="/ghost.svg" alt="ghost" />

	<header>
		<h1>Spooky Sets</h1>
	</header>
	<table>
		<caption>Choose a Workout</caption>
		<tr>
			<th scope="col">Workout Name</th>
			<th scope="col">Delete?</th>
		</tr>
		<tr>
			<td> <a class="workoutLink" href="/pages/workout">Starter Routine</a> </td>
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
		display: grid;
		grid-gap: var(--spacing-md);
	}
	header h1 {
		font-size: var(--font-5xl);
		text-align: center;
		color: var(--pink);
	}
	caption {
		font-size: var(--font-2xl);
		font-family: bungee;
		color: var(--foreground);
		padding-bottom: 1rem;
		text-align: center;
	}

	section {
		display: grid;
		grid-gap: var(--spacing-xs);
	}
	table {
		border-collapse: separate;
		width: 100%;
		margin-top: var(--spacing-md);
		background-color: var(--black-dark);
		border: 2px solid var(--pink);
		border-radius: var(--rounded-md);
	}

	th,
	td {
		border-top: 2px solid var(--pink);
		border-left: 2px solid var(--pink);

		padding: 1.5rem 0.25rem;
		text-align: center;
	}
	th {
		color: var(--pink);
		font-family: bungee;
		font-size: var(--font-xl);
		border-top: none;
	}
	table tr {
		width: 100%;
	}

	td:first-child,
	th:first-child {
		border-left: none;
	}

	p {
		font-family: bungee;
		color: var(--foreground);
	}
	.icon {
		height: 1rem;
		width: 1rem;
	}
	.workoutLink {
		color: var(--green);
	}
	.ghost {
		height: 3rem;
		width: 3rem;
		margin: auto;
	}
	button {
		background: none;
		width: 100%;
		height: 100%;
		border: none;
		cursor: pointer;
	}
</style>
