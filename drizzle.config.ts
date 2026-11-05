import { defineConfig } from 'drizzle-kit';

const { DATABASE_URL } = process.env;

const url = DATABASE_URL ? DATABASE_URL : './.local-pgdata';
const driver = DATABASE_URL ? undefined : 'pglite';

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: { url },
	driver
});
