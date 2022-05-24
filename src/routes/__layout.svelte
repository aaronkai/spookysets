<script>
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	// import '$lib/styles/reset.css';
	// import '$lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Bungee&amp;family=Roboto&amp;display=swap"
		rel="stylesheet"
	/>
	<title>Spooky Sets</title>
</svelte:head>
<div class="wrapper">
	<header />
	<div class="wrapper-inner">
		<slot />
	</div>
	<footer />
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-rows: auto 1fr auto;
		row-gap: var(--size-2);
		margin: 0 auto;
		background-color: var(--gray-9);
		height: 100%;
		min-height: 100vh;
	}
	.wrapper-inner {
		justify-self: center;
		max-width: var(--size-content-3);
		display: grid;
		align-content: center;
	}
</style>
