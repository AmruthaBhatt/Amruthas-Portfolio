# 🚀 AMRUTHA'S PORTFOLIO - COMPLETE SETUP & DEPLOYMENT GUIDE

## 🎯 Your Situation
You have a Vercel deployment showing 404 errors. This guide will get your **fully functional website online in 15 minutes**.

---

## ⚡ STEP 1: Get Real Supabase Credentials (2 minutes)

### The Problem
Your `.env` file has an incomplete Supabase key. You need a complete one.

### The Solution

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Click your project** (or create one if you don't have it)
3. **Go to Settings → API** (left sidebar)
4. **Copy these values:**
   - **Project URL**: Looks like `https://xxxxx.supabase.co`
   - **Anon Public key**: Looks like `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (a LONG string)

> ⚠️ Your current key is incomplete! It should be 100+ characters, not just "tepblrpzkrkiiabyxkba"

### Add Sample Data (Important!)

1. **SQL Editor** → Run these 2 commands:

```sql
-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

2. **Table Editor** → Click `projects` → Add 3 projects:
   - Title: "E-Commerce Platform"
   - Description: "Full-stack e-commerce with payment integration"
   - Link: "https://github.com/yourusername/ecommerce"
   
   (Add 2-3 more with your real projects)

---

## 🖥️ STEP 2: Test Locally (3 minutes)

### Terminal 1 - Start Backend
```bash
cd backend
npm install  # Only first time
npm run dev
```

Expected output:
```
✅ Server is running on http://localhost:3000
📝 API Documentation:
   - GET /api/projects - Fetch all projects
   - POST /api/contact - Submit contact form
   - GET /api/health - Health check
📄 Frontend served at root: http://localhost:3000
```

### Terminal 2 - Test Frontend
Open your browser to: **http://localhost:3000**

You should see:
- ✅ Portfolio homepage loads
- ✅ Navigation works
- ✅ Projects display (from Supabase)
- ✅ Contact form works

---

## ☁️ STEP 3: Deploy to Vercel (5 minutes)

### Option A: Deploy Backend to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to backend**
   ```bash
   cd backend
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   - When asked about settings, press Enter for defaults
   - Save the backend URL (e.g., `https://portfolio-backend.vercel.app`)

4. **Add Environment Variables on Vercel**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add:
     ```
     SUPABASE_URL=https://your-project.supabase.co
     SUPABASE_ANON_KEY=your_full_anon_key_here
     NODE_ENV=production
     ```

### Option B: Deploy Frontend to Vercel (Alternative)

If you want the frontend separate:

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Update API URL in frontend**
   - Edit `frontend/script.js` 
   - Change: `const API_URL = '/api'` to use your backend Vercel URL
   ```javascript
   const API_URL = 'https://portfolio-backend.vercel.app/api';
   ```

---

## ✅ VERIFY DEPLOYMENT

### Test Backend API
Open in browser:
```
https://your-backend.vercel.app/api/health
```

Should return:
```json
{
  "status": "Server is running",
  "environment": "production",
  "timestamp": "2026-03-29T..."
}
```

### Test Projects Endpoint
Open in browser:
```
https://your-backend.vercel.app/api/projects
```

Should return array of your projects.

### Test Full Website
Open in browser:
```
https://your-backend.vercel.app/
```

Should load fully functional portfolio.

---

## 🎨 CUSTOMIZE YOUR PORTFOLIO

### Change Name & Title
Edit `frontend/index.html`:
```html
<h1 class="hero-title">Hi, I'm YOUR NAME</h1>
<p class="hero-tagline">YOUR TITLE | YOUR TAGLINE</p>
```

### Change Colors
Edit `frontend/style.css` (line ~57):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Change hex codes to your colors:
- Sunset: `#FF6B6B` to `#FFB347`
- Ocean: `#0066CC` to `#00CCFF`
- Forest: `#1B4242` to `#4A7C59`

### Update About Section
Edit `frontend/index.html` - About section with your bio

### Add Your Projects
Add directly in Supabase Table Editor

---

## 🐛 TROUBLESHOOTING

| Problem | Solution |
|---------|----------|
| 404 error on Vercel | Check backend deployed? Test `/api/health` endpoint |
| Projects not showing | Check Supabase has data? Run SQL to create tables |
| API not responding | Check Supabase URL & anon key in Vercel env vars |
| Contact form fails | Verify `.env` on backend has correct Supabase key |
| CORS errors | Backend CORS is configured to allow Vercel domains |

### Test Backend Locally Before Deploying
```bash
cd backend
npm run dev
# Open browser to http://localhost:3000/api/health
```

---

## 📁 YOUR FINAL STRUCTURE

```
Portfolio Website/
├── frontend/
│   ├── index.html ✅
│   ├── style.css ✅
│   └── script.js ✅
├── backend/
│   ├── server.js ✅ (Updated - serves frontend + API)
│   ├── package.json ✅
│   ├── .env ✅ (With your real Supabase credentials)
│   ├── vercel.json ✅ (Deployment config)
│   └── routes/
│       ├── projects.js ✅
│       └── contact.js ✅
└── [Documentation files]
```

---

## 🚀 DEPLOYMENT CHECKLIST

Before deploying, verify:

- [ ] Supabase tables created (projects, contacts)
- [ ] Sample projects added to database
- [ ] Real Supabase URL in backend/.env
- [ ] Real Supabase anon key in backend/.env (100+ characters)
- [ ] `npm run dev` works locally without errors
- [ ] http://localhost:3000 loads homepage
- [ ] http://localhost:3000/api/projects returns projects
- [ ] Contact form submits without errors
- [ ] Supabase credentials added to Vercel env vars
- [ ] Backend deployed to Vercel
- [ ] `https://your-backend.vercel.app/` loads your site

---

## 💡 IMPORTANT NOTES

✅ **Backend now serves Frontend**: Your backend (`server.js`) serves both the API and the frontend files. This means ONE Vercel deployment = complete website.

✅ **API works anywhere**: Uses relative paths (`/api`) so it works locally and on any deployment.

✅ **Full CORS support**: Configured for localhost, Vercel, Netlify, and custom domains.

✅ **SPA routing**: All routes fall back to `index.html` for proper page navigation.

---

## 📞 NEXT STEPS

1. ✅ Verify Supabase credentials (complete anon key!)
2. ✅ Test locally with `npm run dev`
3. ✅ Deploy backend to Vercel
4. ✅ Test deployed URL
5. ✅ Share your portfolio!

---

## 🎉 YOU'RE READY TO DEPLOY!

Your portfolio website is now **fully functional and ready for production**.

**Go live:** Deploy backend to Vercel and share your unique URL!

Questions? Check the browser console (F12) for error details.

Good luck! 🚀
