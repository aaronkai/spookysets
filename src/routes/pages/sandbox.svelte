<script>
	import { onMount } from 'svelte';

	import Box from '$lib/components/Box.svelte';

	onMount(() => {
		//registers scroll events
		addScrollEvent();
	});

	function addScrollEvent() {
		window.addEventListener('scroll', onScroll, { passive: true });
	}

	function onScroll() {
		console.log(window.pageYOffset);
	}
</script>

<Box />
<p>hi</p>

<style>
	p {
		height: 3000px;
	}
</style>
