<footer>
	<a href="http://www.aaronhubbard.dev">Aaron Hubbard</a>
	<p>stay spooky y'all</p>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-around;
		padding: var(--size-2);
		background-color: var(--gray-8);
		border-top: var(--border-size-1) solid var(--gray-7);
	}
	a,
	p {
		font-family: bungee, sans-serif;
		font-size: var(--font-size-1);
		color: var(--gray-0);
		text-decoration: none;
		cursor: pointer;
	}
	@media (max-width: 600px) {
		a,
		p {
			font-size: var(--font-size-0);
		}
	}
</style>
