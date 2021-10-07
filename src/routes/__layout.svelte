<script>
	import Footer from '$lib/components/Footer.svelte';
	import '$lib/styles/reset.css';
	import '$lib/styles/global.css';
	import Header from '$lib/components/Header.svelte';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Bungee&family=Roboto&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="wrapper">
	<Header />
	<slot />
	<Footer />
</div>

<style>
	.wrapper {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr auto;
		row-gap: 1rem;
	}
</style>
