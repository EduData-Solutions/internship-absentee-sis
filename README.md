# Internship Project: Absentee SIS

## Project Notes
- Please review the project overview document for a more succinct view into the project.
- The initial file structure here will get you started. You will need to dig in and debug throughout items that may arise. This will help navigate the complexities of starting a production product from the ground up.
- A PostgreSQL database will need to be set up. You can use your own preference on how to set one up, but leveraging Docker will be a simple approach. Create the .env file, and add the DATABASE_URL variable once this has been set up.
- ShadCn is a helpful tool to leverage a component library to help minimized requiring to create components out of the box. Review their documentation for additional components that you may want to use.

## Clone this repo OR follow Installation for a full manual approach

## Project Installation

```bash
pnpm create next-app@ internship-absentee-sis --src-dir --app --ts --tailwind --eslint
cd internship-absentee-sis
pnpm add drizzle-orm postgres zod
pnpm add -D drizzle-kit
pnpm dlx shadcn@latest init --preset b0 --template next
```

## Project Initialization

```bash
pnpm dev
```

## Database Steps

### Step A: Generate and Push

```bash
pnpm run db:generate
pnpm run db:push
```

### Step B: Seed the Data

```bash
pnpm run db:seed
```

### Step C: Verify

```bash
pnpm run db:studio
```

This will open a browser window at ```https://local.drizzle.studio```
