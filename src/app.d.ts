import { SupabaseClient, Session } from '@supabase/supabase-js';
import type { Gasto } from './types/gasto';
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession(): Promise<{ session: Session | null; user: User | null }>;
		}
		interface PageData {
			session?: Session | null;
			user?: User | null;
			gastos?: Gasto[];
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
