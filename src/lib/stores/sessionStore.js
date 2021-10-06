import { writable } from 'svelte/store';
// import { persistStore } from './persistentStore';

// This is the code from supabase
export const user = writable(null);

// CodeCat peristent svelte store...might not work in svelteKit
// https://www.youtube.com/watch?v=a65aPLz18IM
// const defaultData = { username: 'aaron' };
// export const store = persistStore('data', defaultData);
