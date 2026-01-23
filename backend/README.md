# Backend server for Task Manager

## Initial setup

```sh
npm install

cp .env.example .env
# Set the appropriate values for all environment variables in `.env` file.

# Run pending migrations
npx prisma migrate dev

# Regenerate Prisma client
npx prisma generate
```

To seed database with sample data

```sh
npx prisma db seed
```

## Local development

To start local server, run

```sh
npm run dev
```

And then access the server running at http://localhost:5001.

```sh
curl http://localhost:5001
```

To start the Prisma Studio (to interact with the database),

```sh
npx prisma studio
```
