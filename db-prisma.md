# DP - Prisma: Best practices and useful commands

deploy25

## 1- After Schema modification

After a schema (model) modification, we need to generate a migration :

```bash
$ npx prisma migrate dev --name 'migration-name'
```

_Replace **migration-name** by a name describing the goal of this modificatio, for example:_

```bash
$ npx prisma migrate dev --name 'user-topics'
```

> **Then let know the rest of the team that a shema modification has been done and merged. They need to git-pull and run the migration.**

## 2- Applying migrations

After pullin a schema modofocation and a new migration,
We need to run the new migration:

```bash
$ npx prisma migrate dev
```

> If error because of schema synchronisation problem:

```bash
$ npx prisma migrate reset
```
