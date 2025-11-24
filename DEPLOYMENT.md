# Deployment Guide

## Prerequisites
- GitHub Account
- Vercel Account
- Supabase Account

## 1. Supabase Setup
1. Create a new project on [Supabase](https://supabase.com).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` from this repository and run it to create the database schema and seed data.
4. Go to **Project Settings > API** and copy the `Project URL` and `anon` public key.

## 2. GitHub Setup
1. Create a new repository on GitHub.
2. Push this code to your new repository:
   ```bash
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

## 3. Vercel Deployment
1. Go to [Vercel](https://vercel.com) and click **Add New > Project**.
2. Import your GitHub repository.
3. In the **Environment Variables** section, add the following:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
4. Click **Deploy**.

## 4. Verify
Once deployed, visit your Vercel URL. The app should load and fetch data from your Supabase database.
