import { writable } from 'svelte/store';
export const alert = writable({ text: 'New Message', isActive: false });
