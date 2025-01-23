import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { supabase: sb }, url }) => {
	const date_start = url.searchParams.get('date_from');
	const date_end = url.searchParams.get('date_to');

	const query = sb.from('Gastos').select('*');

	if (date_start) query.gte('created_at', date_start);
	if (date_end) query.lte('created_at', date_end);

	const { data, error, status } = await query;

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
