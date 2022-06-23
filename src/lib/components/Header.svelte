<script type="ts">
	import Nav from './Nav.svelte';
	let isNavOpen = false;

	function toggleNav() {
		isNavOpen = !isNavOpen;
	}
</script>

<header
	class="flex flex-row justify-between items-center bg-gray-800 p-4 w-full border-b-2 border-fuchsia-300 "
>
	<div>
		<a class="no-underline text-2xl text-fuchsia-300 font-bungee" href="/">Spooky sets</a>
	</div>
	{#if isNavOpen}
		<Nav {toggleNav} />
	{/if}
	<button on:click={toggleNav}
		><img class="h-8 w-8 m-0 border-none" alt="menu-icon" src="/menu.svg" /></button
	>
</header>
