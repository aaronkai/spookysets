<script type="ts">
	import Nav from './Nav.svelte';
	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
	}
</script>

<header>
	<div>
		<a href="/">Spooky sets</a>
	</div>
	{#if isNavOpen}
		<Nav {toggleNav} />
	{/if}
	<button on:click={toggleNav}><img class="menu" alt="menu-icon" src="/menu.svg" /></button>
</header>

<style>
	header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		background-color: var(--gray-8);
		padding: var(--size-2);
		width: 100%;
		border-bottom: var(--border-size-1) solid var(--grape-3);
	}

	a {
		text-decoration: none;
		font-size: var(--font-size-4);
		color: var(--grape-3);
	}

	.menu {
		height: var(--font-size-4);
		width: var(--font-size-4);
		color: var(--green-3);
		border: 0;
		margin: 0;
		width: 100%;
		height: 100%;
	}

	button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
		height: 1.5rem;
		width: 1.5rem;
	}
</style>
