# 🚨 URGENT FIX - COPY & PASTE COMMANDS

## ⏱️ 5 MINUTE FIX - Your website will be live and working!

---

## 🎯 THE PROBLEM
You see 404 because the backend isn't deployed. You only deployed the frontend.

## ✅ THE SOLUTION
Deploy the backend (1 command) + add env vars (1 minute)

---

## 🚀 STEP 1: PRE-FLIGHT CHECK (1 minute)

### Open PowerShell and run:
```powershell
# Check Node is installed
node -v
npm -v

# Navigate to project
cd "C:\Users\Amrutha Bhat\Desktop\Portfolio Website"

# Navigate to backend
cd backend

# Check files exist
ls
```

Expected to see: `server.js`, `package.json`, `routes` folder, `.env` file

---

## ⚡ STEP 2: GET REAL SUPABASE KEY (2 minutes)

### Go to: https://supabase.com/dashboard

**Copy these:**
1. **Project URL** - Like: `https://xxxx.supabase.co`
2. **Anon Public Key** - Like: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (LONG string, 150+ characters)

> ⚠️ Your current key "tepblrpzkrkiiabyxkba" is INCOMPLETE!

### Create tables (if not done):
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

### Add sample projects in Supabase Table Editor

---

## 🔐 STEP 3: UPDATE .env FILE (1 minute)

### Edit `backend/.env` file

**Find and replace:**
```
SUPABASE_URL=https://tepblrpzkrkiiabyxkba.supabase.co
SUPABASE_ANON_KEY=tepblrpzkrkiiabyxkba
```

**With your real values:**
```
SUPABASE_URL=https://your-real-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_full_key_here...
```

**Save** (Ctrl+S)

---

## 🧪 STEP 4: TEST LOCALLY (1 minute)

### In PowerShell (in backend folder):
```powershell
npm run dev
```

**Wait for message:**
```
✅ Server is running on http://localhost:3000
```

### In new PowerShell window:
```powershell
# Test it works
curl http://localhost:3000/api/health
```

### In browser:
Open: `http://localhost:3000`

Should load your portfolio!

**If works:** Stop backend (Ctrl+C) and go to Step 5

---

## 🌍 STEP 5: DEPLOY TO VERCEL (2 minutes)

### Install Vercel CLI (first time only):
```powershell
npm install -g vercel
```

### Deploy:
```powershell
# Make sure you're in backend folder
cd "C:\Users\Amrutha Bhat\Desktop\Portfolio Website\backend"

# Deploy
vercel
```

**When asked:**
- "Set up and deploy?" → `y` (yes)
- "Which scope?" → Press Enter
- "Link to existing project?" → `N` (no) OR `Y` if you have one
- "What's your project name?" → `portfolio` (or anything)
- Other questions → Press Enter

**SAVE THE URL** it gives you! Like: `https://portfolio-xxxx.vercel.app`

---

## 🔌 STEP 6: ADD ENVIRONMENT VARIABLES (1 minute)

### Go to Vercel dashboard: https://vercel.com/dashboard

1. **Click your deployed project** (should be named `portfolio` or similar)
2. **Click "Settings"** (top menu)
3. **Click "Environment Variables"** (left sidebar)
4. **Add these 2 variables:**

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://your-project-id.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

5. **Click "Deployments"** (top menu)
6. **Click the latest deployment**
7. **Click "..."** (top right)
8. **Click "Redeploy"**

**Wait 1-2 minutes...**

---

## ✅ DONE! Your site is live!

### Visit:
```
https://portfolio-xxxx.vercel.app
```

(Replace xxxx with your project ID from Vercel)

---

## 🎉 VERIFY IT WORKS

✅ Homepage loads
✅ Navigation works
✅ Projects display (from database)
✅ Contact form works
✅ No 404 errors!

---

## 🎨 CUSTOMIZE YOUR PORTFOLIO

### Change your name:
Open `frontend/index.html`:
```html
<h1 class="hero-title">Hi, I'm YOUR NAME</h1>
```

### Change colors:
Open `frontend/style.css` (line ~57):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

Try:
- Sunset: `#FF6B6B 0%, #FFB347 100%`
- Ocean: `#0066CC 0%, #00CCFF 100%`
- Forest: `#1B4242 0%, #4A7C59 100%`

### Redeploy after changes:
```powershell
cd backend
vercel --prod
```

---

## 🐛 IF STILL 404

### Check these:
1. ✅ Did you deploy backend? (Not just frontend?)
2. ✅ Did you add env vars in Vercel? (SUPABASE_URL and SUPABASE_ANON_KEY?)
3. ✅ Did you redeploy after adding env vars?
4. ✅ Did you wait 2 minutes?

### If still broken:
1. Check backend logs: `vercel logs` (in backend folder)
2. Check Supabase credentials are correct
3. Check tables were created in Supabase

---

## 📞 TROUBLESHOOTING

### Port already in use?
```powershell
npm run dev -- --port 3001
```

### Can't find backend folder?
```powershell
cd "C:\Users\Amrutha Bhat\Desktop\Portfolio Website\backend"
ls  # see files
```

### Vercel not installing packages?
```powershell
rm -r node_modules
npm install
vercel --prod
```

---

## ✨ YOU'RE DONE!

Your fully working portfolio is now live online! 🚀

**Share your URL:** `https://your-portfolio.vercel.app`

---

## 📋 QUICK REFERENCE

| What | Where |
|------|-------|
| Your live site | https://portfolio-xxxx.vercel.app |
| Supabase | https://supabase.com/dashboard |
| Vercel | https://vercel.com/dashboard |
| Local test | http://localhost:3000 |

---

** That's it! No more 404 errors!**
