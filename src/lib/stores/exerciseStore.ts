import { writable } from 'svelte/store';

let uid = 0;
let id = writable();
let title = writable('Bodyweight Routine');
let exercises = writable([
	{
		id: uid++,
		name: 'skin the cat 5x2',
		sets: [false, false, false, false, false],
	},
	{
		id: uid++,
		name: 'pullup',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'Dumbell Front Squat',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'ring turnout dip',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'nordic curl',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'wide/arch inverted row',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'Pushup progression',
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
]);

export { exercises, title, id };
