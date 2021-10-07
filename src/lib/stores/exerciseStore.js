import { persistStore } from './persistentStore';

// CodeCat peristent svelte store...might not work in svelteKit
// https://www.youtube.com/watch?v=a65aPLz18IM
// const defaultData = { username: 'aaron' };
// export const store = persistStore('data', defaultData);

export let uid = 0;
let defaultExercises = [
	{
		id: uid++,
		name: 'pullup',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'squat',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'ring dip',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'nordic curl',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'inverted row',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'pushup',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'abdominal rollout',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'banded pallof press',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'reverse hyperextension',
		sets: [false, false, false],
	},
];

export let exercises = persistStore('bodyweightRoutine', defaultExercises);
