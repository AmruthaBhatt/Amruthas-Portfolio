# 🔧 FIX YOUR 404 ERROR - COMPLETE SOLUTION

## 🚨 THE PROBLEM
Your Vercel deployment shows a 404 error. **Root cause:** Your Supabase anon key is incomplete.

## ✅  THE SOLUTION
Follow this guide **step-by-step** to get your website working perfectly.

---

# STEP 1: GET VALID SUPABASE CREDENTIALS (3 minutes)

## ⚠️ Your Current Issue
In `backend/.env`, your anon key is: `tepblrpzkrkiiabyxkba`

**This is WRONG!** It should be 150+ characters like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvdXItcHJvamVjdC1pZCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjc0NTEwODAwLCJleHAiOjE5OTA1NTA0MDB9.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## How to Get the Real Key

### 1. Go to Supabase Dashboard
- Open: https://supabase.com/dashboard
- Sign in (or create account if you don't have one)

### 2. Select Your Project
- Click your "portfolio-website" project
- If you don't have one, click "New project"
  - Name: `portfolio-website`
  - Choose closest region
  - Create

### 3. Get Your Credentials
- **Left sidebar** → Click "Settings"
- **Click "API"**
- **You'll see two sections:**

   **A) Project URL** (copy this)
   ```
   https://tepblrpzkrkiiabyxkba.supabase.co
   ```

   **B) Project API Keys**
   - Find **"Anon public"** key
   - **CLICK THE COPY ICON** to copy the full key
   - (Don't just copy the visible part - click copy icon!)

### 4. Verify Your Key is Complete
- It should start with: `eyJhbGc...`
- It should be **150+ characters long**
- It should have **3 sections with dots**: `xxxxx.xxxxx.xxxxx`

---

# STEP 2: CREATE DATABASE TABLES (2 minutes)

### 1. Go to SQL Editor
- In Supabase dashboard
- **Left sidebar** → "SQL Editor"

### 2. Run This Command (Copy exact text)
```sql
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Click "Run" button (top right)

Expected message: "Success: Query returned with 0 results"

---

# STEP 3: ADD SAMPLE PROJECTS (2 minutes)

### 1. Go to Table Editor
- **Left sidebar** → "Table Editor"
- Click `projects` table

### 2. Insert Projects (Click "Insert row")

| Field | Value |
|-------|-------|
| title | E-Commerce Platform |
| description | Full-stack e-commerce with payment integration |
| link | https://github.com/yourusername/ecommerce |

**Add 3-5 projects total** (Click "Insert row" multiple times)

---

# STEP 4: UPDATE YOUR .ENV FILE (1 minute)

### 1. Open `backend/.env` File
- In VS Code (or any text editor)
- Navigate to: `backend/.env`

### 2. Replace These Lines
**Find:**
```
SUPABASE_URL=https://tepblrpzkrkiiabyxkba.supabase.co
SUPABASE_ANON_KEY=tepblrpzkrkiiabyxkba
```

**Replace with** (copy from Supabase dashboard):
```
SUPABASE_URL=https://your-actual-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_complete_key_here...
```

### 3. Save File
- Press **Ctrl+S** (or **Cmd+S** on Mac)

---

# STEP 5: TEST LOCALLY (3 minutes)

## Terminal 1: Start Backend

```bash
cd backend
npm install  # Only if first time
npm run dev
```

**Wait for this message to appear:**
```
✅ Server is running on http://localhost:3000
📝 API Documentation:
   - GET /api/projects - Fetch all projects
   - POST /api/contact - Submit contact form
   - GET /api/health - Health check
📄 Frontend served at root: http://localhost:3000
```

## Terminal 2: Test in Browser

Open browser to: **http://localhost:3000**

**Verify everything works:**
- ✅ Page loads (portfolio homepage visible)
- ✅ Navigation works (click nav links)
- ✅ Projects section shows your projects from database
- ✅ Contact form can be submitted (no errors)

---

# STEP 6: DEPLOY TO VERCEL (3 minutes)

## Install Vercel CLI
```bash
npm install -g vercel
```

## Deploy Backend
```bash
cd backend
vercel
```

When prompted:
- `Set up and deploy?` → Yes (`y`)
- Other questions → Press Enter (use defaults)

**Save the URL** it gives you (e.g., `https://portfolio-3qs.vercel.app`)

## Add Environment Variables to Vercel

1. **Open Vercel Dashboard**: https://vercel.com/dashboard
2. **Click your deployed project**
3. **Go to: Settings → Environment Variables**
4. **Add these 2 variables:**

   | Name | Value |
   |------|-------|
   | `SUPABASE_URL` | `https://your-project-id.supabase.co` |
   | `SUPABASE_ANON_KEY` | `eyJhbGciOi...` (full key) |

5. **Redeploy**: Click "Deployments" → Latest → Click "..." → "Redeploy"

---

# STEP 7: VERIFY DEPLOYMENT (2 minutes)

### Test Backend API
Open in browser:
```
https://portfolio-xxxxx.vercel.app/api/health
```

Should show:
```json
{
  "status": "Server is running",
  "environment": "production"
}
```

### Test Projects
Open in browser:
```
https://portfolio-xxxxx.vercel.app/api/projects
```

Should show array of your projects from database

### Test Full Website
Open:
```
https://portfolio-xxxxx.vercel.app
```

Should load your **complete working portfolio**!

---

# 🎉 COMPLETE!

Your portfolio website is now:
✅ Running locally perfectly
✅ Deployed on Vercel
✅ Loading projects from Supabase database
✅ Contact form saving to Supabase
✅ Fully functional and live online

---

## 🎨 CUSTOMIZE

### Change Your Name
Edit `frontend/index.html`:
```html
<h1 class="hero-title">Hi, I'm YOUR NAME</h1>
```

### Change Colors
Edit `frontend/style.css` (around line 57):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Try:
- Sunset: `#FF6B6B 0%, #FFB347 100%`
- Ocean: `#0066CC 0%, #00CCFF 100%`
- Forest: `#1B4242 0%, #4A7C59 100%`

### Update About Section
Edit `frontend/index.html` - About section

### Add More Projects
Add directly in Supabase Table Editor

---

## 🐛 IF SOMETHING FAILS

### "Cannot connect to Supabase"
- Check SUPABASE_URL is correct (from Settings → API)
- Check SUPABASE_ANON_KEY is complete (150+ characters)
- Restart backend: `npm run dev`

### "404 on Vercel"
- Wait 2-3 minutes after deployment
- Check env vars in Vercel Settings
- Click "Redeploy" on Vercel

### "Projects not loading"
- Check database tables exist (SQL Editor)
- Check projects table has data
- Open browser console (F12) → check for errors

### "Contact form doesn't work"
- Check backend logs (`npm run dev` terminal)
- Verify Supabase TABLE can be written to

---

## 📞 QUICK REFERENCE

| What | URL |
|------|-----|
| Local frontend | http://localhost:3000 |
| Local API | http://localhost:3000/api/projects |
| Deployed site | https://your-vercel-url.vercel.app |
| Supabase dashboard | https://supabase.com/dashboard |
| Vercel dashboard | https://vercel.com/dashboard |

---

## 🚀 SHARE YOUR PORTFOLIO!

Your Vercel URL is your live portfolio. Share it with:
- Recruiters
- Friends
- Social media
- Your resume

Example: `https://your-portfolio.vercel.app`

**You're done! 🎉**
