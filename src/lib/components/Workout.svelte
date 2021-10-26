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
			console.log(inserts);
			const { data, error } = await supabase.from('workouts').insert(inserts);
			console.log(data, error);
		} catch (error) {
			console.log(error);
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
			console.log({ allWorkouts });
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	}

	function setWorkout(workout) {
		console.log({ workout });
		$id = workout.id;
		$title = workout.name;
		console.log($title);
		console.log(workout.exercises);
		$exercises = workout.exercises;
		console.log($exercises);
	}
</script>

<header>
	<h1>Spooky Sets</h1>
	<h2>Welcome Back</h2>
</header>
<section use:getAllWorkouts>
	<h2>Your Workouts</h2>
	<table>
		<tr>
			<th>Name</th>
			<th>Edit</th>
			<th>Delete</th>
		</tr>
		{#each allWorkouts as workout}
			<tr>
				<td>
					<a href="/pages/workout" on:click={setWorkout(workout)}>{workout.name}</a>
				</td>
				<td>
					<button type="button" on:click={setWorkout(workout)}>
						<img class="icon" src="/pencil.svg" alt="pencil icon" title="Edit Workout" />
					</button>
				</td>
				<td>
					<a href="#"
						><img class="icon" src="/trash.svg" alt="trashcan icon" title="Delete Workout" /></a
					>
				</td></tr
			>
		{/each}
	</table>
</section>

<style>
	.icon {
		height: 1rem;
		width: 1rem;
	}
	th {
		font-family: bungee;
		color: var(--foreground);
	}
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
	section h3 {
		font-size: var(--font-2xl);
		text-align: center;
		color: var(--foreground);
	}
	section {
		display: grid;
		grid-gap: var(--spacing-xs);
	}
	table,
	tr,
	th,
	td {
		border: 1px solid var(--blackSecondary);
		padding: 1rem 0.25rem;
		text-align: center;
	}
	table {
		border-collapse: collapse;
		width: 100%;
		margin-top: var(--spacing-md);
	}
	table tr {
		width: 100%;
	}
	form {
		display: grid;
		grid-gap: 1rem;
	}
</style>
