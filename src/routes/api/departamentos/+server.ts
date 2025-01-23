import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { supabase: sb } }) => {
	const { data, error, status } = await sb.from('Departamentos').select('*');

	if (error) {
		return new Response(JSON.stringify(error), {
			status,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify(data), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
};
