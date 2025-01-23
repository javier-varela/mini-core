import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { supabase: sb } }) => {
	const { data, error, status } = await sb
		.from('Gastos')
		.select('created_at')
		.order('created_at', { ascending: true })
		.limit(1); // Opcional, trae solo el menor registro

	if (error) {
		return new Response(JSON.stringify(error), {
			status,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify(data[0].created_at.split('T')[0]), {
		status,
		headers: { 'Content-Type': 'application/json' }
	});
};
