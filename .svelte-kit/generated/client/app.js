export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12')
];

export const server_loads = [];

export const dictionary = {
		"/": [~2],
		"/about": [3],
		"/contact": [4],
		"/projects": [5],
		"/projects/bingo-app": [6],
		"/projects/md-app": [7],
		"/projects/pento": [8],
		"/projects/pocketbase-logging": [9],
		"/projects/portfolio": [10],
		"/projects/svelte-pocketbase-quickstart": [11],
		"/projects/vybs": [12]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),

	reroute: (() => {})
};

export { default as root } from '../root.svelte';