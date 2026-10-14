# Owner authentication

The application uses Better Auth, Prisma 7, and PostgreSQL. Development and production both use Neon, with separate branches/databases. Name the development database `portfolio`. No public signup or social login is enabled.

## Private configuration

Use `.env.example` as the variable-name template and configure real values privately in `.env.local` or your hosting environment. Never commit secrets. Normal Bun/Next.js environment loading is allowed; do not print or inspect secret values.

- `DATABASE_URL`: pooled Neon development connection URL.
- `DIRECT_URL`: direct Neon development connection URL for migrations and the seed's dedicated Prisma client.
- `BETTER_AUTH_URL`: exact application origin, initially `http://localhost:3000`.
- `BETTER_AUTH_SECRET`: a cryptographically random secret of at least 32 characters. Set this yourself; changing it can invalidate sessions.
- `GMAIL_USER` and `GMAIL_APP_PASSWORD`: existing SMTP configuration, required for password-reset email delivery.

For deployment, configure the production origin and database separately. Do not connect preview deployments to the production database. Only trust proxy IP headers that the deployment platform overwrites; revisit `x-real-ip` when moving to AWS.

## First setup

Apply the existing Prisma-generated migrations to the intended development database before creating the owner.

After configuring the Neon development environment, run from the repository:

```sh
bun install
bun run db:migrate
bun run db:seed
bun run dev
```

During development, generate migrations with `bun run db:migrate:dev --name <change-name>` after updating the Prisma schema. For example, use `--name init` initially and `--name add_projects` for a later change. Without `--name`, Prisma prompts for a name when creating a migration. This command also applies the generated migration to the configured development database. `db:migrate` deploys existing Prisma-generated migrations; it does not generate them. Run either command deliberately against the intended environment, never during installation or builds. Do not hand-write migration files.

Prisma config explicitly loads `.env` through dotenv. For Neon, `DIRECT_URL` must be the direct connection URL to the development branch; `DATABASE_URL` is the pooled URL used by the application. Keep Neon-provided TLS parameters intact. Neither URL should be logged or committed.

Set `OWNER_EMAIL`, `OWNER_PASSWORD`, and optionally `OWNER_NAME` privately before seeding. `db:seed` creates a dedicated Prisma client using `DIRECT_URL` and passes that same client to its server-only Better Auth instance. It creates the fixed `portfolio-owner` account, skips an existing matching owner without changing the password, and refuses to create an owner when another account already exists. The public auth handler keeps signup disabled. Failures identify configuration validation, connection, lookup, or signup without printing raw provider errors or secret values. Do not pass a password in command arguments or share it in chat.

Open `/admin/login` and sign in with the owner's email and password. Password reset requires the configured email service.

## Authorization

Every future protected server page, mutation, upload endpoint, or enquiry query must call the owner authorization guard. Current protection exists for `/admin` and the enrollment page; future content APIs are not yet implemented. Do not rely on layout redirects alone.

The guard checks the current database session, account ownership, and session expiry. The `TwoFactor` model has been removed. Run `bun run db:migrate:dev --name remove_two_factor_table` against the intended Neon development database to generate and apply the table drop. The unused `twoFactorEnabled` and `authVersion` columns remain outside this cleanup.

Auth rate limiting is database-backed. Protected routes have private/no-store headers, noindex, and a no-referrer policy. Credentials and reset tokens must never be logged or sent to analytics.

## Verification

```sh
bun run test:auth
bun run lint
bun run typecheck
bun run build
```

The current test checks owner identity and session expiry. Live sign-in, sign-out, password-reset email, and session cookie behavior remain to be verified against the development environment.
