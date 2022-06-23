<script>
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
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
<div class="grid grid-rows-[auto,_1fr_,auto] bg-gray-900 min-h-screen">
	<Header />
	<div class="grid content-center justify-center">
		<slot />
	</div>
	<Footer />
</div>
