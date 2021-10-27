<script type="ts">
	import Nav from './Nav.svelte';
	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
		console.log(isNavOpen);
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
		background-color: var(--black-card);
		padding: var(--spacing-xs);
		width: 100%;
		border-bottom: var(--border-size) solid var(--pink);
	}

	a {
		text-decoration: none;
		font-size: var(--font-xl);
		color: var(--pink);
	}
	.ghost {
		height: 1rem;
		width: 1rem;
		margin-left: 1rem;
		animation-name: drift;
		animation-duration: 3s;
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-timing-function: linear;
	}
	.menu {
		height: var(--font-xl);
		width: var(--font-xl);
		color: var(--pink);
		border: 0;
		margin: 0;
	}
	button {
		background: none;
		border: none;
		padding: 0;
		margin: 0;
	}

	@keyframes drift {
		from {
			margin-left: 1rem;
			opacity: 0.1;
		}
		to {
			margin-left: 4rem;
		}
	}
</style>
