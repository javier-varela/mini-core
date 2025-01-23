import { SvelteURLSearchParams } from 'svelte/reactivity';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, url }) => {
	const params = new SvelteURLSearchParams();
	let date_from = url.searchParams.get('date_from') || '';
	let date_to = url.searchParams.get('date_to') || '';

	console.log(date_from);

	if (!date_from) {
		const date_from_res = await fetch('/api/gastos/get-min-date');
		date_from = await date_from_res.json();
	}

	if (!date_to) {
		const date_to_res = await fetch('/api/gastos/get-max-date');
		date_to = await date_to_res.json();
	}

	params.set('date_from', date_from);
	params.set('date_to', date_to);

	const apiUrl = '/api/gastos?' + params;

	console.log(apiUrl);

	const gastos_response = await fetch(apiUrl, {
		method: 'GET'
	});

	if (!gastos_response.ok) {
		const error = await gastos_response.json();
		throw new Error(error.message || 'Failed to fetch gastos');
	}
	return {
		gastos: await gastos_response.json(),
		date_to,
		date_from
	};
};
