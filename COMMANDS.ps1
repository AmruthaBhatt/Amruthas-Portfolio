# Copy-Paste Commands to Deploy Your Portfolio

# ============================================
# STEP 1: Navigate to backend
# ============================================
cd "C:\Users\Amrutha Bhat\Desktop\Portfolio Website\backend"

# ============================================
# STEP 2: Test locally first
# ============================================
npm run dev
# Wait for: ✅ Server is running on http://localhost:3000
# Then STOP with Ctrl+C

# ============================================
# STEP 3: Install Vercel globally (first time)
# ============================================
npm install -g vercel

# ============================================
# STEP 4: Deploy to Vercel
# ============================================
vercel

# When asked, press Enter for defaults
# SAVE THE URL THAT APPEARS!

# ============================================
# STEP 5: Get your Supabase credentials
# ============================================
# Go to: https://supabase.com/dashboard
# Settings → API
# Copy FULL anon key (150+ characters starting with eyJhbGc...)

# ============================================
# STEP 6: Update backend/.env file
# ============================================
# Edit: backend/.env
# Replace:
#   SUPABASE_ANON_KEY=tepblrpzkrkiiabyxkba
# With:
#   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# Save (Ctrl+S)

# ============================================
# STEP 7: Add env vars on Vercel dashboard
# ============================================
# Go to: https://vercel.com/dashboard
# Click your project
# Settings → Environment Variables
# Add:
#   SUPABASE_URL = your_url
#   SUPABASE_ANON_KEY = your_full_key
# Save

# ============================================
# STEP 8: Redeploy on Vercel
# ============================================
# Go to Vercel dashboard
# Click Deployments
# Click latest
# Click "..." → "Redeploy"
# Wait 2 minutes...

# ============================================
# DONE!
# ============================================
# Visit: https://portfolio-xxxx.vercel.app
