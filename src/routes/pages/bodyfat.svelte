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
	let hips: number = 0;

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
		display: grid;
		row-gap: var(--spacing-md);
		justify-content: center;
		align-self: center;
	}
	header {
		display: grid;
		text-align: center;
		row-gap: var(--spacing-sm);
	}
	h1 {
		font-size: var(--font-3xl);
	}
	h2 {
		font-size: var(--font-lg);
	}
	form {
		margin: 0 auto;
		padding: var(--spacing-md) var(--spacing-sm);
		border: var(--border-size) solid var(--purple);
		border-radius: var(--rounded-lg);
		display: grid;
		grid-template-columns: 1fr 1fr;
		row-gap: var(--spacing-md);
		column-gap: var(--spacing-xs);
		max-width: 500px;
		justify-content: center;
		background-color: var(--black-dark);
	}
	form h3 {
		grid-column: span 2;
		color: var(--purple);
		font-size: var(--font-lg);
		text-align: center;
	}
	form div {
		grid-column: span 2;
	}
	label {
		font-family: bungee;
		font-size: var(--font-sm);
	}
	button {
		margin-top: var(--spacing-md);
		padding: var(--spacing-sm);
		background: var(--purple);
		border: none;
		grid-column: span 2;
		color: var(--black-dark);
		font-size: var(--font-md);
		border-radius: var(--rounded-md);
	}
</style>
