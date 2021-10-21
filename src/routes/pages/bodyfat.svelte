<script>
	let lbs = 188;
	let neck = 15;
	let abdomen = 37.38;
	let height = 74;
	let bodyfatPercentage;

	function processForm() {
		bodyfatPercentage =
			Math.round((86.01 * Math.log10(abdomen - neck) - 70.041 * Math.log10(height) + 36.76) * 100) /
			100;
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
	<form on:submit|preventDefault={processForm}>
		<label for="lbs">Weight in pounds:</label>
		<input type="number" step="0.01" bind:value={lbs} id="lbs" name="lbs" />
		<label for="neck">Neck in inches:</label>
		<input type="number" step="0.01" bind:value={neck} id="neck" name="neck" />
		<label for="abdomen">Abdomen at belly-button in inches:</label>
		<input type="number" step="0.01" bind:value={abdomen} id="abdomen" name="abdomen" />
		<label for="height">Height in inches:</label>
		<input type="number" step="0.01" bind:value={height} id="height" name="height" />
		<button type="submit">Calculate Bodyfat Percentage</button>
	</form>
	{#if bodyfatPercentage}
		<h2>Bodyfat Percentage: {bodyfatPercentage}%</h2>
	{/if}
</main>

<style>
	main {
		/* margin-top: var(--spacing-md); */
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
	header h1 {
		font-size: var(--font-3xl);
	}
	header h2 {
		font-size: var(--font-xl);
	}
	form {
		margin: 0 auto;
		padding: var(--spacing-md) var(--spacing-sm);
		border: var(--border-size) solid var(--purple);
		border-radius: var(--rounded-lg);
		display: grid;
		row-gap: var(--spacing-md);
		max-width: 500px;
		justify-content: center;
	}
	label {
		/* margin: 1rem 0; */
		font-family: bungee;
		font-size: var(--font-sm);
	}
	button {
		margin-top: var(--spacing-md);
		padding: var(--spacing-sm);
		background: var(--pink);
		border: none;
		grid-column: span 2;
		color: var(--black-dark);
		font-size: var(--font-md);
		border-radius: var(--rounded-md);
	}
</style>
