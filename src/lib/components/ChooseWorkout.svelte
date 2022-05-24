<script>
	import { supabase } from '$lib/supabaseClient';
	import { exercises, id, title } from '$lib/stores/exerciseStore';

	const defaultWorkout = {
		id: $id,
		name: $title,
		exercises: $exercises,
	};
	let loading = false;
	let allWorkouts = [];

	//create a new workout
	// async function createNewWorkout() {
	// 	try {
	// 		loading = true;
	// 		const user = supabase.auth.user();

	// 		const inserts = {
	// 			user_id: user.id,
	// 			name: 'New Workout',
	// 			exercises: ['pushup', 'situp'],
	// 		};
	// 		const { data, error } = await supabase.from('workouts').insert(inserts);
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		loading = false;
	// 	}
	// }

	//Read existing workout/workouts
	async function getAllWorkouts() {
		try {
			loading = true;
			const user = supabase.auth.user();
			const { data, error } = await supabase.from('workouts').select().order('created_at');
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

	async function cloneWorkout(workout) {
		try {
			loading = true;
			const user = supabase.auth.user();
			const { data, error } = await supabase
				.from('workouts')
				.insert([{ user_id: user.id, name: `${workout.name} copy`, exercises: workout.exercises }]);
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
			getAllWorkouts();
		}
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
		<h1 class="text-center text-fuchsia-300 text-4xl text-shadow">Your Workouts</h1>
	</header>
		<button class="bg-blue-700">New Workout</button>
	<table>
		<!-- caption {
		font-size: var(--font-size-4);
		font-family: bungee;
		color: var(--gray-0);
		padding-bottom: var(--size-4);
		text-align: center;
	} -->

		<caption class="text-2xl text-gray-200 pb-4 font-bungee">Choose a Workout</caption>
		<tr>
			<th scope="col">Workout Name</th>
			<th scope="col">Delete?</th>
			<th scope="col">Clone?</th>
		</tr>
		<tr>
			<td> <a class="workoutLink" href="/pages/workout">Recommended Routine</a> </td>
			<td>
				<p>n/a</p>
			</td>
			<td>
				<button href="#">
					<img
						class="icon"
						src="/clone.svg"
						alt="clone icon"
						title="Clone Workout?"
						on:click={() => cloneWorkout(defaultWorkout)}
					/>
				</button>
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
				<td>
					<button href="#">
						<img
							class="icon"
							src="/clone.svg"
							alt="clone icon"
							title="Clone Workout?"
							on:click={cloneWorkout(workout)}
						/>
					</button>
				</td>
			</tr>
		{/each}
	</table>
</section>

<style>



	section {
		display: grid;
		grid-gap: var(--size-3);
	}
	table {
		border-collapse: separate;
		width: 100%;
		margin-top: var(--size-4);
		background-color: var(--gray-9);
		border: 2px solid var(--grape-3);
		border-radius: var(--radius-2);
	}

	th,
	td {
		border-top: 2px solid var(--grape-3);
		border-left: 2px solid var(--grape-3);

		padding: var(--size-5) var(--size-3);
		text-align: center;
	}
	th {
		color: var(--grape-3);
		font-family: bungee;
		font-size: var(--font-size-3);
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
		color: var(--gray-0);
	}
	.icon {
		height: 1rem;
		width: 1rem;
	}
	.workoutLink {
		color: var(--gray-0);
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
		display: flex;
		justify-content: center;
	}
</style>
