import { drizzle as drizzlePg } from 'drizzle-orm/postgres-js';
import { drizzle as drizzlePglite } from 'drizzle-orm/pglite';
import postgres from 'postgres';
import { PGlite } from '@electric-sql/pglite';
import * as schema from './schema';
import { DATABASE_URL } from '$app/env/private';
import { dev } from '$app/env';

function createDb() {
	if (!DATABASE_URL) throw new Error('DATABASE_URL is not set');

	// Lokal test için PGLite kullanıyorum
	if (dev) {
		const client = new PGlite('./.local-pgdata');
		return drizzlePglite(client, { schema });
	}

	// Production için Postgres kullanıyorum
	const client = postgres(DATABASE_URL);
	return drizzlePg(client, { schema });
}

export const db = createDb();
