<script>
	import { fly } from 'svelte/transition';
	import { alert } from '$lib/stores/alert';

	function closeAlert() {
		alert.set({
			text: $alert.text,
			isActive: false,
		});
	}

	alert.subscribe((value) => {
		if (value.isActive) {
			setTimeout(closeAlert, 2000);
		}
	});
</script>

{#if $alert.isActive}
	<aside transition:fly={{ y: 100 }}>
		<p>{$alert.text}</p>
	</aside>
{/if}

<style>
	aside {
		background-color: var(--green-3);
		position: fixed;
		bottom: 20px;
		left: 0px;
		right: 0px;
		padding: 1rem;
	}
	aside p {
		color: var(--gray-9);
		font-family: bungee;
		text-align: center;
		margin: 0;
		max-width: 100%;
	}
</style>
