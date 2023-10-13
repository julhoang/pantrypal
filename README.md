# PantryPal 🥕
PantryPal is a web app that aims to help users manage their pantry more effectively and reduce food waste by tracking pantry items and recommending recipes using ingredients that will soon expire. This app will simplify the process of finding recipes and ensure that users maximize their ingredient usage before they go bad.


## Installation
**Step 1:** In your local machine, type the following commands:

```
git clone https://github.com/julhoang/pantrypal 
cd pantrypal
npm install
```

**Step 2:** Set up a Supabase account and a Postgres database, placing the database link in the `.env` file with the following format:
```
DATABASE_URL="postgresql://postgres:[your_db_password]@...supabase.co:../postgres"
```

**Step 3:** The following command will help initialize the database with the schema already set up in in `prisma/schema.prisma`:
```
npx prisma migrate dev
```
If you want to see sample data, run: `npx prisma db seed`.

**Step 4:** Run the app 
```
npm run dev
```

## Testing

To run back-end tests, run: `npm run test`

## Demo

https://github.com/julhoang/pantrypal/assets/64108232/649467d5-bf18-4ecb-8a19-456fdfeda763

## Developer Team

- [Julia Hoang](https://github.com/julhoang)  
- [Chloe Zacharias](https://github.com/chloezacharias-uvic)
- [Jenny Luu](https://github.com/j7uu)
- [Aman Palod](https://github.com/palodaman)
