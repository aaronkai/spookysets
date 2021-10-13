import { writable } from 'svelte/store';

let uid = 0;
let exercises = writable([
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
]);

export { exercises };
