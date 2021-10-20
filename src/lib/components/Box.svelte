<script>
	import { drag } from '$lib/drag';
	import { fade } from 'svelte/transition';

	let isVisible = true;

	function handleDragStop(e) {
		console.log(e);
		if (e.detail.x > 300) {
			isVisible = false;
		}
	}
</script>

{#if isVisible}
	<div class="box" use:drag transition:fade on:dragstop={handleDragStop} />
{/if}

<style>
	.box {
		background-color: var(--yellow);
		height: 100px;
		width: 100px;
	}
</style>
