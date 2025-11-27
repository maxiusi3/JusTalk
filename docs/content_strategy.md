# JusTalk Content Strategy & Management

## 1. Content Overview
To achieve the "Immersive Input" goal, JusTalk requires high-quality, specific media assets.

| Content Type | Format | Specs | Source Strategy |
| :--- | :--- | :--- | :--- |
| **Vertical Drama** | Video (.mp4) | 9:16, 1080x1920, <60s | Stock Footage (Pexels/Mixkit) or AI Gen (Runway) |
| **Rescue Clips** | Video (.mp4) | 16:9 or 1:1, <5s | Movie Clips (Yarn.io) or Generic Reactions |
| **Thumbnails** | Image (.jpg) | 9:16, 720x1280 | Video Frame or AI Gen (Midjourney) |
| **Chat Scripts** | Text (JSON) | Structured Dialogue | LLM Generation (GPT-4) |

## 2. Storage Architecture
We will use **Supabase Storage** to host all media assets. This ensures:
- Fast loading (CDN).
- Security (RLS if needed, though mostly public for MVP).
- Easy management via Supabase Dashboard.

### Bucket Structure
Create a public bucket named `content`.

```text
/content
  /drama
    /chapter_1_coffee.mp4
    /chapter_2_lost_phone.mp4
    /chapter_3_interview.mp4
  /rescue
    /reaction_nod.mp4
    /reaction_confused.mp4
  /thumbnails
    /ch1_thumb.jpg
    /ch2_thumb.jpg
```

## 3. Acquisition & Management Workflow (MVP)

### Step 1: Sourcing
- **Video**: Since we cannot easily "hotlink" stock sites, we will download selected stock videos locally.
- **AI Generation**: For specific scenarios where stock is missing, we use AI tools.

### Step 2: Processing
- **Compression**: Ensure videos are web-optimized (H.264, AAC, reasonable bitrate) to reduce loading time.
- **Thumbnailing**: Extract a representative frame.

### Step 3: Uploading
- **Manual Upload**: For MVP, upload files directly to the Supabase Storage Dashboard.
- **Naming Convention**: Use consistent IDs (e.g., `ch1_drama.mp4`) to make SQL seeding easy.

### Step 4: Database Seeding
- Update `seed_real_content.sql` to use the Supabase Storage Public URL pattern:
  `https://[YOUR_PROJECT_ID].supabase.co/storage/v1/object/public/content/drama/ch1_drama.mp4`

## 4. Future Roadmap (V2)
- **Admin Panel**: A "Content Management" page in the app for admins to upload videos and write scripts.
- **Automated Pipeline**: A script to fetch stock videos and upload them automatically.
