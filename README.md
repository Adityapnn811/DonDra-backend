# TYPEORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# Cara run:
1. npm run build
2. npm run start

# Cara deploy ke heroku:
git push heroku main

# Cara seeding database:
1. Tambahin command dan query di typeorm/seed.ts
2. Run `npx ts-node typeorm/seed.ts` (npm run db:seed doesnt work dunno why)

# NOTES
- Tambah entity ada di folder `src/entity`
- Buat heroku yang free dan pake typeorm, tambahin snippet ini di data-source.ts
```
ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false,
        },
    }
```

# DESIGN PATTERN
1. Factory
Factory digunakan untuk melakukan inisiasi database (seeding)