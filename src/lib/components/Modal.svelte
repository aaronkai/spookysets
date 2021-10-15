<script>
	import { scale, fly } from 'svelte/transition';
	export let toggleModal;
</script>

<div class="modal">
	<div class="card" transition:fly={{ y: 40 }}>
		<button on:click={toggleModal} class="close">X</button>
		<h1>Modal Window</h1>
		<slot />
	</div>
	<div
		on:click={toggleModal}
		class="background"
		transition:scale={{ start: 1.2, duration: 1000 }}
	/>
</div>

<style>
	.modal {
		position: fixed;
		display: flex;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		align-items: center;
		justify-content: center;
	}
	.background {
		background: linear-gradient(45deg, var(--black), var(--comment));
		opacity: 0.9;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.card {
		border: 2px solid var(--black-secondary);
		background-color: var(--black-card);
		display: grid;
		gap: 1rem;
		align-items: center;
		position: relative;
		text-align: center;
		padding: 1rem;
	}
	.close {
		--size: 30px;
		background: var(--red);
		color: var(foreground);
		width: var(--size);
		height: var(--size);
		text-align: center;
		padding: 0;
		border-radius: var(--size);
		position: absolute;
		top: calc(var(--size) / 2 * -1);
		right: 10px;
		border: none;
	}
</style>
