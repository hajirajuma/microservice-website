import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    // Use Node + ts-node ESM loader to run the TypeScript seed file
    seed: "ts-node prisma/seed.ts"
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
