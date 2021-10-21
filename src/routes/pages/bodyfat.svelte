<script type="ts">
	import { scale, fly } from 'svelte/transition';

	let lbs: number = 188;
	let neck: number = 15;
	let abdomen: number = 37;
	let height: number = 74;
	let bodyfatPercentage: number;

	function processForm(lbs: number, neck: number, abdomen: number, height: number): number {
		bodyfatPercentage =
			Math.round((86.01 * Math.log10(abdomen - neck) - 70.041 * Math.log10(height) + 36.76) * 100) /
			100;
		return bodyfatPercentage;
	}

	function handleReset(): void {
		bodyfatPercentage = undefined;
	}
</script>

<!-- formula for men -->
<!--  86.010 x log10 (abdomen - neck) - 70.041 x log10 (height) + 36.76 -->

<!-- To Do -->
<!-- Add button for sex -->
<!--  163.205 x log10 (waist + hip - neck) - 97.684 x log10 (height) - 78.387 -->
<!-- on submit, replace form with result with transition -->
<main>
	<header>
		<h1>Bodyfat Calculator</h1>
		<h2>Navy-seal Formula</h2>
	</header>
	{#if !bodyfatPercentage}
		<form on:submit|preventDefault={processForm(lbs, neck, abdomen, height)}>
			<h3>Your Biometrics:</h3>
			<label for="lbs">Weight in pounds:</label>
			<input required type="number" step="0.01" bind:value={lbs} id="lbs" name="lbs" />
			<label for="neck">Neck in inches:</label>
			<input required type="number" step="0.01" bind:value={neck} id="neck" name="neck" />
			<label for="abdomen">Abdomen at belly-button in inches:</label>
			<input required type="number" step="0.01" bind:value={abdomen} id="abdomen" name="abdomen" />
			<label for="height">Height in inches:</label>
			<input required type="number" step="0.01" bind:value={height} id="height" name="height" />
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
	label {
		/* margin: 1rem 0; */
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
