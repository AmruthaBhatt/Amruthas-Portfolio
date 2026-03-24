# 🚀 QUICK START GUIDE - Portfolio Website

## ⚡ Super Quick Setup (5 minutes)

### 1. Setup Supabase (2 minutes)
1. Go to https://supabase.com and create a free account
2. Click "New Project" 
3. Name it "portfolio-website"
4. In **SQL Editor**, run these commands one by one:

```sql
-- Create projects table
CREATE TABLE projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  link VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create contacts table
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

5. Add sample projects:
   - Click "Table Editor" → "projects" 
   - Click "Insert row" and add:
     - Title: `E-Commerce Platform`
     - Description: `Full-stack e-commerce with payment integration`
     - Link: `https://github.com/yourusername/ecommerce`
   - Add 2-3 more projects

6. Get your credentials:
   - Go to Settings → API
   - Copy **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - Copy **anon public key** (starts with `eyJh...`)

### 2. Configure Backend (1 minute)
1. Open `backend/.env`
2. Paste your Supabase URL and key:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_key_here
```

### 3. Start Backend (1 minute)
```bash
cd backend
npm install
npm run dev
```

Expected output:
```
✅ Server is running on http://localhost:3000
```

### 4. Start Frontend (1 minute)

**Option A - VS Code Live Server (Easiest):**
- Right-click `frontend/index.html`
- Select "Open with Live Server"

**Option B - Terminal:**
```bash
cd frontend
python -m http.server 5500
```

Open browser to: **http://localhost:5500**

## ✅ Test Everything Works

1. **Navigation** - Click nav links, they should smooth scroll
2. **Projects** - Should display your 3 sample projects from database
3. **Contact Form** - Fill it out and submit
   - Should show "Thank you!" message
   - Check Supabase `contacts` table for your submission

## 🎨 Customize Your Portfolio

### Change Your Name & Info
Edit `frontend/index.html`:
```html
<h1 class="hero-title">Hi, I'm YOUR NAME</h1>
<p class="hero-tagline">YOUR TITLE | YOUR TAGLINE</p>
```

### Change Colors
Edit `frontend/style.css` (around line 57):
```css
/* Change these colors to your preference */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Try: #FF6B6B to #4ECDC4, or #667eea to #764ba2 */
```

### Update Skills
Edit `frontend/index.html` in About section:
```html
<div class="skill-tag">HTML</div>
<div class="skill-tag">CSS</div>
<div class="skill-tag">JavaScript</div>
<!-- Add your skills -->
```

### Change About Text
Edit About section in `frontend/index.html` with your bio

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Projects not showing | Backend not running? Check console (F12). Backend URL correct in `script.js`? |
| Contact form doesn't work | Backend running? Check `backend/.env` has correct Supabase keys |
| "Cannot GET /api/projects" | Start backend with `npm run dev` in backend folder |
| CORS errors | Check `CLIENT_URL` in `.env` matches your frontend URL |
| Port 3000/5500 in use | Kill process or use different ports |

## 📁 File Structure

```
Portfolio Website/
├── frontend/
│   ├── index.html      ← Main page
│   ├── style.css       ← Styling & animations
│   ├── script.js       ← Frontend logic
│   └── .env.example    ← Notes about config
├── backend/
│   ├── server.js       ← Express server
│   ├── package.json    ← Dependencies
│   ├── .env            ← Your Supabase keys (create from .env.example)
│   ├── .env.example    ← Template
│   └── routes/
│       ├── projects.js ← GET /api/projects
│       └── contact.js  ← POST /api/contact
├── README.md           ← Features & overview
└── SETUP_GUIDE.md      ← Detailed setup
```

## 🔗 API Endpoints

| Method | Endpoint | What it does |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/health` | Check if server is running |

## 🌍 Deploy (Optional)

**Backend to Heroku:**
1. Create Heroku account → `heroku create your-portfolio-api`
2. Set env vars: `heroku config:set SUPABASE_URL=... SUPABASE_ANON_KEY=...`
3. Push: `git push heroku main`

**Frontend to Netlify:**
1. Push `frontend/` folder to GitHub
2. Connect repo to Netlify
3. Update `API_URL` in `script.js` to your Heroku backend URL

## 📞 Need Help?

- Check console for errors: Press F12 in browser
- Check backend logs: Look at terminal where you ran `npm run dev`
- Verify Supabase connection: Test endpoint in browser:
  ```
  http://localhost:3000/api/health
  ```

Happy coding! 🎉
