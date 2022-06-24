<script context="module">
	export const prerender = true;
</script>

<script type="ts">
	enum Sex {
		Male = 'MALE',
		Female = 'FEMALE',
	}

	let lbs: number;
	let neck: number;
	let waist: number;
	let height: number;
	let bodyfatPercentage: number;
	let sex: Sex = 'MALE';
	let hips: number;

	function processForm(lbs: number, neck: number, waist: number, height: number, hips): number {
		if (sex === Sex.Male) {
			bodyfatPercentage =
				Math.round((86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76) * 100) /
				100;
		} else {
			bodyfatPercentage =
				Math.round(
					(163.205 * Math.log10(waist + hips - neck) - 97.684 * Math.log10(height) - 78.387) * 100,
				) / 100;
		}
		return bodyfatPercentage;
	}

	function handleReset(): void {
		bodyfatPercentage = undefined;
	}

	// 	formula for men
	//  86.010 x log10 (waist - neck) - 70.041 x log10 (height) + 36.76
	//  formula for women
	//  163.205 x log10 (waist + hip - neck) - 97.684 x log10 (height) - 78.387
</script>

<main>
	<header>
		<h1>Bodyfat Calculator</h1>
		<h2>Navy-seal Formula</h2>
	</header>
	{#if !bodyfatPercentage}
		<form on:submit|preventDefault={processForm(lbs, neck, waist, height, hips)}>
			<h3>Your Biometrics:</h3>

			<label for="male">
				<input type="radio" id="male" name="sex" bind:group={sex} value={Sex.Male} />
				{Sex.Male}
			</label>
			<label for="female">
				<input type="radio" id="female" name="sex" bind:group={sex} value={Sex.Female} />
				{Sex.Female}
			</label>
			<label for="lbs">Weight in pounds:</label>
			<input required type="number" step="0.01" bind:value={lbs} id="lbs" name="lbs" />
			<label for="neck">Neck in inches:</label>
			<input required type="number" step="0.01" bind:value={neck} id="neck" name="neck" />
			<label for="waist">Waist at belly-button in inches:</label>
			<input required type="number" step="0.01" bind:value={waist} id="waist" name="waist" />
			<label for="height">Height in inches:</label>
			<input required type="number" step="0.01" bind:value={height} id="height" name="height" />
			{#if sex === Sex.Female}
				<label for="height">Hips in inches:</label>
				<input required type="number" step="0.01" bind:value={hips} id="height" name="height" />
			{/if}
			<button type="submit">Calculate Bodyfat Percentage</button>
		</form>
	{:else}
		<form on:submit|preventDefault={handleReset}>
			<h2>Bodyfat Percentage: {bodyfatPercentage}%</h2>
			<button type="submit">Reset</button>
		</form>
	{/if}
</main>

<style>
	main {
		@apply grid gap-8 justify-center items-center;
	}
	header {
		@apply grid text-center gap-4;
	}
	h1 {
		@apply text-5xl font-bungee text-indigo-300;
	}
	h2 {
		@apply text-3xl font-bungee text-indigo-300;
	}
	form {
		@apply mx-auto py-3 px-5 border-2 border-indigo-300 rounded grid grid-cols-2 gap-4 max-w-sm justify-center;
	}
	form h3 {
		@apply col-span-2 text-indigo-300 text-3xl text-center font-bungee;
	}

	label {
		@apply font-bungee text-lg text-indigo-300;
	}
	button {
		@apply mt-4 p-4 bg-indigo-300 border-none col-span-2 text-slate-900 text-xl rounded font-bungee;
	}
</style>
