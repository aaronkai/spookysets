<script context="module">
	export const prerender = true;
</script>

<main>
	<header>
		<h1>About Spooky Sets</h1>
	</header>
	<article>
		<p>
			I've beeen doing the r/bodyweightfitness <a
				href="https://www.reddit.com/r/bodyweightfitness/wiki/kb/recommended_routine/"
				>Recomended Routine</a
			> for several years now on and off when I don't have access to a gym. I did it when I was on paternity
			leave. I'm doing it now while COVID has closed my gym. It's great, you should try it!
		</p>

		<p>
			I'm usually deep in a podcast during my workouts. It's kind of embarassing, but I often forget
			what set I'm on! I wanted to make a little tool to help me keep track. That's what this site
			is!
		</p>

		<p>
			If you want to get started, you can just click <a href="/pages/workout">Workout</a> and start with
			the default routine I have saved. This probably isn't what you want to do though, because the Recomended
			Routine is super customizable. Go to the wiki and figure out your exercises.
		</p>

		<p>
			<a href="pages/SignUp">Sign Up</a> in order to be able to customize and save the default workout.
			You can click the title and the exercise names and change them, add and remove exercies, and add
			or remove sets. Save it. It'll be there for you on the home page next time you come back.
		</p>

		<p>
			If you want a <a href="/pages/bodyfat">basic body-fat percentage calculator</a>, there's one
			for you to use.
		</p>

		<p>
			Real talk: this app is a half-baked student project. I make no promises about it. There's
			probably better stuff out there if you care to find it. There are likely bugs galore and
			troublesome design patterns herein. But this site is simple, ad-free, and maybe it'll work for
			you, so I thought I'd share. Cheers!
		</p>
	</article>
</main>

<style>
	main {
		display: grid;
		row-gap: 3rem;
	}
	article {
		display: grid;
		row-gap: 1.5rem;
		line-height: 35px;
	}
	h1 {
		color: var(--purple);
	}

	a {
		color: var(--purple);
	}
</style>
