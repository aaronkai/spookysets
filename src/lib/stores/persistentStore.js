import { writable } from 'svelte/store';

import { browser } from '$app/env';

export const persistStore = (key, initialValue) => {
	let persist;
	if (browser) {
		persist = localStorage.getItem(key);
	}
	const data = persist ? JSON.parse(persist) : initialValue;

	const store = writable(data, () => {
		const unsubscribe = store.subscribe((value) => {
			localStorage.setItem(key, JSON.stringify(value));
		});
		return unsubscribe;
	});
	return store;
};
