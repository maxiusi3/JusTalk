# Content Sourcing Guide

Since we cannot automatically download from stock sites due to bot protection, please follow these steps to acquire and upload the necessary content.

## 1. Setup Storage
Run the following SQL in your Supabase SQL Editor to create the `content` bucket:
```sql
-- Copy from supabase/storage_setup.sql
INSERT INTO storage.buckets (id, name, public) VALUES ('content', 'content', true) ON CONFLICT (id) DO NOTHING;
-- (Add policies as needed, see file)
```

## 2. Download Videos
Please download the following videos (or similar ones you prefer) and rename them exactly as shown.

### Chapter 1: Coffee Shop
*   **Theme**: Barista serving coffee, vertical.
*   **Source**: [Pexels Search: Barista Vertical](https://www.pexels.com/search/videos/barista/?orientation=portrait)
*   **Target Filename**: `chapter_1_coffee.mp4`

### Chapter 2: Lost Phone
*   **Theme**: Worried person looking for something, vertical.
*   **Source**: [Pexels Search: Lost Phone Vertical](https://www.pexels.com/search/videos/looking%20for%20lost%20phone/?orientation=portrait)
*   **Target Filename**: `chapter_2_lost_phone.mp4`

### Chapter 3: Job Interview
*   **Theme**: Professional handshake or interview, vertical.
*   **Source**: [Pexels Search: Interview Vertical](https://www.pexels.com/search/videos/interview/?orientation=portrait)
*   **Target Filename**: `chapter_3_interview.mp4`

## 3. Upload to Supabase
1.  Go to your Supabase Dashboard -> Storage -> `content` bucket.
2.  Create a folder named `drama`.
3.  Upload the 3 renamed `.mp4` files into the `drama` folder.

## 4. Verify
Your file paths should be:
*   `drama/chapter_1_coffee.mp4`
*   `drama/chapter_2_lost_phone.mp4`
*   `drama/chapter_3_interview.mp4`
