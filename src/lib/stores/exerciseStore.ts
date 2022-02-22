import { writable } from 'svelte/store';

let uid = 0;
let id = writable();
let title = writable('Bodyweight Routine');
let exercises = writable([
	{
		id: uid++,
		name: 'pullup progression',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'Squat progression',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'dip progression',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'deadlift progression',
		sets: [false, false, false],
	},
	{
		id: uid++,
		name: 'row progression',
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
