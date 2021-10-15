<script>
	import Modal from '$lib/components/Modal.svelte';

	let isModalOpen = false;

	function toggleModal() {
		isModalOpen = !isModalOpen;
	}
</script>

<button on:click={toggleModal}>Summon Modal</button>

{#if isModalOpen}
	<Modal {toggleModal}>
		<p>Child Content</p>
		<button>Push me!</button>
	</Modal>
{/if}
