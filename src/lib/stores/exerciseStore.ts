import { writable } from 'svelte/store';

let uid = 0;
const id = writable();
const title = writable('Bodyweight Routine');
const exercises = writable([
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

export { exercises, title, id, locked };
