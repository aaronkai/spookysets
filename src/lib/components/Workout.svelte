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
	<header>
		<h1>Spooky Sets</h1>
		<h2>Your Workouts</h2>
	</header>
	<table>
		<tr>
			<th>Workout Name</th>
			<th>Delete?</th>
		</tr>
		<tr>
			<td> <a class="workoutLink" href="/pages/workout"> Default</a> </td>
			<td>
				<p>n/a</p>
			</td>
		</tr>
		{#each allWorkouts as workout}
			<tr>
				<td>
					<a class="workoutLink" href="/pages/workout" on:click={setWorkout(workout)}
						>{workout.name}</a
					>
				</td>

				<td>
					<a href="#">
						<img
							class="icon"
							src="/trash.svg"
							alt="trashcan icon"
							title="Delete Workout"
							on:click={deleteWorkout(workout)}
						/>
					</a>
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
	header h2 {
		font-size: var(--font-2xl);
		text-align: center;
	}

	section {
		display: grid;
		grid-gap: var(--spacing-xs);
	}
	table,
	tr,
	th,
	td {
		border: 2px solid var(--pink);
		padding: 1.5rem 0.25rem;
		text-align: center;
	}
	th {
		color: var(--pink);
		font-family: bungee;
		font-size: var(--font-xl);
	}
	table {
		border-collapse: collapse;
		width: 100%;
		margin-top: var(--spacing-md);
		background-color: var(--black-dark);
	}
	table tr {
		width: 100%;
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
</style>
